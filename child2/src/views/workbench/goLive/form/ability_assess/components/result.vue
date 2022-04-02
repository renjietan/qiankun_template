<!-- 
 * @description: 评估等级 
 * @fileName: result.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div style="padding-bottom: 20px;">
    <el-form :inline="true" hide-required-asterisk status-icon>
      <el-row>
        <el-col :span="4">
          <el-form-item class="readonly" label="评估等级">
            <el-input disabled v-model="level" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="10" style="text-align: right; height: 96px;">
          <div style="margin-top: 45px;">
            <el-button icon="el-icon-pinggu" disabled v-waves type="success">评估结果确认书</el-button>
            <el-button icon="el-icon-biaoge" disabled v-waves type="warning">能力评估表</el-button>
            <el-button icon="el-icon-dayin" disabled v-waves type="primary">一键打印</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="200" align="center" prop="type" label="评估项目">
          <template
            slot-scope="scope"
          >{{scope.row.type=="AC"?"日常生活活动":scope.row.type=="SP"?"精神状态":scope.row.type=="SC"?"感知觉与沟通":"社会参与"}}</template>
        </el-table-column>
        <el-table-column width="200" align="center" prop="score" label="得分"></el-table-column>
        <el-table-column width="200" align="center" prop="levelDesc" label="评估等级"></el-table-column>

        <el-table-column align="left" label="完成度(已评估项目/所有项目)">
          <template slot-scope="scope">
            <div>{{ `${scope.row.finishRatio} ` }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="binding">
      <el-row :gutter="15" style="margin-top:20px">
        <el-col :span="14">
          <div class="binding-content">
            <div class="title">
              <span style="margin-left:10px">评估等级卡绑定</span>
            </div>
            <div class="binding-card">
              <table-card></table-card>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="binding-content">
            <div class="title">
              <span style="margin-left:10px">绑定卡使用说明</span>
            </div>
            <div class="binding-card" style="margin:40px">
              <div
                style="color:#333;font-size:14px;margin-bottom:22px;font-weight:700;letter-spacing:1px;font-family: PingFangSC;"
              >一、由0代表正常，1代表轻度失能，2代表中度失能，3代表重度失能</div>
              <div
                class="paragraph"
              >老年人能力评估结果判定卡使用时，一般根据日常生活活动能基础性日常生活自理能力进行初步定位，锁定目标区域，然后根据其他三项能力在判定卡同一颜色区域定位查找相应的能力等级，以下为几种特殊情况：</div>
              <div
                class="paragraph"
              >（1）当基础性日常生活自理能力为0时，认知能力、感知觉与沟通有一项为1及以上，或者工具性日常生活自理能力为2或以上，判定为轻度失能。</div>
              <div class="paragraph">（2）当基础性日常生活自理能力为1时，后三项有一项为0或1，判定为轻度失能：后三项为2及以上或一项为3，则判定为重度失能。</div>
              <div class="paragraph">（3）当基础性日常生活自理能力为2时，后三项全部为2以上或某一项为3，判定为重度失能，否则为中度失能。</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-button
        type="primary"
        :disabled="step >= 7 ? 'disabled' : false"
        v-waves
        @click="handleSubmit"
      >提交</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { arrayGroupBy, parseTime } from "@/utils/index";
import { get_assessinfo_all } from "@/api/pensionagency/goLive/goLive";
import { add_elder_assess, get_assess_info } from "@/api/pensionagency/goLive/goLive";
import tableCard from "./table_card";
export default {
  name: "result",
  components: { Pagination, tableCard },
  directives: { waves },
  data() {
    return {
      step: undefined,
      acId: null, //日常生活得分关联id
      peId: null, //感知觉与沟通得分关联id
      scId: null, //社会参与得分关联id
      spId: null, //精神状态得分关联id
      level: "", //总评估等级
      levelId: undefined, //评估等级ID
      table_loading: false,
      table_data: []
    };
  },
  methods: {
    getAassessinfoAll() {
      get_assessinfo_all({ elderId: this.$route.query.id??this.$route.params.id }).then(res => {
        this.table_data = res.projectAssessResult.map(item => {
          if (item.type == "AC") {
            this.acId = item.id;
          } else if (item.type == "SP") {
            this.spId = item.id;
          } else if (item.type == "SC") {
            this.scId = item.id;
          } else if (item.type == "PE") {
            this.peId = item.id;
          }
          return item;
        });
        this.level = res.levelDesc;
        this.levelId = res.level;
      });
    },
    handleSubmit() {
      let self = this;
      let params = {
        operatorId: self.$store.getters.userInfo.empId,
        elderId: self.$route.query.id??this.$route.params.id,
        acId: self.acId,
        peId: self.peId,
        scId: self.scId,
        spId: self.spId,
        level: self.levelId,
        assessor: self.$store.getters.userInfo.account,
        assessDate: parseTime(new Date(), "{y}{m}{d}")
      };
      add_elder_assess(params).then(res => {
        self.$notify({
          title: "成功",
          message: "能力评估完成",
          type: "success"
        });
      });
      self.$router.go(-1);
    }
  },
  mounted() {
    const { step } = this.$route.params;
    this.step = step;
    this.getAassessinfoAll();
  }
};
</script>
<style lang='scss' scoped>
.binding {
  .binding-content {
    height: 774px;
    border: 1px solid #eeeeee;

    .title {
      position: relative;
      height: 52px;
      font-size: 16px;
      background-color: #eff8ff;
      line-height: 52px;
      color: #333;
    }

    .title::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 18px;
      top: 16px;
      color: #017cff;
      background-color: #017cff;
    }

    .binding-card {
      .paragraph {
        margin-bottom: 22px;
        font-size: 14px;
        line-height: 22px;
        font-family: PingFangSC;
        letter-spacing: 0.5px;
      }
    }
  }
}
</style>
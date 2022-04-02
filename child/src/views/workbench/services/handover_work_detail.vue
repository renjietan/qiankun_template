<!-- 
 * @description:交接班详情 
 * @fileName: handover_work_detail.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-22 15:21:15
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card" style="min-height:800px">
      <div class="title" style="margin-bottom:15px;font-size:18px">交接班详情</div>
      <el-form :inline="true" label-position="top">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="4">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="form_data.handoverDate"
                    type="datetime"
                    disabled
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="班次类型">
                  <el-input
                    v-model="form_data.shiftName"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="在住长者数">
                  <el-input
                    v-model="form_data.liveIngNum"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="实到长者数">
                  <el-input
                    v-model="form_data.attendanceNum"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="新增长者数">
                  <el-input
                    v-model="form_data.newNum"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="请假长者数">
                  <el-input
                    v-model="form_data.leaveNum"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div class="title" style="margin:20px 0">
        <span>重要事项记录</span>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        highlight-current-row
        fit
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column align="center" width="80" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" width="150" prop="elderNm" label="姓名"></el-table-column>
        <el-table-column align="left" width="160" prop="badNm" label="床号"></el-table-column>
        <el-table-column align="left" width="180" prop="t" label="T（体温）"></el-table-column>
        <el-table-column align="left" width="180" prop="p" label="P（脉搏）"></el-table-column>
        <el-table-column align="left" width="180" prop="r" label="R（呼吸）"></el-table-column>
        <el-table-column align="left" width="180" prop="bp" label="BP（血压）"></el-table-column>
        <el-table-column align="left" prop="remark" label="病情摘要及护理措施"></el-table-column>
      </el-table>
      <el-form :inline="true" label-position="top">
        <el-row style="margin-top:15px">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">
                <el-form-item label="交班时间">
                  <el-date-picker
                    v-model="form_data.handoverTime"
                    type="datetime"
                    disabled
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="交班人">
                  <el-input
                    v-model="form_data.includingName"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="接班人">
                  <el-input
                    v-model="form_data.successorName"
                    style="width:220px"
                    disabled
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>

    </div>
    <el-dialog
      class="el-dialog-2"
      center
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
      >
        <div v-if="this.dialog_cof.title=='收退费'">
          <el-row>
            <el-col :span="11">
              <el-form-item class="default" label="收费总额（元）" prop="avName">
                <el-input clearable v-model="form_data.avName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item class="must-fill" label="支付方式" prop="avName">
                <el-select clearable v-model="form_data.avType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.avType"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item class="default" label="综合账户金额（元）" prop="rsv">
                <el-input clearable v-model="form_data.avName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item class="default" label="结后余额（元）" prop="rsv">
                <el-input clearable v-model="form_data.avName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="default" label="说明" prop="rsv">
                <el-input type="textarea" clearable v-model="form_data.rsv" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit() ">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
import { get_shift_records, important_matter_list } from "@/api/pensionagency/servers/serves";
export default {
  name: "billing_details",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      value1: "",
      flt: {},
      table_total: 1,
      table_loading: false,
      table_data: [],
      // importantMatterIds: [], //重要事项ids
      options: [],
      status_options: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {},
      detail_data: {}, //详情数据
      form_data: {
        handoverDate: null, //日期
        shiftName: null, //班次类型
        liveIngNum: null, //在住长者数
        attendanceNum: null, //实到长者数
        newNum: null, //新增长者数
        leaveNum: null, //请假长者数
        handoverTime: null, //交班时间
        includingName: null, //交班人
        successorName: null //接班人
      }
    };
  },
  methods: {
    formatZero,
    getChangeDetail() {
      get_shift_records({ id: parseInt(this.$route.query.id) }).then(res => {
        this.detail_data = res.result;
        this.form_data.handoverDate = this.detail_data[0].handoverDate;
        this.form_data.shiftName = this.detail_data[0].shiftName;
        this.form_data.liveIngNum = this.detail_data[0].liveIngNum;
        this.form_data.attendanceNum = this.detail_data[0].attendanceNum;
        this.form_data.newNum = this.detail_data[0].newNum;
        this.form_data.leaveNum = this.detail_data[0].leaveNum;
        this.form_data.handoverTime = this.detail_data[0].handoverTime;
        this.form_data.includingName = this.detail_data[0].includingName;
        this.form_data.successorName = this.detail_data[0].successorName;
        // this.importantMatterIds = this.detail_data[0].importantMatterIds;
        this.table_data = this.detail_data[0].importantMatterVos;
        // this.importantMatterList();
      });
    },
    //获取重要事件列表
    // importantMatterList() {
    //   this.importantMatterIds = JSON.stringify(this.importantMatterIds);
    //   this.importantMatterIds = this.importantMatterIds.replace("[", "");
    //   this.importantMatterIds = this.importantMatterIds.replace("]", "");
    //   important_matter_list({ ids: this.importantMatterIds }).then(res => {
    //     this.table_data = res;
    //   });
    // },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "收退费":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "收退费";
          break;
        default:
          break;
      }
    },
    handleSubmit() {}
  },
  mounted() {
    this.getChangeDetail();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid #dfe6ec !important;
    font-size: 15px;
    font-weight: bolder;
    color: black;
    padding: 15px 0;
  }
}

/deep/.el-table__body-wrapper .el-table__row {
  td {
    border-right: 1px solid #dfe6ec !important;
  }
}
</style>
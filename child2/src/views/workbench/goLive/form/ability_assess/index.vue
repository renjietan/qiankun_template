<!-- 
 * @description: 能力评估
 * @fileName: goLive_health.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 14:19:11
 * @后台人员:  
!-->
<template>
  <div class="container">
    <Basicinfo v-if="$route.query.isShow!=false" :olderInfo="olderInfo" ></Basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px;">能力评估</div>
      <el-form :inline="true" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="评估人">
              <el-input readonly v-model="assessor" placeholder="请输入评估人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" label="评估时间">
              <el-date-picker v-model="assessDate" type="date" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="crumbs" style="margin: 0 0 25px 0;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{
            item.name }}
          </span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>

      <!--  防止后期 UI更改  -->
      <component :is="cur_tag.component" :key="cur_tag.component"></component>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import Acitves from "./components/acitves";
  import Spirit from "./components/spirit";
  import Perception from "./components/perception";
  import Social from "./components/social.vue";
  import Result from "./components/result.vue";
  import { } from "@/utils/validate";
  import { get_older_baseinfo } from "@/api/pensionagency/goLive/goLive";
  import Basicinfo from "@/components/Basicinfo";
  export default {
    name: "goLive_form_ability_assess",
    components: {
      Pagination,
      Acitves,
      Spirit,
      Perception,
      Social,
      Result,
      Basicinfo
    },
    directives: { waves },
    data() {
      return {
        olderInfo: {},
        level: ["物业服务", "轻度失眠", "中度失眠", "重度失眠"],
        tags: [
          {
            name: "日常生活活动",
            component: "Acitves"
          },
          {
            name: "精神状态",
            component: "Spirit"
          },
          {
            name: "感知觉与沟通",
            component: "Perception"
          },
          {
            name: "社会参与",
            component: "Social"
          },
          {
            name: "评估等级",
            component: "Result",
            assessDate: new Date(),
          }
        ],
        cur_tag: {},
        assessor: "",
        assessDate: new Date(),
      };
    },
    methods: {
      getDetail() {
        get_older_baseinfo({
          elderId: this.$route.query.id
        }).then(res => {
          if (res != null) {
            this.olderInfo = res;
          }
        });
      },
      handle_switchModel(val) {
        this.cur_tag = val;
      }
    },
    mounted() {
      this.getDetail()
      this.assessor = this.$store.getters.userInfo.account
      this.cur_tag = this.tags[0];
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

  /deep/.el-table__body-wrapper  .el-table__row {
    td {
      border-right: 1px solid #dfe6ec !important;
    }
  }
</style>
<!-- 
 * @description:方案详情 
 * @fileName: price_detail.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-25 16:43:45
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="basic_info_box">
        <el-table
          class="table_basic"
          border
          :show-header="false"
          ref="table_data"
          :data="table_data"
          stripe
          highlight-current-row
          fit
        >
          <el-table-column align="left" prop="column1" label="第一列"></el-table-column>
          <el-table-column align="left" prop="column2" label="第二列"></el-table-column>
          <el-table-column align="left" prop="column3" label="第三列"></el-table-column>
          <el-table-column align="left" prop="column4" label="第四列"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 18px 0;">
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
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import BaseInfo from "./components/baseInfo";
import Discount from "./components/discount";
import PayWay from "./components/payWay";
import Relevant from "./components/relevant";
import {} from "@/utils/validate";
export default {
  name: "price_mg_price_detail",
  components: { Pagination,BaseInfo,Discount ,PayWay,Relevant},
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      tags: [
        {
          name: "基本信息",
          component: "BaseInfo"
        },
        {
          name: "折扣方案",
          component: "Discount"
        },
        {
          name: "付款方式",
          component: "PayWay"
        },
        {
          name: "相关附件",
          component: "Relevant"
        },
      ],
      cur_tag: {},
      table_data: [
        {
          column1: `价格方案名称：01栋价格-一期`,
          column2: `审批状态：待审批`,
          column3: `制定人：系统管理员`,
          column4: `制定日期：2018-09-14`
        }
        // {
        //   column1: `价格方案名称：${this.olderInfo.elderName || ""}`,
        //   column2: `审批状态：${this.olderInfo.sex == "0" ? "男" : "女" || ""}`,
        //   column3: `制定人：${this.olderInfo.age}`,
        //   column4: `制定日期：${this.olderInfo.bedName || ""}`,

        // },
      ],
      dialog_cof: {
        visible: true,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    handle_switchModel(val) {
      this.cur_tag = val;
    }
  },
  mounted() {
    this.cur_tag = this.tags[0];
  }
};
</script>
<style lang='scss' scoped>

.container .container_card {
  padding: 10px 24px;
}
.basic_info_box {
  width: 75%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  /* line-height: 50px; */
}

.table_basic /deep/ .el-table__body tr.el-table__row > td {
  background-color: transparent !important;
}
.table_basic {
  /deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid #dfe6ec !important;
    font-size: 14px;
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
}



</style>
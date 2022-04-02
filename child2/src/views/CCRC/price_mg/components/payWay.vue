<!-- 
 * @description: 详情-------付款方式
 * @fileName: payWay.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-01 17:02:52
 * @后台人员:  
!-->
<template>
  <div>
    <div class="container_card">
      <el-table   border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="80" align="left" type="index" label="序号"></el-table-column>
        <el-table-column align="left" prop="planName" label="付款方式名称"></el-table-column>
        <el-table-column align="left" prop="planName" label="贷款选项"></el-table-column>
        <el-table-column align="left" prop="tollStandard" label="生效日期"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="失效日期"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="应用范围"></el-table-column>
        <el-table-column align="left" label="操作" width="80">
          <template slot-scope="scope">
            <div>
              <el-link :underline="false" type="primary" @click="handleAction(scope.row, '明细')">明细</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table 
      style="margin-top:22px"
        border
        ref="data_table_detail"
        :data="table_data_detail"
        v-loading="table_loading_detail"
        fit
      >
        <el-table-column align="left" prop="planName" label="时间"></el-table-column>
        <el-table-column align="left" prop="planName" label="天"></el-table-column>
        <el-table-column align="left" prop="tollStandard" label="月"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="款项类型"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="款项名称"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="金额（元）"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="比例（%）"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="分期"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="扣除定金" width="100px"></el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button @click="$router.go(-1)">返 回</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "PayWay",
  components: {
    Pagination
  },
  directives: {
    waves,
    elDragDialog
  },

  data() {
    return {
      name: "",
      table_loading: false,
      table_loading_detail: false,
      table_data: [],
      table_data_detail: [],
      dialog_cof: {
        type: "",
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  computed: {},
  methods: {
    handleDialog() {},
    handleAction() {}
  },

  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid transparent !important;
    font-size: 14px;
    font-weight: bolder;
    color: black;
    padding: 15px 0;
  }
}

/deep/.el-table__body-wrapper .el-table__row {
  td {
    background: #e8f3ff;

    border-right: 1px solid transparent !important;
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}

.container_card {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #000000a6;

    font-weight: 400;
    line-height: 32px;
  }
}
.title {
  letter-spacing: 1px;
  margin-top: 5px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
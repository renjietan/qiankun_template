<!-- 
 * @description:详情------折扣方案 
 * @fileName: discount.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-01 16:58:29
 * @后台人员:  
!-->
<template>
  <div>
    <div class="container_card">
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="80" align="left" type="index" label="序号"></el-table-column>
        <el-table-column align="left" prop="planName" label="折扣类型"></el-table-column>
        <el-table-column align="left" prop="planName" label="折扣项目名称"></el-table-column>
        <el-table-column align="left" prop="tollStandard" label="计算方法"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="折扣"></el-table-column>
        <el-table-column align="left" prop="afterDiscount" label="应用范围"></el-table-column>
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
  name: "Discount",
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
      table_data: [],
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
    handleSubmit() {}
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
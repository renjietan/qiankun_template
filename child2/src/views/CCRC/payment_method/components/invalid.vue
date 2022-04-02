<!-- 
 * @description:失效的 
 * @fileName: invalid.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-26 11:52:58
 * @后台人员:  
!-->
<template>
  <div>
    <el-row style="padding-bottom: 20px">
      <el-col>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <!-- <div class="title" v-if="title">{{ title }}</div> -->
          <!-- <div>
            <el-button type="primary" icon="el-icon-plus"  @click="handleCreat()">新增</el-button>
            <el-button type="success">
              <span class="btn_pic">
                <img class="pic" src="~@/assets/images/CCRC/introduce.png" />引入付款方式
              </span>
            </el-button>
          </div> -->
        </div>
      </el-col>
    </el-row>

    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="150" align="left" label="序号">
        <template slot-scope="scope">
          <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="left" prop="planName" label="价格方案"></el-table-column>
      <el-table-column width="300" align="left" prop="planName" label="底均价对比"></el-table-column>
      <el-table-column width="300" align="left" prop="tollStandard" label="面均价对比"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="状态"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="指定信息"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="审批信息"></el-table-column>
      <el-table-column align="left" label="操作" width="110">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleDialog(scope.row, '编辑')">编辑</el-link>
            <el-link :underline="false" type="danger" @click="handleDialog(scope.row, '删除')">删除</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
export default {
  name: "Invalid",
  components: {
    Pagination
  },
  directives: {
    waves
  },

  data() {
    return {
      table_loading: false,
      table_data: [
        {
          planName: "1"
        }
      ],
      company: "",
      company_list: [], //公司列表
      form_data: {},
      radio: 1,
      radio1: 0,
      radio2: 0
    };
  },
  computed: {},
  methods: {
    formatZero,
    handleDialog() {},
    handleCreat() {
      let self = this;
      self.$router.push({ path: "/CCRC/payment_method/add_payment_method" });
    }
  },

  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}
/deep/.el-form-item__label {
  color: #262626;
  line-height: 40px;
  font-weight: 400;
}
.title {
  margin-top: 5px;
  letter-spacing: 1px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
.parameter_content {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #222;

    font-weight: 400;
  }
}
</style>
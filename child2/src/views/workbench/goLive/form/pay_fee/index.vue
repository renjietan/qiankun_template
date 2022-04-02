<!-- 
 * @description: 办理收费
 * @fileName: index.vue 
 * @author: 谭人杰 
 * @date: 2021-10-02 11:02:31
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basicinfo></basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px;">账户信息</div>
      <el-form :inline="true" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="综合账户">
              <el-input disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="医疗备用金">
              <el-input disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px;">收费详情</div>
      <el-table border ref="table_data" :data="table_data" stripe highlight-current-row fit>
        <el-table-column align="left" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="column2" label="收费账户"></el-table-column>
        <el-table-column align="left" prop="column3" label="支付方式"></el-table-column>
        <el-table-column align="left" prop="column4" label="金额"></el-table-column>
        <el-table-column align="left" prop="column5" label="登记时间"></el-table-column>
        <el-table-column align="left" width="700" prop="column5" label="说明"></el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="handleDialog(scope.row, '编辑')">编辑</el-link>
            <el-link :underline="false" type="danger" @click="handleDialog(scope.row, '删除')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      class="el-dialog-2"
      center
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
      @close="close"
    >
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="收费账户" prop="charge_account">
               <el-select v-model="form_data.charge_account" clearable placeholder="请选择">
                <el-option
                  v-for="item in disease_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="支付方式" prop="payment_method">
              <el-select v-model="form_data.payment_method" clearable placeholder="请选择">
                <el-option
                  v-for="item in disease_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="金额（元）" prop="amount">
              <el-select v-model="form_data.amount" clearable placeholder="请选择">
                <el-option
                  v-for="item in disease_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="default" label="说明" prop="disease">
              <el-input type="textarea" clearable v-model="form_data.remark" placeholder="请输入"  :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Basicinfo from "@/components/Basicinfo";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import {
  getSpecialList,
  addSpecailINfo,
  updateSpecailInfo,
  getElderByName
} from "@/api/pensionagency/inLive/specail";
import { formatZero, parseDate } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "goLive_form_pay_fee",
  components: { Pagination, Basicinfo },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      disease_list:[],
      table_data: [
        {
          column5: "1"
        }
      ],
      form_data: {
        elderId: undefined, //长者ID
        charge_account: "", //收费账户
        amount: undefined, //金额（元）
        payment_method: "", //支付方式
      },
      dialog_cof: {
        visible: false,
        title: "",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    formatZero,
    handleDialog(data, type) {
      this.dialog_cof.title = type;
      switch (type) {
        case "编辑":
          this.dialog_cof.visible = true;
          this.form_data = data;
          break;
        case "删除":
          const { id } = data;
          this.$confirm("确定要删除么?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(res => {
            updateSpecailInfo({ id, operateType: "D" }).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            });
          });

          break;
      }
    }
  },
  mounted() {}
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
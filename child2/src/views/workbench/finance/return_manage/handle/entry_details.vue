<!-- 
 * @description:入账详情 
 * @fileName: entry_details.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-11 11:45:08
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class>
      <basic-info-table></basic-info-table>
    </div>
    <div class="container_card" style="min-height: 600px">
      <el-form :inline="true" label-position="top">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="6">
                <el-form-item label="收费总额">
                  <el-input
                    v-model="flt.allAmt"
                    style="width: 270px;"
                    placeholder="请输入"
                    disabled
                   class="all"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span style="font-weight: bold">支付方式</span>
            <el-form
              :inline="true"
              ref="form"
              :model="flt"
              hide-required-asterisk
              status-icon
            >
              <el-table
                style="margin-top: 12px"
                class="table_data"
                border
                ref="table_data"
                :data="flt.payDetailList"
                v-loading="table_loading"
                highlight-current-row
                fit
              >
                <el-table-column align="left" width="80" label="序号">
                  <template slot-scope="scope">
                    <span :style="{ color: $variables.baseColor }">
                      {{ formatZero(scope.$index + 1, 2) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="支付方式">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'payDetailList.' + scope.$index + '.payType'"
                      :rules="{
                        required: true,
                        message: '请选择支付方式',
                        trigger: 'change',
                      }"
                    >
                      <el-select v-model="scope.row.payType">
                        <el-option
                          v-for="item in status_options"
                          :key="item.desc"
                          :label="item.desc"
                          :value="item.desc"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="收费/退费"
                >
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'payDetailList.' + scope.$index + '.isPay'"
                      :rules="{
                        required: true,
                        message: '请选择收费/退费',
                        trigger: 'change',
                      }"
                    >
                      <el-select v-model="scope.row.isPay">
                        <el-option
                          v-for="item in options_status"
                          :key="item.code"
                          :label="item.desc"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="bedName" label="金额">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'payDetailList.' + scope.$index + '.amount'"
                      :rules="{
                        required: true,
                        message: '请输入金额',
                        trigger: 'change',
                      }"
                    >
                      <el-input
                        v-model="scope.row.amount"
                        placeholder="请输入金额"
                        @change="getValue(scope.$index, $event)"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-delete"
                      style="color: red"
                      @click="handleAction(scope.$index, '删除')"
                    ></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="default" @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </div>
        <el-row style="margin: 12px 0">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAction('', '新增')"
            >新增</el-button
          >
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" style="width: 100%">
              <el-input
                v-model="flt.refundDesc"
                type="textarea"
                :rows="4"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero, parsetNumber } from "@/filters";
import {} from "@/utils/validate";
import { refound_add } from "@/api/pensionagency/fsm/refund-record";
import { floatObj } from "@/utils/index";

export default {
  name: "entry_details",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        elderId: undefined,
        allAmt: 0,
        payDetailList: [],
        billIds: "",
        refundDesc: "",
      },
      table_loading: false,
      options: [],
      disable: null,
      status_options: [
        {
          desc: "微信支付",
        },
        {
          desc: "支付宝支付",
        },
        {
          desc: "现金",
        },
        {
          desc: "银行汇款",
        },
        {
          desc: "POS机刷卡",
        },
        {
          desc: "代金券",
        },
        {
          desc: "养老卡",
        },
        {
          desc: "一卡通扣费",
        },
        {
          desc: "银联代收",
        },
        
      ],
      options_status: [
        {
          code: "0",
          desc: "退费",
        },
        {
          code: "1",
          desc: "收费",
        },
      ],
    };
  },
  methods: {
    formatZero,
    parsetNumber,
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "收退费":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "收退费";
          break;
        case "新增":
          self.flt.payDetailList = [
            ...self.flt.payDetailList,
            //  { amount: "", isPay: this.disable>0?'':"0", payType: "",disable:this.disable > 0?false:true},
            { amount: "", isPay: "", payType: "" },
          ];
          break;
        case "删除":
          if (data !== 0) {
            self.$confirm("提示", "是否删除此条记录？").then((res) => {
              self.flt.payDetailList.splice(data, 1);
            });
          } else {
            self.$notify({
              title: "警告",
              message: "至少保留一条",
              type: "warning",
            });
          }
          break;
        default:
          break;
      }
    },
    //  完成收退费
    handleSubmit() {
      this.$refs["form"].validate((isvaild) => {
        if (isvaild) {
          if (!this.isEquire()) {
            refound_add(this.flt).then((res) => {
              this.$notify({
                type: "success",
                message: "操作成功!",
                title: "成功",
              });
              this.$nextTick(() => {
                this.flt.payDetailList = [
                  { amount: "", isPay: "", payType: "" },
                ];
                this.$refs["form"].clearValidate();
              });
              this.$router.go(-1);
            });
          }
        }
      });
    },
    getValue(i, e) {
      if (!!e) {
        this.flt.payDetailList[i].amount = this.parsetNumber(e);
      }
    },
    isEquire() {
      let allAmt = this.flt.payDetailList.reduce((pre, cur) => {
        return cur.isPay == "1"
          ? floatObj().add(pre, cur.amount)
          : floatObj().subtract(pre, cur.amount);
      }, 0);
      if (this.flt.allAmt == allAmt) {
        return false;
      } else {
        if (this.flt.allAmt > allAmt) {
          this.$notify({
            type: "warning",
            message: "支付的金额不足!",
            title: "成功",
          });
        } else {
          this.$notify({
            type: "warning",
            message: "支付的金额超过收费总额!",
            title: "成功",
          });
        }
        return true;
      }
    },
  },
  mounted() {
    const { id, allmount, billIds } = this.$route.query;
    this.flt.elderId = id ?? undefined;
    this.disable = allmount;
    this.flt.payDetailList = [{ amount: "", isPay: "", payType: "" }];
    // this.flt.allAmt = Math.abs(allmount);
    this.flt.allAmt = this.parsetNumber(allmount);
    this.flt.billIds = !!billIds
      ? billIds.split(",").map((e) => parseInt(e))
      : undefined;
  },
  activated() {
    const { id, allmount, billIds } = this.$route.query;
    this.flt.elderId = id ?? undefined;
    this.disable = allmount;
    this.flt.payDetailList = [{ amount: "", isPay: "", payType: "" }];

    // this.flt.allAmt = Math.abs(allmount);
    this.flt.allAmt = this.parsetNumber(allmount);
    this.flt.billIds = !!billIds
      ? billIds.split(",").map((e) => parseInt(e))
      : undefined;
  },
};
</script>
<style lang='scss' scoped>
.all{
 /deep/ .el-input__inner{
       color:red;
  }
 
}
</style>
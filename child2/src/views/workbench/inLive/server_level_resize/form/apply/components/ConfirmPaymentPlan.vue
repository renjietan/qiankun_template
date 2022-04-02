<!-- 
 * @description: 确认付款计划
 * @fileName: ConfirmPaymentPlan.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 21:02:57
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form :inline="true" ref="form" :model="form_data_baseInfo" hide-required-asterisk status-icon>
      <el-row :gutter="40">
        <!-- <el-col :span="4">
          <el-form-item class="readonly" label="合同类型">
            <el-input readonly v-model="form_data.contract_type"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="4">
          <el-form-item class="readonly" label="申请日期">
            <el-input readonly v-model="form_data_baseInfo.applyDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="预计办理日期">
            <el-input readonly v-model="form_data_baseInfo.expectDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="服务等级">
            <el-input readonly v-model="form_data_baseInfo.server_level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="服务套餐">
            <el-input readonly v-model="form_data_baseInfo.server_package"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="服务费用">
            <el-input readonly v-model="form_data_baseInfo.server_fee"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding: 20px 0">
      <el-button type="primary" :disabled="cur_step == 2 ? false : 'disabled'" @click="handleDialog('', '添加周期付款计划')"
        icon="el-icon-plus">添加付款计划</el-button>
      <el-button type="success" icon="el-icon-plus">收费标准确认书</el-button>
    </div>
    <el-table border :row-class-name="tableRowClassName" :span-method="objectSpanMethod" ref="data_table"
      :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="200" align="center" prop="index" label="序号"></el-table-column>
      <el-table-column width="240" align="center" prop="cycle" label="时间周期"></el-table-column>
      <el-table-column width="200" align="center" prop="tollStandard" label="收费标准"></el-table-column>
      <el-table-column width="200" align="center" prop="afterDiscount" label="折扣后"></el-table-column>
      <el-table-column align="center" prop="rsv" label="收费说明"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-link :disabled="cur_step == 2 ? false : 'disabled'" :underline="false" type="primary"
              @click="handleDialog(scope.row, '周期费用修改')">修改</el-link>
            <el-link :disabled="cur_step == 2 ? false : 'disabled'" :underline="false" type="danger"
              @click="handleDialog(scope.row, '删除')">删除</el-link>
            <div></div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="el-dialog-2" center :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon :rules="rules">
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="费用类型" prop="tollType">
              <el-input readonly v-model="form_data.tollType" placeholder="请输入" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" v-if="
            this.dialog_cof.title == '添加周期付款计划' ||
            this.dialog_cof.title == '周期费用修改'
          ">
            <el-form-item class="must-fill" label="科目名称" prop="planName">
              <el-select v-model="form_data.planName" placeholder="请选择">
                <el-option v-for="item in fee_name_list" :key="item.type" :label="item.desc" :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" v-else>
            <el-form-item class="must-fill" label="科目名称" prop="planName">
              <el-select v-model="form_data.planName" placeholder="请选择">
                <el-option v-for="item in fee_name_list" :key="item.type" :label="item.desc" :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="
          this.dialog_cof.title == '添加周期付款计划' ||
          this.dialog_cof.title == '周期费用修改'
        ">
          <el-col :span="11">
            <el-form-item class="must-fill" label="开始时间" prop="startDate">
              <el-date-picker v-model="form_data.startDate" placeholder="请选择" value-format="yyyy-MM-dd"
                @input="$forceUpdate()"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="结束时间" prop="endDate">
              <el-date-picker v-model="form_data.endDate" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="收费标准" prop="tollStandard">
              <el-input clearable v-model="form_data.tollStandard" placeholder="请输入" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="折扣后" prop="afterDiscount">
              <el-input clearable v-model="form_data.afterDiscount" placeholder="请输入" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="optional" label="收费说明" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv" placeholder="请输入" maxlength="244"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(dialog_cof.title)">确 认</el-button>
      </div>
    </el-dialog>
    <div class="footer">
      <el-button :disabled="cur_step == 2 ? false : 'disabled'" @click="handleComplete" type="primary">确认付款计划
      </el-button>
    </div>
  </div>
</template>
<script>
  import {
    pay_type,
    pay_add,
    pay_plan_manager,
    pay_plan_complete,
  } from "@/api/pensionagency/goLive/goLive";
  import { base_info } from "@/api/pensionagency/inLive/bed_just";
  import { get_inLive_payPlan, get_charge_process_byId_byType, confirm_pay_plan } from '@/api/pensionagency/inLive/server_level';

  export default {
    name: "ConfirmPaymentPlan",
    data() {
      return {
        cur_step: 0,
        form_data_baseInfo: {
          applyDate: "", //申请日期
          expectDate: "", //预计办理日期
          server_level: "", //服务等级
          server_package: "", //服务套餐
          server_fee: "", //服务费用
        },
        processId: undefined,
        fee_name_list: [],
        table_data: [],
        table_loading: false,
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
        form_data: {
          id: undefined,
          planName: "", // 科目名称
          tollStandard: "", //收费标准
          startDate: "", //开始时间
          endDate: "", //结束日期
          tollType: "", //费用类型 周期:CY， 一次性:OT
          afterDiscount: "", //折扣后费用标准
          desc: "", //费用说明
          isCharge: 1
        },
        rules: {
          tollType: [
            {
              required: true,
              message: "周期不能为空",
              trigger: "change",
            },
          ],
          planName: [
            {
              required: true,
              message: "请选择科目名称",
              trigger: "blur",
            },
          ],
          startDate: [
            {
              message: "开始时间不能为空",
              trigger: "blur",
            },
          ],
          endDate: [
            {
              message: "结束时间不能为空",
              trigger: "blur",
            },
          ],
          tollStandard: [
            {
              required: true,
              message: "收费标准不能为空",
              trigger: "blur",
            },
          ],
          afterDiscount: [
            {
              required: true,
              message: "折扣后不能为空",
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      handleComplete() {
        let self = this
        confirm_pay_plan({ id: self.processId }).then((res) => {
          this.cur_step = 3
          this.$notify({
            type: "success",
            title: "操作",
            message: "付款计划已完成",
          });
        });
      },
      handleDialog(row, title) {
        let self = this;
        self.dialog_cof.title = title;
        switch (title) {
          case "添加周期付款计划":
            self.reset();
            self.form_data.tollType = "周期费用";
            self.dialog_cof.visible = true;
            break;
          case "周期费用修改":
            self.reset();
            self.form_data.tollType = "周期费用";
            self.form_data.planName = row.planName;
            self.form_data.id = row.id;
            self.form_data.startDate = row.cycle.split("~")[0];
            self.form_data.endDate = row.cycle.split("~")[1];
            self.form_data.tollStandard = row.tollStandard;
            self.form_data.afterDiscount = row.afterDiscount;
            self.form_data.rsv = row.rsv;
            self.dialog_cof.visible = true;
            break;
          case "删除":
            self
              .$confirm(`删除, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then((res) => {
                const { id } = row;
                pay_plan_manager({ id, operateType: "D" }).then((res) => {
                  self.$notify({
                    type: "success",
                    message: "操作成功",
                    title: "成功",
                  });
                  self.getTableList();
                });
              });
            break;
        }
      },
      reset() {
        this.form_data = {
          id: undefined,
          planName: "", // 科目名称
          tollStandard: "", //收费标准
          startDate: null, //开始时间
          endDate: null, //结束日期
          tollType: "", //费用类型 周期:CY， 一次性:OT
          afterDiscount: "", //折扣后费用标准
          rsv: "", //费用说明
          isCharge: 1
        };
      },
      handleSubmit(type) {
        let self = this;
        if (type === "添加周期付款计划") {
          self.$refs["form"].validate((valid) => {
            if (valid) {
              const { tollType } = self.form_data;
              const { elderId } = this;
              pay_add({
                ...self.form_data,
                elderId,
                tollType: tollType === "周期费用" ? "CY" : "OT",
              }).then((res) => {
                self.$notify({
                  type: "success",
                  message: "操作成功",
                  title: "成功",
                });
                self.getTableList()
                self.dialog_cof.visible = false;
              });
            }
          });
        } else if (type === "周期费用修改") {
          const { tollType, tollStandard, afterDiscount } = self.form_data;
          pay_plan_manager({
            ...self.form_data,
            operateType: "M",
            tollType: tollType === "周期费用" ? "CY" : "OT",
            tollStandard: Number(tollStandard.replace(/[^\d.]/g, "")),
            afterDiscount: Number(afterDiscount.replace(/[^\d.]/g, "")),
          }).then((res) => {
            self.getTableList();
            self.$notify({
              type: "success",
              message: "操作成功",
              title: "成功",
            });
            self.dialog_cof.visible = false;
          });
        }
      },
      async getDetail() {
        let self = this
        this.table_loading = true;
        let fee_name_list = await pay_type();
        this.fee_name_list = fee_name_list ?? []
        let res = await get_charge_process_byId_byType({
          elderId: this.elderId,
          type: "S"
        })
        if (res.id != null) {
          self.cur_step = res.processIn
          self.processId = res.id
          // self.$set(self.form_data_baseInfo, "server_level", res.afterName)
          self.form_data_baseInfo.applyDate = res.applyDate //申请日期
          self.form_data_baseInfo.expectDate = res.expectDate //预计办理日期
          self.form_data_baseInfo.server_level = res.afterName //服务等级
          self.form_data_baseInfo.server_package = res.other //服务套餐
          self.form_data_baseInfo.server_fee = res.feeDesc //服务费用
        }
        this.getTableList()
      },
      getTableList() {
        get_inLive_payPlan({ elderId: this.elderId }).then((res) => {
          this.table_data = res.map((el) => {
            for (var i of this.fee_name_list) {
              if (el.planName === i.type) {
                el.type = i.desc;
              }
            }
            return el;
          });

          this.table_data = this.parseTableData(this.table_data);
          this.table_loading = false;
        });
      },
      tableRowClassName({ row, rowIndex }) {
        if (isNaN(parseInt(row.index))) {
          return "warning-row";
        } else {
          return "";
        }
      },
      parseTableData(data) {
        console.log(data);
        let temp = data.reduce((cur, pre) => {
          //  pre.sfbz = `${pre.sfbz.toLocaleString()}`;
          // pre.zk = `${pre.zk.toLocaleString()}`;
          // pre.sfbz = `${pre.sfbz.toLocaleString()}/${pre.unit}`;
          // pre.zk = `${pre.zk.toLocaleString()}/${pre.unit}`;
          if (cur[pre.planName] == undefined) {
            pre.index = "01";
            cur[pre.planName] = [pre];
          } else {
            let length = cur[pre.planName].length;
            pre.index = length < 9 ? "0" + length : length;
            cur[pre.planName] = [...cur[pre.planName], ...[pre]];
          }
          return cur;
        }, {});
        let table_data = [];
        for (var i in temp) {
          table_data = [...table_data, ...[{ index: i }], ...temp[i]];
        }
        return table_data;
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (isNaN(parseInt(row.index))) {
          let config = {
            rowspan: 1,
            colspan: 5,
          };
          return config;
        }
      },
      getInfo() {
        const { id } = this;
        let self = this
        base_info({ id }).then((res) => {
          if (res.id != null) {
            self.form_data_baseInfo.applyDate = res.applyDate //申请日期
            self.form_data_baseInfo.expectDate = res.expectDate //预计办理日期
            self.form_data_baseInfo.server_level = res.afterName //服务等级
            self.form_data_baseInfo.server_package = res.other //服务套餐
            self.form_data_baseInfo.server_fee = res.feeDesc //服务费用
          }
        });
      },
    },
    mounted() {
      const { id, step } = this.$route.params;
      const { record } = this.$route.query;
      this.step = step;

      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.getDetail()
      }
      if (!isNaN(Number(record))) {
        this.id = record;
        this.getInfo();
      }
    },
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-table .warning-row {
    background: rgba(1, 124, 255, 0.086);
    cursor: pointer;

    td {
      text-align: left;

      .cell {
        width: 200px;
        text-align: center;
      }
    }
  }
</style>
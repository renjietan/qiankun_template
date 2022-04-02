<template>
  <div>
    <el-row style="border-bottom: 1px solid #dcdfe6; padding-bottom: 20px">
      <el-col>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div class="title" v-if="title">{{ title }}</div>
          <div>
            <el-button type="success" disabled>收费标准确认书</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="title" style="align-items: center; padding: 25px 0">
      <span style="font-size: 15px"> 周期费用 </span>
      <!-- <el-button :disabled="step >= 7 ? 'disabled' : false" style="margin-left: 20px" type="primary"
        @click="handleDialog(scope.row, '添加周期付款计划')">
        <i class="el-icon-plus"></i>添加付款计划
      </el-button> -->
    </div>

    <el-table
      border
      :row-class-name="tableRowClassName"
      ref="data_table"
      :data="table_data"
      :span-method="objectSpanMethod"
      v-loading="table_loading"
      fit
    >
      <el-table-column
        width="200"
        align="center"
        prop="index"
        label="序号"
        style="line-height: 53px"
      >
        <template slot-scope="scope">
          <div
            :style="{
              color: isNaN(Number(scope.row.index)) ? $variables.baseColor : '',
              position: 'relative',
              height: '35px',
              lineHeight: '35px',
            }"
          >
            <div style="display: inline-block; width: 172px">
              {{ scope.row.index }}
            </div>
            <!-- <el-button
              v-if="isNaN(scope.row.index)"
              :disabled="step >= 7 ? 'disabled' : false"
              type="primary"
              @click="handleDialog(scope.row, scope.$index, '添加周期付款计划')"
            >
              <i class="el-icon-plus"></i>添加付款计划
            </el-button> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="240"
        align="center"
        prop="cycle"
        label="时间周期"
      ></el-table-column>
      <el-table-column
        width="200"
        align="center"
        prop="tollStandard"
        label="收费标准"
      ></el-table-column>
      <el-table-column
        width="200"
        align="center"
        prop="afterDiscount"
        label="折扣后"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="rsv"
        label="收费说明"
      ></el-table-column>
      <!-- <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-link
              :disabled="step >= 7 ? 'disabled' : false"
              :underline="false"
              type="primary"
              @click="handleDialog(scope.row, scope.$index, '周期费用修改')"
              >修改</el-link
            >
            <el-link
              :disabled="step >= 7 ? 'disabled' : false"
              :underline="false"
              type="danger"
              @click="handleDialog(scope.row, scope.$index, '删除')"
              >删除</el-link
            >
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <div
      class="title"
      style="
        border-bottom: 1px solid #dcdfe6;
        align-items: center;
        padding: 15px 0;
      "
    >
      <span style="font-size: 13px">一次性费用</span>
      <!-- <el-button
        :disabled="step >= 7 ? 'disabled' : false"
        style="margin-left: 20px"
        type="primary"
        @click="handleDialog('', 0, '添加一次性付款计划')"
      >
        <i class="el-icon-plus"></i>添加付款计划
      </el-button> -->
    </div>
    <el-table
      border
      ref="data_table"
      :data="table_data_once"
      v-loading="table_loading_once"
      fit
    >
      <el-table-column
        width="200"
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        width="200"
        align="center"
        prop="planName"
        label="费用名称"
      ></el-table-column>
      <el-table-column
        width="200"
        align="center"
        prop="tollStandard"
        label="收费标准"
      ></el-table-column>
      <el-table-column
        width="200"
        align="center"
        prop="afterDiscount"
        label="折扣后"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="rsv"
        label="收费说明"
      ></el-table-column>
      <!-- <el-table-column
        align="center"
        label="操作"
        width="200"
        v-if="step >= 7 || step == undefined"
      >
        <template slot-scope="scope">
          <div>
            <el-link
              :disabled="step >= 7 ? 'disabled' : false"
              :underline="false"
              type="primary"
              @click="handleDialog(scope.row, scope.$index, '一次性费用修改')"
              >修改</el-link
            >
            <el-link
              :disabled="step >= 7 ? 'disabled' : false"
              :underline="false"
              
              type="danger"
              @click="handleDialog(scope.row, scope.$index, '删除')"
              >删除</el-link
            >
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div class="footer">
      <el-button
        :disabled="step >= 7 ? 'disabled' : false"
        type="primary"
        @click="handleComplete"
        >全部完成</el-button
      >
    </div> -->
    <el-dialog
      class="el-dialog-2"
      center
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        hide-required-asterisk
        status-icon
        :rules="rules"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="费用类型" prop="tollType">
              <el-input
                disabled
                v-model="form_data.tollType"
                placeholder="请输入"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="11"
            :offset="2"
            v-if="
              this.dialog_cof.title == '添加周期付款计划' ||
              this.dialog_cof.title == '周期费用修改'
            "
          >
            <el-form-item class="must-fill" label="科目名称" prop="planName">
              <el-select v-model="form_data.planName" placeholder="请选择">
                <el-option
                  v-for="item in fee_name_list"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" v-else>
            <el-form-item class="must-fill" label="科目名称" prop="planName">
              <el-select v-model="form_data.planName" placeholder="请选择">
                <el-option
                  v-for="item in fee_name_list_once"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="
            this.dialog_cof.title == '添加周期付款计划' ||
            this.dialog_cof.title == '周期费用修改'
          "
        >
          <el-col :span="11">
            <el-form-item class="must-fill" label="开始时间" prop="startDate">
              <el-date-picker
                v-model="form_data.startDate"
                :disabled="disabled"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                @input="$forceUpdate()"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="结束时间" prop="endDate">
              <el-date-picker
                v-model="form_data.endDate"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="must-fill"
              label="收费标准"
              prop="tollStandard"
            >
              <el-input
                clearable
                v-model="form_data.tollStandard"
                placeholder="请输入"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="折扣后" prop="afterDiscount">
              <el-input
                clearable
                v-model="form_data.afterDiscount"
                placeholder="请输入"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="24"
            v-show="this.form_data.tollStandard != this.form_data.afterDiscount"
          >
            <el-form-item class="optional" label="收费说明" prop="rsv">
              <el-input
                type="textarea"
                clearable
                v-model="form_data.rsv"
                placeholder="请输入"
                maxlength="244"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
            v-show="this.form_data.tollStandard == this.form_data.afterDiscount"
          >
            <el-form-item class="optional" label="收费说明" prop="rsv">
              <el-input
                type="textarea"
                clearable
                v-model="form_data.rsv"
                placeholder="请输入"
                maxlength="244"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(dialog_cof.title)"
          >确 认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableIndex from "@/components/Table/index";
import {
  pay_type,
  pay_add,
  by_plan_type,
  pay_plan_manager,
  pay_plan_complete,
  one_time_type,
} from "@/api/pensionagency/goLive/goLive";
import { formatZero } from "@/filters";
import { Promise } from "jszip/lib/external";
import moment from "moment";
import { months } from "@/utils/enum";
export default {
  name: "table_fee",
  components: { TableIndex },
  props: {
    title: {
      type: String,
      default: "付款计划",
    },
  },
  data() {
    return {
      disabled: false,
      step: undefined,
      table_loading: false,
      table_data: [],
      fee_name_list: [],
      fee_name_list_obj: {},
      table_data_once: [],
      fee_name_list_once: [],
      fee_name_list_once_obj: {},
      table_loading_once: false,
      row_start_time: "",
      row_end_time: "",
      temp_row: 0,
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
  watch: {
    "form_data.startDate"(val) {
      if (!!val && this.form_data.endDate) {
        if (moment(val) < moment(this.form_data.endDate)) {
          this.form_data.startDate = val;
        } else {
          this.form_data.startDate = ""
        }
      }
    },
    "form_data.endDate"(val) {
      if (!!val && !!this.form_data.startDate) {
        if (moment(val) > moment(this.form_data.startDate)) {
          this.form_data.endDate = val;
        } else {
           this.form_data.endDate = "";
        }
      }
    },
  },
  mounted() {
    const { id,  } = this.$route.query;
    let self = this;
    if (!isNaN(Number(id))) {
      this.elderId = id;
      this.getDetail();
    }
  },

  methods: {
    formatZero,
    handleComplete() {
      pay_plan_complete({ elderId: Number(this.elderId) }).then((res) => {
        this.$notify({
          type: "success",
          title: "操作",
          message: "付款计划已完成",
        });
        this.$router.push("/workbench/workbench/goLive/list");
      });
    },
    getList() {
      const { elderId } = this;
      this.table_loading = true;
      by_plan_type({ elderId, tollType: "CY" }).then((res) => {
        res = res.map((el) => {
          for (var i of this.fee_name_list) {
            if (el.planName === i.type) {
              el.type = i.desc;
            }
          }
          return el;
        });

        this.table_data = this.parseTableData(res);
        this.table_loading = false;
      });
    },
    getDetail() {
      Promise.all([pay_type(), one_time_type()]).then((res) => {
        this.fee_name_list_obj =
          res[0]?.reduce((cur, pre) => {
            cur[pre.desc] = pre.type;
            return cur;
          }, {}) ?? {};
        this.fee_name_list_once_obj =
          res[1]?.reduce((cur, pre) => {
            cur[pre.desc] = pre.type;
            return cur;
          }, {}) ?? {};
        this.fee_name_list = res[0];
        this.fee_name_list_once = res[1];

        this.getList();
        this.onceList();
      });
    },
    onceList() {
      const { elderId } = this;
      this.table_loading_once = true;
      by_plan_type({ elderId, tollType: "OT" }).then((res) => {
        this.table_data_once = res.map((el) => {
          for (var i of this.fee_name_list_once) {
            if (el.planName === i.type) {
              el.type = i.desc;
            }
          }
          return el;
        });
        this.table_loading_once = false;
      });
    },
    handleDialog(row, index, title) {
      let self = this;
      self.dialog_cof.title = title;
      switch (title) {
        case "添加周期付款计划":
          self.reset();

          self.form_data.tollType = "周期费用";
          self.form_data.planName = self.fee_name_list_obj[row.index];
          self.temp_row = row.index;
          self.dialog_cof.visible = true;

          break;
        case "添加一次性付款计划":
          self.reset();
          self.form_data.tollType = "一次性费用";
          delete self.form_data.startDate;
          delete self.form_data.endDate;
          self.dialog_cof.visible = true;
          break;
        case "周期费用修改":
          self.reset();
          self.disabled = true;
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
        case "一次性费用修改":
          self.reset();
          self.form_data.tollType = "一次性费用";
          self.form_data.id = row.id;
          self.form_data.planName = row.planName;
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
                self.getList();
                self.onceList();
              });
            });
          break;
      }
    },

    isValidTime() {
      var group_arr = this.table_data.filter(
       el => el.planName == this.temp_row
      );
      this.row_start_time = group_arr[group_arr.length - 1].cycle.split("~")[0];
      this.row_end_time = group_arr[group_arr.length - 1].cycle.split("~")[1];
      if (!!this.form_data.startDate) {
        if (moment(this.form_data.startDate) < moment(this.row_end_time)) {
          this.form_data.startDate = this.row_end_time;
          this.form_data.endDate = moment(this.row_end_time)
            .add(1, "days")
            .format("YYYY-MM-DD");
        }
      }
    },
    handleSubmit(type) {
      let self = this;
      if (type === "添加周期付款计划" || type === "添加一次性付款计划") {
        self.$refs["form"].validate((valid) => {
          if (valid) {
            const { tollType } = self.form_data;
            const { elderId } = this;
            this.isValidTime();
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
              if (tollType === "周期费用") {
                self.getList();
              } else {
                self.onceList();
              }

              self.dialog_cof.visible = false;
            });
          }
        });
      } else if (type === "周期费用修改" || type === "一次性费用修改") {
        const { tollType, tollStandard, afterDiscount } = self.form_data;
        pay_plan_manager({
          ...self.form_data,
          operateType: "M",
          tollType: tollType === "周期费用" ? "CY" : "OT",
          tollStandard: Number(tollStandard.replace(/[^\d.]/g, "")),
          afterDiscount: Number(afterDiscount.replace(/[^\d.]/g, "")),
        }).then((res) => {
          if (tollType === "周期费用") {
            self.getList();
          } else {
            self.onceList();
          }
          self.$notify({
            type: "success",
            message: "操作成功",
            title: "成功",
          });
          self.dialog_cof.visible = false;
        });
        self.$router.go(-1);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (isNaN(parseInt(row.index))) {
        return "warning-row";
      } else {
        return "";
      }
    },
    parseTableData(data) {
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
          length = length + 1;
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
      };
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-table .warning-row {
  background: rgba(1, 124, 255, 0.086);
  cursor: pointer;

  td {
    text-align: left;

    .cell {
      /* width: 200px; */
      text-align: left;
      padding-left: 77px;
    }
  }
}
</style>
<!-- 
 * @description:收退费详情 
 * @fileName: return_money_detail.vue 
 * @author: 王文涛 
 * @date: 2021-09-09 20:05:55
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>

    <div class="container_card">
      <div v-for="(v, i) in datas" :key="i">
        <div class="title" style="margin: 20px 0">
          <span>
            {{ v.feeType }}
            <span style="color: #fe3d65"
              >合计：{{ parsetNumber(v.allAmt) }}元</span
            >
            <el-button
              type="primary"
              v-if="v.feeType === '预付款' || v.feeType === '费用（本月）'"
              @click="handleAction(v.feeType, i, '收退费')"
            >
              <span class="btn_pic">
                <img class="pic" src="~@/assets/images/AJFR/chongzhi.png" />收退费
              </span>
            </el-button>
          </span>
          <el-button
            type="warning"
            v-if="i === 0"
            @click="handleAction('', '', '费用登记')"
          >
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/chongzhi.png" />登记费用
            </span></el-button
          >
        </div>
        <el-table
          class="table_data"
          border
          ref="table_data"
          :data="v.billInfos"
          v-loading="table_loading"
          highlight-current-row
          @click="getIndex(i)"
          fit
          @select="selected"
          @select-all="selected"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="序号" width="55">
            <template slot-scope="scope">
              <span :style="{ color: $variables.baseColor }" class="num">
                {{ formatZero(scope.$index + 1, 2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="费用科目">
            <template slot-scope="scope">
              <div>
                {{ scope.row.feeSubject }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="140"
            prop="enterAmt"
            label="应收金额（元）"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.enterAmt
                  ? parsetNumber(scope.row.enterAmt)
                  : undefined
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="140"
            prop="payAmt"
            label="应退金额（元）"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.payAmt ? parsetNumber(scope.row.payAmt) : undefined
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="250"
            prop="during"
            label="费用期间"
          ></el-table-column>
          <el-table-column
            align="center"
            width="180"
            prop="registerDate"
            label="费用登记日"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="belongMonth"
            label="费用所属月"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="operator"
            label="费用登记人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="billDesc"
            label="费用说明"
          ></el-table-column>
          <el-table-column align="center" width="250" label="操作">
            <template slot-scope="scope">
              <el-link
                :underline="false"
                v-if="v.feeType == '预付款'"
                type="primary"
                @click.native="
                  handleAction(
                    '',
                    { types: v.feeType, ...scope.row },
                    '下载账单'
                  )
                "
                >下载账单</el-link
              >
              <el-link
                :underline="false"
                type="warning"
                v-if="v.feeType == '预付款'"
                @click.native="
                  handleAction(
                    '',
                    { types: v.feeType, ...scope.row },
                    '拆分金额'
                  )
                "
                >拆分金额</el-link
              >
              <el-link
                :underline="false"
                type="warning"
                @click.native="
                  handleAction(
                    '',
                    { types: v.feeType, ...scope.row },
                    '修改费用'
                  )
                "
                >修改</el-link
              >
              <el-link
                :underline="false"
                type="danger"
                @click.native="
                  handleAction(
                    '',
                    { types: v.feeType, ...scope.row },
                    '取消理由'
                  )
                "
                >取消</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        :ref="from_type[dialog_cof.title]"
        :model="form_data"
        hide-required-asterisk
        status-icon
      >
        <div v-if="this.dialog_cof.title == '费用登记'">
          <el-row>
            <el-col :span="11">
              <el-form-item class="default" label="长者姓名" prop="name">
                <el-autocomplete
                  v-model="form_data.name"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item
                class="must-fill"
                label="费用科目"
                prop="feeSubject"
                :rules="{
                  required: true,
                  message: '请选择费用科目',
                  trigger: 'blur',
                }"
              >
                <el-select
                  clearable
                  v-model="form_data.feeSubject"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options_fee"
                    :key="item.type"
                    :label="item.desc"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item
                class="must-fill"
                label="账户/费用"
                prop="feeType"
                :rules="{
                  required: true,
                  message: '请选择账户/费用',
                  trigger: 'blur',
                }"
              >
                <el-select
                  clearable
                  v-model="form_data.feeType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options_feeType"
                    :key="item.types"
                    :label="item.desc"
                    :value="item.types"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item
                class="must-fill"
                label="收退区分"
                prop="isPay"
                :rules="{
                  required: true,
                  message: '收退区分',
                  trigger: 'blur',
                }"
              >
                <el-select
                  clearable
                  v-model="form_data.isPay"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options_money"
                    :key="item.types"
                    :label="item.desc"
                    :value="item.types"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item
                class="must-fill"
                label="金额(元)"
                prop="amt"
                :rules="{
                  required: true,
                  message: '请输入金额',
                  trigger: 'blur',
                }"
              >
                <el-input
                  clearable
                  v-model="form_data.amt"
                  @change="getValue('amt', $event)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item class="default" label="说明" prop="rsv">
                <el-input
                  type="textarea"
                  clearable
                  v-model="form_data.desc"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title == '收退费'">
          <el-row>
            <el-col :span="11">
              <el-form-item
                class="default"
                label="收费总额（元）"
                prop="avName"
              >
                <el-input clearable v-model="form_data.avName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item class="must-fill" label="支付方式" prop="avName">
                <el-select
                  clearable
                  v-model="form_data.avType"
                  placeholder="请选择"
                >
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
              <el-form-item
                class="default"
                label="综合账户金额（元）"
                prop="rsv"
              >
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
                <el-input
                  type="textarea"
                  clearable
                  v-model="form_data.rsv"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title == '拆分金额'">
          <el-row>
            <el-col :span="11">
              <el-form-item label="总金额" prop="amount">
                <el-input
                  v-model="form_data.amount"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item
                class="must-fill"
                label="拆分金额1"
                prop="firstAmt"
                :rules="{
                  required: true,
                  message: '请输入拆分金额1',
                  trigger: 'change',
                }"
              >
                <el-input
                  v-model="form_data.firstAmt"
                  @change="getValue('firstAmt', $event)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item class="default" label="拆分金额2" prop="secondAmt">
                <el-input v-model="form_data.secondAmt"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title == '修改费用'">
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item class="default" label="费用期间" prop="during">
                <!-- <el-input v-model="form_data.during"></el-input> -->
                <el-date-picker
                  v-model="form_data.during"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item class="must-fill" label="收退区分" prop="isPay">
                <el-select
                  clearable
                  v-model="form_data.isPay"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options_money"
                    :key="item.types"
                    :label="item.desc"
                    :value="item.types"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                class="must-fill"
                label="应收/应退金额(元)"
                prop="amt"
              >
                <el-input
                  v-model="form_data.amt"
                  @change="getValue('amt', $event)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item class="default" label="费用说明" prop="billDesc">
                <el-input
                  type="textarea"
                  v-model="form_data.billDesc"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item
                class="default"
                label="变更理由"
                prop="changeReason"
              >
                <el-input
                  type="textarea"
                  v-model="form_data.changeReason"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title == '取消费用'">
          <el-row>
            <el-row :gutter="40">
              <el-col :span="24">
                <el-form-item class="default" label="取消理由" prop="rsv">
                  <el-input type="textarea" v-model="form_data.rsv"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
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
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero, parsetNumber } from "@/filters";
import {
  refund_list_detail,
  refound_split,
  all_fee_subject,
  all_fee_add,
  all_fee_update,
  fee_cannel,
} from "@/api/pensionagency/fsm/refund-record";
import { info, from_type } from "@/utils/enum";
import { floatObj } from "@/utils/index";
import { get_elder_all } from "@/api/pensionagency/inLive/index";

export default {
  name: "finance_return_money_detail",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      info,
      from_type,
      table_total: 0,
      table_loading: false,
      table_data: [],
      datas: [],
      options: [],
      options_fee: [],
      status_options: [],
      options_feeType: [],
      options_money: [
        {
          types: "TL",
          desc: "收费",
        },
        {
          types: "RF",
          desc: "退费",
        },
      ],
      timeout: null,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      allmount: 0,
      temp: [],

      ids: "",
      form_data: {
        amt: undefined, //金额
        name: undefined, //长者
        elderId: undefined, //长者id
        feeSubject: undefined, //费用类型
        feeType: undefined, //预付款：P， 费用：F
        isPay: undefined,
        desc: undefined,
        during: undefined, //费用期间,
        changeReason: undefined, //变更理由
        billId: undefined,
        billDesc: undefined, //费用说明
        // 拆分金额
        amount: undefined, //总金额
        billId: undefined, //账单id
        firstAmt: undefined, //拆分金额1,
        secondAmt: undefined, //拆分金额2,
        // 费用登记
      },
    };
  },
  watch: {
    "form_data.feeSubject"(val) {
      this.options_feeType = [];
      if (val === "RD") {
        this.options_feeType = [
          {
            types: "P",
            desc: "预付款",
          },
        ];
      } else {
        this.options_feeType = [
          {
            types: "P",
            desc: "预付款",
          },
          {
            types: "F",
            desc: "费用",
          },
        ];
      }
    },
    // "form_data.firstAmt"(val) {
    //   if (!!val && val <= this.form_data.amount) {
    //     this.form_data.secondAmt = (floatObj().subtract(
    //       this.form_data.amount,
    //       val
    //     ));
    //     this.form_data.firstAmt = val;
    //   } else {
    //     this.form_data.firstAmt = undefined;
    //     this.form_data.secondAmt = undefined;
    //   }
    // },
  },
  methods: {
    formatZero,
    parsetNumber,
    selected(row) {
      this.temp = row;
      this.allmount = row.reduce((pre, cur) => {
        let sum = floatObj().subtract(cur.enterAmt || 0, cur.payAmt || 0);
        return sum >= 0
          ? floatObj().add(pre, Math.abs(sum))
          : floatObj().subtract(pre, Math.abs(sum));
      }, 0);
      this.ids = row
        .map((el) => {
          return el.id;
        })
        .join(",");
    },

    handleAction(st, data, type) {
      let self = this;
      const { enterAmt, id, payAmt } = data;
      switch (type) {
        case "收退费":
          if (self.allmount) {
            if (self.temp[0].types == st) {
              self.datas[data]["sum"] = this.allmount;
              self.datas[data]["ids"] = this.ids;
              self.$router.push({
                path: "/workbench/workbench/finance/entry_details",
                query: {
                  id: self.$route.query.id,
                  allmount: self.datas[data].sum,
                  billIds: self.datas[data].ids,
                },
              });
            } else {
              self.$notify({
                title: "警告",
                message: "请选择账单类型错误",
                type: "warning",
              });
            }
          } else {
            self.$notify({
              title: "警告",
              message: "请选择账单",
              type: "warning",
            });
          }

          break;
        case "拆分金额":
          self.restFrom();
          self.form_data.billId = id;
          self.form_data.amount = this.parsetNumber(enterAmt || payAmt);
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "拆分金额";
          break;
        case "费用登记":
          self.restFrom();
          this.form_data.elderId = this.$route.query.id;
          for (let i of this.restaurants) {
            if (i.elderId == this.form_data.elderId) {
              this.form_data.name = i.elderName;
            }
          }
          self.form_data.amt = undefined;
          self.form_data.isPay = undefined;
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "费用登记";
          break;
        case "修改费用":
          if (data.types === "费用（本月）") {
            self.form_data.billId = data.id;
            self.form_data.amt = data.enterAmt || data.payAmt;
            self.form_data.isPay = data.operateType;
            self.form_data.during = data.during
              ? data.during.split("~")
              : undefined;
            self.form_data.changeReason = data.changeReason;
            self.form_data.billDesc = data.billDesc;
            self.dialog_cof.visible = true;
            self.dialog_cof.title = "修改费用";
          } else {
            this.$notify({
              type: "warning",
              message: "往期预付款和费用不能修改!",
              title: "警告",
            });
          }
          break;
        case "取消理由":
          if (data.types === "费用（本月）") {
            self.restFrom();
            self.form_data.billId = data.id;
            self.dialog_cof.visible = true;
            self.dialog_cof.title = "取消费用";
          } else {
            this.$notify({
              type: "warning",
              message: "往期预付款和费用不能取消!",
              title: "警告",
            });
          }

          break;
        default:
          break;
      }
    },

    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 300 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.elderName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.form_data.elderId = item.elderId;
    },
    getValue(key, e) {
      this.form_data[key] = this.parsetNumber(e);

      if (key === "firstAmt") {
        if (this.form_data.firstAmt <= this.form_data.amount) {
          this.form_data.secondAmt = this.parsetNumber(
            floatObj().subtract(this.form_data.amount, this.form_data[key])
          );
        }
      }
    },
    handleSubmit() {
      var self = this;
      self.$refs[this.from_type[self.dialog_cof.title]].validate((isvaild) => {
        if (isvaild) {
          const action_type = {
            费用登记: () => {
              self.feeLogin();
            },
            拆分金额: () => {
              self.splitAction();
            },
            修改费用: () => {
              self.updateFee();
            },
            取消费用: () => {
              self.exitFee();
            },
          };
          action_type[self.dialog_cof.title]();
        }
      });
    },
    splitAction() {
      refound_split(this.form_data).then((res) => {
        this.$notify({
          type: "success",
          message: "操作成功!",
          title: "成功",
        });
        this.$refs[this.from_type[this.dialog_cof.title]].clearValidate();
        this.$nextTick(() => {
          this.restFrom();
          this.getDetail();
        });
      });
    },
    //费用登记；
    feeLogin() {
      all_fee_add(this.form_data).then((res) => {
        this.$notify({
          type: "success",
          message: "操作成功!",
          title: "成功",
        });
        this.$refs[this.from_type[this.dialog_cof.title]].clearValidate();
        this.$nextTick(() => {
          this.restFrom();
          this.getDetail();
        });
      });
    },

    // 修改费用
    updateFee() {
      all_fee_update({
        ...this.form_data,
        during: this.form_data.during
          ? this.form_data.during.join("~")
          : undefined,
      }).then((res) => {
        this.$notify({
          type: "success",
          message: "操作成功!",
          title: "成功",
        });
        this.$refs[this.from_type[this.dialog_cof.title]].clearValidate();
        this.$nextTick(() => {
          this.restFrom();
          this.getDetail();
        });
      });
    },
    // 取消费用
    exitFee() {
      fee_cannel(this.form_data).then((res) => {
        this.$notify({
          type: "success",
          message: "操作成功!",
          title: "成功",
        });
        this.$refs[this.from_type[this.dialog_cof.title]].clearValidate();
        this.$nextTick(() => {
          this.restFrom();
          this.getDetail();
        });
      });
    },
    restFrom() {
      this.form_data = {
        // 拆分金额
        amt: undefined, //金额
        name: undefined, //长者
        elderId: undefined, //长者id
        feeSubject: undefined, //费用类型
        feeType: undefined, //预付款：P， 费用：F
        isPay: undefined,
        desc: undefined,
        during: undefined, //费用期间,
        changeReason: undefined, //变更理由
        billId: undefined,
        billDesc: undefined, //费用说明
        // 拆分金额
        amount: undefined, //总金额
        billId: undefined, //账单id
        firstAmt: undefined, //拆分金额1,
        secondAmt: undefined, //拆分金额2,
        // 费用登记
      };
      this.dialog_cof.visible = false;
    },
    getDetail() {
      refund_list_detail({
        elderId: this.$route.query.id,
      }).then((res) => {
        this.datas =
          res.map((el) => {
            el.sum = 0;
            el.ids = undefined;
            el.billInfos.map((x) => {
              x.types = el.feeType;
              return x;
            });
            return el;
          }) ?? [];
      });
    },
    feeSubject() {
      all_fee_subject().then((res) => {
        this.options_fee = res;
      });
    },
    getOlder() {
      get_elder_all().then((res) => {
        this.restaurants = res.map((el) => {
          el.value = el.elderName;
          return el;
        });
      });
    },
  },
  mounted() {
    this.getOlder();
    this.getDetail();
    this.feeSubject();
    this.allmount = 0;
    this.ids = "";
  },
  activated() {
    this.getOlder();
    this.getDetail();
    this.feeSubject();
    this.allmount = 0;
    this.ids = "";
  },
};
</script>
<style lang='scss' scoped>
.btn_pic {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -3px;
  }
}
.num {
  display: inline-block;
  height: 42px;
  line-height: 42px;
}
.card_wapper {
  position: relative;
  background-color: #fff;
  padding: 24px 0 0 24px;
  margin-bottom: -20px;
  font-weight: 600;
  .title1 {
    position: absolute;
    top: 52%;
    left: 92px;
    transform: translate(-50%, 0);
    color: #fe3d65;
    font-size: 16px;
  }
  .value1 {
    position: absolute;
    top: 48%;
    left: 10.4%;
    transform: translate(-50%, 0);

    font-size: 22px;
    color: #fe3d65;
  }
  .title2 {
    position: absolute;
    top: 52%;
    left: 454px;
    transform: translate(-50%, 0);
    color: #ff6c10;
    font-size: 16px;
  }
  .value2 {
    position: absolute;
    top: 48%;
    left: 31%;
    transform: translate(-50%, 0);
    font-size: 22px;
    color: #ff6c10;
  }
}
</style>
<!-- 
 * @description:费用统计 
 * @fileName: cost_sum.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-08 18:36:35
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class>
      <basic-info-table></basic-info-table>
    </div>
    <div class="container_card">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="title" style="margin: 20px 0">
            <span class="must-fill"> 账户明细 </span>
          </div>
          <div class="table">
            <el-col
              :span="6"
              v-for="(v, i) in table_data_one"
              :key="i"
              class="table_cent"
              style="text-align: center"
            >
              <p class="major_text">{{ v.name }}</p>
              <p class="small_money">{{ v.money }}</p>
            </el-col>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="title" style="margin: 20px 0">
            <span class="must-fill"> 充值明细 </span>
          </div>
          <el-form
            :inline="true"
            label-position="top"
            :model="form_data"
            ref="form"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="转出账户"
                  prop="outAccType"
                  :rules="{
                    required: true,
                    message: '请选择转出账户',
                    trigger: 'blur',
                  }"
                >
                  <el-select v-model="form_data.outAccType">
                    <el-option
                      v-for="item in status_options"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="转入账户"
                  prop="inAccType"
                  :rules="{
                    required: true,
                    message: '请选择转入账户',
                    trigger: 'blur',
                  }"
                >
                  <el-select v-model="form_data.inAccType">
                    <el-option
                      v-for="item in status_options"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="余额">
                  <el-input
                    v-model="form_data.money1"
                    style="width: 270px"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="转出金额"
                  prop="amt"
                  :rules="{
                    required: true,
                    message: '请选择转入账户',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    v-model="form_data.amt"
                    style="width: 270px"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    @change="getValue"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>

      <div class="footer">
        <el-button type="primary" @click="handleSubmit">确认转帐</el-button>
      </div>
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
import { elderId_bill_trans } from "@/api/pensionagency/fsm/elder_account_info";
export default {
  name: "entry_details",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_total: 0,
      table_loading: false,
      table_data_one: [],

      cur_tag: {
        name: "充值",
        components: "Prepaid",
      },
      options: [],

      status_options: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      form_data: {
        elderId: undefined,
        inAccType: undefined,
        outAccType: undefined,
        amt: undefined,
        money1: "",
      },
    };
  },
  watch: {
    "form_data.outAccType"(val) {
      if (!!val) {
        this.table_data_one.forEach((e) => {
          if (val == e.type) {
            this.form_data.money1 = e.money;
          }
        });
      }
    },

    "form_data.inAccType"(val) {
      if (!!val) {
        if (val !== this.form_data.outAccType) {
          this.form_data.inAccType = val;
        } else {
          this.form_data.inAccType = undefined;
          this.$notify({
            type: "warning",
            message: "相同账户不能相互转账",
            title: "警告",
          });
        }
      }
    },

    "form_data.amt"(val) {
      if (!!val && val === 0) {
        if (Number(val) > Number(this.form_data.money1)) {
          this.form_data.amt = 0;
          this.$notify({
            title: "警告",
            type: "warning",
            message: "转款数不能超过余额",
          });
        } else {
          this.form_data.amt = val;
        }
      }
    },
  },
  methods: {
    formatZero,
    parsetNumber,
    handleSubmit() {
      this.$refs["form"].validate((isvaild) => {
        if (isvaild) {
          elderId_bill_trans(this.form_data).then((res) => {
            this.$notify({
              type: "success",
              message: "转账成功!",
              title: "成功",
            });
            this.$nextTick(() => {
              this.$refs["form"].clearValidate();
              this.form_data = {
                inAccType: undefined,
                outAccType: undefined,
                amt: undefined,
                money1: "",
              };
              this.$router.go(-1);
            });
          });
        }
      });
    },
    getValue(e) {
      this.form_data.amt = this.parsetNumber(e);
    },
    initData() {
      this.table_data_one = this.$route.query.info
        ? JSON.parse(this.$route.query.info).map((el) => {
            el.amt1 = 0;
            el.amt = undefined;
            el.withdrawDesc = undefined;
            el.accountType = el.type;
            return el;
          })
        : [];
      this.status_options = this.table_data_one.map((el) => {
        return {
          desc: el.name,
          type: el.type,
        };
      });
    },
  },
  mounted() {
    this.form_data.elderId = this.$route.query.id;
    this.initData();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 42px;
  line-height: 42px;
}
.text {
  height: 52px;
}
.table {
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
}
</style>
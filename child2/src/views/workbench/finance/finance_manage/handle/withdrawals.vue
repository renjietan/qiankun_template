<!-- 
 * @description: 取款
 * @fileName: withdrawals.vue 
 * @author: 王文涛 
 * @date: 2021-11-16 15:29:10
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
                <el-form-item label="取款总金额(元)">
                  <el-input
                    v-model="flt.allAmt"
                    style="width: 270px"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span style="font-weight: bold; color: red">取款明细*</span>
            <el-table
              style="margin-top: 12px"
              class="table_data"
              border
              ref="table_data"
              :data="table_data"
              v-loading="table_loading"
              highlight-current-row
              fit
            >
              <el-table-column align="left" width="80" label="序号">
                <template slot-scope="scope">
                  <span :style="{ color: $variables.baseColor }" class="num">
                    {{ formatZero(scope.$index + 1, 2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="账户" prop="name">
              </el-table-column>
              <el-table-column align="center" prop="money" label="余额">
              </el-table-column>
              <el-table-column align="center" label="取款金额">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amt1"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    :maxlength="12"
                    @change="getValue(scope.$index, $event)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="说明">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.withdrawDesc"
                    :maxlength="100"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">确认取款</el-button>
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
import { floatObj } from "@/utils/index";
import { elderId_bill_withdraw } from "@/api/pensionagency/fsm/elder_account_info";

export default {
  name: "entry_details",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        elderId: undefined,
        allAmt: 0,
        withdrawInfos: [],
      },
      table_loading: false,
      table_data: [],
    };
  },
  methods: {
    formatZero,
    parsetNumber,
    initData() {
      this.table_data = this.$route.query.info
        ? JSON.parse(this.$route.query.info).map((el) => {
            el.amt1 = 0;
            el.amt = undefined;
            el.withdrawDesc = undefined;
            el.accountType = el.type;
            return el;
          })
        : [];
    },

    getValue(i, val) {
      if (this.isMoney(val, this.table_data[i].money)) {
        this.table_data[i].amt1 = this.table_data[i].amt1
          ? this.parsetNumber(parseFloat(val))
          : undefined;
        this.table_data[i].amt = this.table_data[i].amt1;
      } else {
        this.table_data[i].amt1 = 0;
        this.table_data[i].amt = this.table_data[i].amt1;
        this.$notify({
          type: "warning",
          title: "警告",
          message: "取款数不能超过余额",
        });
      }

      this.flt.allAmt = this.table_data.reduce((pre, cur) => {
        return floatObj().add(pre, cur.amt1);
      }, 0);
    },
    isMoney(a, b) {
      return Number(a) <= Number(b) ? true : false;
    },
    handleSubmit() {
      elderId_bill_withdraw({
        ...this.flt,
        withdrawInfos: this.table_data.filter((el) => {
          return el.amt1;
        }),
      }).then((res) => {
          this.$confirm("取款成功!,请到收退费页面确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          }).then((res) => {
            this.$router.push("/workbench/workbench/finance/return_money_mg");
          });
      });
    },
  },
  mounted() {
    this.flt.elderId = this.$route.query.id;
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
</style>
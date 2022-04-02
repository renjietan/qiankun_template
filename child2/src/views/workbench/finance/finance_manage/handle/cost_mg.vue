<!-- 
 * @description:账户充值 
 * @fileName:cost_mg.vue 
 * @author: 王文涛 
 * @date: 2021-08-31 20:00:14
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class>
      <basic-info-table :olderInfo="$route.query.id"></basic-info-table>
    </div>
    <div class="container_card" style="min-height: 600px">
      <el-form :inline="true" label-position="top">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="6">
                <el-form-item label="充值总金额">
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
      </el-form>
      <div class="title" style="margin: 20px 0">
        <span class="must-fill"> 充值明细 </span>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        highlight-current-row
        fit
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="left" width="80" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          width="150"
          prop="name"
          label="账户"
        ></el-table-column>
        <el-table-column align="left" width="240" prop="money" label="金额(元)">
        </el-table-column>
        <el-table-column align="left" width="240" label="充值金额(元)">
          <template slot-scope="scope">
            <el-input
              type="text"
              v-model="scope.row.rechargeAmt"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              :maxlength="12"
              @change="getValue"
            />
          </template>
        </el-table-column>

        <el-table-column align="left" label="说明">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.desc" :maxlength="100" />
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-button type="primary" @click="handleSubmit">确认充值</el-button>
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
import { recharge } from "@/api/pensionagency/fsm/elder_account_info";
import { floatObj } from "@/utils/index";
import CodeMirror from "codemirror";
import { mySite } from "@/utils/city";
import { constadoption_type_list } from "@/utils/enum";
export default {
  name: "entry_details",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        elderId: undefined,
        allAmt: 0,
        recharges: [],
      },

      table_loading: false,
      table_data: [],
    };
  },

  methods: {
    formatZero,
    parsetNumber,
    getValue(val) {
      this.table_data.forEach((el) => {
        if (el.rechargeAmt == val) {
          el.rechargeAmt = el.rechargeAmt
            ? this.parsetNumber(parseFloat(val))
            : 0;
        }
      });
      this.flt.allAmt = this.parsetNumber(
        this.table_data.reduce((pre, cur) => {
          return floatObj().add(pre, cur.rechargeAmt);
        }, 0)
      );
    },
    initData() {
      this.table_data = this.$route.query.info
        ? JSON.parse(this.$route.query.info).map((el) => {
            el.rechargeAmt = 0;
            el.desc = undefined;
            return el;
          })
        : [];
    },
    handleSubmit() {
      if (this.flt.allAmt !== 0) {
        this.flt.recharges = this.table_data
          .map((el) => {
            el.rechargeAmt = Number(el.rechargeAmt);
            return el;
          })
          .filter((x) => {
            return x.rechargeAmt;
          });
        recharge(this.flt).then((res) => {
          this.$confirm("充值成功!,请到收退费页面确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          }).then((res) => {
            this.$router.push("./return_money_mg");
          });
        });
      } else {
        this.$notify({
          type: "warning",
          message: "请输入金额",
          title: "警告",
        });
      }
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
  height: 52px;
  line-height: 52px;
}
</style>
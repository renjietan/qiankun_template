<!-- 
 * @description:支付详情 
 * @fileName: billing_details.vue 
 * @author: 王文涛 
 * @date: 2021-09-11 11:48:11
 * @后台人员:  
!-->
<template>
  <div class="container" style="min-height: calc(100vh - 75px)">
    <div class style="background-color: #fff">
      <basic-info-table></basic-info-table>
    </div>
    <div class="container_card">
      <el-form :inline="true" label-position="top">
        <el-row>
          <el-col :span="14">
            <el-row>
              <el-col :span="6">
                <el-form-item label="单据号">
                  <el-input
                    disabled
                    v-model="baseInfo.dno"
                    style="width: 220px"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="金额">
                  <el-input
                    disabled
                    v-model="baseInfo.allAmt"
                    style="width: 220px"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经办人">
                  <el-input
                    disabled
                    v-model="baseInfo.operator"
                    style="width: 220px"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="操作时间">
                  <el-input
                    disabled
                    v-model="baseInfo.operateDate"
                    style="width: 220px"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="说明">
                  <el-input
                    disabled
                    v-model="baseInfo.refundDesc"
                    style="width: 271%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10" style="text-align: right; margin-top: 40px">
            <div style="display: inline-block">
              <el-button
                type="success"
                icon="el-icon-upload2"
                @click="handleAction('', '导出')"
                >导出</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-printer"
                @click="handleAction('', '打印')"
                >打印收缴单费</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div v-for="(item, index) in detail" :key="index">
        <div class="title" style="margin: 20px 0">
          <span
            >收费明细<span v-if="item.length > 0"
              >({{ info[item[0].accountType] }})</span
            ></span
          >
        </div>
        <el-table
          class="table_data"
          border
          ref="table_data"
          :data="item"
          :key="index"
          v-loading="table_loading"
          highlight-current-row
          fit
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                class="table_data"
                ref="table_data"
                :data="props.row.billDetails"
                v-loading="table_loading"
                highlight-current-row
                fit
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="left" width="80" label="序号">
                  <template slot-scope="scope">
                    <span :style="{ color: $variables.baseColor }">
                      {{ formatZero(scope.$index + 1, 2) }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="left"
                  prop="feeSubject"
                  label="费用科目"
                ></el-table-column>
                <el-table-column align="left" width="140" label="预付款/费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.feeType === 'P'">预付款</span>
                  </template>
                </el-table-column>
                <el-table-column align="left" label="实收金额（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.enterAmt?parsetNumber(scope.row.enterAmt): undefined}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  width="180"
                  label="实退金额（元）"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.payAmt?parsetNumber(scope.row.payAmt) :undefined }}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column align="left" width="180" label="修改实收金额">
                  <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.updateMoney" />
                  </template>
                </el-table-column>
                <el-table-column align="left" width="180" label="修改实退金额">
                  <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.updateMoney2" />
                  </template>
                </el-table-column> -->
                <el-table-column
                  align="left"
                  prop="during"
                  label="费用期间"
                ></el-table-column>
                <el-table-column
                  align="left"
                  prop="belongMonth"
                  label="费用所属月"
                ></el-table-column>
                <el-table-column
                  align="left"
                  prop="registerDate"
                  label="费用登记日"
                ></el-table-column>
                <el-table-column
                  align="left"
                  prop="remark"
                  label="费用说明"
                ></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="left" width="80" label="序号">
            <template slot-scope="scope">
              <span :style="{ color: $variables.baseColor }">
                {{ formatZero(scope.$index + 1, 2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            prop="feeSubject"
            label="费用科目"
          ></el-table-column>
          <el-table-column
            align="left"
          
            prop="enterAmt"
            label="实收金额（元）"
          >
            <template slot-scope="scope">
              <span>{{scope.row.enterAmt?parsetNumber(scope.row.enterAmt):undefined }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left"  label="实退金额（元）">
            <template slot-scope="scope">
              <span>{{scope.row.payAmt?parsetNumber(scope.row.payAmt):undefined }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="left" width="180" label="修改实收金额">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.updateMoneys" />
            </template>
          </el-table-column>
          <el-table-column align="left" width="180" label="修改实退金额">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.updateMoney2" />
            </template>
          </el-table-column> -->
          <el-table-column
            align="left"
            width="180"
            prop="during"
            label="费用期间"
          ></el-table-column>
          <el-table-column
            align="left"
            width="180"
            prop="belongMonth"
            label="费用所属月"
          ></el-table-column>
          <el-table-column
            align="left"
            width="180"
            prop="registerDate"
            label="费用登记日"
          ></el-table-column>
          <el-table-column
            align="left"
            width="228"
            prop="operator"
            label="费用登记人"
          ></el-table-column>
          <el-table-column
            align="left"
            width="228"
            prop="billDesc"
            label="费用说明"
          ></el-table-column>
        </el-table>
      </div>

      <div class="title" style="margin: 20px 0">
        <span>支付方式</span>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="baseInfo.payDetails"
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
        <el-table-column
          align="left"
          prop="payType"
          label="支付方式"
        ></el-table-column>
        <el-table-column align="left" label="账户操作类型">
          <template slot-scope="scope">
            <span v-if="scope.row.isPay == 1">收费</span>
            <span v-else>退费</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="amount" label="金额">
          <template slot-scope="scope">
            <span>{{ parsetNumber(scope.row.amount) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="footer">
        <el-button type="primary" @click="handleSubmit">保存修改</el-button>
      </div> -->
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
import { elderId_bill } from "@/api/pensionagency/fsm/elder_account_info";
import { info } from "@/utils/enum";
import { floatObj } from "@/utils/index";

export default {
  name: "billing_details",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      info,
      value1: "",
      flt: {},
      options_status: [],
      table_total: 1,
      table_loading: false,
      options: [],
      status_options: [],
      rules: {},
      baseInfo: {},
      detail: null,
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
        default:
          break;
      }
    },
    getData() {
      const { billId } = this.$route.query;
      elderId_bill({ billId }).then((res) => {
        res.allAmt = this.parsetNumber(res.allAmt || 0);
        this.baseInfo = res ?? null;

        this.detail = this.baseInfo.billInfoMap
          ? Object.values(this.baseInfo.billInfoMap)
          : [];
      });
    },

    handleSubmit() {
      console.log(this.detail);
    },
  },
  mounted() {
    this.getData();
  },
  activated() {
    this.getData();
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
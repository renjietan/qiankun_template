<!-- 
 * @description:账户明细 
 * @fileName: finance_detail.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-09 16:52:25
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 25px 0">
        <div
          v-for="(item, index) in tags"
          @click="handle_switchModel(item)"
          :key="index"
        >
          <span
            :class="[
              'crumbs_font',
              cur_tag.name == item.name ? 'crumbs_font_active' : '',
            ]"
            >{{ item.name }}({{ item.money }})</span
          >
          <span class="crumbs_sprit">/</span>
        </div>
      </div>
      <div>
        <div>
          <el-form :inline="true" label-position="top">
            <el-row>
              <el-col :span="21">
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="账户操作类型">
                      <el-select
                        v-model="flt.operateType"
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in status_options"
                          :key="item.type"
                          :label="item.desc"
                          :value="item.type"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="账户操作时间">
                      <el-date-picker
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        v-model="time"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="3" style="text-align: right">
                <div style="display: inline-block; margin-left: 10px">
                  <el-button type="primary" @click="getList">查询</el-button>
                  <el-button @click="resetdata">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <div class="title" style="margin-bottom: 20px">
            <span>账户明细表</span>
            <div style="display: inline-block">
              <el-button type="primary" @click="handleAction('', '充值')">
                <span class="btn_pic">
                  <img class="pic" src="~@/assets/images/AJFR/chongzhi.png" />充值
                </span>
              </el-button>
              <el-button type="warning" @click="handleAction('', '转账')">
                <span class="btn_pic">
                  <img class="pic" src="~@/assets/images/AJFR/qukuan.png" />转账
                </span>
              </el-button>
              <el-button type="warning" @click="handleAction('', '取款')">
                <span class="btn_pic">
                  <img class="pic" src="~@/assets/images/AJFR/qukuan.png" />取款
                </span>
              </el-button>
              <el-button type="primary" @click="handleAction('', '付款计划')">
                <span class="btn_pic">
                  <img
                    class="pic"
                    src="~@/assets/images/AJFR/fee_plan.png"
                  />付款计划
                </span>
              </el-button>
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
                >打印</el-button
              >
            </div>
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
            <el-table-column align="center" width="80" label="序号">
              <template slot-scope="scope">
                <span :style="{ color: $variables.baseColor }" class="num">
                  {{ formatZero(scope.$index + 1, 2) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
            width="180"
              prop="finishTime"
              label="时间"
            ></el-table-column>
            <el-table-column
              align="center"
              width="120"
              prop="operateType"
              label="账户操作类型"
            ></el-table-column>
            <el-table-column align="center" width="130" label="入账金额（元）">
              <template slot-scope="scope">
                <span>{{scope.row.enterAmt ? parsetNumber(scope.row.enterAmt):undefined }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="出账金额（元）">
              <template slot-scope="scope">
                <span>{{ scope.row.payAmt ? parsetNumber(scope.row.payAmt): undefined }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="200"
           
              label="余额（元）"
            >
             <template slot-scope="scope">
                <span>{{scope.row.balance?parsetNumber(scope.row.balance):undefined}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="200"
              prop="operator"
              label="经办人"
            ></el-table-column>
            <el-table-column
              align="left"
              width="558"
              prop="billDesc"
              label="说明"
            ></el-table-column>
            <el-table-column align="left" label="操作">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  type="primary"
                  @click.native="handleAction(scope.row, '支付详情')"
                  >支付详情</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="table_total > 0"
            :total="table_total"
            @pagination="getList"
            :page.sync="flt.pageNum"
            :limit.sync="flt.pageSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero, parsetNumber } from "@/filters";
import { elderId_detail,operate_type } from "@/api/pensionagency/fsm/elder_account_info";
import {} from "@/utils/validate";
export default {
  name: "finance_detail",
  components: {
    Pagination,
    BasicInfoTable,
  },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      tags: [],
      time: null,
      flt: {
        accountType: "CM",
        operateType: undefined,
        pageNum: 1,
        pageSize: 10,
        startTime: undefined,
        endTime: undefined,
      },
      elderId: null,
      table_loading: false,
      table_data: [],
      table_total: 0,
      cur_tag: {},
      form_data: {},
      rules: {},
      status_options: [
      
      ],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
    };
  },
  methods: {
    formatZero,
    parsetNumber,
    initData() {
      const { info } = this.$route.query;
      this.tags = JSON.parse(info);
      this.cur_tag = this.tags[0];
      this.getList();
    },
    handle_switchModel(val) {
      this.cur_tag = val;
      this.flt.accountType = this.cur_tag.type;
      this.getList();
    },
    resetdata() {
      this.flt.accountType = this.cur_tag.type;
      this.flt.operateType = undefined;
      this.flt.pageNum = 1;
      this.time = null;
      this.pageSize = 10;
      this.getList();
    },
    getList() {
      this.table_loading = true;
      elderId_detail({
        ...this.flt,
        elderId: this.$route.query.id,
        startTime: this.time ? this.time[0] : undefined,
        endTime: this.time ? this.time[1] : undefined,
      }).then((res) => {
        this.table_loading = false;
        this.table_data = res ? res.result : [];
        this.table_total = res ? res.totalCount : 0;
      });
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "充值":
          self.$router.push({
            path: "/workbench/workbench/finance/cost_mg",
            query: {
              id: self.$route.query.id,
              info: self.$route.query.info,
            },
          });
          break;
        case "转账":
          self.$router.push({
            path: "/workbench/workbench/finance/cost_sum",
            query: {
              id: self.$route.query.id,
              info: self.$route.query.info,
            },
          });
          break;
        case "取款":
          self.$router.push({
            path: "/workbench/workbench/finance/handle/withdrawals",
            query: {
              id: self.$route.query.id,
              info: self.$route.query.info,
            },
          });
          break;
        case "付款计划":
          self.$router.push({
            path: "/workbench/workbench/finance/handle/pay_play",
            query: {
              id: self.$route.query.id,
            },
          });
          break;
        case "支付详情":
          self.$router.push({
            path: "/workbench/workbench/finance/billing_details",
            query: {
              id: self.$route.query.id,
              billId: data.id,
            },
          });
          break;
        default:
          break;
      }
    },
    allType(){
      operate_type().then(res=>{
        this.status_options = res?res:[];
      })
    }
  },

  mounted() {
    this.initData();
    this.allType();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 42px;
  line-height: 42px;
}
.el-tag-box {
  display: inline-block;
  padding-bottom: 30px;
  & .el-tag-cst {
    margin: 0 17px 0 0px;
    cursor: pointer;
  }

  & .el-tag-box-border {
    height: 15px;
  }
}
</style>
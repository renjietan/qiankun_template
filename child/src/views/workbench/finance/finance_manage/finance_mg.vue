<!-- 
 * @description:账户管理 
 * @fileName: finance_mg.vue 
 * @author: 王文涛 
 * @date: 2021-09-08 18:33:22
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名/床位：">
                  <el-input
                    clearable
                    v-model="flt.nameOrBed"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="长者状态：">
                  <el-select
                    v-model="flt.liveStatus"
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
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="rest_data">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>账户管理</span>
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
            <span :style="{ color: $variables.baseColor }">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="name" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="elderName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="床位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="contractTypeDesc"
          label="合同类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="statusDesc"
          label="长者状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="composite"
          label="综合账户（元）"
        >
        <template slot-scope="scope">
           <span>{{parsetNumber(scope.row.composite)}}</span>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="addValue"
          label="增值账户（元）"
        >
         <template slot-scope="scope">
           <span>{{scope.row.addValue?parsetNumber(scope.row.addValue):undefined}}</span>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          prop="medicalSpare"
          label="医疗备用金（元）"
        >
         <template slot-scope="scope">
           <span>{{scope.row.medicalSpare?parsetNumber(scope.row.medicalSpare):undefined}}</span>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deposit"
          label="押金账户（元）"
        >
         <template slot-scope="scope">
           <span>{{scope.row.deposit?parsetNumber(scope.row.deposit):undefined}}</span>
        </template>
        </el-table-column>
        <el-table-column align="left" width="400" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '账户明细')"
              >账户明细</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '付款计划')"
              >付款计划</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleAction(scope.row, '充值')"
              >充值</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleAction(scope.row, '转账')"
              >转账</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleAction(scope.row, '给他人转账')"
              >转账到他人</el-link
            >
            <el-link
              type="danger"
              @click="handleAction(scope.row, '取款')"
              :underline="false"
              >取款</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero,parsetNumber } from "@/filters";
import {} from "@/utils/validate";
import { batch } from "@/api/pensionagency/fsm/elder_account_info";
import { getStatus } from "@/api/pensionagency/inLive/inLeve_temp";
export default {
  name: "finance_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        liveStatus: undefined,
        nameOrBed: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      table_total: 0,
      table_loading: false,
      table_data: [],
      options: [],
      status_options: [],
    };
  },
  methods: {
    formatZero,
    parsetNumber,
    // 获取列表数据

    getList() {
      this.table_loading = true;
      batch(this.flt).then((res) => {
        this.table_loading = false;
        this.table_data = res
          ? res.result.map((el) => {
              el.addValue = el.addValue ?? 0;
              el.composite = el.composite ?? 0;
              el.deposit = el.deposit ?? 0;
              el.medicalSpare = el.medicalSpare ?? 0;
              return el;
            })
          : [];
        this.table_total = res ? res.totalCount : 0;
      });
    },
    rest_data() {
      this.flt.liveStatus = undefined;
      this.flt.nameOrBed = undefined;
      this.flt.pageNum = 1;
      this.flt.pageSize = 10;
      this.getList();
    },
    getStatus() {
      getStatus().then((res) => {
        this.status_options = res ?? [];
      });
    },
    handleAction(data, type) {
      let self = this;
      const info = [
        {
          type: "CM",
          name: "综合账户",
          money: this.parsetNumber(data.composite),
         
        },
        {
          type: "AV",
          name: "增值账户",
          money: this.parsetNumber(data.addValue),
         
        },
        {
          type: "MS",
          name: "医疗备用金",
          money: this.parsetNumber(data.medicalSpare),
          
        },
        {
          type: "DE",
          name: "押金账户",
          money: this.parsetNumber(data.deposit),
         
        },
      ];
      switch (type) {
        case "账户明细":
          self.$router.push({
            path: "/workbench/workbench/finance/finance_detail",
            query: {
              id: data.elderId,
              info: JSON.stringify(info),
            },
          });
          break;
        case "充值":
          self.$router.push({
            path: "/workbench/workbench/finance/cost_mg",
            query: {
              id: data.elderId,
              info: JSON.stringify(info),
            },
          });
          break;
        case "付款计划":
          self.$router.push({
            path: "/workbench/workbench/finance/handle/pay_play",
            query: {
              id: data.elderId,
            },
          });
          break;
        case "转账":
          self.$router.push({
            path: "/workbench/workbench/finance/cost_sum",
            query: {
              id: data.elderId,
              info: JSON.stringify(info),
            },
          });
          break;
        case "给他人转账":
          self.$router.push({
            path: "/workbench/workbench/finance/handle/transfer_other",
            query: {
              id: data.elderId,
              elderName:data.elderName,
              info: JSON.stringify(info),
            },
          });
          break;
        case "取款":
          self.$router.push({
            path: "/workbench/workbench/finance/handle/withdrawals",
            query: {
              id: data.elderId,
              info: JSON.stringify(info),
            },
          });
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getList();
    this.getStatus();
  },
};
</script>
<style lang='scss' scoped>
.btn_pic {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.5px;
  }
}
</style>
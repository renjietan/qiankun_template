<!-- 
 * @description: 入住办理一览
 * @fileName: goLive_browse.vue 
* @author: 谭人杰 
 * @date: 2021-05-16 22:57:29
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="4">
                <el-form-item
                  class="filter"
                  label="姓名："
                  style="height: 30px"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="flt.elderName"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item class="filter" label="证件号码：">
                  <el-input
                    placeholder="请输入"
                    v-model="flt.papersCode"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="margin-left: 30px">
                <el-form-item class="filter" label="床位：">
                  <el-input
                    placeholder="请输入"
                    v-model="flt.bedName"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item class="filter" label="办理状态：">
                  <el-select v-model="flt.processCode">
                    <el-option
                      v-for="item in options_status"
                      :key="item.code"
                      :label="item.desc"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left: 30px">
                <el-form-item class="filter" label="申请日期：">
                  <el-date-picker
                    v-model="flt.timeSoon"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="创建开始时间"
                    end-placeholder="创建结束时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')"
                >查询</el-button
              >
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 过滤栏结束 @date:2021-05-26 18:13:33 @author: 谭人杰 !-->

    <!-- 表格开始 @date:2021-05-26 18:13:46 @author: 谭人杰 !-->
    <div class="container_card">
      <div class="title" style="margin-bottom: 15px">
        <div>入住办理一览</div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleClick('', '入住申请')"
          >入住申请
        </el-button>
      </div>
      <el-table
        border
        class="table_data"
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
      >
        <el-table-column
          align="center"
          width="60"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column align="center" width="80" prop="headUrl" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
              :preview-src-list="[]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="elderName"
          show-overflow-tooltip
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          show-overflow-tooltip
          width="110"
          label="床位"
        ></el-table-column>
        <el-table-column align="center" width="55" label="性别">
          <template slot-scope="scope">{{
            scope.row.sex == 0 ? "男" : "女"
          }}</template>
        </el-table-column>
        <el-table-column align="center" width="55" label="年龄">
          <template slot-scope="scope">{{ scope.row.age }}</template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="papersCode"
          width="192"
          label="证件号码"
        ></el-table-column>
        <el-table-column align="center" width="130" label="申请日期">
          <template slot-scope="scope">
            <span>{{ parseDate(scope.row.applyDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入住申请" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.applyStatus == 0"></div>
            <div v-if="scope.row.applyStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
            <div v-if="scope.row.step == 1">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '入住申请')"
                >待办</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入住体检" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == '2'">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '入住体检')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.exmStatus == '0'"></div>

            <div v-if="scope.row.exmStatus == '1'">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="能力评估" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == '3'">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '能力评估')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.abcStatus == '0'"></div>

            <div v-if="scope.row.abcStatus == '1'">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="定制服务" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 4">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '定制服务')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.serviceStatus == 0"></div>

            <div v-if="scope.row.serviceStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="付款计划" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 5">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '付款计划')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.planStatus == 0"></div>

            <div v-if="scope.row.planStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入住审核" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 6">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '入住审核')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.auditStatus == 0"></div>

            <div v-if="scope.row.auditStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="签订合同" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 7">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '签订合同')"
                >待办</el-button
              >
            </div>

            <div v-if="scope.row.contractStatus == 0"></div>
            <div v-if="scope.row.contractStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入住收费" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 8">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '入住收费')"
                >待办</el-button
              >
            </div>
            <div v-if="scope.row.payStatus == 0"></div>

            <div v-if="scope.row.payStatus == 1">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="办理入住" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.step == 9">
              <el-button
                :disabled="scope.row.processStatus === 'P' ? 'disabled' : false"
                :type="scope.row.processStatus === 'P' ? 'info' : 'warning'"
                plain
                size="small"
                @click="handleClick(scope.row, '办理入住')"
                >待办</el-button
              >
            </div>

            <div v-if="scope.row.handleStatus == '0'">
              <span style="color: #fb9d55"></span>
            </div>
            <div v-if="scope.row.handleStatus == '1'">
              <i
                class="el-icon-circle-check"
                style="color: #40c397; font-size: 20px"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" width="230" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '详情')"
              >详情</el-link
            >
            <el-link
              :underline="false"
              v-if="scope.row.processStatus === 'N' && scope.row.step < 8"
              :type="scope.row.step == 1 ? 'default' : 'warning'"
              :disabled="scope.row.step == 1 ? 'disabled' : false"
              @click="handle(scope.row, '终止办理')"
              >终止办理</el-link
            >
            <el-link
              :underline="false"
              v-if="scope.row.processStatus === 'P'"
              type="primary"
              @click="handle(scope.row, '恢复办理')"
              >恢复办理</el-link
            >
            <el-link
              :underline="false"
              type="danger"
              v-if="scope.row.step === 1 || scope.row.processStatus === 'P'"
              @click="handle(scope.row, '删除')"
              >删除</el-link
            >
            <el-link disabled :underline="false" type="default" v-else
              >删除</el-link
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
import { mapGetters } from "vuex";
import {
  get_all_lives,
  process_status,
  set_fee_record,
  process,
} from "@/api/pensionagency/goLive/goLive";
import { findAllChldren, param2Obj, birthToAge } from "@/utils/index";
import { formatZero, parseDate } from "@/filters";
import path from "path";
import {} from "@/utils/validate";
import { log } from "util";
import moment from "moment";

export default {
  name: "goLive_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  data() {
    return {
      flt: {
        elderName: undefined,
        papersCode: undefined,
        bedName: undefined,
        processCode: null,
        pageNum: 1,
        pageSize: 10,
        timeSoon: [],
        bedName: "",
      },
      options_status: [],
      table_loading: false,
      table_data: [],
      table_total: 0,
    };
  },

  methods: {
    formatZero,
    parseDate,
    getList() {
      const { timeSoon } = this.flt;

      get_all_lives({
        ...this.flt,
        startDate:
          timeSoon.length !== 0
            ? `${moment(timeSoon[0]).format("YYYYMMDD")}`
            : undefined,
        endDate:
          timeSoon.length !== 0
            ? `${moment(timeSoon[1]).format("YYYYMMDD")}`
            : undefined,
        timeSoon: undefined,
      }).then((res) => {
        const { result, totalCount } = res;
        this.table_data = result;
        this.table_total = totalCount;
      });
    },
    // 筛选表格数据
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          (self.flt = {
            elderName: undefined,
            papersCode: undefined,
            bedName: undefined,
            processStatus: undefined,
            pageNum: 1,
            pageSize: 10,
            timeSoon: [],
          }),
            self.getList();
          break;
      }
    },
    handleClick(data, type) {
      let self = this;
      switch (type) {
        case "入住申请":
          if (data != "") {
            self.$router.push({
              path: `/workbench/workbench/goLive/form/apply/${data.elderId}`,
              query: {
                isSubmit: 0,
              },
            });
          } else {
            self.$router.push(`/workbench/workbench/goLive/form/apply/:id`);
          }
          break;
        case "入住体检":
          self.$router.push({
            name: "goLive_form_examination",
            query: {
              id: data.elderId,
              isSubmit: 0,
            },
          });

          break;
        case "能力评估":
          self.$router.push({
            name: "goLive_form_ability_assess",
            query: {
              id: data.elderId,
            },
          });

          break;
        case "定制服务":
          self.$router.push({
            path: `/workbench/workbench/goLive/form/customServers/${data.elderId}`,
            query: {
              isSubmit: 0,
            },
          });

          break;
        case "付款计划":
          self.$router.push(
            `/workbench/workbench/goLive/form/payment_plan/${data.elderId}`
          );

          break;
        case "入住审核":
          self.$router.push(`/workbench/workbench/goLive/form/verify/${data.elderId}`);
          break;
        case "签订合同":
          self.$router.push({
            name: "goLive_form_contract_signing",
            query: {
              id: data.elderId,
            },
          });
          break;
        case "入住收费":
          // this.$router.push(`/workbench/goLive/form/pay_fee/${data.elderId}`)
          set_fee_record({
            elderId: data.elderId,
            chargeType: "CI",
            operatorId: this.$store.getters.userInfo.empId,
          }).then((res) => {
            this.getList();
            this.$notify({
              title: "提示",
              message: "操作成功",
              type: "success",
            });
          });
          break;
        case "办理入住":
          self.$router.push({
            name: "goLive_form_check_in",
            query: {
              id: data.elderId,
            },
          });
          break;
        case "详情":
          const { step, elderId, elderName } = data;
          self.$router.push({
            path: `/workbench/workbench/goLive/form/apply_detail/${elderId}/${step}`,
            query: { elderName, id: elderId },
          });
          break;
      }
    },
    getStatus() {
      process_status().then((res) => {
        this.options_status = res;
        console.log(res);
      });
    },
    handle(data, type) {
      let operateType = "";
      const { id } = data;
      switch (type) {
        case "终止办理":
          operateType = "P";
          break;
        case "恢复办理":
          operateType = "R";
          break;
        case "删除":
          operateType = "D";
          break;
      }

      this.$confirm(`确定要${type}么?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        process({ id, operateType }).then((res) => {
          this.$notify({
            title: "成功",
            message: `${type}成功`,
            type: "success",
          });
          this.getList();
        });
      });
    },
  },

  mounted() {
    this.getStatus();
    this.getList();
  },
};
</script>
<style lang='scss' scoped>
.table_data {
  /deep/.el-button--small {
    padding: 7px 10px;
    margin-bottom: 4px;
  }
}

/deep/.table_data table tbody td {
  padding: 4px 0 0 0;
}
</style>
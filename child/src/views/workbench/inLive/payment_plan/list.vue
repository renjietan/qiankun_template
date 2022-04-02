<!-- 
 * @description: 付款计划调整一览
 * @fileName: payload_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 11:58:36
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item class="filter" label="姓名：">
              <el-input placeholder="请输入" v-model="flt.elderName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="状态：">
              <el-select v-model="flt.processIn" clearable placeholder="请选择">
                <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc" :value="item.step">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <div>在住列表</div>
      </div>
      <el-table class="table_data" border ref="table_data" :data="table_data" v-loading="table_loading" stripe
        highlight-current-row fit>
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">{{
              formatZero(scope.$index + 1, 2)
              }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="头像">
          <template slot-scope="scope">
            <el-image style="width: 40px; height: 40px; border-radius: 50%" :src="scope.row.avator" fit="fit">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
        <el-table-column align="center" prop="applyDate" label="申请日期"></el-table-column>
        <el-table-column align="center" prop="reason" label="调整原因"></el-table-column>
        <el-table-column align="center" prop="processIn" label="调整申请">
          <template slot-scope="scope">
            <div v-if="scope.row.processIn > 2">
              <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
            </div>
            <div v-else-if="scope.row.processIn == 2">
              <el-button plain size="small" type="warning" @click="handleNav(scope.row, '调整申请')">待办</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="processIn" label="调整审核">
          <template slot-scope="scope">
            <div v-if="scope.row.processStatus === 'P'">
              <el-link type="danger">已驳回</el-link>
            </div>
            <div v-else>
              <div v-if="scope.row.processIn > 3">
                <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
              </div>
              <div v-else-if="scope.row.processIn == 3">
                <el-button plain size="small" type="warning" @click="handleNav(scope.row, '调整审核')">待办</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="processIn" label="调整办理">
          <template slot-scope="scope">
            <div v-if="scope.row.processIn == 4 && scope.row.processStatus == 'S'">
              <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
            </div>
            <div v-if="scope.row.processIn == 4 && scope.row.processStatus != 'S'">
              <el-button plain size="small" type="warning" @click="handleNav(scope.row, '调整办理')">待办</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="operator" label="申请人"></el-table-column>
        <el-table-column align="center" prop="auditor" label="审核人"></el-table-column>
        <el-table-column align="center" width="270" label="操作" class="lastColumn">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleNav(scope.row, '详情')">详情</el-link>
            <el-link type="warning" :underline="false" @click="handleNav(scope.row, '收费标准确认书')">收费标准确认书</el-link>
            <el-link type="danger" :underline="false" :disabled="scope.row.processIn <= 3 ? false : true " @click="handleAction(scope.row, '取消调整')">取消调整</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
        @pagination="getList" />
    </div>
    <el-dialog v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { formatZero } from "@/filters";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import { by_type_page, process_handle_info ,change_process} from "@/api/pensionagency/inLive/bed_just";
  export default {
    name: "inLive_payment_plan_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        flt: {
          elderName: undefined,
          pageNum: 1,
          pageSize: 10,
          processIn: undefined,
          type: "P",
        },
        status_options: [],
        table_data: [],
        table_loading: false,
        table_total: 0,
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
      handleNav(data, type) {
        const { elderId, id } = data;
        switch (type) {
          case "调整申请":
            this.$router.push({
              path: `/workbench/workbench/inLive/payment_plan/info/${elderId}`,
              query: { nav: 0, record: id },
            });
            break;

          case "调整审核":
            this.$router.push({
              path: `/workbench/workbench/inLive/payment_plan/info/${elderId}`,
              query: { nav: 1, record: id },
            });
            break;
          case "调整办理":
            this.$router.push({
              path: `/workbench/workbench/workbench/inLive/payment_plan/info/${elderId}`,
              query: { nav: 2, record: id },
            });
            break;
          case "详情":
            this.$router.push({
              path: `/workbench/workbench/inLive/payment_plan/info/${elderId}`,
              query: {
                nav: 0,
                record: id,
              },
            });
            break;
        }
      },

      getType() {
        process_handle_info({ type: "P" }).then((res) => {
          this.status_options = res ?? [];
        });
      },
      getList() {
        this.table_loading = true;
        by_type_page(this.flt).then((res) => {
          this.table_data = res.result ?? [];
          this.table_total = res.totalCount;
          this.table_loading = false;
        });
      },
      handleAction(data,type){
        let self =this
        switch (type) {
          case '取消调整':
                self.$confirm('取消调整, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    change_process({processId:data.id}).then(res => {
                        self.$notify({
                            type: 'success',
                            message: '取消调整成功!',
                            title: ""
                        });
                        self.getList();
                    })

                }).catch(() => {
                    self.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            break;
          case '收费标准确认书':
            
            break;
        }
      },
      reset_flt() {
        this.flt = {
          elderName: undefined,
          pageNum: 1,
          pageSize: 10,
          processIn: undefined,
          type: "P",
        };
        this.getList();
      },
    },
    mounted() {
      this.getList();
      this.getType();
    },
  };
</script>
<style lang='scss' scoped>
</style>
<!-- 
 * @description: 床位调整
 * @fileName: bed_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 12:00:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item label="姓名：">
              <el-input clearable v-model="flt.elderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态：">
              <el-select v-model="flt.processIn" clearable placeholder="请选择">
                <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc" :value="item.step">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title">床位调整列表</div>
      <el-table class="table_data" ref="data_table" :data="table_data" v-loading="table_loading" stripe
        highlight-current-row fit>
        <el-table-column width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div :style="{ color: $variables.baseColor }">
              {{ formatZero(scope.$index + 1, 2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="头像">
          <template slot-scope="scope">
            <el-image style="width: 40px; height: 40px; border-radius: 50%" :src="scope.row.headUrl" fit="fit">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column align="center" width="120" prop="applyDate" label="申请日期"></el-table-column>
        <el-table-column align="center" width="120" prop="expectDate" label="预计办理日期"></el-table-column>
        <el-table-column align="center" width="150" prop="beforeName" label="申请调整前床位"></el-table-column>
        <el-table-column align="center" width="120" prop="afterName" label="申请调整床位"></el-table-column>
        <el-table-column align="center" width="120" prop="processIn" label="调整申请">
          <template slot-scope="scope">
            <div v-if="scope.row.processIn > 1">
              <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
            </div>
            <div v-if="scope.row.processIn == 1">
              <el-button plain size="small" @click="handleClick(scope.row, '调整申请')">待办</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="processIn" label="付款计划">
          <template slot-scope="scope">
            <div v-if="scope.row.processIn > 2">
              <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
            </div>
            <div v-if="scope.row.processIn == 2">
              <el-button plain size="small" type="warning" @click="handleNav(scope.row, '付款计划')">待办</el-button>
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
              <div v-if="scope.row.processIn == 3">
                <el-button plain size="small" type="warning" @click="handleNav(scope.row, '调整审核')">待办</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="processIn" label="调整办理">
          <template slot-scope="scope">
            <div v-if="scope.row.processIn > 4 && scope.row.processStatus == 'S'">
              <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
            </div>
            <div v-if="scope.row.processIn == 4  && scope.row.processStatus == 'S'">
              <el-button plain size="small" type="warning" @click="handleNav(scope.row, '调整办理')">待办</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="operator" label="申请人"></el-table-column>
        <el-table-column align="center" prop="auditor" label="审核人"></el-table-column>
        <el-table-column align="center" width="400" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleNav(scope.row, '详情')" :underline="false">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="warning" :underline="false" @click="handleDel(scope.row, '收费标准确认书')">收费标准确认书</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row, '取消调整')">取消调整</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber" :limit.sync="flt.pageSize"
        @pagination="getList" />
      <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->
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
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { formatZero } from "@/filters";
  import { } from "@/utils/validate";
  import { by_type_page, process_handle_info } from "@/api/pensionagency/inLive/bed_just";
  export default {
    name: "inLive_bunk_resize_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        table_data: [],
        table_loading: false,
        table_total: 0,
        flt: {
          elderName: undefined,
          pageNum: 1,
          pageSize: 10,
          processIn: undefined,
          type: "B",
        },
        status_options: [],
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
        const { elderId } = data;
        switch (type) {
          case "调整申请":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${elderId}`,
              query: { nav: 0, record: data.id },
            });
            break;
          case "付款计划":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${elderId}`,
              query: { nav: 1, record: data.id },
            });
            break;
          case "调整审核":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${elderId}`,
              query: { nav: 2, record: data.id },
            });
            break;
          case "调整办理":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${elderId}`,
              query: { nav: 3, record: data.id },
            });
            break;
          case "详情":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${elderId}`,
              query: { nav: 0, record: data.id },
            });
            break;
        }
      },
      getType() {
        process_handle_info({ type: "B" }).then((res) => {
          this.status_options = res ?? [];
        });
      },
      reset() {
        this.flt = {
          elderName: undefined,
          pageNum: 1,
          pageSize: 10,
          processIn: undefined,
          type: "B",
        };
        this.getList();
      },
      getList() {
        this.table_loading = true;
        by_type_page(this.flt).then((res) => {
          this.table_data = res.result ?? [];
          this.table_total = res.totalCount;
          this.table_loading = false;
        });
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
<!-- 
 * @description: 请假一览
 * @fileName: leave_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 12:05:17
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
            <el-form-item class="filter" label="床位：">
              <el-input placeholder="请输入" v-model="flt.bedName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="请假状态：">
              <el-select v-model="flt.leaveStatus" placeholder="请选择服务等级">
                <el-option
                  v-for="item in serveList"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="请假时间：">
              <el-date-picker
                v-model="flt.leaveDate"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
        <div>请假列表</div>
        <div style="text-align: right">
          <el-button iocn="el-icon-plus" type="success" disabled>数据导出</el-button>
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data" 
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column width="60" align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column width="115" align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
        <el-table-column width="100" align="center" prop="leaveStatusDesc" label="请假状态"></el-table-column>
        <el-table-column align="center" prop="reason" label="请假事由"></el-table-column>
        <el-table-column align="center" prop="applyTime" label="请假申请时间" width="125"></el-table-column>
        <el-table-column width="125" align="center" prop="startTime" label="请假开始时间"></el-table-column>
        <el-table-column width="125" align="center" prop="endTime" label="请假结束时间"></el-table-column>
        <el-table-column width="125" align="center" prop="actualBackDate" label="实际返院日"></el-table-column>
        <el-table-column width="125" align="center" prop="actualDays" label="实际请假天数"></el-table-column>
        <el-table-column align="center" prop="refundDays" label="退费天数"></el-table-column>
        <!-- <el-table-column align="center" prop="paystatus" label="支付状态"></el-table-column>
        <el-table-column align="center" prop="createBy" label="登记人"></el-table-column>
        <el-table-column align="center" prop="createTime" label="登记日"></el-table-column> -->
        <el-table-column align="center" width="280"  label="操作" class="lastColumn">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleNav(scope.row, 'info')">详情</el-link>
            <el-link :type="scope.row.leaveStatus == 'O' ? 'info' : 'warning'" :disabled="scope.row.leaveStatus == 'O' ? 'disabled' : false" :underline="false" @click="handleNav(scope.row, 'edit')">修改</el-link>
            <el-link :type="scope.row.leaveStatus != 'N' ? 'info' : 'danger'" :disabled="scope.row.leaveStatus != 'N' ? 'disabled' : false" @click="handleNav(scope.row, 'exit')" :underline="false">取消</el-link>
            <el-link :type="scope.row.leaveStatus == 'O' ? 'info' : 'primary'" :disabled="scope.row.leaveStatus == 'O' ? 'disabled' : false" :underline="false" @click="handleNav(scope.row, 'goback')">销假</el-link>
            <el-link :type="scope.row.leaveStatus != 'O' ? 'info' : 'primary'" :disabled="scope.row.leaveStatus != 'O' ? 'disabled' : false" :underline="false" @click="handleNav_info(scope.row)">退费详情</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    ></el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { formatZero, parseDate } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { manager } from "@/api/pensionagency/inLive/hoiddy";

import { getHolidyList, deletHoliday, leave_status } from "@/api/pensionagency/inLive/hoiddy";
export default {
  name: "inLive_holiday_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        elderName: undefined,
        bedName: undefined,
        status: undefined,
        leaveDate: undefined
      },
      serveList: [],
      pageNum: 1,
      pageSize: 10,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    formatZero,
    parseDate,
    handleNav_info(item) {
      this.$notify({
        type: "info",
        title: "提示",
        message: "此功能正在开发中"
      })
      // this.$router.push(`/workbench/outLive/handle/final?elderId=${item.elderId}`);
    },
    handleNav(data, type) {
      switch (type) {
        case "info":
          this.$router.push({
            path: `/workbench/workbench/inLive/holiday/apply/${data.elderId}`,
            query: { flag: "detail", record: data.id }
          });
          break;
        case "edit":
          this.$router.push({
            path: `/workbench/workbench/inLive/holiday/apply/${data.elderId}`,
            query: { flag: "edit", record: data.id }
          });
          break;
        case "goback":
            this.$router.push({path:`/workbench/workbench/inLive/holiday/apply/${data.elderId}`,query:{flag:"goBack",record:data.id}});
          break;
        case "exit":
          const { id } = data;
          this.$confirm("确定要取消么?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(res => {
            manager({ id, operateType: "D" }).then(res => {
              this.$notify({
                message: "取消成功",
                type: "success",
                title: "提示"
              });
              this.getList();
            });
          });
          break;
      }
    },
    getStatus() {
      leave_status().then(res => {
        this.serveList = res;
      });
    },
    getList() {
      const { pageNum, pageSize, flt } = this;
      this.table_loading = true;
      getHolidyList({ ...flt, pageNum, pageSize }).then(res => {
        this.table_data = res.result ?? [];
        this.table_total = res.totalCount ?? 0;
        this.table_loading = false;
      });
    },
    reset_flt() {
      this.flt = {
        elderName: "",
        bedName: "",
        status: undefined,
        leaveDate: undefined
      };
      this.pageNum = 1;
      this.getList();
    }
  },
  activated() {
    this.getList();
    this.getStatus();
  },
  mounted() {
    this.getList();
    this.getStatus();
  }
};
</script>
<style lang='scss' scoped>
</style>
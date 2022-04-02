<!-- 
 * @description: 请假履历
 * @fileName: Holiday.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="handleNav('', '添加')">请假申请</el-button>
    </div>
    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="100" align="center" prop="index" label="序号">
        <template slot-scope="scope">
          <div :style="{ color: $variables.baseColor }">
            {{ formatZero(scope.$index + 1, 2) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="leaveStatusDesc" label="请假状态"></el-table-column>
      <el-table-column align="center" prop="reason" label="请假事由"></el-table-column>
      <el-table-column align="center" prop="applyTime" label="请假申请时间"></el-table-column>
      <el-table-column align="center" prop="startTime" label="请假开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="请假结束时间"></el-table-column>
      <el-table-column align="center" prop="leaveDays" label="请假天数"></el-table-column>
      <el-table-column align="center" prop="actualBackDate" label="实际返院时间"></el-table-column>
      <el-table-column align="center" prop="actualDays" label="实际请假天数"></el-table-column>
      <el-table-column align="center" width="350" label="操作">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleNav(scope.row, '详情')">详情</el-link>

            <el-link :underline="false" :disabled="scope.row.leaveStatus == 'O' ? 'disabled' : false" :type="scope.row.leaveStatus == 'O' ? 'info' : 'warning'" @click="handleNav(scope.row, '销假')">销假</el-link>
            <el-link :underline="false" type="success" @click="handleNav(scope.row, '退费详情')">退费详情</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
      @pagination="getList" />
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
  import { query_eleder } from '@/api/pensionagency/inLive/hoiddy'
  export default {
    name: "Holiday",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        table_data: [],
        table_loading: false,
        table_total: 0,
        flt: {
          pageNum: 1,
          pageSize: 10,
        },
      };
    },
    methods: {
      formatZero,
      getList() {
        const { elderId, flt } = this;
        this.table_loading = true;
        query_eleder({ ...flt, elderId }).then(res => {
          this.table_data = res.result;
          this.table_total = res.totalCount;
          this.table_loading = false;
        })
      },
      handleNav(data, type) {
        switch (type) {
          case "添加":
            this.$router.push({
              path: `/workbench/workbench/inLive/holiday/apply/${this.elderId}`,
              query: { flag: "add" },
            });
            break;
          case "详情":
            this.$router.push({ path: `/workbench/workbench/inLive/holiday/apply/${this.elderId}`, query: { flag: "detail", record: data.id } });
            break;

          case "销假":
            this.$router.push({ path: `/workbench/workbench/inLive/holiday/apply/${this.elderId}`, query: { flag: "goBack", record: data.id } });
            break;
          case "退费详情":
            this.$router.push(`/workbench/workbench/inLive/handle/form/refund_info/${this.elderId}`);
            break;
        }
      },
    },
    mounted() {
      const { id } = this.$route.params;
      this.elderId = id;
      this.getList();
    },
  };
</script>
<style lang='scss' scoped>
</style>
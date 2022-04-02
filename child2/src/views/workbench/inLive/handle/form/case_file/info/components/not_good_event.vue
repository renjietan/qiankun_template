<!-- 
 * @description: 不良事件
 * @fileName: not_good_event.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" icon="el-icon-plus" @click="handleNav('','添加')">添加不良事件</el-button>
    </div>
    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="100" align="center" prop="index" label="序号">
        <template slot-scope="scope">
          <div :style="{color: $variables.baseColor }">{{ formatZero(scope.$index + 1, 2) }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="日期"></el-table-column>
      <el-table-column align="center" prop="time" label="时间"></el-table-column>
      <el-table-column align="center" prop="place" label="发生场所"></el-table-column>
      <el-table-column align="center" prop="eventType" label="事件类别">
        <template slot-scope="scope">
          <div>{{ scope.row.eventType | parseEventType }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="diagnosticResult" label="诊断结果"></el-table-column>
      <el-table-column align="center" prop="responsible" label="责任人"></el-table-column>
      <el-table-column align="center" prop="firstDiscoverer" label="第一发现人"></el-table-column>
      <el-table-column align="center" prop="operator" label="记录人"></el-table-column>
      <el-table-column align="center" width="350" label="操作">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleNav(scope.row,'修改')">修改</el-link>
            <el-link :underline="false" type="warning">不良事件报告单</el-link>
            <el-link :underline="false" type="danger" @click="handleDel(scope.row)">删除</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="table_total > 0"
      :total="table_total"
      :page.sync="flt.pageNumber"
      :limit.sync="flt.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import { handleType } from "@/utils/enum";

import {
  get_not_goods_event_byElderId,
  set_or_del_event_byid
} from "@/api/pensionagency/inLive/not_goods_event";

import {} from "@/utils/validate";
export default {
  name: "not_good_event",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        elderId: undefined,
        pageNum: 1,
        pageSize: 10,
        dateTime: null
      }
    };
  },
  methods: {
    formatZero,
    handleNav(data, type) {
      switch (type) {
        case "添加":
          this.$router.push(
            `/workbench/workbench/inLive/handle/form/add_not_good_event/${this.flt.elderId}`
          );
          break;
        case "修改":
          this.$router.push({
            path: `/workbench/workbench/inLive/handle/form/add_not_good_event/${this.flt.elderId}`,
            query: {
              eventId: data.id
            }
          });
          break;
      }
    },
    getList() {
      let self = this;
      self.table_loading = true;
      get_not_goods_event_byElderId(this.flt).then(res => {
        self.table_total = res?.totalCount ?? 0;
        self.flt.pageNum = res?.pageNum ?? 0;
        self.flt.pageSize = res?.pageSize ?? 0;
        self.table_data = res.result;
        self.table_loading = false;
      });
      this.table_total = 45;
    },
    handleDel(item) {
      let id = item.id;
      let params = {
        id,
        operateType: handleType["删除"]
      };
      this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          set_or_del_event_byid(params).then(res => {
            this.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  mounted() {
    this.flt.elderId = this.$route.params.id;
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
</style>
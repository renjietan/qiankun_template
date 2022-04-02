<!-- 
 * @description: 交接班管理
 * @fileName: handover_work.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 14:34:20
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
                <el-form-item class="filter" label="交接时间:">
                  <el-date-picker
                    v-model="record_time"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item class="filter" label="班次类型:">
                  <el-select v-model="flt.shiftId" placeholder="请选择班次类型">
                    <el-option
                      v-for="item in shift_list"
                      :key="item.id"
                      :label="item.shiftName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
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
        <span>交接班记录</span>
        <!-- <div style="display: inline-block">
          <el-button type="primary" icon="el-icon-plus"> 添加记录</el-button>
        </div>-->
      </div>
      <el-table
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="handoverDate" label="日期"></el-table-column>
        <el-table-column align="center" prop="shiftName" label="班次类型"></el-table-column>
        <el-table-column align="center" prop="liveIngNum" label="在住长者数"></el-table-column>
        <el-table-column align="center" prop="attendanceNum" label="实到长者数"></el-table-column>
        <el-table-column align="center" prop="newNum" label="新增长者数"></el-table-column>
        <el-table-column align="center" prop="leaveNum" label="请假长者数"></el-table-column>
        <el-table-column align="center" prop="importantMatterNum" label="重要事项记录"></el-table-column>
        <el-table-column align="center" prop="handoverTime" label="交班时间"></el-table-column>
        <el-table-column align="center" prop="includingName" label="交班人"></el-table-column>
        <el-table-column align="center" prop="successorName" label="接班人"></el-table-column>
        <el-table-column align="left" width="80" label="操作" class="lastColumn">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '详情')"
            >详情</el-link>
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
import { valid_error_msg } from "@/utils/valid-error-msg";
import { get_shift_records, get_all_types } from "@/api/pensionagency/servers/serves";
import {} from "@/utils/validate";
import { formatZero } from "@/filters";

export default {
  name: "services_handover_work",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      record_time: [], //时间范围
      shift_list: [], //班次列表
      flt: {
        id: null,
        startDate: null, //开始时间,
        shiftId: null, // 班次Id
        endDate: null, // 结束时间
        pageNum: 1,
        pageSize: 10
      },
      table_data: [],
      table_loading: false,
      table_total: 1,
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
    getList() {
      let params = { ...this.flt };
      params.startDate = (this.record_time ?? [])[0];
      params.endDate = (this.record_time ?? [])[1];
      get_shift_records(params).then(res => {
        this.table_data = res.result;
        this.table_total=res.totalCount
      });
    },
    getAllTypes() {
      get_all_types().then(res => {
        this.shift_list = res.map(item => {
          item.shiftId = item.id;
          item.shiftColor = item.color;
          return item;
        });
      });
    },
    handleClick(data) {
      let self = this;
      self.flt.id = data.id;
      self.$router.push({
        path: "/workbench/workbench/services/handover_work_detail",
        query: { id: self.flt.id }
      });
    },
    reset_flt() {
      this.record_time=[]
      this.flt = {
        id: null,
        startDate: null, //开始时间
        shiftId: null, // 班次Id
        endDate: null, // 结束时间
        pageNum: 1,
        pageSize: 10
      };
      this.getList();
    }
  },
  mounted() {
    this.getList();
    this.getAllTypes();
  }
};
</script>
<style lang='scss' scoped>
</style>
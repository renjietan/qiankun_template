<!-- 
 * @description: 履历评估表
 * @fileName: CV_assessment.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="title" style="margin-bottom: 20px">
      <div>履历评估表</div>
      <div>
        <el-button type="warning" @click="handleNav('', '开始评估')"
          >开始评估</el-button
        >
      </div>
    </div>
    <el-table
      border
      ref="data_table"
      :data="table_data"
      v-loading="table_loading"
      fit
    >
      <el-table-column width="100" align="center" prop="index" label="序号">
        <template slot-scope="scope">
          <div :style="{ color: $variables.baseColor }">
            {{ formatZero(scope.$index + 1, 2) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="assessTypeDesc"
        label="评估类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="assessCount"
        label="评估次数"
      ></el-table-column>
      <el-table-column align="center" label="上次评估日期">
        <template slot-scope="scope">
          {{ parseDate(scope.row.lastAssessDate ) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="lastAssessLevel"
        label="上次评估等级"
      ></el-table-column>
      <el-table-column align="center" label="下次评估日期">
        <template slot-scope="scope">
          {{ parseDate(scope.row.nextAssessDate) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否到期">
        <template slot-scope="scope">
          {{ scope.row.isMaturity == 0 ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="desc"
        label="收费说明"
      ></el-table-column>
      <el-table-column align="center" width="350" label="操作">
        <template slot-scope="scope">
          <div>
            <el-link
              :underline="false"
              type="primary"
              @click="handleNav(scope.row, '详情')"
              >查看记录</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click="handleNav(scope.row, '评估')"
              >评估</el-link
            >
            <el-link :underline="false" type="warning"
              >修改下次评估时间</el-link
            >
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
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero, parseDate } from "@/filters";
import {} from "@/utils/validate";
import { assess_result } from "@/api/pensionagency/inLive/assessment";
export default {
  name: "CV_assessment",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      elderId: undefined,
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        pageNumber: 1,
        pageSize: 10,
      },
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
    parseDate,
    handleNav(data, type) {
      switch (type) {
        case "开始评估":
          this.$router.push(`/workbench/workbench/assess/form/record_info/${this.$route.params.id}`);
          break;
        case "详情":
          this.$router.push(`/workbench/workbench/assess/record_list/${this.elderId}`);
          break;
        case "评估":
          this.$router.push(`/workbench/workbench/assess/sores_record_list`);
          break;
      }
    },
    getList() {
      const { elderId } = this;
      (this.table_loading = true),
        assess_result({ elderId }).then((res) => {
          this.table_data = res ?? [];
          this.table_loading = false;
        });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    if (!isNaN(Number(id))) {
      this.elderId = id;
      this.getList();
    }
  },
};
</script>
<style lang='scss' scoped>
</style>
<!-- 
 * @description: 评估中心-查看记录-能力评估
 * @fileName: assess_record_list.vue 
 * @author: 谭人杰 
 * @date: 2021-06-16 19:57:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div
      class="container_card"
      style="
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        padding: 20px 30px;
      "
    >
      <div class="title">能力评估记录--谭人杰</div>
    </div>
    <div class="container_card" style="margin-top: 60px">
      <el-row style="margin-bottom: 20px">
        <el-col :span="12">
          <el-button
            icon="el-icon-takeaway-box"
            type="primary"
            @click="handleNav('', '等级调整')"
            >服务等级调整</el-button
          >
          <el-button icon="el-icon-takeaway-box" type="info"
            >评估结果比较</el-button
          >
        </el-col>
        <el-col :span="12" style="text-align: right">
          <!-- <el-button icon="el-icon-takeaway-box" type="warning">评估</el-button> -->
          <el-button icon="el-icon-takeaway-box" type="primary"
            >评估结果统计</el-button
          >
        </el-col>
      </el-row>
      <el-table
        class="table_data"
        height="300px"
        v-el-height-adaptive-table="{ bottomOffset: 100 }"
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span>{{ formatZero(scope.$index, 2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="elderName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="assessDate"
          label="评估日期"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="levelDesc"
          label="评估等级"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="ac"
          label="日常"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sp"
          label="精神状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="pe"
          label="感知觉与沟通"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sc"
          label="社会参与"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operator"
          label="评估人"
        ></el-table-column>
        <el-table-column align="center" width="330" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="handleNav(scope.row,'详情')"
              type="primary"
              >详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="warning">评估结果确认书</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="warning">能力评估表</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <pagination
          v-show="table_total > 0"
          :total="table_total"
          :page.sync="flt.pageNumber"
          :limit.sync="flt.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import elHeightAdaptiveTable from "@/directive/el-table";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import { assess_his } from "@/api/pensionagency/inLive/inLeve_temp";
import {} from "@/utils/validate";
export default {
  name: "assess_record_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
  data() {
    return {
      table_data: [],
      elderId: undefined,
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
    handleNav(data, type) {
      switch (type) {
        case "等级调整":
          this.$router.push(
            `/workbench/workbench/inLive/server_level_resize/form/apply/${this.elderId}`
          );
          break;
        case "详情":
            this.$router.push(
            `/workbench/workbench/assess/form/record_info/${this.elderId}`
          );  
          break;  
      }
    },
    getList() {
      const { elderId } = this;
      assess_his({ elderId }).then((res) => {
          this.table_data = res??[];
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
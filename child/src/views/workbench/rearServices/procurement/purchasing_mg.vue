<!-- 
 * @description: 采购管理
 * @fileName: purchasing.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:23:17
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 查询条件 -->
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="6">
                <el-form-item label="采购单号：">
                  <el-input
                    readonly
                    clearable
                    v-model="flt.warehouse"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="采购时间：">
                  <el-date-picker
                    v-model="flt.date"
                    type="date"
                    placeholder="选择日期"
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
    <!-- 表格 -->
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>采购管理表</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '采购申请')"
            >采购申请</el-button
          >
          <el-button
            type="success"
            icon="el-icon-upload2"
            @click="handleAction('', '导出')"
            >导出</el-button
          >
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
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="bedName"
          label="采购单号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="采购物品"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="采购数量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="总金额"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="申请人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="申请日期"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="申请状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="说明"
        ></el-table-column>
        <el-table-column align="center" width="240" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '采购详情')"
              >详情</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleNav(scope.row, '去审核')"
              >去审核</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '重新申请')"
              >重新申请</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '一键入库')"
              >一键入库</el-link
            >
            <el-link
              type="danger"
              @click="handleNav(scope.row, 'delete')"
              :underline="false"
              >删除</el-link
            >
            <el-link
              type="danger"
              @click="handleNav(scope.row, '取消采购')"
              :underline="false"
              >取消采购</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
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
import {} from "@/utils/validate";
import { formatZero } from "@/filters";

export default {
  name: "rearServices_purchasing_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {},
      table_data: [],
      table_loading: false,
      table_total: 1,
    };
  },
  methods: {
    formatZero,
    handleNav(data, type) {
      switch (type) {
        case "采购申请":
          this.$router.push("/workbench/workbench/rearServices/purchasing_verify");
          break;
        case "一键入库":
        this.$router.push({
            path: "/workbench/workbench/rearServices/putbound_detail",
            query: {
              flag:'一键入库'
            },
          });
          break;
        case "采购详情":
          this.$router.push({
            path: "/workbench/workbench/rearServices/purchasing_detail",
            query: {
              flag: "采购详情",
            },
          });
          break;
        case "去审核":
          this.$router.push({
            path: "/workbench/workbench/rearServices/purchasing_detail",
            query: {
              flag: "取消申请",
            },
          });
          break;
        case "重新申请":
          this.$router.push({
            path: "/workbench/workbench/rearServices/purchasing_detail",
            query: {
              flag: "重新申请",
            },
          });
          break;
        case "取消采购":
          this.$router.push({
            path: "/workbench/workbench/rearServices/purchasing_detail",
            query: {
              flag: "取消采购",
            },
          });
          break;
      }
    },
  },
  mounted() {
    this.table_data = Array.from({ length: 1 }, (m, n) => {
      return {
        name: n,
      };
    });
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 52px;
  line-height: 52px;
}
</style>
<!-- 
 * @description: 
 * @fileName: list.vue 
 * @author: 王文涛 
 * @date: 2022-02-22 19:56:18
 * @后台人员:  
!-->
<template>
  <div>
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <el-form-item label="出库单号：">
                <el-input
                  readonly
                  clearable
                  v-model="flt.warehouse"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="出库日期：">
                 <el-date-picker
                    v-model="flt.date"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
              </el-form-item>
            </el-col>
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
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>出入库记录-入库记录 </span>
        <div style="display: inline-block">
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
          label="出库单号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="出库日期"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="出库仓库"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="出库物品"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="出库数量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="总金额"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="出库人"
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
              @click.native="handleNav(scope.row, '详情')"
              >详情</el-link
            >
            <el-link
              type="danger"
              @click="handleNav(scope.row, 'delete')"
              :underline="false"
              >删除</el-link
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
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_total: 1,
      table_data: [],
      table_loading: false,
      flt: {},
    };
  },
  methods: {
    formatZero,
    handleNav(data, type) {
      switch (type) {
        case "详情":
          this.$router.push({
            path: "/workbench/workbench/rearServices/outbound_detail",
            query: {
              flag:'详情'
            },
          });
          break;
      }
    },
  },
  mounted() {
    this.table_data = [{ name: 1 }];
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 52px;
  line-height: 52px;
}
</style>e
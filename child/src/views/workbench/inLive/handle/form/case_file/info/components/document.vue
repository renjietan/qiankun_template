<!-- 
 * @description: 电子文档
 * @fileName: documment.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="no-data">
      <img :src="no_data" alt />
    </div>
  </div>
  <!-- <div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" icon="el-icon-plus">添加文档</el-button>
      <el-button type="warning">
        <span class="btn_pic">
          <img class="pic" src="~@/assets/images/AJFR/saomiao.png" />高拍仪扫描
        </span>
      </el-button>
    </div>
    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="100" align="center" prop="index" label="序号">
        <template slot-scope="scope">
          <div :style="{color: $variables.baseColor }">{{ formatZero(scope.$index + 1, 2) }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="文档名称"></el-table-column>
      <el-table-column align="center" prop="name" label="上传人"></el-table-column>
      <el-table-column align="center" prop="name" label="上传时间"></el-table-column>
      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary">修改</el-link>
            <el-link :underline="false" type="primary">打印</el-link>
            <el-link :underline="false" type="danger">删除</el-link>
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
  </div> -->
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
export default {
  name: "documment",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        pageNumber: 1,
        pageSize: 10,
        dateTime: null
      }
    };
  },
  methods: {
    formatZero,
    getList() {
      this.table_data = Array.from({ length: 10 }).map(item => {
        return { name: "1" };
      });
      this.table_total = 45;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
.pic {
  line-height: 15px;
  margin-right: 6px;
  margin-bottom: -1.2px;
}
</style>
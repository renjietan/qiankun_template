<!-- 
 * @description:待审核----面积变更价格审核 
 * @fileName: toReviewed.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-25 19:27:40
 * @后台人员:  
!-->
<template>
  <div class>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="150" align="left"  label="序号">
        <template slot-scope="scope">
            <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
          </template>
      </el-table-column>
      <el-table-column width="310" align="left" prop="planName" label="房间"></el-table-column>
      <el-table-column width="300" align="left" prop="planName" label="原/现建筑面积"></el-table-column>
      <el-table-column width="300" align="left" prop="tollStandard" label="面均价对比"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="面价总价"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="补充协议建筑单价"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="补充协议总价"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { formatZero } from "@/filters";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "ToReviewed",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
     table_loading: false,
      table_data: [
        {
          planName: "2"
        }
      ],
    };
  },
  methods: {
    formatZero,
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>
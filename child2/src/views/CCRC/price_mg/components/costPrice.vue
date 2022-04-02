<!-- 
 * @description:低价 
 * @fileName: costPrice.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-25 19:47:49
 * @后台人员:  
!-->
<template>
<div class=''>
   <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="170" align="left"  label="序号">
        <template slot-scope="scope">
            <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
          </template>
      </el-table-column>
      <el-table-column width="310" align="left" prop="planName" label="房间"></el-table-column>
      <el-table-column width="300" align="left" prop="planName" label="销售状态"></el-table-column>
      <el-table-column width="300" align="left" prop="afterDiscount" label="低价总价"></el-table-column>
      <el-table-column width="300" align="left" prop="afterDiscount" label="低价建筑单价"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="低价套内单价"></el-table-column>
       <el-table-column align="left" label="操作" width="80">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleAction(scope.row, '详情')">详情</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
<el-dialog v-el-drag-dialog :visible.sync='dialog_cof.visible' :title='dialog_cof.title'
:destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
</el-dialog>
</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
import permission from '@/directive/permission'
import { formatZero } from "@/filters";
import elDragDialog from '@/directive/el-drag-dialog'
import { valid_error_msg } from '@/utils/valid-error-msg'
import { } from '@/utils/validate'
export default {
  name:"CostPrice",
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
dialog_cof: {
visible: false,
title: '新增',
escape: false,
destroy: true,
modal: false
}
};
},
methods: {
  formatZero,
  handleAction(){
    let self = this
    self.$router.push({path:'/CCRC/price_mg/cost_price_detail',})
  },
},
mounted() {
},
}
</script>
<style lang='scss' scoped>
</style>
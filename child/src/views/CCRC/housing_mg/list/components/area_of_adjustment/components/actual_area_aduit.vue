<!-- 
 * @description: 实际面积审核
 * @fileName:actual_area_aduit.vue 
 * @author: 王文涛 
 * @date: 2021-10-22 09:31:55
 * @后台人员:  
!-->
<template>
  <div style="margin-bottom: 25px">
    <el-button type="success" icon="el-icon-menu">全部审核</el-button>
    <el-dropdown split-button type="primary">
      <i class="el-icon-more"></i> 更多菜单
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>打印</el-dropdown-item>
        <el-dropdown-item>导出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-table :data="tableData" style="width: 100%; margin-top: 24px">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="房间" width="150"></el-table-column>
      <el-table-column label="现建筑面积"></el-table-column>
      <el-table-column label="现套内面积"></el-table-column>
      <el-table-column label="修改后建筑面积">
        <template :slot-scope="row">
          <el-input placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="修改后套内面积">
        <template :slot-scope="row">
          <el-input placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="销售状态"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "actual_area_aduit",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>
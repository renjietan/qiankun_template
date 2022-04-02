<!-- 
 * @description: 销许信息
 * @fileName: sale_info.vue 
 * @author: 王文涛 
 * @date: 2021-10-21 16:49:42
 * @后台人员:  
!-->
<template>
  <div class="table_box">
    <el-divider></el-divider>
    <el-form :inline="true" style="margin-top: 24px">
      <el-row>
        <el-col :span="19">
          <el-row>
            <el-col :span="8">
              <el-form-item class="filter" label="项目：">
                <el-input
                  placeholder="请输入"
                  v-model="flt.elderName"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item class="filter" label="房间：">
                <el-input
                  placeholder="请输入"
                  v-model="flt.bedName"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" style="text-align: right">
          <div style="display: inline-block; margin-left: 10px">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="reset_flt">重置</el-button>
            <el-popover placement="top" width="360" v-model="visible">
              <el-row>
                <el-col :span="3" style="margin-top: 6px">单元:</el-col>
                <el-col :span="6">
                  <el-checkbox
                    v-model="checked1"
                    label="全部"
                    border
                  ></el-checkbox>
                </el-col>
                <el-col :span="15">
                  <el-input style="width: 100%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 6px">
                <el-col :span="3" style="margin-top: 6px">楼层:</el-col>
                <el-col :span="6">
                  <el-checkbox
                    v-model="checked1"
                    label="全部"
                    border
                  ></el-checkbox>
                </el-col>
                <el-col :span="15">
                  <el-input style="width: 100%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 6px">
                <el-col :span="3" style="margin-top: 6px">号码:</el-col>
                <el-col :span="6">
                  <el-checkbox
                    v-model="checked1"
                    label="全部"
                    border
                  ></el-checkbox>
                </el-col>
                <el-col :span="15">
                  <el-input style="width: 100%"></el-input>
                </el-col>
              </el-row>
              <el-link type="primary" slot="reference"
                ><i class="el-icon-arrow-up"></i>展开筛选</el-link
              >
            </el-popover>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <div class="btn-boxs" style="margin-bottom: 25px">
      <el-button type="success" icon="el-icon-download"> 导入面积 </el-button>
      <el-button type="success" icon="el-icon-upload2"> 导入面积 </el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="房间" width="150">
        </el-table-column>
        <el-table-column label="销许编号"> </el-table-column>
        <el-table-column label="销许日期"> </el-table-column>
        <el-table-column label="户型"> </el-table-column>
        <el-table-column label="建筑面积"> </el-table-column>
        <el-table-column label="套内面积"> </el-table-column>
        <el-table-column label="销售状态"> </el-table-column>
      </el-table>
    </div>
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
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "sale_info",
  data() {
    return {
      flt: {},
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      form_data: {},
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },

        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
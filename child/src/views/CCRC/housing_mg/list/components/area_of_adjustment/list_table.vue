<!-- 
 * @description: 面积调整
 * @fileName: list_table.vue 
 * @author: 王文涛 
 * @date: 2021-10-21 16:49:42
 * @后台人员:  
!-->
<template>
  <div class="table_box">
    <el-divider></el-divider>
    <el-form :inline="true" style="margin-top: 24px">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="9">
              <el-form-item class="filter" label="项目：">
                <el-select v-model="pageable.projectId" placeholder="请选择">
                  <el-option
                    v-for="item in project_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item class="filter" label="房间：">
                <el-input placeholder="请输入" v-model="pageable.houseName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <div style="display: inline-block; margin-left: 10px">
            <el-button type="primary"  @click="handleScreen(pageable,'查询')">查询</el-button>
            <el-button  @click="handleScreen(pageable,'重置')">重置</el-button>
            <!-- <el-popover placement="top" width="360" v-model="visible">
              <el-row>
                <el-col :span="3" style="margin-top:6px">单元:</el-col>
                <el-col :span="6">
                  <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top:6px">
                <el-col :span="3" style="margin-top:6px">楼层:</el-col>
                <el-col :span="6">
                  <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top:6px">
                <el-col :span="3" style="margin-top:6px">号码:</el-col>
                <el-col :span="6">
                  <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
              <el-link type="primary" slot="reference"
                ><i class="el-icon-arrow-up"></i>展开筛选</el-link
              >
            </el-popover>-->
          </div>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-bottom: 25px">
      <!-- <el-button type="success" icon="el-icon-download">导入面积</el-button>
      <el-button type="success" icon="el-icon-upload2">导出模板</el-button>-->
      <!-- <el-dropdown   split-button type="primary">
      <i class="el-icon-more"></i> 更多菜单
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>打印</el-dropdown-item>
        <el-dropdown-item>导出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>-->
      <el-table :data="table_data" style="width: 100%; margin-top: 24px">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="name" label="房间" width="300"></el-table-column>
        <el-table-column prop="buildingArea" label="现建筑面积"></el-table-column>
        <el-table-column prop="realArea" label="现套内面积"></el-table-column>
        <el-table-column label="修改后建筑面积">
          <template slot-scope="scope">
            <el-input :disabled="scope.row.status=='销控'?false:true" v-model="scope.row.buildingArea1" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="修改后套内面积">
          <template slot-scope="scope">
            <el-input :disabled="scope.row.status=='销控'?false:true" v-model="scope.row.realArea2" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="status" width="110" label="销售状态"></el-table-column>
      </el-table>
      <pagination
        style="text-align:right"
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="pageable.page"
        :limit.sync="pageable.size"
        @pagination="getHousesArea"
      />
      <div class="footer">
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
      </div>
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
import { get_project_list } from "@/api/CCRC/project";
import { get_houses_area, modify_houses_areas } from "@/api/CCRC/housing";
import pre_sale_area from "./components/pre_sale_area.vue";
import actual_area from "./components/actual_area.vue";
import pre_sale_area_aduit from "./components/pre_sale_area_aduit.vue";
import actual_area_aduit from "./components/pre_sale_area_aduit.vue";
export default {
  components: {
    Pagination,
    pre_sale_area,
    actual_area,
    pre_sale_area_aduit,
    actual_area_aduit
  },
  directives: { waves, permission, elDragDialog },
  name: "list_table",
  data() {
    return {
      project_list: [],
      pageable: {
        page: 1,
        size: 10,
        houseName: "",
        projectId: ""
      },
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      checked1: false,
      cur_tag: {},
      tags: [
        // {
        //   name: "房间面积录入",
        //   component: "pre_sale_area"
        // },
        // {
        //   name: "实测面积录入",
        //   component: "actual_area"
        // }
        // {
        //   name: "预售面积审核",
        //   component: "pre_sale_area_aduit",
        // },
        // {
        //   name: "实测面积审核",
        //   component: "actual_area_aduit",
        // },
      ],
      table_data: [],
      table_total: 0
    };
  },
  methods: {
    getHousesArea() {
      // let projectId = "XM1";
      get_houses_area({ ...this.pageable }).then(res => {
        this.table_data = res.data.records.map(el => {
          el.buildingArea1 = el.buildingArea;
          el.realArea2 = el.realArea;
          return el;
        });
        this.table_total = res.data.total;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    handleSubmit() {
      let arr = this.table_data.map(el => {
        el.buildingArea = el.buildingArea1;
        el.realArea = el.realArea2;
        return el;
      });
      modify_houses_areas(arr).then(res => {
        this.$notify({
          type: "success",
          message: "修改成功",
          title: "成功"
        });
        this.getHousesArea();
      });
    },
     handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.pageable.page = 1;
          self.getHousesArea();
          break;
        case "重置":
          self.pageable = {
            page: 1,
            size: 10,
            houseName: "",
            projectId: ""
          };
          self.getHousesArea();
          break;
      }
    },
    reset_flt() {
      (this.pageable = {
        page: 1,
        size: 10,
        houseName: "",
        projectId: ""
      }),
        this.getHousesArea();
    }
    // handle_switchModel(val) {
    //   this.cur_tag = val;
    // }
  },
  mounted() {
    this.getHousesArea();
    this.getProjectList();
    // this.cur_tag = this.tags[0];
  }
};
</script>
<style lang='scss' scoped>
</style>
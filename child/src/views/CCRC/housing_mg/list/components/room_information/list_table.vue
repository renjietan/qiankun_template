<!-- 
 * @description: 房间资料整理
 * @fileName: list_table.vue 
 * @author: 王文涛 
 * @date: 2021-10-21 14:31:40
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
            <el-button type="primary" @click="handleScreen(pageable,'查询')">查询</el-button>
            <el-button @click="handleScreen(pageable,'重置')">重置</el-button>
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
    <!-- <div class="select-box">
      <div class="select_left">
        <span>已选中</span>
        <span style="color: #017cff">4</span>
        <span>项</span>
      </div>
      <div class="select_left" style="color: #017cff">清空</div>
    </div>-->
    <div class="data" style="margin-top: 14px">
      <el-table :data="table_data" style="width: 100%">
        <el-table-column prop="name" label="房间" width="400"></el-table-column>
        <el-table-column prop="typeId" label="户型"></el-table-column>
        <el-table-column prop="type" label="房间类型"></el-table-column>
        <el-table-column prop="buildingArea" label="建筑面积"></el-table-column>
        <el-table-column prop="realArea" label="套内面积"></el-table-column>
        <el-table-column prop="status" label="销售状态"></el-table-column>
        <el-table-column align="left" width="60" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '详情')"
            >详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="table_total > 0"
      :total="table_total"
      :page.sync="pageable.page"
      :limit.sync="pageable.size"
      @pagination="getHousesGeneral"
    />
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    ></el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  get_houses_list,
  get_houses_detail,
  get_houses_general
} from "@/api/CCRC/housing";
import { get_project_list } from "@/api/CCRC/project";

import {} from "@/utils/validate";
var self = null;
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "room_information",
  data() {
    return {
      project_list: [],
      pageable: {
        page: 1,
        size: 10,
        houseName: "",
        projectId: ""
      },
      table_data: [],
      flt: {},
      table_total: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    getHousesGeneral() {
      // let projectId = this.project_list[0].id;
      get_houses_general({ ...this.pageable }).then(res => {
        this.table_data = res.data.records;
        this.table_total = res.data.total;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.pageable.page = 1;
          self.getHousesGeneral();
          break;
        case "重置":
          self.pageable = {
            page: 1,
            size: 10,
            houseName: "",
            projectId: ""
          };
          self.getHousesGeneral();
          break;
      }
    },
    handleClick(data, type) {
      self = this;
      switch (type) {
        case "详情":
          self.$router.push({
            path: "/CCRC/handle/detail",
            query: { id: data.id }
          });
          break;
      }
    }
  },
  mounted() {
    // this.getHousessList()
    this.pageable.projectId = this.$route.query.projectId;
    console.log(this.pageable.projectId);

    this.getHousesGeneral();
    this.getProjectList();
  }
};
</script>
<style lang='scss' scoped>
</style>
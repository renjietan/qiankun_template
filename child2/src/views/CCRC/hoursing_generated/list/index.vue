<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 11:03:04
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true" style="margin-top: 24px">
        <el-row>
          <el-col :span="19">
            <el-row>
              <el-col :span="8">
                <el-form-item class="filter" label="项目：">
                  <el-select v-model="flt.projectId" placeholder="请选择">
                    <el-option
                      v-for="item in project_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 15px">
        <div>房源生成表</div>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">新建项目</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        row-key="name"
        default-expand-all
        :tree-props="{ children: 'districts', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="项目/分区/楼栋"></el-table-column>
        <!-- <el-table-column
          prop="num"
          label="房间数量"
          width="180"
        ></el-table-column>
        <el-table-column prop="address" label="建筑面积"></el-table-column>
        <el-table-column prop="address" label="套内面积"></el-table-column>-->
        <el-table-column align="left" width="300" label="操作">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.type == '项目'"
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '新增分区')"
            >新增分区</el-link>
            <el-link
              v-if="scope.row.type == '项目'"
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '编辑项目')"
            >编辑项目</el-link>
            <el-link
              v-if="scope.row.type == '项目'"
              :underline="false"
              type="danger"
              :disabled=" scope.row.deletable == 'ENABLE' ? true : false"
              @click.native="handleClick(scope.row, '删除项目')"
            >删除项目</el-link>
            <el-link
              :underline="false"
              type="warning"
              v-if="scope.row.type == '分区'&& scope.row.name!='无分区'"
              @click.native="handleClick(scope.row, '编辑分区')"
            >编辑分区</el-link>
            <el-link
              v-if="scope.row.type == '分区'&& scope.row.name!='无分区'"
              :underline="false"
              type="danger"
              :disabled=" scope.row.deletable == 'ENABLE' ? true : false"
              @click.native="handleClick(scope.row, '删除分区')"
            >删除分区</el-link>
            <el-link
              v-if="scope.row.type == '楼栋'"
              :underline="false"
              type="warning"
              @click.native="handleClick(scope.row, '生成房源')"
            >生成房源</el-link>
            <!-- <el-link
              v-if="scope.row.type == '楼栋'"
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '房源资料')"
            >房源资料</el-link> -->
            <el-link
              v-if="scope.row.type != '楼栋'&& scope.row.name!='无分区'"
              :underline="false"
              type="primary"
              @click.native="handleClick(scope.row, '新增楼栋')"
            >新增楼栋</el-link>
            <el-link
              v-if="scope.row.type == '楼栋'"
              :underline="false"
              :disabled=" scope.row.deletable == 'ENABLE' ? true : false"
              type="danger"
              @click.native="handleClick(scope.row, '删除楼栋')"
            >删除楼栋</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.page"
        :limit.sync="flt.size"
        style="text-align:right"
        @pagination="getList"
      />
    </div>
    <el-dialog
      v-el-drag-dialog
      center
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-row :span="20">
        <el-col :span="2">
          <span>所属项目：</span>
        </el-col>
        <el-col :span="18">
          <span>{{projectName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-divider></el-divider>
      </el-row>
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="24">
            <el-form-item class="must-fill" label="分区名称" prop="name">
              <el-input clearable v-model="form_data.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row v-show="this.dialog_cof.title == '新增楼栋'">
          <el-col :span="24">
            <el-form-item class="must-fill" label="楼栋名称" prop="name">
              <el-input clearable v-model="form_data.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialog_cof.title == '新增分区'
              ? handleSubmit_create()
              : handleSubmit_edit()
          "
        >确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      width="1044px"
      center
      :visible.sync="project.dialog_cof.visible"
      :title="project.dialog_cof.title"
      :destroy-on-close="project.dialog_cof.destroy"
      :close-on-click-modal="project.dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="project_form"
        :model="project_form_data"
        :rules="project_rules"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="24">
            <el-form-item class="must-fill" label="项目名称" prop="name">
              <el-input clearable v-model="project_form_data.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item class="must-fill" label="项目编码" prop="id">
              <el-input clearable v-model="project_form_data.id" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="project.dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit_project">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      width="1246px"
      center
      :visible.sync="build.dialog_cof.visible"
      :title="build.dialog_cof.title"
      :destroy-on-close="build.dialog_cof.destroy"
      :close-on-click-modal="build.dialog_cof.modal"
    >
      <Steaps :data="steaps_hourse" :number="active" />
      <component
        ref="component"
        :is="cur_tag.component"
        :key="cur_tag.name"
        :datas="data"
        @backup_type="backup_type"
        @nextsteap_type="nextsteap_type"
        @close_type="close_type"
        @submithouse="submithouse"
        :type="types"
      ></component>
      <!-- <div class="foot">
        <el-divider></el-divider>
        <el-button
          :disabled="active == 1 ? true : false"
          type="primary"
          @click="submitForm('hourse', 'back')"
          class="btn"
          >上一步</el-button
        >
        <el-button
          :disabled="active == steaps_hourse.length ? true : false"
          type="primary"
          @click="submitForm('hourse', 'next')"
          class="btn"
          >下一步</el-button
        >

        <el-button class="btn" @click="resetForm('hourse')">取消</el-button>
      </div>-->
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      width="1246px"
      center
      :visible.sync="floor.dialog_cof_floor.visible"
      :title="floor.dialog_cof_floor.title"
      :destroy-on-close="floor.dialog_cof_floor.destroy"
      :close-on-click-modal="floor.dialog_cof_floor.modal"
    >
      <Steaps :data="steaps_floor" :number="active_floor" />
      <component
        ref="component"
        :is="cur_tag_hourse.component"
        :key="cur_tag_hourse.name"
        :datas="cur_tag_hourse.data"
        @backup="backup"
        @nextsteap="nextsteap"
        @closeTap="closeTap"
        @submit="submit"
        @change="getValue"
      ></component>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { isNull, debounce } from "@/utils/index";
import {
  get_project,
  add_project,
  add_projec_districtst,
  add_projec_districtst_buildings,
  modify_projec_districtst,
  modify_project,
  get_project_list,
  delete_projec,
  delete_buildings,
  delete_districts
} from "@/api/CCRC/project";
import Steaps from "@/components/steaps/index.vue";
import SettingFloor from "./handle/settingFloor.vue";
import SettingNum from "./handle/settingNum.vue";
import SettingName from "./handle/settingName.vue";
import SettingRoomeNumber from "./handle/settingRoomNumber.vue";
import SettingType from "./handle/settingType.vue";
import selectTeleplate from "./handle/selectTeleplate.vue";
import { setFloorInfo } from "@/utils/auth";
import { create_building_houses } from "@/api/CCRC/housing";
import { toThousandFilter } from "@/filters";
export default {
  components: {
    Pagination,
    Steaps,
    SettingFloor,
    SettingNum,
    SettingName,
    SettingType,
    SettingRoomeNumber,
    selectTeleplate
  },
  directives: { waves, permission, elDragDialog },
  name: "HOURSE_GENERATED",
  data() {
    return {
      oldName: "",
      projectName: "",
      disabled: false,
      isShowAction: undefined,
      cur_tag: {},
      project_list: [],
      cur_tag_hourse: {},
      steaps_floor: [
        {
          name: "选择模版",
          component: "selectTeleplate",
          data: null
        },
        {
          name: "设置层数",
          component: "SettingFloor",
          data: {
            floor: undefined,
            unit: undefined,
            name: ""
          }
        },
        {
          name: "设置楼层名称",
          component: "SettingName",
          data: null
        }
      ],
      steaps_hourse: [
        {
          name: "设置户型",
          component: "SettingNum",
          data: null
        },
        {
          name: "设置房号户型",
          component: "SettingRoomeNumber",
          data: {}
        },
        {
          name: "设置房间号码",
          component: "SettingType",
          data: null
        }
      ],
      disabled: false,
      active: 1,
      active_floor: 1,
      flt: {
        projectId: undefined,
        page: 1,
        size: 10
      },
      tableData: [],
      form_data: {
        name: "" //分区/楼名称
      },
      project_form_data: {
        name: "", //项目名称
        id: "" //项目名称
      },
      dialog_cof: {
        visible: false,
        title: "",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      project_rules: {
        name: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      table_total: 0,
      project: {
        dialog_cof: {
          visible: false,
          title: "新建项目",
          escape: false,
          destroy: true,
          modal: false
        }
      },
      build: {
        dialog_cof: {
          visible: false,
          title: "生成房源",
          escape: false,
          destroy: true,
          modal: false
        }
      },
      data: {},
      floorName: "",
      districtName: "",
      options: [],
      floor: {
        dialog_cof_floor: {
          visible: false,
          title: "生成房源",
          escape: false,
          destroy: true,
          modal: false
        }
      },
      types: []
    };
  },
  methods: {
    getList() {
      get_project(this.flt).then(res => {
        this.tableData = this.arrayToTree(res.data.records);
        this.table_total = res.data.total;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    handleCreate() {
      this.project.dialog_cof.visible = true;
    },
    getValue(e) {
      this.floorName = e;
    },
    //新增分区
    handleSubmit_create() {
      let self = this;
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          if (!!this.form_data.name) {
            add_projec_districtst(this.project_form_data.id, {
              name: this.form_data.name
            }).then(res => {
              this.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
              this.dialog_cof.visible = false;
              this.getList();
            });
          } else {
            this.$notify({
              type: "info",
              message: "新增失败",
              title: "失败"
            });
          }
        }
      });
    },
    //编辑分区
    handleSubmit_edit() {
      let self = this;
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          if (!!this.form_data.name) {
            modify_projec_districtst(this.project_form_data.id, {
              name: this.form_data.name,
              oldName: this.oldName
            }).then(res => {
              this.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功"
              });
              this.dialog_cof.visible = false;
              this.getList();
            });
          } else {
            this.$notify({
              type: "info",
              message: "编辑失败",
              title: "失败"
            });
          }
        }
      });
    },
    // 新增楼层-----上一步
    backup(e) {
      this.active_floor = e;
      this.cur_tag_hourse = this.steaps_floor[e - 1];
    },
    // 新增楼层----下一步
    nextsteap(e) {
      this.active_floor = e;
      this.cur_tag_hourse = this.steaps_floor[e - 1];
    },
    // 新增楼层---取消按钮
    closeTap() {
      this.active_floor = 1;
      this.cur_tag_hourse = this.steaps_floor[0];
      localStorage.clear();
      this.floor.dialog_cof_floor.visible = false;
    },
    // 生成房源----上一步
    backup_type(e) {
      // this.active_floor = 1;
      this.active = e;
      this.cur_tag = this.steaps_hourse[e - 1];
    },
    // 生成房源----下一步
    nextsteap_type(index, types) {
      this.active = index;
      this.types = types;
      // this.cur_tag.data = types
      this.cur_tag = this.steaps_hourse[index - 1];
    },
    // 生成房源----取消按钮
    close_type() {
      this.active = 1;
      this.cur_tag = this.steaps_hourse[0];
      this.build.dialog_cof.visible = false;
    },
    // 新增楼层
    submit(e) {
      const { floor, unit } = e;
      const { name, id } = this.project_form_data;
      let parms = {
        name: "",
        units: [],
        floors: [],
        numOfUnit: [],
        districtName: null
      };
      parms.name = this.floorName;
      parms.districtName = name ?? null;
      parms.units = unit.map(e => e.unitName);
      parms.floors = floor.map(e => e.name);
      parms.numOfUnit = unit.map(e => e.num);
      add_projec_districtst_buildings(id, parms).then(res => {
        this.$notify({
          type: "success",
          message: "新增成功",
          title: "成功"
        });
        this.floor.dialog_cof_floor.visible = false;

        this.getList();
      });
    },
    // 新增房源
    submithouse(e) {
      console.log(e);

      const { temp, num } = e;
      let buildingNum = num;
      const { name, projectId } = this.project_form_data;
      console.log(projectId, temp);
      // let parms = {
      //   name: "",
      //   units: [],
      //   floors: [],
      //   numOfUnit: [],
      // };

      create_building_houses(projectId, buildingNum, temp).then(res => {
        this.$notify({
          type: "success",
          message: "新增成功",
          title: "成功"
        });
        this.build.dialog_cof.visible = false;

        this.getList();
      });
    },

    handleSubmit_project() {
      let self = this;
      let params = {
        name: self.project_form_data.name,
        id: self.project_form_data.id
      };
      self.$refs["project_form"].validate(vaild => {
        if (vaild) {
          if (self.project.dialog_cof.title == "新建项目") {
            add_project(params).then(res => {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
              self.getList();
            });
            self.project.dialog_cof.visible = false;
          } else {
            let id = self.project_form_data.id;
            modify_project(id, params).then(res => {
              self.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功"
              });
              self.getList();
            });
            self.project.dialog_cof.visible = false;
          }
        }
      });
    },
    arrayToTree(array) {
      return !!array
        ? array.map(el => {
            el.districts = el.districts ?? el.buildings ?? [];
            this.arrayToTree(el.districts);
            return el;
          })
        : [];
    },
    reset_flt() {
      this.flt = {
        name: undefined,
        page: 1,
        size: 10
      };
      this.getList();
    },
    handleClick(data, type) {
      console.log(data);
      let self = this;

      switch (type) {
        case "新增分区":
          self.projectName = data.name;

          self.project_form_data.id = data.id;
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "新增分区";
          break;
        case "编辑项目":
          self.project.dialog_cof.visible = true;
          self.project.dialog_cof.title = "编辑项目";
          self.project_form_data.name = data.name;
          self.project_form_data.id = data.id;
          self.disabled = true;
          break;
        case "新增楼栋":
          localStorage.clear();
          self.active_floor = 1;
          self.cur_tag_hourse = this.steaps_floor[0];
          self.project_form_data.id = data.projectId ?? data.id ;
          self.project_form_data.name = !!data.projectId ? data.name : null;
          self.floor.dialog_cof_floor.visible = true;
          self.floor.dialog_cof_floor.title = "新增楼栋";
          break;
        case "编辑分区":
          self.projectName = data.projectName;
          self.dialog_cof.title = "编辑分区";
          self.oldName = data.name;
          self.form_data.name = data.name;
          self.project_form_data.id = data.projectId;
          self.dialog_cof.visible = true;
          break;
        case "生成房源":
          self.active = 1;
          self.project_form_data.projectId = data.projectId;
          self.build.dialog_cof.visible = true;
          self.data = data;
          break;
        case "房源资料":
          self.$router.push({
            path: "/CCRC/list/index",
            query: { projectId: data.projectId }
          });
          break;
        case "删除项目":
          if (data.deletable !== "ENABLE") {
            let id = data.id;
            self
              .$confirm(`删除, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                delete_projec(id).then(res => {
                  self.$notify({
                    type: "success",
                    message: "操作成功!",
                    title: ""
                  });
                  self.getList();
                });
              })
              .catch(() => {
                self.$message({
                  type: "info",
                  message: "已取消"
                });
              });
          }

          break;
        case "删除分区":
          if (data.deletable !== "ENABLE") {
            let districtsId = data.projectId;
            let districtsName = data.name;
            self
              .$confirm(`删除, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                delete_districts(districtsId, districtsName).then(res => {
                  self.$notify({
                    type: "success",
                    message: "操作成功!",
                    title: ""
                  });
                  self.getList();
                });
              })
              .catch(() => {
                self.$message({
                  type: "info",
                  message: "已取消"
                });
              });
          }

          break;
        case "删除楼栋":
          if (data.deletable !== "ENABLE") {
            let buildingId = data.projectId ?? data.id;
            let buildingNum = data.num;
            self
              .$confirm(`删除, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                delete_buildings(buildingId, buildingNum).then(res => {
                  self.$notify({
                    type: "success",
                    message: "操作成功!",
                    title: ""
                  });
                  self.getList();
                });
              })
              .catch(() => {
                self.$message({
                  type: "info",
                  message: "已取消"
                });
              });
            break;
          }
      }
    }
  },
  mounted() {
    this.getList();
    this.getProjectList();
    this.cur_tag = this.steaps_hourse[0];
    this.cur_tag_hourse = this.steaps_floor[0];
  }
};
</script>
<style lang='scss' scoped>
</style>
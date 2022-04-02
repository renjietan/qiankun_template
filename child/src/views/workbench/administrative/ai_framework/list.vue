<!-- 
 * @description: 职能架构
 * @fileName: administrative_ai_framework_list.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:40:56
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title">职能架构管理</div>
      <el-row :gutter="40">
        <el-col :span="5">
          <div class="left-box">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px;">部门</div>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button
                  style="transform: scale(0.9);"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleCreate('部门','添加部门')"
                >添加</el-button>
              </el-col>
            </el-row>
            <div
              class="infinite-list-wrapper"
              style="overflow:auto; height: calc(100% - 28px);padding-left:8px;padding-top:12px"
            >
              <!-- <ul style="padding: 0">
                <li v-for="(item,index) in department_list" :key="index" style="list-style: none">
                  <div :class="['left-box-item', cur_dep == index ? 'left-box-item-active' : '']"
                    @click="handleSwitch_dep(item,index)">
                    <el-row>
                      <el-col :span="18">{{ item.depmName }}</el-col>
                      <el-col :span="6" style="text-align: right;">
                        <i @click="handleEdit(item,'部门','编辑部门')" class="el-icon-edit icon-primary"
                          style="margin-right: 3ox;"></i>
                        <i @click="handleDel(item)" class="el-icon-circle-close icon-close"></i>
                      </el-col>
                    </el-row>
                  </div>
                </li>
              </ul>-->
              <el-tree
                class="el-tree-custom"
                :props="props_department"
                :data="department_list"
                :show-checkbox="false"
                node-key="id"
                ref="newTopRightsTree"
                :expand-on-click-node="false"
                :default-checked-keys="defaultCheck"
                @node-click="handleSwitch_dep"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <i
                      @click="handleEdit(data,'部门','编辑部门')"
                      class="el-icon-edit icon-primary"
                      style="margin-right: 3ox;"
                    ></i>
                    <i @click="handleDel(data)" class="el-icon-circle-close icon-close"></i>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="left-box">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px;">职位</div>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button
                  style="transform: scale(0.9);"
                  size="mini"
                  type="primary"
                  @click="handleCreate('职位','添加职位')"
                  icon="el-icon-plus"
                >添加</el-button>
              </el-col>
            </el-row>
            <div
              class="infinite-list-wrapper"
              style="overflow:auto; height: calc(100% - 28px);padding-left:8px;padding-top:12px"
            >
              <!-- <ul style="padding: 0">
                <li v-for="item in position_list" :key="item.id" style="list-style: none">
                  <div
                    :class="['left-box-item', cur_job == item ? 'left-box-item-active' : '']"
                    @click="handleSwitch_job(item)"
                  >
                    <el-row>
                      <el-col :span="18">{{ item.positionName }}</el-col>
                      <el-col :span="6" style="text-align: right;">
                        <i
                          @click="handleEdit(item,'职位','编辑职位')"
                          class="el-icon-edit icon-primary"
                          style="margin-right: 3ox;"
                        ></i>
                        <i @click="handleDelPosition(item)" class="el-icon-circle-close icon-close"></i>
                      </el-col>
                    </el-row>
                  </div>
                </li>
              </ul>-->
              <el-tree
                class="el-tree-custom"
                :props="props_position"
                :data="position_list"
                :show-checkbox="false"
                node-key="id"
                ref="newTopLeftsTree"
                :expand-on-click-node="false"
                :default-checked-keys="defaultCheck"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <i
                      @click="handleEdit(data,'职位','编辑职位')"
                      class="el-icon-edit icon-primary"
                      style="margin-right: 3ox;"
                    ></i>
                    <i @click="handleDelPosition(data)" class="el-icon-circle-close icon-close"></i>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="right-box">
            <div class="right-box-title">
              <div class="title" style="font-size: 14px;">职能架构图</div>
              <tree-canvas :data="origin_list"></tree-canvas>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      v-el-drag-dialog
      class="el-dialog-2"
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
      >
        <el-row :gutter="40">
          <el-col :span="12" v-if="dialog_cof.title.indexOf('部门') >= 0">
            <el-form-item class="must-fill" label="部门名称" prop="depmName">
              <el-input clearable v-model="form_data.depmName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dialog_cof.title.indexOf('部门') >= 0">
            <el-form-item class="default" label="上级部门" prop="upDepm">
              <el-cascader
                v-model="form_data.upDepm"
                :options="department_list"
                :show-all-levels="false"
                :props="{ checkStrictly: true ,
                  value: 'id',
                  label: 'depmName',
                  }"
              ></el-cascader>
              <!-- <el-select v-model="form_data.upDepm" clearable placeholder="请选择">
                <el-option
                  v-for="item in department_list"
                  :key="item.id"
                  :label="item.depmName"
                  :value="item.id"
                ></el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item class="readonly" label="所属部门" prop="blongDepm">
               <el-cascader
                :disabled="true"

                v-model="form_data.blongDepm"
                :options="department_list"
                :show-all-levels="false"
                :props="{ checkStrictly: true ,
                  value: 'id',
                  label: 'depmName',
                  }"
              ></el-cascader>
              <!-- <el-select
                :disabled="true"
                readonly
                v-model="form_data.blongDepm"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in department_list"
                  :key="item.id"
                  :label="item.depmName"
                  :value="item.id"
                ></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dialog_cof.title.indexOf('职位') >= 0">
            <el-form-item class="must-fill" label="职位名称" prop="positionName">
              <el-input clearable v-model="form_data.positionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dialog_cof.title.indexOf('职位') >= 0">
            <el-form-item class="default" label="上级职位" prop="upPosId">
               <el-cascader
                v-model="form_data.upPosId"
                :options="position_list"
                :show-all-levels="false"
                :props="{ checkStrictly: true ,
                  value: 'id',
                  label: 'positionName',
                  }"
              ></el-cascader>
              <!-- <el-input clearable v-model="form_data.upPosId"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="24" v-if="dialog_cof.title.indexOf('部门') >= 0">
            <el-form-item class="default" label="部门描述" prop="depmDesc">
              <el-input type="textarea" clearable v-model="form_data.depmDesc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="dialog_cof.title.indexOf('职位') >= 0">
            <el-form-item class="default" label="职位描述" prop="positionDesc">
              <el-input type="textarea" clearable v-model="form_data.positionDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import TreeCanvas from "@/components/tree_canvas";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { mapGetters } from "vuex";
import {} from "@/utils/validate";
// import { data } from "@/utils/test_data/data";
import { handleType, isTrue, fee_type } from "@/utils/enum";
import {
  get_all_department,
  add_department,
  modify_del_department,
  get_position,
  add_position,
  modify_del_position,
  get_organize
} from "@/api/pensionagency/administrative/administrative";
import { param, parseOrgInfo } from "@/utils";
export default {
  name: "administrative_ai_framework_list",
  components: { Pagination, TreeCanvas },
  directives: { waves, permission, elDragDialog },

  data() {
    return {
      props_department: {
        label: function(data, node) {
          return data.depmName;
        }
      },
      props_position: {
        label: function(data, node) {
          return data.positionName;
        }
      },
      blongDepm: 1,
      cur_dep: 0,
      cur_job: null,
      depmName: "",
      department_list: [],
      position_list: [],
      defaultCheck: [],
      loading: false,
      // data: [],
      origin_list: [],
      form_data: {
        id: "",
        upDepm: undefined, //上级部门
        upPosId: undefined, //上级职位
        dep_id: undefined, //部门ID
        depmName: "", //部门名称
        depmDesc: "", //描述
        positionDesc: "", //职位描述
        positionName: "" //职位名称
      },
      rules: {
        depmName: [{ required: true, message: "不可为空", trigger: "change" }],
        positionName: [
          { required: true, message: "不可为空", trigger: "change" }
        ]
      },
      dialog_cof: {
        visible: false,
        title: "添加职位",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  computed: {},
  created() {
    this.getAllDepartment();
    this.getPosition();
    this.getOrganize();
  },
  methods: {
    // 获取职位列表
    getPosition() {
      get_position({ blongDepm: this.blongDepm }).then(res => {
        this.position_list = res;
      });
    },
    //获取部门列表
    getAllDepartment() {
      get_all_department({ centerId: this.centerId }).then(res => {
        this.department_list = res;
      });
    },
    // getAllDepartment() {
    //   this.$nextTick(() => {
    //     this.$refs.newTopRightsTree.setCheckedKeys([]);
    //   });
    //   get_all_department({ centerId: this.centerId }).then(res => {
    //     this.defaultCheck = res;
    //   });
    // },
    // 获取职能架构
    getOrganize() {
      get_organize().then(res => {
        let temp = res ?? {};
        let self = this;
        // if (temp.centerId) {
        //   temp.nodeId = temp.centerId;
        //   delete temp.centerId
        //   temp.parentNodeId = null;
        //   temp.width = 250;
        //   temp.height = 90;
        //   temp.borderWidth = 1;
        //   temp.borderRadius = 5;
        //   temp.borderColor = {
        //     red: 1,
        //     green: 124,
        //     blue: 255,
        //     alpha: 1
        //   };
        //   temp.backgroundColor = {
        //     red: 1,
        //     green: 124,
        //     blue: 255,
        //     alpha: 0.8
        //   };
        //   temp.connectorLineColor = {
        //     red: 1,
        //     green: 124,
        //     blue: 255,
        //     alpha: 1
        //   };
        //   temp.connectorLineWidth = 5;
        //   temp.dashArray = "";
        //   temp.expanded = true;
        //   temp.template = `<div style="text-align:center; font-size:30px;line-height: 90px">${temp.centerName}</div>`;
        //  }
        if (temp.departmentInfo) {
          // let r = parseOrgInfo(temp.departmentInfo);
          let r = parseOrgInfo([temp]);
          self.origin_list = r;
        } else {
          self.origin_list = {};
        }
      });
    },
    handleSwitch_dep(data) {
      this.blongDepm = data.id;
      this.getPosition();
    },
    handleSwitch_job(item) {
      this.cur_job = item;
    },
    handleEdit(item, type, title) {
      this.reset();
      this.dialog_cof.type = type;
      this.dialog_cof.title = `${title}`;
      this.dialog_cof.visible = true;
      switch (type) {
        case "部门":
          this.form_data.id = item.id;
          this.form_data.depmName = item.depmName;
          this.form_data.depmDesc = item.depmDesc;
          this.form_data.upDepm = item.upDepm;
          break;
        case "职位":
          this.form_data.id = item.id;
          this.form_data.blongDepm = item.blongDepm;
          this.form_data.positionName = item.positionName;
          this.form_data.positionDesc = item.positionDesc;
          this.form_data.upPosId = item.upPosId;
          break;
        default:
          break;
      }
    },
    handleDel(item) {
      let self = this;
      let params = {
        id: item.id,
        operaType: handleType["删除"]
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modify_del_department(params).then(async res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getAllDepartment();
            self.getOrganize();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleDelPosition(item) {
      let self = this;
      let params = {
        id: item.id,
        operaType: handleType["删除"]
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modify_del_position(params).then(async res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getPosition();
            self.getOrganize();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleCreate(type, title) {
      let self = this;
      self.dialog_cof.type = type;
      self.dialog_cof.title = `${title}`;
      self.dialog_cof.visible = true;
      self.$nextTick(() => {
        self.$refs["form"].clearValidate();
      });

      self.reset();
      switch (type) {
        case "部门":
          break;
        case "职位":
          self.form_data.blongDepm = self.blongDepm;
          break;
        default:
          break;
      }
    },
    reset() {
      this.form_data = {
        upPosId: undefined, //上级职位
        upDepm: undefined, //上级部门
        blongDepm: "", //所属部门
        id: "",
        depmName: "", //部门名称
        depmDesc: "", //描述
        positionDesc: "", //职位描述
        positionName: "" //职位名称
      };
    },
    handleSubmit() {
      let self = this;
      let params = {};
      self.$refs["form"].validate(isvaild => {
        if (isvaild) {
          switch (self.dialog_cof.title) {
            case "添加部门":
              params = {
                upDepm: self.form_data.upDepm[self.form_data.upDepm.length - 1]
                  ? self.form_data.upDepm[self.form_data.upDepm.length - 1]
                  : 0,
                depmName: self.form_data.depmName,
                depmDesc: self.form_data.depmDesc
              };
              add_department(params).then(res => {
                self.$notify({
                  type: "success",
                  message: "新增部门成功",
                  title: "成功"
                });
                self.getAllDepartment();
                self.getOrganize();
                self.dialog_cof.visible = false;
              });
              break;

            case "编辑部门":
              params = {
                upDepm: self.form_data.upDepm ? self.form_data.upDepm : 0,
                depmName: self.form_data.depmName,
                depmDesc: self.form_data.depmDesc,
                id: self.form_data.id,
                operaType: handleType["编辑"]
              };

              modify_del_department(params).then(async res => {
                self.$notify({
                  type: "success",
                  message: "操作成功!",
                  title: ""
                });
                self.getAllDepartment();
                self.getOrganize();
                self.dialog_cof.visible = false;
              });

              break;
            case "添加职位":
              params = {
                blongDepm: self.form_data.blongDepm,
                upPosId: self.form_data.upPosId[self.form_data.upPosId.length - 1]  ,
                positionDesc: self.form_data.positionDesc,
                positionName: self.form_data.positionName
              };
              add_position(params).then(res => {
                self.$notify({
                  type: "success",
                  message: "新增成功",
                  title: "成功"
                });
                self.getPosition();
                self.getOrganize();
                self.dialog_cof.visible = false;
              });
              break;
            case "编辑职位":
              params = {
                upPosId: self.form_data.upPosId[self.form_data.upPosId.length - 1],
                positionDesc: self.form_data.positionDesc,
                positionName: self.form_data.positionName,
                id: self.form_data.id,
                operaType: handleType["编辑"]
              };
              modify_del_position(params).then(async res => {
                self.$notify({
                  type: "success",
                  message: "操作成功!",
                  title: ""
                });
                self.getPosition();
                self.getOrganize();
              });
              break;
          }
          this.dialog_cof.visible = false;
        } else {
          return false;
        }
      });
      // self.$refs["dishFrom"].resetFields();
      // self.$refs["dishFrom"].clearValidate();
    }
  },
  mounted() {
    // this.data = data;
  }
};
</script>
<style lang='scss' scoped>
.el-tree-custom {
  font-weight: bold;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // font-size: 14px;
  padding-right: 8px;
}
</style>
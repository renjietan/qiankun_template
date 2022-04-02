<!-- 
 * @description: 服务等级管理
 * @fileName: service_level_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 16:02:41
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title">服务等级管理</div>
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="left-box" v-loading="service_level.loading">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px;">服务等级</div>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-plus"
                  @click="handleCreate('添加服务等级')">添加</el-button>
              </el-col>
            </el-row>
            <div class="infinite-list-wrapper" style="overflow:auto; height: calc(100% - 40px);">
              <ul style="padding: 0">
                <li v-for="(item,index) in service_level.data" :key="item.id" style="list-style: none">
                  <div :class="['left-box-item', cur_server_level == index ? 'left-box-item-active' : '' ]"
                    @click="handleSwitch_dep(item,index)">
                    <el-row style="margin-bottom: 15px;">
                      <el-col :span="18">{{ item.levelName}}</el-col>
                      <el-col :span="6" style="text-align: right;">
                        <i @click="handleEdit(item,'服务等级', '编辑服务等级')" class="el-icon-edit icon-primary"></i>
                        <i class="el-icon-circle-close icon-close" @click="handleDel(item)"></i>
                      </el-col>
                    </el-row>
                    <el-row style="color: silver;">
                      <el-col :span="8">
                        <div style="text-overflow: ellipsis; white-space: nowrap;">套餐：{{ item.cimboName }}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>费用：{{ item.cimboFee }}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>项目：{{ item.projectSize }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="box" style="height:800px;overflow-y: scroll;">
            <div class="title sub-title">
              服务项目
              <el-col :span="12" style="text-align: right;">
                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-tickets"
                  @click="handleSave">保存</el-button>
              </el-col>
            </div>

            <div class="content">
              <div class="content-item" v-for="(item, index) in data_list" :key="index">
                <div class="title child-title">{{ index | classification }}项目</div>
                <el-row :gutter="40">
                  <el-col :span="8" v-for="(child,index) in item" :key="index">
                    <div :class="['row-item', id_list[child.id] == true ? 'row-item-actived' : '' ]">
                      <div class="row-item-header">
                        <el-checkbox v-model="id_list[child.id]">{{child.projectName}}</el-checkbox>
                        <span>实施记录</span>
                      </div>
                      <div style="margin-left:16px">
                        <el-row style="margin-top:20px">
                          <el-col :span="11">
                            <div style="display:flex">
                              <span style="width:50px;color:#000000;font-size:14px;line-height:34px">频率</span>
                              <el-select clearable v-model="child.cycle" :disabled="true" placeholder="请选择">
                                <el-option v-for="item in server_fre" :key="item.value" :label="item.label"
                                  :value="item.value"></el-option>
                              </el-select>
                            </div>
                          </el-col>
                          <el-col :span="11" :offset="1">
                            <div style="display:flex">
                              <span style="width:38px;color:#000000;font-size:14px;line-height:34px">次数</span>
                              <el-input v-model="child.frequency" :disabled="true" placeholder="请输入"
                                style="width:122px;"></el-input>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                          <el-col :span="24">
                            <div>
                              <span style="width:38px;color:#000000;font-size:14px">时间</span>
                              <el-select :disabled="true" v-model="child.time" style="width:294px;" placeholder="请选择">
                                <el-option v-for="item in bt_getTime" :key="item" :label="item" :value="item">
                                </el-option>
                              </el-select>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="服务等级" prop="levelName">
              <el-input v-model="form_data.levelName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item class="must-fill" label="服务套餐" prop="cimboName">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="套餐费用" prop="cimboFee">
              <el-input v-model="form_data.cimboFee" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item class="must-fill" label="能力评估等级" prop="abilityLevel">
              <el-select clearable v-model="form_data.abilityLevel" placeholder="请选择">
                <el-option v-for="item in assess_level_opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input v-model="form_data.abilityLevel" placeholder="请输入"></el-input> -->
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
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import { server_fre, isTrue, server_status, handleType } from "@/utils/enum";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { mapGetters } from "vuex";
  import { bt_getTime, arrayGroupBy } from "@/utils/index";
  import { evaluation_level_list } from "@/utils/enum";
  import {
    add_service_level,
    manager_service_level,
    all_service_level,
    query_batch_server,
    add_level_projec,
    query_by_lv_id
  } from "@/api/pensionagency/basicConfig/basicConfig";
  import { isNumber_mustFill } from "@/utils/validate";
  export default {
    name: "basicConfig_service_level_mg",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },

    data() {
      return {
        assess_level_opt: evaluation_level_list,
        lvId:47,
        checked: false,
        cur_server_level: 0,
        server_fre,
        bt_getTime: bt_getTime(),
        flt: {
          pageNumber: 1,
          pageSize: 10
        },
        id_list: {}, //获取项目列表
        data_list: [], //数据列表
        service_level: {
          loading: false,
          data: []
        },
        dialog_cof: {
          type: "",
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false
        },
        form_data: {
          id: null,
          cimboName: "", //套餐名称
          levelName: "", //服务等级
          cimboFee: "", //套餐费用
          abilityLevel: undefined //能力评估等级
        },
        rules: {
          levelName: [{ required: true, message: "不可为空", trigger: "change" }],
          cimboName: [{ required: true, message: "不可为空", trigger: "change" }],
          abilityLevel: [{ required: true, message: "不可为空", trigger: "change" }],
          cimboFee: [{ required: true, message: "不可为空", trigger: "change" }, {
            validator: isNumber_mustFill
          }]
        }
      };
    },

    filters: {
      classification(type) {
        let classificationName = "";
        switch (type) {
          case "CM":
            classificationName = "公共";
            break;
          case "LF":
            classificationName = "生活";
            break;
          case "ME":
            classificationName = "膳食";
            break;
          case "MD":
            classificationName = "医疗";
            break;
          case "RE":
            classificationName = "康复";
            break;
          case "MI":
            classificationName = "心理";
            break;
          case "RC":
            classificationName = "娱乐";
            break;
        }
        return classificationName;
      }
    },
    methods: {
      getList() {
        all_service_level().then(res => {
          this.service_level.data = res;
        });
      },
      async getProjectList() {
        let params = {
          // pageNum: this.flt.pageNumber,
          // pageSize: this.flt.pageSize
        };
        let data = await query_batch_server(params);
        data = data?.result ?? [];
        data.forEach(item => {
          this.$set(this.id_list, `${item.id}`, false);
        });
        this.data_list = arrayGroupBy(data, "projectType");
      },

      handleCreate(title) {
        let self = this;
        self.dialog_cof.title = `${title}`;
        self.dialog_cof.visible = true;
        self.$nextTick(() => {
          self.$refs["form"].clearValidate();
        });

        self.reset();
      },
      reset() {
        this.form_data = {
          id: null,
          cimboName: "",
          levelName: "",
          cimboFee: "",
          abilityLevel: undefined,
        };
      },
      handleEdit(item, type, title) {
        this.reset();
        this.dialog_cof.type = type;
        this.dialog_cof.title = `${title}`;
        this.dialog_cof.visible = true;
        this.form_data.id = item.id;
        this.form_data.cimboName = item.cimboName;
        this.form_data.levelName = item.levelName;
        this.form_data.cimboFee = item.cimboFee;
        this.form_data.abilityLevel = `${ item.abilityLevel }`
      },
      handleDel(item) {
        let self = this;
        let params = {
          id: item.id,
          operateType: handleType["删除"]
        };
        this.$confirm(`删除, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            manager_service_level(params).then(async res => {
              self.$notify({
                type: "success",
                message: "删除成功!",
                title: ""
              });
              self.cur_server_level = 0;

              self.getList();

              self.getProject((self.lvId = self.service_level.data[0].id));
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: `已取消`
            });
          });
      },
      handleSubmit() {
        let self = this;
        let params = {};
        self.$refs["form"].validate(async valid => {
          if (valid) {
            switch (self.dialog_cof.title) {
              case "添加服务等级":
                params = {
                  cimboName: self.form_data.cimboName,
                  levelName: self.form_data.levelName,
                  cimboFee: Number(self.form_data.cimboFee),
                  abilityLevel: self.form_data.abilityLevel
                };
                add_service_level(params).then(res => {
                  self.$notify({
                    type: "success",
                    message: "新增服务等级成功",
                    title: "成功"
                  });
                  self.getList();
                  self.dialog_cof.visible = false;
                });

                break;
              case "编辑服务等级":
                params = {
                  cimboName: self.form_data.cimboName,
                  levelName: self.form_data.levelName,
                  cimboFee: Number(self.form_data.cimboFee),
                  id: Number(self.form_data.id),
                  abilityLevel: self.form_data.abilityLevel,
                  operateType: handleType["编辑"]
                };
                manager_service_level(params).then(async res => {
                  self.$notify({
                    type: "success",
                    message: "操作成功!",
                    title: ""
                  });
                  self.dialog_cof.visible = false;
                  self.getList();
                });
                break;
              default:
                break;
            }
          }
        });
      },
      handleSave() {
        let self = this;
        let params = [];
        for (let i in this.id_list) {
          if (this.id_list[i]) {
            params.push(i);
          }
        }
        add_level_projec({
          lvId: self.lvId,
          projectIds: params
        }).then(res => {
          self.$notify({
            type: "success",
            message: "保存服务成功",
            title: "成功"
          });
          self.getList();
        });
      },
      handleSwitch_dep(item, index) {
        if (this.lvId == item.id) return;
        this.cur_server_level = index;
        this.lvId = item.id;

        this.getProject();
      },
      // 获取已经勾选项目列表
      getProject() {
        let self = this;
        query_by_lv_id({ lvId: self.lvId }).then(res => {
          for (var i in self.id_list) {
            self.id_list[i] = false;
          }
          (res ?? []).forEach(item => {
            self.id_list[`${item.id}`] = true;
          });
        });
      }
    },

    created() {
      this.getList();
      this.getProjectList();
      this.getProject();
    }
  };
</script>
<style lang='scss' scoped>
  .box {
    margin-top: 20px;
    height: 800px;
    border: 1px solid #d9d9d9;
    margin-top: 20px;

    .sub-title {
      padding: 10px 20px 0 20px;
      line-height: 45px;
      font-size: 14px;
      background: #fafafa;
    }

    .child-title {
      font-size: 14px;
      line-height: 35px;
    }

    .content {
      margin: 20px;

      .content-item {
        .row-item {
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 15px;

          .row-item-header {
            display: flex;
            color: #ff8b43;
            justify-content: space-between;
          }
        }

        .row-item-actived {
          border: 1px solid #017cff;
          background: rgba(1, 124, 255, 0.09);
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 15px;
        }
      }
    }
  }
</style>
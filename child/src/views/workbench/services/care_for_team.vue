<!-- 
 * @description:班次管理 
 * @fileName: care_for_team.vue 
 * @author: 姜纬杰
 * @date: 2021-09-07 15:53:46
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title">班次管理</div>
      <el-row :gutter="40">
        <el-col :span="6">
          <div class="left-box">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px">班次列表</div>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  style="transform: scale(0.9)"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleCreate('添加班次')"
                >添加</el-button>
              </el-col>
            </el-row>
            <div class="infinite-list-wrapper" style="overflow: auto; height: calc(100% - 40px)">
              <ul style="padding: 0">
                <li v-for="(item, index) in shift_list" :key="item.id" style="list-style: none">
                  <div
                    :class="[
                      'left-box-item',
                      curSelect_shift.id == item.id ? 'left-box-item-active' : '',
                    ]"
                    @click="handleSwitch_shift(item,index)"
                  >
                    <el-row>
                      <el-col :span="18">
                        <div class>{{ item.shiftName }}</div>
                        <div style="margin-top: 15px; color: silver">
                          <span class="label">长者数量：{{item.elderNm==null ? 0:item.elderNm}}</span>
                        </div>
                      </el-col>
                      <el-col :span="6" style="text-align: right">
                        <i
                          @click="handleEdit(item, '班次', '编辑班次')"
                          class="el-icon-edit icon-primary"
                          style="margin-right: 3ox"
                        ></i>
                        <i @click="handleDel(item)" class="el-icon-circle-close icon-close"></i>
                      </el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="left-box1" style="min-height: 155px">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px">负责长者</div>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="padding: 0 12px 10px 12px; position: relative">
              <el-checkbox-group v-model="oldList_checked">
                <div v-for="(item, index) in oldList" :key="index">
                  <el-col :span="4">
                    <div
                      style="position: relative; height: 72px"
                      :class="[
                        'content-item',
                        oldList_checked.includes(item.id) ? 'content-active' : '',
                      ]"
                    >
                      <div style="display: flex">
                        <el-avatar :size="32" src="https://empty">
                          <img :src="item.headUrl" />
                        </el-avatar>
                        <div class="content" style="margin-left: 12px">
                          <p style="line-height: 0; font-size: 12px">{{item.elderName}}</p>
                          <p style="line-height: 0; font-size: 12px">{{item.badName}}</p>
                        </div>
                      </div>
                      <el-checkbox
                        @change="handleChange_res"
                        class="checkbox"
                        :false-label="item.id"
                        :true-label="item.id"
                        :label="item.id"
                      ></el-checkbox>
                    </div>
                  </el-col>
                </div>
              </el-checkbox-group>
              <div class="btn" style="bottom: -12px;">
                <el-button size="mini" type="danger" @click="handleDelElders()">删除</el-button>
              </div>
            </el-row>
          </div>
          <div class="left-box2" style="position: relative">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px">所有长者</div>
              </el-col>
            </el-row>
            <el-row style="padding: 15px 24px">
              <el-form :inline="true">
                <el-row>
                  <el-col :span="21">
                    <el-row>
                      <!-- <el-col :span="4">
                        <el-form-item class="filter" label="范围:">
                          <el-select style="width:130px" v-model="flt.processIn" clearable placeholder="请选择">
                            <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                              :value="item.step"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>-->
                      <el-col :span="4">
                        <el-form-item class="filter" label="楼:">
                          <el-select
                            @change="handleChange_building"
                            style="width:145px"
                            v-model="flt.buildId"
                            clearable
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in building_list"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="filter" label="层:">
                          <el-select
                            style="width:145px"
                            v-model="flt.floorId"
                            clearable
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in level_list"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <!-- <el-col :span="4">
                        <el-form-item class="filter" label="户型:">
                          <el-select style="width:130px" v-model="flt.roomType" clearable placeholder="请选择">
                            <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                              :value="item.step"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="filter" label="朝向:">
                          <el-select style="width:130px" v-model="flt.side" clearable placeholder="请选择">
                            <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                              :value="item.step"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>-->
                    </el-row>
                  </el-col>
                  <el-col :span="3" style="text-align: right">
                    <div style="display: inline-block; margin-left: 10px">
                      <el-button type="primary" @click="handleScreen('查询')">查询</el-button>
                      <el-button @click="handleScreen('重置')">重置</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
            <el-row :gutter="10" style="padding: 0 15px">
              <!-- isDisabled(item) && oldListAll_checked.includes(item.id) -->
              <el-checkbox-group v-model="cur_oldListAll_checked">
                <div v-for="(item, index) in oldListAll" :key="index">
                  <el-col :span="4">
                    <div
                      :class="[
                        'content-item',
                        item.checked ? 'content-active' : '',
                      ]"
                      style="position: relative; height: 72px"
                    >
                      <div style="display: flex">
                        <el-avatar :size="32" src="https://empty">
                          <img :src="item.headUrl" />
                        </el-avatar>
                        <div class="content" style="margin-left: 12px">
                          <p style="line-height: 0; font-size: 12px">{{item.elderName}}</p>
                          <p style="line-height: 0; font-size: 12px">{{item.bedName}}</p>
                        </div>
                      </div>
                      <el-checkbox
                        :disabled="isDisabled(item)"
                        @change="handleChange"
                        class="checkbox"
                        :false-label="item.id"
                        :true-label="item.id"
                        :label="item.id"
                      ></el-checkbox>
                    </div>
                  </el-col>
                </div>
              </el-checkbox-group>
            </el-row>
            <div class="btn">
              <el-button size="mini" type="primary" @click="handleAddElders()">添加</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      class="el-dialog-2"
      v-el-drag-dialog
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
          <el-col :span="12">
            <el-form-item class="must-fill" label="班次名称" prop="shiftName">
              <el-input clearable v-model="form_data.shiftName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="班次颜色" prop="color">
              <div class="group-color">
                <div
                  class="group-box"
                  :style="`background:${form_data.color};border:1px solid ${form_data.color}`"
                ></div>
                <el-color-picker color-format="hex" v-model="form_data.color"></el-color-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="班次时间" prop="startTime">
              <el-time-select
                style="width:113px"
                placeholder="起始时间"
                v-model="form_data.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '01:00',
                  end: '24:00'
                }"
              ></el-time-select>
              <span>至</span>
              <el-time-select
                style="width:113px"
                placeholder="结束时间"
                v-model="form_data.endTime"
                :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '24:00',
                    minTime: form_data.startTime
                }"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="关联长者" prop="isRefElder">
              <el-select v-model="form_data.isRefElder" clearable placeholder="请选择">
                <el-option
                  v-for="item in isTrue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="must-fill" label="所属部门" prop="toPos">
              <el-checkbox
                @change="select_dep"
                v-for="item in department_list"
                :key="item.id"
                v-model="item.checked"
              >{{item.depmName}}</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="default" label="说明" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { query_batch_bed, get_house_state } from "@/api/pensionagency/basicConfig/basicConfig";

import {
  all_shift_type,
  get_all_types,
  get_types_byId,
  add_shift_type,
  del_shift_type,
  update_shift_type,
  del_shift_elders,
  get_all_elders,
  add_elders
} from "@/api/pensionagency/servers/serves";
import { get_all_department } from "@/api/pensionagency/administrative/administrative";
import {} from "@/utils/validate";
import { isTrue } from "@/utils/enum";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "care_for_team",
  data() {
    return {
      isTrue,
      building_list: [], //楼
      level_list: [], //层
      shift_list: [], //班次列表
      shift_list_by_time: {},
      shift_list_by_id: {},
      oldList: [], //负责长者
      oldList_checked: [],
      oldListAll: [], //所有长者
      oldListAll_checked: [], //勾选的长者
      cur_oldListAll_checked: [],
      curSelect_shift: {}, //当前选中的班次
      flt: {
        buildId: null,
        floorId: null,
        roomType: null,
        side: null
      },
      status_options: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      department_list: [], //所属部门
      selectedPerson: [],
      rules: {
        shiftName: [{ required: true, message: "不可为空", trigger: "change" }],
        startTime: [{ required: true, message: "不可为空", trigger: "blur" }],
        isRefElder: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        toPos: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      form_loading: false,
      form_data: {
        id: null,
        color: "", //小组颜色,
        endTime: "", //结束时间
        startTime: "", //开始时间
        isRefElder: "", //是否关联长者
        rsv: "", //说明
        shiftName: "", //班次名称
        toPos: [] //所属部门
      }
    };
  },
  methods: {
    handleChange(e) {
      if (this.curSelect_shift.isRefElder == 0) {
        this.$notify({
          title: "提示",
          message: "此班次无法关联长者",
          type: "warning"
        });
        return;
      }
      if (this.cur_oldListAll_checked.includes(e)) {
        this.cur_oldListAll_checked = this.cur_oldListAll_checked.filter(
          item => item != e
        );
        this.oldListAll_checked = this.oldListAll_checked.filter(
          item => item != e
        );
      } else {
        this.cur_oldListAll_checked = [...this.cur_oldListAll_checked, ...[e]];
        this.oldListAll_checked = [...this.oldListAll_checked, ...[e]];
      }
    },
    handleChange_res(e) {
      if (this.oldList_checked.includes(e)) {
        this.oldList_checked = this.oldList_checked.filter(item => item != e);
      } else {
        this.oldList_checked = [...this.oldList_checked, ...[e]];
      }
    },
    //获取所有班次
    async getAllTypes(isInit = true) {
      let shift_list = await get_all_types();
      this.shift_list = shift_list ?? [];
      this.shift_list_by_time = this.shift_list.reduce((cur, pre) => {
        let time = `${pre.startTime} - ${pre.endTime}`;
        if (cur[time] == undefined) {
          cur[time] = [];
        }
        pre.elderList = pre.elderList ?? [];
        cur[time] = [...cur[time], ...pre.elderList];
        return cur;
      }, {});
      this.shift_list_by_id = this.shift_list.reduce((cur, pre) => {
        if (cur[pre.id] == undefined) {
          cur[pre.id] = [];
        }
        pre.elderList = pre.elderList ?? [];
        cur[pre.id] = [...cur[pre.id], ...pre.elderList];
        return cur;
      }, {});
      if (isInit) {
        this.curSelect_shift = this.shift_list[0];
      }
      this.oldList = this.shift_list_by_id[this.curSelect_shift?.id] ?? [];
      let cur_between_time = `${this.curSelect_shift.startTime} - ${this.curSelect_shift.endTime}`;
      this.oldListAll_checked = this.shift_list_by_time[cur_between_time].map(
        item => `${item.id}`
      );
      this.cur_oldListAll_checked = this.oldList.map(item => item.id);
    },

    //获取部门列表
    getAllDepartment() {
      get_all_department().then(res => {
        this.department_list = res.map(e => {
          e.checked = false;
          return e;
        });
      });
    },

    select_dep() {
      this.form_data.toPos = this.department_list
        .filter(item => item.checked)
        .map(item => {
          return item.id;
        });
    },
    handleSwitch_shift(item, index) {
      this.curSelect_shift = item;
      this.oldList = this.shift_list_by_id[item.id] ?? [];
      let cur_between_time = `${this.curSelect_shift.startTime} - ${this.curSelect_shift.endTime}`;
      this.oldListAll_checked =
        this.shift_list_by_time[cur_between_time]?.map(item => `${item.id}`) ??
        [];
      this.cur_oldListAll_checked = this.oldList.map(item => `${item.id}`);
    },

    async handleScreen(type) {
      const self = this;
      switch (type) {
        case "查询":
          var oldListAll = await get_all_elders({ ...this.flt });
          oldListAll = (oldListAll ?? []).map(item => {
            item.id = `${item.id}`;
            return item;
          });
          this.oldListAll = oldListAll;
          let cur_between_time = `${this.curSelect_shift.startTime} - ${this.curSelect_shift.endTime}`;
          this.oldListAll_checked = [
            ...this.shift_list_by_time[cur_between_time].map(
              item => `${item.id}`
            )
          ];
          this.cur_oldListAll_checked = this.oldList.map(item => `${item.id}`);
          break;
        case "重置":
          self.flt = {
            buildId: null,
            floorId: null,
            roomType: null,
            side: null
          };
          var oldListAll_checked = this.shift_list_by_time[
            this.cur_between_time
          ].map(item => parseInt(item.id));
          var oldListAll = await get_all_elders({ ...this.flt });
          oldListAll = oldListAll ?? [];
          this.oldListAll = oldListAll;
          this.cur_oldListAll_checked = this.oldList.map(item => `${item.id}`);
          break;
      }
    },
    isDisabled(item) {
      if (
        !this.cur_oldListAll_checked.includes(item?.id) &&
        this.oldListAll_checked.includes(item?.id)
      ) {
        return "disabled";
      }
      return false;
    },
    handleCreate(title) {
      let self = this;
      self.dialog_cof.title = `${title}`;
      self.dialog_cof.visible = true;
      self.$nextTick(() => {
        self.$refs["form"].clearValidate();
      });
      self.getAllDepartment();
      self.reset();
    },
    reset() {
      this.form_data = {
        id: null,
        color: "", //小组颜色,
        endTime: "", //结束时间
        startTime: "", //开始时间
        isRefElder: "", //是否关联长者
        rsv: "", //说明
        shiftName: "", //小组名称
        toPos: "" //所属部门
      };
    },
    handleEdit(item, type, title) {
      this.getAllDepartment();
      this.reset();
      this.dialog_cof.type = type;
      this.dialog_cof.title = `${title}`;
      this.dialog_cof.visible = true;
      this.form_data.id = item.id;
      this.form_data.color = item.color;
      this.form_data.endTime = item.endTime;
      this.form_data.startTime = item.startTime;
      this.form_data.isRefElder = item.isRefElder;
      this.form_data.rsv = item.rsv;
      this.form_data.shiftName = item.shiftName;
      this.form_data.toPos = item.toPos;
    },
    handleDel(item) {
      let self = this;
      let params = {
        id: item.id
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_shift_type(params).then(async res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getAllTypes();
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
            case "添加班次":
              add_shift_type({ ...self.form_data }).then(res => {
                self.$notify({
                  type: "success",
                  message: "新增班次成功",
                  title: "成功"
                });
                self.getAllTypes();
                self.dialog_cof.visible = false;
              });
              break;
            case "编辑班次":
              update_shift_type({ ...self.form_data }).then(async res => {
                self.$notify({
                  type: "success",
                  message: "操作成功!",
                  title: ""
                });
                self.dialog_cof.visible = false;
                self.getAllTypes();
              });
              break;
            default:
              break;
          }
        }
      });
    },
    handleDelElders() {
      let self = this;
      let params = {
        elderIds: self.oldList_checked
          .filter(item => item != null)
          .map(item => Number(item)),
        shiftId: self.curSelect_shift.id
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_shift_elders(params).then(async res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.cur_shift = 0;
            self.getAllTypes(false);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleAddElders() {
      let self = this;
      let params = {
        elderIds: self.cur_oldListAll_checked
          .filter(item => item != null)
          .map(item => Number(item)),
        shiftId: self.curSelect_shift.id
      };
      if (this.oldListAll_checked.length < this.oldListAll.length) {
        this.$alert("还有长者未被安排班次", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            add_elders(params).then(async res => {
              self.$notify({
                type: "success",
                message: "添加成功!",
                title: ""
              });
              self.getAllTypes(false);
            });
          }
        });
      } else {
        add_elders(params).then(async res => {
          self.$notify({
            type: "success",
            message: "添加成功!",
            title: ""
          });
          self.getAllTypes(false);
        });
      }
    },
    async handleChange_building(val) {
      this.level_list = await this.getData({ type: "楼层", superId: val });
      this.flt.level = undefined;
    },
    async getData({ type, superId }) {
      let params =
        type == "楼宇"
          ? {
              type: "s",
              centerId: this.$store.state.user.orgInfo.id
            }
          : {
              type: "f",
              superId,
              centerId: this.$store.state.user.orgInfo.id
            };
      return await query_batch_bed(params).then(res => {
        return res ?? [];
      });
    },
    async getAllElders() {
      let oldListAll = await get_all_elders({ ...this.flt });
      this.oldListAll = (oldListAll ?? []).map(item => {
        item.id = `${item.id}`;
        return item;
      });
    },
    async getList() {
      let data = await this.getData({
        type: "楼宇"
      });
      data = data ?? [];
      this.building_list = data;
    }
  },
  mounted() {
    this.getAllTypes();
    this.getList();
    this.getAllElders();
  }
};
</script>
<style lang='scss' scoped>
.group-color {
  display: flex;
  border: 1px solid #c0c4cc;
  background: #f7f8fb;
  border-radius: 4px;

  .group-box {
    width: 80%;
    height: 35px;
    margin-right: 6px;
  }
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 38px;
}

.left-box1 {
  width: 100%;
  min-height: 213px;
  border: 1px solid #d9d9d9;
  margin-top: 20px;
  padding: 0 0 15px 0;

  .left-box-title {
    padding: 10px 20px 0 20px;
    line-height: 45px;
    background-color: #fafafa;
  }
}

.left-box2 {
  @extend .left-box1;
  min-height: 523px;
}

.checkbox {
  position: absolute;
  right: 12px;
  top: 18px;

  /deep/ .el-checkbox__label {
    display: none;
  }
}

.content-item {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}

.content-active {
  border: 1px solid #017cff;
  background: rgba(1, 124, 255, 0.09);
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}

.btn {
  position: absolute;
  right: 12px;
  bottom: 10px;
}

.item {
  width: 59px;
  height: 26px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  text-align: center;
  line-height: 26px;
  margin-right: 13px;
}
</style>
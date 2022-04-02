<!-- 
 * @description: 员工管理
 * @fileName: administrative_staff_mg_list.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:55:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
    <div class="container_card">
      <el-form :inline="true">
        <el-row :getter="40">
          <el-col :span="20">
            <el-row>
              <el-col :span="5">
                <el-form-item label="员工姓名:">
                  <el-input placeholder="请输入" v-model="flt.empNm" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="部门：">
                  <el-select v-model="flt.department" placeholder="请选择" @change="handleSwitch_dep">
                    <el-option v-for="item in department_list" :key="item.id" :label="item.depmName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="职位：">
                  <el-select v-model="flt.position" placeholder="请选择">
                    <el-option v-for="item in position_list" :key="item.id" :label="item.positionName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="就职状态：">
                  <el-select v-model="flt.joinType" placeholder="请选择">
                    <el-option v-for="item in join_list" :key="item.type" :label="item.desc" :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 过滤栏结束 @date:2021-05-26 18:13:33 @author: 谭人杰 !-->
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">职工列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加职工</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading">
        <el-table-column align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': variables.baseColor}">{{ formatZero(scope.$index + 1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="empHeads" label="头像">
          <template slot-scope="scope">
            <el-image style="width:50px; height: 50px;border-radius:50%" :src="scope.row.empHeads"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="empNm" label="员工姓名"></el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">{{scope.row.empSex==0 ?"男":"女" }}</template>
        </el-table-column>
        <el-table-column align="center" prop="empAge" label="年龄"></el-table-column>
        <el-table-column width="120" align="center" prop="empPhone" label="联系方式"></el-table-column>
        <el-table-column width="180" align="center" prop="idNum" show-overflow-tooltip  label="证件号码"></el-table-column>
        <el-table-column align="center" prop="blongDemp" width="120" label="所属部门"></el-table-column>
        <el-table-column align="center" prop="position"  width="120" label="职位"></el-table-column>
        <el-table-column width="110" align="center" prop="joinDate" label="入职日期"></el-table-column>
        <el-table-column width="100" align="center" prop="joinType" label="就职状态">
          <template slot-scope="scope">{{scope.row.joinType=="N"
            ?"在职":scope.row.joinType=="F"?"在职（实习）":scope.row.joinType=="T"?"试用":"离职"}}</template>
        </el-table-column>
        <el-table-column width="180" align="center" prop="empNo" label="员工编号"></el-table-column>
        <el-table-column width="150" align="center" prop="contractRemaining" label="员工剩余天数"></el-table-column>
        <el-table-column width="250" align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click.native="handleAction(scope.row, '详情')">详情</el-link>
            <el-link type="primary" :underline="false" @click.native="handleAction(scope.row, '编辑')">编辑</el-link>
            <el-link type="warning" :underline="false" @click.native="handleAction(scope.row, '就职状态管理')">就职状态管理
            </el-link>
            <el-link :type="scope.row.joinType == 'R' ? 'danger' : 'info'" :disabled="scope.row.joinType == 'R' ? false : 'disabled'" :underline="false" @click.native="handleAction(scope.row, '删除')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
      <div class="pagination-box">
        <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
          @pagination="getList" />
      </div>
      <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->
    </div>

    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="20">
            <el-form-item class="default" label="就职状态" prop="joinType">
              <el-select v-model="form_data.joinType" placeholder="请选择">
                <el-option v-for="item in join_list" :key="item.type" :label="item.desc" :value="item.type"></el-option>
              </el-select>
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
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import variables from "@/styles/variables.scss";
  import { handleType, isTrue, fee_type } from "@/utils/enum";
  import { formatZero } from "@/filters";
  import {
    get_employees_info,
    get_all_department,
    get_position,
    join_type_list,
    modify_manager,
    del_manager,
    get_employee_info,
    modify_join_type
  } from "@/api/pensionagency/administrative/administrative";
  import { mapGetters } from "vuex";
  export default {
    name: "administrative_staff_mg_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    computed: {
      ...mapGetters(["orgInfo","userInfo"])
    },
    data() {
      return {
        department_list: [], //部门列表
        join_list: [], //就职状态列表
        position_list: [], //职位列表
        centerId: 1,
        table_data: [],
        table_loading: false,
        table_total: 0,
        variables,
        flt: {
          empNm: "", //姓名
          department: undefined, //部门
          position: undefined, //职位
          joinType: undefined, //就职状态
          pageNum: 1,
          pageSize: 10
        },
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false
        },
        form_data: {
          id: null,
          joinType: ""
        }
      };
    },
    created() {
      this.getList();
      this.getAllDepartment();
      this.joinTypeList();
    },
    activated() {
      this.getList()
    },
    methods: {
      formatZero,
      // 获取职位列表
      getPosition() {
        get_position({ blongDepm: this.blongDepm }).then(res => {
          this.position_list = res;
        });
      },
      //获取部门列表
      getAllDepartment() {
        get_all_department().then(res => {
          this.department_list = res;
        });
      },

      joinTypeList() {
        join_type_list().then(res => {
          this.join_list = res;
        });
      },
      handleSwitch_dep(val) {
        this.blongDepm = val;
        this.getPosition();
      },
      getList() {
        let params = {
          centerId: this.orgInfo?.id??this.userInfo?.centerId
        };
        get_employees_info({ ...this.flt }, { ...params }).then(res => {
          this.table_data = res.result;
          this.table_total = res.totalCount;
          this.$forceUpdate();
        });
      },
      handleSubmit() {
        let self = this;
        self.$refs.form.validate(valid => {
          if (valid) {
            if (self.dialog_cof.title == "修改在职状态") {
              let params = { ...self.form_data };
              modify_join_type(params).then(res => {
                self.$notify({
                  type: "success",
                  title: "成功",
                  message: "操作成功"
                });
                self.dialog_cof.visible = false;
                self.getList();
                self.reset();
              });
            }
          }
        });
      },
      handleAdd() {
        let self = this;

        self.$router.push({
          path: "/workbench/workbench/administrative/staff_mg/insert",
          query: {
            title: "添加员工"
          }
        });
      },
      // 筛选表格数据
      handleScreen(data, type) {
        const self = this;
        switch (type) {
          case "查询":
            self.flt.pageNum = 1;
            self.getList();
            break;
          case "重置":
            (self.flt = {
              empNm: "", //姓名
              department: undefined, //部门
              position: undefined, //职位
              joinType: undefined, //就职状态
              pageNum: 1,
              pageSize: 10
            }),
              self.getList();
            break;
        }
      },
      handleAction(data, type) {
        let self = this;

        switch (type) {
          case "详情":
            self.$router.push({
              path: "/workbench/workbench/administrative/staff_mg/insertdetail",
              query: { id: data.id, title: "员工详情", disabled: true }
            });
            break;
          case "编辑":
            self.$router.push({
              path: "/workbench/workbench/administrative/staff_mg/insertdetail",
              query: { id: data.id, title: "编辑员工信息" }
            });
            break;
          case "就职状态管理":
            self.dialog_cof.visible = true;
            self.dialog_cof.title = "修改在职状态";
            (self.form_data.id = data.id),
              (self.form_data.joinType = data.joinType);
            break;
          case "删除":
            let params = {
              id: data.id
            };
            this.$confirm(`删除, 是否继续?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                del_manager(params).then(async res => {
                  self.$notify({
                    type: "success",
                    message: "删除成功!",
                    title: ""
                  });
                  self.getList();
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: `已取消`
                });
              });
            break;
        }
      },
      reset() {
        this.form_data = {
          id: null,
          joinType: undefined
        };
      }
    }
  };
</script>
<style lang='scss' scoped>
</style>
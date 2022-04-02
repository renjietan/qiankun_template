<!-- 
 * @description: 账号管理
 * @fileName: system_account_mg.vue 
 * @author: 王文涛
 * @date: 2021-05-31 16:02:41
 * @后台人员:  岳喜多
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title">账号管理</div>
      <el-row :gutter="40">
        <el-col :span="6">
          <div class="left-box">
            <el-row class="left-box-title">
              <el-col :span="12">
                <div class="title" style="font-size: 14px">账号列表</div>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button @click="handleDialog('', '添加账号')" style="transform: scale(0.9)" size="mini" type="primary"
                  icon="el-icon-plus">添加
                </el-button>
              </el-col>
            </el-row>
            <div class="left-box-search">
              <el-input v-model="flt.search" placeholder="请输入员工姓名/账号"></el-input>
              <el-button type="primary" @click="findList">查询</el-button>
            </div>

            <div class="infinite-list-wrapper" style="overflow: auto; height: calc(100% - 90px)">
              <ul style="padding: 0">
                <li v-for="item in user_list" :key="item.id" style="list-style: none">
                  <div :class="[
                      'left-box-item',
                      cur_account == item ? 'left-box-item-active' : '',
                    ]" @click="handleSwitch(item)">
                    <el-row>
                      <el-col :span="18">
                        <div>{{ item.account }}-{{ item.posNm }}</div>
                      </el-col>
                      <el-col :span="6" style="text-align: right">
                        <i class="el-icon-edit icon-primary" @click.stop="handleDialog(item, '编辑账号')"></i>
                        <div style="width: 5px; display: inline-block"></div>
                        <i class="el-icon-circle-close icon-close" @click.stop="handleDialog(item, '删除账号')"></i>
                      </el-col>
                      <el-col style="margin-top: 15px; color: silver">{{item.empNm}}</el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="center-box">
            <div class="center-box-title">
              <div class="title" style="font-size: 14px">角色列表(职位)</div>
              <el-tree ref="newTop" class="el-tree-custom" :props="props2" :data="departmentInfo" show-checkbox
                node-key="id" :default-checked-keys="defaultCheckDepart" :expand-on-click-node="false"
                @node-click="nodeClick">
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="right-box">
            <div class="right-box-title">
              <div class="title" style="font-size: 14px">菜单权限</div>
              <el-tree ref="newTopRightsTree" class="el-tree-custom" :props="props" :data="permission_routes"
                show-checkbox node-key="id" :default-checked-keys="defaultCheck" :expand-on-click-node="false">
              </el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog align="center" class="el-dialog-2" v-el-drag-dialog :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title" :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="员工姓名" prop="empNm" :rules="{
                required: true,
                message: '点击查询按钮查询员工',
                trigger: 'change',
              }" :class="[
                dialog_cof.title == '编辑账号' ? 'readonly' : 'must-fill',
              ]">
              <el-autocomplete :disabled="dialog_cof.title == '编辑账号' ? 'disable' : false" v-model="form_data.empNm" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                @select="handleSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
          <!-- <el-col v-if="dialog_cof.title == '添加账号'" :span="12" style="text-align: left; height: 96px">
            <el-button style="margin: 45px 0 0 -30px" type="primary" @click="handleOpen">查询</el-button>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="用户角色" class="readonly" prop="posNm" :rules="{
                required: true,
                message: '点击查询按钮查询角色',
                trigger: 'change',
              }">
              <el-input disabled clearable v-model="form_data.posNm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号" class="must-fill">
              <el-input placeholder="请输入" clearable :key="2" v-model="form_data.account1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dialog_cof.title == '编辑账号'">
            <el-form-item label="创建时间" class="readonly">
              <el-input disabled clearable v-model="form_data.crateTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码" class="must-fill" prop="password" :rules="{
                required: dialog_cof.title == '添加账号' ? true : false,
                message: '密码不能为空',
              }">
              <el-input placeholder="请输入" clearable v-model="form_data.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码(确认)" class="must-fill" prop="password_confirm" :rules="{
                required: dialog_cof.title == '添加账号' ? true : false,
                message: '密码不能为空',
              }">
              <el-input placeholder="请输入" clearable v-model="form_data.password_confirm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="exit()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
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
  import { mapGetters } from "vuex";
  import { } from "@/utils/validate";
  import { batch, add, update, acc_or_name } from "@/api/system/auth";
  import { menu_auth } from "@/api/system/menu-auth";
  import { like_by_name, get_organize } from "@/api/pensionagency/administrative/administrative";
  import md5 from "js-md5";
  import { account_position, by_pos_id } from "@/api/system/account-position";

  export default {
    name: "system_account_mg",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },

    data() {
      return {
        flt: {
          search: "",
        },
        posId: null,
        accId: null,
        defaultCheck: [],
        props: {
          label: function (data, node) {
            return data.title ? data.title : data.path;
          },
        },
        props2: {
          label: "title",
          children: "positions",
        },
        rules: {},
        people: [],
        form_data: {
          empNm: "",
          empId: undefined,
          account1: "",
          password: "",
          posId: undefined,
          posNm: "",
        },
        cur_account: null,
        user_list: [],
        loading: false,
        dialog_cof: {
          visible: false,
          title: "编辑账号",
          escape: false,
          destroy: true,
          modal: false,
        },
        isEmpty: false,
        departmentInfo: [],
        permission_routes: [],
        defaultCheckDepart: [],
        department: [],
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },

    methods: {
      handleSwitch(item) {
        this.cur_account = item;
        this.accId = this.cur_account.accId;
        this.getAccId();
      },
      findList() {
        if (!!this.flt.search) {
          acc_or_name({ accOrNm: this.flt.search }).then((res) => {
            this.user_list = res;
          });
        } else {
          this.getData();
        }
      },
      querySearchAsync(queryString, cb) {
        let self = this
        self.form_data.empId = undefined
        self.form_data.posNm = ""
        self.form_data.posId = undefined
        if (queryString) {
          like_by_name({ empNm: queryString }).then((res) => {
            let result = res.map(item => {
              item.value = item.empNm
              item.address = item.empId
              return item
            })
            cb(result)
          });
        } else {
          cb([])
        }
      },
      handleSelect(val) {
        this.form_data.empId = val.empId
        this.form_data.posNm = val.posNm
        this.form_data.posId = val.posId
      },
      exit() {
        this.dialog_cof.visible = false;
        this.resetFrom();
      },
      resetFrom() {
        this.form_data = {
          empName: "",
          empId: undefined,
          account1: "",
          accountType: "M",
          password: "",
          posId: undefined,
          posNm: ""
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      },
      handleDialog(data, type) {
        this.dialog_cof.title = type;
        this.resetFrom();
        switch (type) {
          case "添加账号":
            this.dialog_cof.visible = true;
            break;
          case "编辑账号":
            this.form_data.accId = data.accId;
            this.form_data.empNm = data.empNm;
            this.form_data.empId = data.empId
            this.form_data.posNm = data.posNm;
            this.form_data.crateTime = data.crateTime;
            this.form_data.account1 = data.account;
            this.dialog_cof.visible = true;
            break;
          case "删除账号":
            let { accId } = data;
            this.$confirm("确定要删除么?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then((res) => {
              update({
                accId,
                operateType: "D",
              }).then((res) => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.dialog_cof.visible = false;
                this.getData();
              });
            });
            break;
        }
      },
      nodeClick(data) {
        if (!!data.id) {
          this.posId = data.id;
          this.getshowMenu();
        } else {
          this.$nextTick(() => {
            this.$refs.newTopRightsTree.setCheckedKeys([]);
          });
        }
      },
      getData() {
        batch().then((res) => {
          this.user_list = res;
          res.forEach((el) => {
            if (this.userInfo.accId === el.accId) {
              this.cur_account = el;
              this.getAccId();
            }
          });
        });
      },
      getMenu() {
        menu_auth().then((res) => {
          this.permission_routes = this.process2(res);
        });
      },
      process2(data) {
        return data.map((el) => {
          el.disabled = true;
          if (!!el.children) {
            this.process2(el.children);
          }
          return el;
        });
      },
      getAccId() {
        this.$nextTick(() => {
          this.$refs.newTop.setCheckedKeys([]);
        });
        account_position({ accId: this.cur_account.accId }).then((res) => {
          this.posId = res[0];
          this.defaultCheckDepart = res;
          this.getshowMenu();
        });
      },
      getshowMenu() {
        this.$nextTick(() => {
          this.$refs.newTopRightsTree.setCheckedKeys([]);
        });
        by_pos_id({ posId: this.posId }).then((res) => {
          this.defaultCheck = res;
        });
      },
      getDepart() {
        get_organize().then((res) => {
          this.departmentInfo = this.process(res.departmentInfo);
        });
      },
      process(data) {
        return data.map((e) => {
          e.disabled = true;
          e.title = e.departmentName || e.positionName;
          if (!!e.positions) {
            this.process(e.positions);
          }
          return e;
        });
      },
      handleSubmit() {
        if (!this.form_data.empId) {
          this.$message({
            type: "warning",
            message: "请先选择员工！"
          })
          return
        }
        switch (this.dialog_cof.title) {
          case "添加账号":
            this.$refs["form"].validate((valid) => {
              if (valid) {
                console.log(this.form_data.password_confirm);
                if (this.form_data.password_confirm === this.form_data.password) {
                  // delete this.form_data.password_confirm;
                  delete this.form_data.depId;
                  delete this.form_data.depNm;
                  delete this.form_data.posNm;
                  add({
                    ...this.form_data,
                    account: this.form_data.account1,
                    accountType: "M",
                    empName: this.form_data.empNm,
                    password: md5(this.form_data.password),
                  }).then((res) => {
                    this.$notify({
                      type: "success",
                      message: "操作成功!",
                      title: "提示"
                    });
                    this.dialog_cof.visible = false;
                    this.getData();
                  });
                } else {
                  this.$message({
                    message: "两次密码不一致",
                    type: "warning",
                  });
                }
              }
            });
            break;
          case "编辑账号":
            update({
              accId: this.form_data.accId,
              account: this.form_data.account1,
              operateType: "M",
              password: md5(this.form_data.password),
            }).then((res) => {
              this.$notify({
                type: "success",
                message: "操作成功!",
                title: "提示"
              });
              this.dialog_cof.visible = false;
              this.getData();
            });
            break;
        }
      },
    },
    mounted() {
      this.getData();
      this.getMenu();
      this.getDepart();
    },
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #2f8aed;
    border-color: #2f8aed;
  }
  /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner::after {
    border-color: white;
  }
  /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner::after {
    border-color: white;

  }
  /deep/ .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
    background-color: white;
    border-color: white;
  }
</style>
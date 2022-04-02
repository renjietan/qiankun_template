<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2022-01-20 10:25:58
 * @后台人员: 岳喜多 
!-->
<template>
  <div class="container" style="margin: 0 auto">
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
                <el-button
                  @click="handleDialog('', '添加账号')"
                  style="transform: scale(0.9)"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  >添加
                </el-button>
              </el-col>
            </el-row>

            <div class="infinite-list-wrapper">
              <ul style="padding: 0">
                <li
                  v-for="item in user_list"
                  :key="item.id"
                  style="list-style: none"
                >
                  <div
                    :class="[
                      'left-box-item',
                      cur_account == item ? 'left-box-item-active' : '',
                    ]"
                    @click="handleSwitch(item)"
                  >
                    <el-row>
                      <el-col :span="18">
                        <div>
                          {{ item.account }}-{{
                            account_type[item.accountType]
                          }}
                        </div>
                      </el-col>
                      <el-col :span="6" style="text-align: right">
                        <i
                          class="el-icon-edit icon-primary"
                          @click.stop="handleDialog(item, '修改账号')"
                        ></i>
                        <div style="width: 5px; display: inline-block"></div>
                        <i
                          class="el-icon-circle-close icon-close"
                          @click.stop="handleDialog(item, '删除账号')"
                        ></i>
                      </el-col>
                      <el-col style="margin-top: 15px; color: silver">{{
                        item.empNm
                      }}</el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="left-box">
            <el-row class="left-box-title">
              <el-col :span="4">
                <div class="title" style="font-size: 14px">机构绑定</div>
              </el-col>
              <el-col :span="8">
                <el-select v-model="flt.serviceType" placeholder="请选择">
                  <el-option
                    v-for="item in org_type_list"
                    :key="item.type"
                    :label="item.desc"
                    :value="item.type"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12" style="text-align: right">
                  <el-button
                  @click="reset_flt"
                  style="transform: scale(0.9)"
                  type="primary"
                  >重置
                </el-button>
                <el-button
                  @click="handleDialog('', '绑定')"
                  style="transform: scale(0.9)"
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  >保存
                </el-button>
              </el-col>
            </el-row>

            <div class="infinite-list-wrapper">
              <ul style="padding: 0">
                <li
                  v-for="item in org_list"
                  :key="item.id"
                  style="list-style: none"
                >
                  <div
                    :class="[
                      'left-box-item',
                      item.active == true ? 'left-box-item-active' : '',
                    ]"
                    @click="handleSwitchOrg(item)"
                  >
                    <el-row>
                      <el-col :span="18">
                        <div>
                          {{ item.centerName }}-{{ org_type[item.serviceType] }}
                        </div>
                      </el-col>
                      <el-col :span="6" style="text-align: right"> </el-col>
                      <el-col style="margin-top: 15px; color: silver">{{
                        item.address
                      }}</el-col>
                    </el-row>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
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
        hide-required-asterisk
        status-icon
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item
              label="账号"
              class="must-fill"
              prop="account"
              :rules="{
                required: true,
                message: '请输入子账号',
                trigger: 'change',
              }"
            >
              <el-input clearable v-model="form_data.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="密码"
              :class="[dialog_cof.title === '修改' ? 'default' : 'must-fill']"
              prop="password"
              :rules="{
                required: true,
                message: '请输入密码',
                trigger: 'change',
              }"
            >
              <el-input clearable v-model="form_data.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="再次输入密码"
              :class="[dialog_cof.title === '修改' ? 'default' : 'must-fill']"
              prop="password2"
              :rules="{
                required: true,
                message: '请再次输入密码',
                trigger: 'change',
              }"
            >
              <el-input clearable v-model="form_data.password2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialog('', '取消')">取 消</el-button>
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
import {} from "@/utils/validate";
import { account_type, org_type_list, org_type } from "@/utils/enum";
import {
  add_service_center,
  get_admin_account,
  bind_admin_account,
  find_admin_account,
  
} from "@/api/system/system_account";
import { update } from "@/api/system/auth";
import md5 from "js-md5";
import { get_org } from "@/api/system/org";
import {deepClone} from "@/utils/index"
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      org_type_list,
      flt: {
        serviceType: undefined,
      },
      account_type,
      org_type,
      user_list: [],
      cur_account: {},
      org_list: [],
      temp_list:[],
      form_data: {
        id: undefined,
        account: undefined,
        password: undefined,
        password2: undefined,
      },
    };
  },
  watch: {
    "flt.serviceType"(val) {
      this.getType(val);
       this.find_admin_account(this.cur_account.id);
    },
  },
  methods: {
    handleSwitchOrg(item) {
      item.active = !item.active;
      
    },
    reset_flt(){
       this.flt.serviceType = undefined;
       this.get_admin_account(this.cur_account.id);
    },
    handleDialog(data, type) {
      let self = this;
      switch (type) {
        case "添加账号":
          self.dialog_cof.visible = true;
          break;
        case "取消":
          self.reset_from_data();
          self.dialog_cof.visible = false;
          break;
        case "修改账号":
          self.dialog_cof.title = "修改";
          self.dialog_cof.visible = true;
          self.form_data.id = data.id;
          self.form_data.account = data.account;
          break;
        case "删除账号":
          let { id } = data;
          this.$confirm("确定要删除么?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then((res) => {
            update({
              accId: id,
              operateType: "D",
            }).then((res) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.dialog_cof.visible = false;
              this.findList();
            });
          });
          break;
        case "绑定":
          let arr =
            this.org_list
              .filter((el) => {
                return el.active;
              })
              .map((el) => {
                return el.id;
              }) ?? [];
          if (arr.length !== 0) {
            bind_admin_account({
              accId: this.cur_account.id,
              ids: arr,
            }).then((res) => {
              this.$notify({
                type: "success",
                message: "操作成功!",
                title: "提示",
              });
            });
          } else {
            this.$message({
              message: "请选择机构",
              type: "warning",
            });
          }
          break;
      }
    },

    handleSwitch(item) {
      this.cur_account = item;
      this.find_admin_account(this.cur_account.id);
    },
    handleSubmit() {
      let self = this;
      if (self.dialog_cof.title === "新增") {
        self.$refs.form.validate((valid) => {
          if (valid) {
            if (self.form_data.password === self.form_data.password2) {
              add_service_center({
                ...self.form_data,
                password: md5(self.form_data.password),
              }).then((res) => {
                self.$notify({
                  type: "success",
                  message: "操作成功!",
                  title: "提示",
                });
                self.dialog_cof.visible = false;
                self.findList();
                self.reset_from_data();
              });
            }
          } else {
            this.$message({
              message: "两次密码不一致",
              type: "warning",
            });
          }
        });
      } else {
        if (self.form_data.password === self.form_data.password2) {
          console.log(self.form_data);
          update({
            accId: self.form_data.id,
            account: self.form_data.account,
            password: self.form_data.password
              ? md5(self.form_data.password)
              : undefined,
            operateType: "M",
          }).then((res) => {
            self.$notify({
              type: "success",
              message: "操作成功!",
              title: "提示",
            });
            self.reset_from_data();
            self.findList();
            self.dialog_cof.visible = false;
          });
        } else {
          this.$message({
            message: "两次密码不一致",
            type: "warning",
          });
        }
      }
    },
    findList() {
      get_admin_account().then((res) => {
        this.user_list = res ?? [];
        this.cur_account = this.user_list[0];
        this.find_admin_account(this.cur_account.id);
      });
    },
    reset_from_data() {
      this.form_data.account = undefined;
      this.form_data.password = undefined;
      this.form_data.password2 = undefined;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    getType(type) {
      get_org({ type }).then((res) => {
        this.org_list = res.map((el) => {
          el.active = false;
          return el;
        });
        this.temp_list = deepClone(this.org_list);
      });
    },
    find_admin_account(accId){
        this.org_list = this.org_list.map(el=>{
           el.active = false;
          return el;
        });
        find_admin_account({accId}).then(res=>{
           
           this.org_list = this.org_list.map(el=>{
               for(let i of res){
                  if(i.id == el.id){
                    el.active = true;
                  }
               }
               return el;
           })
        });
    }
  },
  mounted() {
    this.findList();
    this.getType();
  
  },
};
</script>
<style lang='scss' scoped>
.left-box-item-active {
  border: 1px solid #017cff;
  background: rgba(1, 124, 255, 0.09);
}
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
/deep/
  .el-checkbox__input.is-disabled.is-indeterminate
  .el-checkbox__inner::before {
  background-color: white;
  border-color: white;
}
</style>
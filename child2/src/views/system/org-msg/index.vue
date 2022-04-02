<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2022-01-20 09:50:15
 * @后台人员: 岳喜多 
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item class="filter" label="机构名称：">
                  <el-input
                    placeholder="请输入"
                    v-model="flt.centerName"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item class="filter" label="机构类型：">
                  <el-select v-model="flt.serviceType" placeholder="请选择">
                    <el-option
                      v-for="item in org_type_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>机构管理</span>
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleDialog('', '添加')"
            >添加</el-button
          >
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column width="60" align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="centerName"
          label="机构名称"
        ></el-table-column>
        <el-table-column align="center" label="机构类型">
          <template slot-scope="scope">
            <span>{{ org_type[scope.row.serviceType] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="经营模式">
          <template slot-scope="scope">
            <span>{{ join_type[scope.row.joinType] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="机构描述"
        ></el-table-column>
        <el-table-column align="left" label="操作" class="lastColumn">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click="handleDialog(scope.row, '编辑')"
              >编辑</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click="handleDialog(scope.row, '绑定路由')"
              >绑定路由</el-link
            >
            <el-link
              :underline="false"
              type="danger"
              @click="handleDialog(scope.row, '删除')"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
      />
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
              label="机构名称"
              class="must-fill"
              prop="centerName"
              :rules="{
                required: true,
                message: '机构名称不能为空',
                trigger: 'change',
              }"
            >
              <el-input
                clearable
                v-model="form_data.centerName"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="机构类型"
              class="must-fill"
              prop="serviceType"
              :rules="{
                required: true,
                message: '机构类型不能为空',
                trigger: 'change',
              }"
            >
              <el-select v-model="form_data.serviceType" placeholder="请选择">
                <el-option
                  v-for="item in org_type_list"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="经营模式"
              class="must-fill"
              prop="joinType"
              :rules="{
                required: true,
                message: '经营模式不能为空',
                trigger: 'change',
              }"
            >
              <el-select v-model="form_data.joinType" placeholder="请选择">
                <el-option
                  v-for="item in join_type_list"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" class="default" prop="address">
              <el-input
                clearable
                v-model="form_data.address"
                maxlength="60"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构简称" class="must-fill" prop="simpleName" :rules="{
               required: true,
                message: '不能为空',
                trigger: 'change',
            }">
              <el-input
                clearable
                v-model="form_data.simpleName"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构描述" class="default" prop="describe">
              <el-input
                clearable
                v-model="form_data.remark"
                maxlength="300"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialog('', '取消')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof_route.visible"
      :title="dialog_cof_route.title"
      :destroy-on-close="dialog_cof_route.destroy"
      :close-on-click-modal="dialog_cof_route.modal"
    >
      <div class="box">
        <el-tree
          ref="newTopRightsTree"
          class="el-tree-custom"
          :props="props"
          :data="permission_routes"
          :show-checkbox="true"
          node-key="id"
          @check-change="change"
          :check-strictly="isClose"	
          :default-checked-keys="defaultCheck"
          :expand-on-click-node="false"
        >
        </el-tree>
      </div>
      <div slot="footer">
        <el-button @click="handleDialog('', '路由取消')">取 消</el-button>
        <el-button type="primary" @click="bindSubmit">保 存</el-button>
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
import {
  org_type_list,
  join_type_list,
  org_type,
  join_type,
} from "@/utils/enum";
import {
  add_service_center,
  service_center_page,
  service_center_modify,
  org_menu,
} from "@/api/system/org";

import { menu_auth_org, menu_auth_bind } from "@/api/system/menu-auth";
import { formatZero } from "@/filters";
import { date } from "jszip/lib/defaults";
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
      dialog_cof_route: {
        visible: false,
        title: "绑定路由",
        escape: false,
        destroy: true,
        modal: false,
      },
      props: {
        label: function (data, node) {
          return data.title ? data.title : data.path;
        },
      },
      org_type_list,
      join_type_list,
      org_type,
      join_type,
      isClose:true,
      flt: {
        centerName: undefined,
        serviceType: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      arr: [],
      permission_routes: [],
      table_data: [],
      table_loading: false,
      table_total: 0,
      defaultCheck: [],
      form_data: {
        id: undefined, //机构id
        centerName: undefined, //机构名称
        serviceType: undefined, //机构类型
        joinType: undefined, //经营模式
        address: undefined, //地址
        simpleName: undefined, //机构简称
        remark: undefined, // 机构描述
      },
      bind_route: {
        centerId: undefined,
        ids: undefined,
      },
    };
  },
  methods: {
    change(){
     this.isClose = false;
    },
    getMenu(type) {
      menu_auth_org({ type }).then((res) => {
        this.permission_routes = this.process2(res);
      });
    },
    process2(data) {
      return data.map((el) => {
        if (!!el.children) {
          this.process2(el.children);
        }
        return el;
      });
    },

    formatZero,
    reset_from_data() {
      this.form_data.id = undefined;
      this.form_data.centerName = undefined;
      this.form_data.serviceType = undefined;
      this.form_data.joinType = undefined;
      this.form_data.address = undefined;
      this.form_data.simpleName = undefined;
      this.form_data.describe = undefined;
    },
    handleSubmit() {
      let self = this;
      self.$refs["form"].validate((valid) => {
        if (valid) {
          if (self.dialog_cof.title === "新增") {
            add_service_center(self.form_data).then((res) => {
              self.$notify({
                title: "提示",
                message: "添加成功",
                type: "success",
              });
              self.dialog_cof.visible = false;
              self.$nextTick(() => {
                self.reset_from_data();
                self.$refs["form"].clearValidate();
              });
              self.getList();
            });
          } else {
            service_center_modify({ ...this.form_data }).then((res) => {
              self.$notify({
                title: "提示",
                message: "修改成功",
                type: "success",
              });
              self.dialog_cof.visible = false;

              self.getList();
            });
          }
        }
      });
    },
    getList() {
      this.table_loading = true;
      service_center_page(this.flt).then((res) => {
        this.table_loading = false;
        this.table_data = res ? res.result : [];
        this.table_total = res.totalCount;
      });
    },
    handleDialog(data, type) {
      let self = this;
      switch (type) {
        case "添加":
          self.reset_from_data();
          self.dialog_cof.title = "新增";
          self.dialog_cof.visible = true;
          break;
        case "取消":
          self.$refs["form"].clearValidate();
          self.dialog_cof.visible = false;
          break;
        case "编辑":
          self.dialog_cof.title = "编辑";
          self.dialog_cof.visible = true;
          self.form_data.id = data.id;
          self.form_data.centerName = data.centerName;
          self.form_data.serviceType = data.serviceType;
          self.form_data.joinType = data.joinType;
          self.form_data.address = data.address;
          self.form_data.simpleName = data.simpleName;
          self.form_data.remark = data.remark;
          break;
        case "删除":
          self
            .$confirm(`删除, 是否继续?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
            .then((res) => {
              service_center_modify({
                id: data.id,
                status: "D",
              }).then((res) => {
                self.$notify({
                  title: "提示",
                  message: "删除成功",
                  type: "success",
                });

                self.getList();
              });
            });
          break;
        case "绑定路由":
          self.getMenu(data.serviceType);
          self.get_org_menu(data.id);
          self.bind_route.centerId = data.id;
          self.dialog_cof_route.title = "绑定路由";
          self.dialog_cof_route.visible = true;
          break;
        case "路由取消":
          self.dialog_cof_route.visible = false;
          break;
      }
    },
    get_org_menu(centerId) {
      this.isClose = true;
      org_menu({ centerId: centerId }).then((res) => {
       this.defaultCheck = res??[];
        
      });
    },
  
    bindSubmit() {
      if (this.$refs.newTopRightsTree.getCheckedKeys().length != 0 ) {
        this.bind_route.ids = [
            ...this.$refs.newTopRightsTree.getHalfCheckedKeys(),
          ...this.$refs.newTopRightsTree.getCheckedKeys(),
        
        ];
        menu_auth_bind(this.bind_route).then((res) => {
          this.$notify({
            title: "提示",
            message: "绑定成功",
            type: "success",
          });
          this.$nextTick(() => {
            this.$refs.newTopRightsTree.setCheckedKeys([]);
          });
          this.dialog_cof_route.visible = false;
        });
      } else {
        this.$notify({
          title: "警告",
          message: "请选择菜单",
          type: "warning",
        });
      }
    },
    reset_flt() {
      this.flt = {
        centerName: undefined,
        serviceType: undefined,
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: block;
  height: 46px;
  line-height: 46px;
}
.box {
  height: 400px;
  overflow-y: scroll;
}
</style>
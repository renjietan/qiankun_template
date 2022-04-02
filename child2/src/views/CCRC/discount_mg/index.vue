<!-- 
 * @description:折扣管理 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-26 15:28:48
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item class="filter" label="项目：">
                  <el-select v-model="pageable.projectId" clearable placeholder="请选择">
                    <el-option
                      v-for="item in project_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item class="filter" label="方案名称：">
                  <el-input clearable v-model="pageable.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="filter" label-width="100px" label="折扣方案状态:">
                  <el-select v-model="pageable.status" placeholder="请选择">
                    <el-option
                      v-for="item in discount_status"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(pageable,'查询')">查询</el-button>
              <el-button @click="handleScreen(pageable,'重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">折扣管理表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleAction('新增')">新增</el-button>
          <el-button type="success" @click="handleAction('绑定楼栋折扣')">
            <span class="btn_pics">
              <img class="pic" src="~@/assets/images/CCRC/build.png" />绑定楼栋折扣
            </span>
          </el-button>
          <!-- <el-button type="success" @click="handleAction('引入折扣方案')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/CCRC/introduce.png" />引入折扣方案
            </span>
          </el-button>-->
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="left" prop="name"></el-table-column>
        <el-table-column label="生效日期" align="left" prop="startDate"></el-table-column>
        <el-table-column label="失效日期" align="left" prop="endDate"></el-table-column>
        <!-- <el-table-column label="应用范围" align="left" prop="fixedFood"></el-table-column> -->
        <el-table-column label="创建日期" align="left" prop="startDate"></el-table-column>
        <el-table-column label="状态" align="left">
          <template slot-scope="scope">
            <span style="color:#1FCDA0" v-if="scope.row.status=='1'">启用</span>
            <span style="color:#FE3D65" v-if="scope.row.status=='3'">失效</span>
            <span style="color:#8A8A8A" v-if="scope.row.status=='2'">禁用</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleDialog(scope.row, '编辑')">编辑</el-link>
            <el-link
              type="danger"
              v-if="scope.row.status=='1'"
              :underline="false"
              @click="handleForbidden(scope.row, '禁用')"
            >禁用</el-link>
            <el-link
              type="success"
              v-if="scope.row.status=='2'"
              :underline="false"
              @click="handleForbidden(scope.row, '启用')"
            >启用</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row, '删除')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        style="text-align:right"
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="pageable.pageNum"
        :limit.sync="pageable.pageSize"
        @pagination="getDiscountsList"
      />
    </div>
    <el-dialog
      class="el-dialog-3"
      center
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
        label-position="left"
        label-width="120px"
      >
        <el-row>
          <el-form-item class="filter" label="所属项目：">
            <el-select @change="changeProject" v-model="form_data.projectId" placeholder="请选择">
              <el-option
                v-for="item in project_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="filter" label="选择楼栋：">
            <el-select v-model="form_data.buildingList" multiple placeholder="请选择">
              <el-option
                v-for="item in building_list"
                :key="item.num"
                :label="item.name"
                :value="item.num"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="filter" multiple label="选择折扣方案：">
            <el-select v-model="form_data.discountId" placeholder="请选择">
              <el-option
                v-for="item in discount_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
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
import { formatZero } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { get_price_status } from "@/api/CCRC/price";

import {
  get_discounts_list,
  add_discounts,
  modify_discounts,
  del_discounts,
  get_discount_list,
  binding_building_discount
} from "@/api/CCRC/discounts";
import { get_project_list, get_all_buildings } from "@/api/CCRC/project";
import { forbidden_price } from "@/api/CCRC/price";
export default {
  name: "discount_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_total: 0,
      table_data: [],
      table_loading: false,
      project_list: [],
      building_list: [],
      discount_list: [], //折扣方案列表
      discount_status: [], //折扣方案状态列表
      pageable: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null
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
        name: "", //方案名称
        unitPrice: "", //低价建筑单价
        status: null, //状态
        buildingList: [], //楼栋id
        projectId: null, //项目id
        discountId: "" //折扣方案id
      },
      rules: {}
    };
  },
  methods: {
    getDiscountsList() {
      get_discounts_list({ ...this.pageable }).then(res => {
        this.table_data = res.data.result;
        this.table_total = res.data.totalCount;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    getPriceStatus() {
      get_price_status().then(res => {
        this.discount_status = res.data;
      });
    },
    changeProject(val) {
      this.id = val;
      this.getAllBuildings();
    },
    getAllBuildings() {
      get_all_buildings(this.id).then(res => {
        this.building_list = res.data;
      });
    },
    getDiscountList() {
      get_discount_list().then(res => {
        this.discount_list = res.data;
      });
    },
    formatZero,
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.pageable.page = 1;
          self.getDiscountsList();
          break;
        case "重置":
          self.pageable = {
            pageNum: 1,
            pageSize: 10,
            name: null,
            status: null
          };
          self.getDiscountsList();
          break;
      }
    },
    handleDialog(data, type) {
      let self = this;
      switch (type) {
        case "编辑":
          self.$router.push({
            path: "/discount_mg/add_discount",
            query: { id: data.id, name: data.name, title: "编辑" }
          });
          break;
      }
    },
    handleAction(type) {
      let self = this;
      switch (type) {
        case "新增":
          self.$router.push({
            path: "/discount_mg/add_discount",
            query: { disabled: true }
          });
          break;
        case "绑定楼栋折扣":
          self.clear_form_data();
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "绑定楼栋折扣";
          self.getDiscountList();
          break;
      }
    },
    handleSubmit() {
      let self = this;
      let params = {
        projectId: self.form_data.projectId,
        discountId: self.form_data.discountId,
        buildingList: self.form_data.buildingList
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          binding_building_discount(params).then(res => {
            self.$notify({
              type: "success",
              message: "绑定楼栋折扣成功",
              title: "成功"
            });
            self.getDiscountsList();
          });
          self.dialog_cof.visible = false;
        }
      });
    },
    handleDel(data) {
      let self = this;
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = data.id;
          del_discounts(id).then(res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getDiscountsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleForbidden(data, type) {
      let self = this;
      let id = data.id;
      let entity = "Discount";
      switch (type) {
        case "禁用":
          this.$confirm(`禁用, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                status: "2"
              };
              forbidden_price(entity, id, params).then(res => {
                self.$notify({
                  type: "success",
                  message: "禁用成功!",
                  title: ""
                });
                self.getDiscountsList();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: `已取消`
              });
            });
          break;
        case "启用":
          this.$confirm(`启用, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                status: "1"
              };
              forbidden_price(entity, id, params).then(res => {
                self.$notify({
                  type: "success",
                  message: "启用成功!",
                  title: ""
                });
                self.getDiscountsList();
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
    clear_form_data() {
      this.form_data = {
        id: null,
        name: "", //方案名称
        unitPrice: "", //低价建筑单价
        status: null, //状态
        buildingList: [], //楼栋id
        projectId: null, //项目id
        discountId: "" //折扣方案id
      };
    }
  },
  mounted() {
    this.getDiscountsList();
    this.getProjectList();
    this.getPriceStatus();
  }
};
</script>
<style lang='scss' scoped>
.btn_pics {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.45px;
  }
}
</style>
<!-- 
 * @description:意向客户 
 * @fileName: willing_client.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-07 17:21:48
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="6">
                <el-form-item label="客户姓名/长者姓名：">
                  <el-input clearable v-model="flt.customerName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户级别：">
                  <el-select v-model="flt.level" clearable placeholder="请选择">
                    <el-option
                      v-for="item in Customer_level_list"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="责任销售：">
                  <el-select v-model="flt.salesperson" clearable placeholder="请选择">
                    <el-option
                      v-for="item in salesmen_list"
                      :key="item.id"
                      :label="item.empNm"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="登记时间：">
                  <el-date-picker
                    v-model="flt.createTime"
                    type="date"
                    placeholder="请输入时间"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>意向客户列表</span>
        <div style="display: inline-block">
          <el-button type="primary" icon="el-icon-edit-outline" @click="handleNav('', '登记')">登记</el-button>
          <el-button type="success" icon="el-icon-upload2" @click="handleNav('', '导出')">导出</el-button>
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
        <el-table-column align="center" label="序号" width="55">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="customerName" label="客户姓名"></el-table-column>
        <el-table-column align="left" prop="relationshipDesc" label="与长者关系"></el-table-column>
        <el-table-column align="left" prop="telephone" label="联系电话"></el-table-column>
        <el-table-column align="left" prop="level" width="80" label="客户级别"></el-table-column>
        <el-table-column align="left" prop="elderName" label="长者姓名"></el-table-column>
        <el-table-column align="left" prop="gender" width="55" label="性别">
          <template slot-scope="scope">{{scope.row.gender==1?"男":"女"}}</template>
        </el-table-column>
        <el-table-column align="left" prop="age" width="55" label="年龄"></el-table-column>
        <el-table-column align="left" prop="assessLevel" label="评估等级"></el-table-column>
        <el-table-column align="left" prop="source" label="客户来源"></el-table-column>
        <el-table-column align="left" prop="salesperson" label="责任销售">
        </el-table-column>
        <el-table-column align="left" prop="elderCondition" label="长者状况"></el-table-column>
        <el-table-column align="left" prop="hinderDesc" width="150" label="阻碍点"></el-table-column>
        <el-table-column align="left" prop="createTime" width="105" label="登记时间"></el-table-column>
        <el-table-column align="left" prop="revisitTime" width="110" label="预计回访日期"></el-table-column>
        <el-table-column align="left" width="220" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '详情')">详情</el-link>
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '评估')">评估</el-link>
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '申请入住')"
            >申请入住</el-link>
            <el-link type="danger" @click="handleNav(scope.row, '删除')" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination  style="display: flex; justify-content: flex-end;"
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
      />
    </div>
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
  get_all_customer,
  delete_customer,
  get_salesmen
} from "@/api/pensionagency/marketing/intendedCustomer";
import { formatZero } from "@/filters";
import { Customer_level_list } from "@/utils/enum";
export default {
  name: "willing_client",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      salesmen_list: [], //责任销售
      Customer_level_list,
      flt: {
        customerName: "", //客户姓名/长者姓名
        source: "", //客户级别
        salesperson: "", //责任销售
        createTime: "", //登记时间
        pageNum: 1,
        pageSize: 10
      },
      table_total: 0,
      table_loading: false,
      table_data: [
        {
          bedName: "1"
        }
      ],
      status_options: [],
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
    formatZero,
    //头部搜索
    getList() {
      get_all_customer({ ...this.flt }).then(res => {
        this.table_data = res.result;
        this.table_total=res.totalCount
      });
    },
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          self.flt = {
            customerName: "", //客户姓名/长者姓名
            level: "", //客户级别
            salesperson: "", //责任销售
            createTime: "", //登记时间
            pageNum: 1,
            pageSize: 10
          };
          self.getList();
          break;
      }
    },
    handleNav(data, type) {
      let self = this;
      switch (type) {
        case "登记":
          self.$router.push({
            path: "/workbench/workbench/marketing/willing_client_signIn",
            query: {}
          });
          break;
        case "详情":
          self.$router.push({
            path: "/workbench/workbench/marketing/willing_client_signIn",
            query: {
              id: data.id
            }
          });
          break;
        case "评估":
          self.$router.push({
            path: "/workbench/workbench/goLive/form/ability_assess",
            query: {
              id: 1,
              isShow: false
            }
          });
          break;
        case "申请入住":
          self.$router.push({
            name: "goLive_form_apply",
            query: {
              id: 1
            }
          });
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
              delete_customer(params).then(async res => {
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

        default:
          break;
      }
    },
    getSalesmen() {
      get_salesmen().then(res => {
        this.salesmen_list = res;
      });
    }
  },
  mounted() {
    this.getList();
    this.getSalesmen();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__fixed-header-wrapper th {
  padding: 3.5px 0;
}
</style>
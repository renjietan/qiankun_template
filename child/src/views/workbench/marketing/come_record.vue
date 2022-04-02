<!-- 
 * @description:来访记录 
 * @fileName: come_record.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-07 20:48:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名：">
                  <el-input clearable v-model="flt.visitorName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="类别：">
                  <el-select v-model="flt.visitTypeId" clearable placeholder="请选择">
                    <el-option
                      v-for="item in visit_type_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="接待人员：">
                  <el-select v-model="flt.receptionlistId" clearable placeholder="请选择">
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
                <el-form-item label="来访日期：">
                  <el-date-picker
                    v-model="flt.visitTime"
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
        <span>来访记录表</span>
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
        highlight-current-row
        fit
      >
        <el-table-column align="center" width="80" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="visitorName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="peopleNumber" label="人数"></el-table-column>
        <el-table-column align="center" prop="companyName" label="单位名称"></el-table-column>
        <el-table-column align="center" prop="telephone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="visitTypeDesc" label="类别"></el-table-column>
        <el-table-column align="center" prop="visitIntentionDesc" label="来访意图"></el-table-column>
        <el-table-column align="center" prop="visitTime" label="来访日期"></el-table-column>
        <el-table-column align="center" prop="receptionlistId" label="接待人员"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="left" width="130" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '详情')">详情</el-link>
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
import { formatZero } from "@/filters";
import {
  get_record_page,
  add_visit_registration,
  modify_visit_registration,
  del_visit_registration,
  detail_visit_registration,
  get_come_type
} from "@/api/pensionagency/marketing/visitRecord";
import { get_salesmen } from "@/api/pensionagency/marketing/intendedCustomer";
import {} from "@/utils/validate";
export default {
  name: "marketing_come_record",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        visitorName: "", //姓名
        visitTypeId: undefined, //类别
        receptionlistId: undefined, //接待人员
        visitTime: "", //来访时间
        pageNum: 1,
        pageSize: 10
      },
      salesmen_list: [], //接待人员列表
      table_total: 1,
      table_loading: false,
      table_data: [],
      status_options: [],
      visit_type_list: [], //类别列表
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
    getList() {
      get_record_page({ ...this.flt }).then(res => {
        this.table_data = res.result;
        this.table_total=res.totalCount
      });
    },
    getComeType() {
      get_come_type().then(res => {
        this.visit_type_list = res;
      });
    },
    getSalesmen() {
      get_salesmen().then(res => {
        this.salesmen_list = res;
      });
    },
    //头部搜索
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          self.flt = {
            visitorName: "", //姓名
            visitTypeId: undefined, //类别
            receptionlistId: undefined, //接待人员
            visitTime: "", //来访时间
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
            path: "/workbench/workbench/marketing/come_signIn",
            query: {
              title: "来访登记"
            }
          });
          break;
        case "详情":
          self.$router.push({
            path: "/workbench/workbench/marketing/come_signIn",
            query: {
              id: data.id,
              title: `来访详情-${data.visitorName}`
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
              del_visit_registration(params).then(async res => {
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
    }
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.getList();
    this.getComeType();
    this.getSalesmen();
  }
};
</script>
<style lang='scss' scoped>
</style>
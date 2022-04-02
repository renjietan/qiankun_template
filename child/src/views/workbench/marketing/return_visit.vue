<!-- 
 * @description:入住回访 
 * @fileName: return_visit.vue 
 * @author: 姜纬杰 
 * @date: 2022-03-03 21:00:24
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
                  <el-input readonly clearable v-model="flt.customerName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="床位：">
                  <el-input readonly clearable v-model="flt.bedName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="服务等级：">
                  <el-select v-model="flt.salesperson" clearable placeholder="请选择">
                    <el-option
                      v-for="item in status_options"
                      :key="item.step"
                      :label="item.codeDesc"
                      :value="item.step"
                    ></el-option>
                  </el-select>
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
        <span>入住回访列表</span>
        <div style="display: inline-block">
          <el-button type="success" icon="el-icon-upload2" @click="handleNav('', '导出')">数据导出</el-button>
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
              {{formatZero(scope.$index + 1, 2)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="empHeads" label="头像">
          <template slot-scope="scope">
            <el-image style="width:40px; height: 40px;border-radius:50%" :src="scope.row.empHeads"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="relationship" label="姓名"></el-table-column>
        <el-table-column align="left" prop="telephone" label="床位"></el-table-column>
        <el-table-column align="left" prop="level" label="服务等级"></el-table-column>
        <el-table-column align="left" prop="elderName" label="入住时间"></el-table-column>
        <el-table-column align="left" prop="gender"  label="入住天数"></el-table-column>
        <el-table-column align="left" prop="age"  label="回访次数"></el-table-column>
        <el-table-column align="left" prop="assessLevel" label="回访时间"></el-table-column>
        <el-table-column align="left" prop="salesperson" label="回访详情"></el-table-column>
        <el-table-column align="left" width="120" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '回访登记')">回访登记</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
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
  detail_customer,
  add_customer,
  modify_customer,
  delete_customer
} from "@/api/pensionagency/marketing/intendedCustomer";
import { formatZero } from "@/filters";
import { Customer_level_list } from "@/utils/enum";
export default {
  name: "marketing_return_visit",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      Customer_level_list,
      flt: {
        customerName: "", //客户姓名/长者姓名
        source: "", //客户级别
        salesperson: "", //责任销售
        createTime: "", //登记时间
        pageNum: 1,
        pageSize: 10
      },
      table_total: 1,
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
    getList(){
      get_all_customer({...this.flt}).then(res=>{
        this.table_data=res.result
      })
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
            source: "", //客户级别
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
        case "回访登记":
          self.$router.push({
            path: "/workbench/workbench/marketing/return_visit_signIn",
            query: {
              isShow: 1
            }
          });
          break;
      }
    }
  },
  mounted() {
    this.getList()
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__fixed-header-wrapper th {
  padding: 3.5px 0;
}
</style>
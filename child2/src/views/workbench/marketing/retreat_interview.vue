<!-- 
 * @description:退住约谈 
 * @fileName: retreat_interview.vue 
 * @author: 姜纬杰 
 * @date: 2022-03-03 21:01:32
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
        <span>退住约谈列表</span>
        <div style="display: inline-block">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog( '添加退住约谈长者')">添加长者</el-button>
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
            <span :style="{ color: $variables.baseColor }">{{formatZero(scope.$index + 1, 2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="empHeads" label="头像">
          <template slot-scope="scope">
            <el-image style="width:40px; height:40px;border-radius:50%" :src="scope.row.empHeads"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="relationship" label="姓名"></el-table-column>
        <el-table-column align="left" prop="telephone" label="床位"></el-table-column>
        <el-table-column align="left" prop="level" label="服务等级"></el-table-column>
        <el-table-column align="left" prop="elderName" label="退住意向时间"></el-table-column>
        <el-table-column align="left" prop="gender" label="退住原因"></el-table-column>
        <el-table-column align="left" prop="gender" label="营销责任人"></el-table-column>
        <el-table-column align="left" prop="gender" label="客户经理"></el-table-column>
        <el-table-column align="left" prop="gender" label="院长"></el-table-column>
        <el-table-column align="left" width="140" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '约谈登记')"
            >约谈登记</el-link>
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleNav(scope.row, '约谈登记')"
            >删除</el-link>
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
      class="el-dialog-2"
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
      >
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="长者" prop="avName">
              <el-input clearable v-model="form_data.avName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="退住意向时间" prop="avType">
              <el-select clearable v-model="form_data.avType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.avType"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="营销责任人" prop="unitPrice">
              <el-select clearable v-model="form_data.avType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.avType"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="optional" label="退住原因" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑适老化产品' ? handleSubmit_edit() : handleSubmit_create()"
        >确认</el-button>
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
  get_all_customer,
  detail_customer,
  add_customer,
  modify_customer,
  delete_customer
} from "@/api/pensionagency/marketing/intendedCustomer";
import { formatZero } from "@/filters";
export default {
  name: "marketing_retreat_interview",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
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
      },
      form_data: {
        id: null,
        avName: "",
        avType: undefined,
        feeType: undefined,
        isLinked: undefined,
        unitPrice: undefined,
        linName: undefined,
        linkType: undefined,
        rsv: "",
        picUrl: null
      },
      rules: []
    };
  },
  methods: {
    formatZero,
    //头部搜索
    getList() {
      get_all_customer({ ...this.flt }).then(res => {
        this.table_data = res.result;
      });
    },
    //头部搜索
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          // self.getList();
          break;
        case "重置":
          self.flt = {
            name: "",
            bed: "",
            level: undefined,
            pageNum: 1,
            pageSize: 10
          };
          // self.getList();
          break;
      }
    },
    changeStatus() {},
    handleDialog(title, row) {
      let self = this;
      self.dialog_cof.title = title;
      self.dialog_cof.visible = true;
      self.reset();
      if (self.dialog_cof.title == "编辑适老化产品") {
        let data = row;
        self.form_data = {
          id: data.id,
          avName: data.avName,
          avType: parseInt(data.avType),
          feeType: data.feeType,
          isLinked: parseInt(data.isLinked),
          linName: parseInt(data.linName),
          linkType: data.linkType,
          unitPrice: data.unitPrice,
          rsv: data.rsv,
          picUrl: data.picUrl
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      let params = {};
      self.$refs["form"].validate(async valid => {
        if (valid) {
          params = {
            avName: self.form_data.avName,
            avType: self.form_data.avType,
            feeType: self.form_data.feeType,
            isLinked: self.form_data.isLinked,
            linName: self.form_data.linName,
            unitPrice: self.form_data.unitPrice,
            linkType: self.form_data.linkType,
            rsv: self.form_data.rsv,
            centerId: self.$store.state.user.orgInfo.id,
            picUrl: self.form_data.picUrl
          };
          // add_av_service(params).then(res => {
          //   self.$notify({
          //     type: "success",
          //     message: "操作成功",
          //     title: "成功"
          //   });
          //   self.getList();
          //   self.dialog_cof.visible = false;
          // });
        }
      });
    },
    handleSubmit_edit() {
      let self = this;
      self.$refs["form"].validate(async valid => {
        if (valid) {
          let params = {
            id: self.form_data.id,
            avType: self.form_data.avType,
            avName: self.form_data.avName,
            feeType: self.form_data.feeType,
            isLinked: self.form_data.isLinked,
            linName:
              self.form_data.isLinked == 1 ? self.form_data.linName : undefined,
            unitPrice: self.form_data.unitPrice,
            linkType:
              self.form_data.isLinked == 1
                ? self.form_data.linkType
                : undefined,
            rsv: self.form_data.rsv,
            picUrl: self.form_data.picUrl,
            operateType: handleType["编辑"]
          };
          // manager_av_service(params).then(res => {
          //   self.$notify({
          //     type: "success",
          //     message: "操作成功",
          //     title: "成功"
          //   });
          //   self.getList();
          //   self.dialog_cof.visible = false;
          // });
        }
      });
    },
    handleDel(item) {
      let id = item.id;
      let params = {
        id
        // operateType: handleType["删除"]
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          manager_av_service(params).then(res => {
            this.$notify({
              type: "success",
              message: "操作成功!",
              title: ""
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    reset() {
      this.form_data = {
        id: null,
        avName: "",
        avType: undefined,
        feeType: undefined,
        isLinked: undefined,
        unitPrice: undefined,
        linName: undefined,
        linkType: undefined,
        rsv: "",
        picUrl: null
      };
    },
    handleNav(data, type) {
      let self = this;
      switch (type) {
        case "约谈登记":
          self.$router.push({
            path: "/workbench/workbench/marketing/retreat_interview_signIn",
            query: {
              isShow: 1
            }
          });
          break;
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__fixed-header-wrapper th {
  padding: 3.5px 0;
}
</style>
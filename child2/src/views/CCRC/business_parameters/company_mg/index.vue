<!-- 
 * @description:公司管理 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 15:04:17
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">公司列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加公司')">添加公司</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" type="index" label="序号"></el-table-column>
        <el-table-column width="200" align="center" prop="avType" label="公司名称"></el-table-column>

        <el-table-column align="center" prop="rsv" label="说明"></el-table-column>
        <el-table-column width="200" align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('编辑公司',scope)" :underline="false">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNumber"
        :limit.sync="flt.pageSize"
        @pagination="getList"
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
            <el-form-item class="must-fill" label="公司名称" prop="avType">
              <el-input clearable v-model="form_data.avType"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="说明" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑公司' ? handleSubmit_edit() : handleSubmit_create()"
        >确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import enterFloat from "@/directive/enterFloat";
import {
  add_av_type,
  manager_av_type,
  query_av_type,
} from "@/api/pensionagency/basicConfig/basicConfig";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import variables from "@/styles/variables.scss";
import { formatZero } from "@/filters";
import { server_fre, isTrue, server_status } from "@/utils/enum";
import { handleType } from "@/utils/enum";
import { mapGetters } from "vuex";
export default {
  name: "business_parameters_company_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog, enterFloat },
  data() {
    return {
      server_fre,
      isTrue,
      table_data: [],
      table_loading: false,
      table_total: 0,
      variables,
      server_status,
      flt: {
        pageNumber: 1,
        pageSize: 10
      },
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {
        avType: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
      },
      form_data: {
        id: undefined, //服务项目ID
        avType: "", //服务名称
        rsv: "" //说明
      }
    };
  },
  computed: {},
  methods: {
    formatZero,
    reset_flt() {
      this.flt = {
        pageNumber: 1,
        pageSize: 10
      };
      this.getList();
    },
    reset() {
      this.form_data = {
        id: undefined,
        avType: "",
        rsv: ""
      };
    },
    async getList() {
      this.table_loading = true;
      let params = {
        pageNum: this.flt.pageNumber,
        pageSize: this.flt.pageSize,
      };
      let data = await query_av_type(params);
      this.table_data = data?.result;
      this.table_total = data?.totalCount;
      this.flt.pageNumber = data?.pageNum;
      this.flt.pageSize = data?.pageSize;
      this.table_loading = false;
      this.dialog_cof.visible = false;
    },
    handleDialog(title, row) {
      let self = this;
      self.reset();
      self.dialog_cof.title = title;
      self.dialog_cof.visible = true;
      if (self.dialog_cof.title == "编辑公司") {
        let data = row.row;
        self.form_data = {
          id: data.id,
          avType: data.avType,
          rsv: data.rsv
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      self.$refs["form"].validate(async valid => {
        if (valid) {
          let params = {
            avType: self.form_data.avType,
            rsv: self.form_data.rsv,
          };
          add_av_type(params).then(res => {
            self.$notify({
              type: "success",
              message: "操作成功",
              title: "成功"
            });
            self.getList();
            self.dialog_cof.visible = false;
          });
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
            rsv: self.form_data.rsv,
            operateType: handleType["编辑"]
          };
          manager_av_type(params).then(res => {
            self.$notify({
              type: "success",
              message: "操作成功",
              title: "成功"
            });
            self.getList();
            self.dialog_cof.visible = false;
          });
        }
      });
    },
    handleDel(item) {
      let id = item.id;
      let params = {
        id,
        operateType:handleType["删除"]
      };
      this.$confirm(
        `删除, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          manager_av_type(params).then(res => {
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
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-textarea {
  textarea {
    height: 150px;
  }
}

/deep/ .el-input-group__append {
  padding: 0 10px;
}
</style>
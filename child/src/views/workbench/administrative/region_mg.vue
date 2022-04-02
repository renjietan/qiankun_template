<!-- 
 * @description:区域管理 
 * @fileName: region_mg.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-14 20:50:54
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">区域管理列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加区域')">添加区域</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="150" align="left" type="index" label="序号"></el-table-column>
        <el-table-column width="300" align="left" prop="areaName" label="区域名称"></el-table-column>
        <el-table-column width="560" align="left" prop="rsv" label="区域描述"></el-table-column>
        <el-table-column width="317" align="left" prop="createDate" label="操作时间"></el-table-column>
        <el-table-column width="300" align="left" prop="operatorName" label="操作人"></el-table-column>
        <el-table-column width="110" align="left" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('编辑区域',scope)" :underline="false">编辑</el-link>
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
            <el-form-item class="must-fill" label="区域名称" prop="areaName">
              <el-input clearable v-model="form_data.areaName"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="区域描述" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑区域' ? handleSubmit_edit() : handleSubmit_create()"
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
import { add_av_type, manager_av_type, query_av_type } from "@/api/pensionagency/basicConfig/basicConfig";
import { add_area, del_area, modify_area ,get_all_area} from "@/api/pensionagency/administrative/administrative";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import variables from "@/styles/variables.scss";
import { formatZero } from "@/filters";
import { server_fre, isTrue, server_status } from "@/utils/enum";
import { handleType } from "@/utils/enum";
import { mapGetters } from "vuex";
export default {
  name: "administrative_region_mg",
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
        areaName: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      form_data: {
        id: undefined, //区域项目ID
        areaName: "", //区域名称
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
        areaName: "",
        rsv: ""
      };
    },
    async getList() {
      this.table_loading = true;
      let params = {
        pageNum: this.flt.pageNumber,
        pageSize: this.flt.pageSize
      };
      let data = await get_all_area(params);
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
      if (self.dialog_cof.title == "编辑区域") {
        let data = row.row;
        self.form_data = {
          id: data.id,
          areaName: data.areaName,
          rsv: data.rsv
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      self.$refs["form"].validate(async valid => {
        if (valid) {
          let params = {
            areaName: self.form_data.areaName,
            rsv: self.form_data.rsv
          };
          add_area(params).then(res => {
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
            areaName: self.form_data.areaName,
            rsv: self.form_data.rsv,
          };
          modify_area(params).then(res => {
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
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_area(params).then(res => {
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
    this.getList();
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
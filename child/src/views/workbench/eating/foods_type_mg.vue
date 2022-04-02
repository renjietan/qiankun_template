<!-- 
 * @description:菜品类别管理 
 * @fileName: foods_type_mg.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-21 15:35:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">菜品类别列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加菜品类别')">添加菜品类别</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="150" align="left" type="index" label="序号"></el-table-column>
        <el-table-column width="300" align="left" prop="name" label="菜品类别名称"></el-table-column>
        <el-table-column width="560" align="left" prop="categoryDesc" label="菜品类别描述"></el-table-column>
        <el-table-column width="317" align="left" prop="createTime" label="操作时间"></el-table-column>
        <el-table-column width="300" align="left" prop="operationId" label="操作人"></el-table-column>
        <el-table-column width="110" align="left" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('编辑菜品类别',scope)" :underline="false">编辑</el-link>
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
            <el-form-item class="must-fill" label="菜品类别名称" prop="name">
              <el-input clearable v-model="form_data.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="菜品类别描述" prop="categoryDesc">
              <el-input type="textarea" clearable v-model="form_data.categoryDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑菜品类别' ? handleSubmit_edit() : handleSubmit_create()"
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
import { get_Dishes_type_list, del_Dishes_type, add_Dishes_type ,modify_dishes_type} from "@/api/pensionagency/eating/foods_type_mg";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import variables from "@/styles/variables.scss";
import { formatZero } from "@/filters";
import { server_fre, isTrue, server_status } from "@/utils/enum";
import { handleType } from "@/utils/enum";
import { mapGetters } from "vuex";
export default {
  name: "eating_foods_type_mg",
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
        name: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      form_data: {
        id: undefined, //菜品类别项目ID
        name: "", //菜品类别名称
        categoryDesc: "" //说明
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
        name: "",
        categoryDesc: ""
      };
    },
    async getList() {
      this.table_loading = true;
      let params = {
        pageNum: this.flt.pageNumber,
        pageSize: this.flt.pageSize
      };
      let data = await get_Dishes_type_list(params);
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
      if (self.dialog_cof.title == "编辑菜品类别") {
        let data = row.row;
        self.form_data = {
          id: data.id,
          name: data.name,
          categoryDesc: data.categoryDesc
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      self.$refs["form"].validate(async valid => {
        if (valid) {
          let params = {
            name: self.form_data.name,
            categoryDesc: self.form_data.categoryDesc
          };
          add_Dishes_type(params).then(res => {
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
          let id = self.form_data.id
          let params = {
            id: self.form_data.id,
            name: self.form_data.name,
            categoryDesc: self.form_data.categoryDesc,
          };
          modify_dishes_type(id,params).then(res => {
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
      // let params = {
      //   id,
      // };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_Dishes_type(id).then(res => {
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
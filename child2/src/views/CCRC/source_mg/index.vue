<!-- 
 * @description:来源管理 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:44:03
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">来源管理列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加来源')">添加来源</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="left" type="index" label="序号"></el-table-column>
        <el-table-column align="left" prop="name" label="来源名称"></el-table-column>
        <el-table-column align="left" prop="sourceDesc" label="来源描述"></el-table-column>
        <!-- <el-table-column  align="left" prop="createDate" label="创建时间"></el-table-column> -->
        <el-table-column  align="left" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('编辑来源',scope)" :underline="false">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        style="text-align:right"
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.page"
        :limit.sync="flt.size"
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
            <el-form-item class="must-fill" label="来源名称" prop="name">
              <el-input clearable v-model="form_data.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="来源描述" prop="desc">
              <el-input type="textarea" clearable v-model="form_data.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑来源' ? handleSubmit_edit() : handleSubmit_create()"
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
import { get_source_page, add_source, del_source ,modify_source} from "@/api/CCRC/source";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { formatZero } from "@/filters";
import { mapGetters } from "vuex";
export default {
  name: "intended_customer_source_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog, enterFloat },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        page: 1,
        size: 10
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
        id: undefined, //来源项目ID
        name: "", //来源名称
        desc: "" //说明
      }
    };
  },
  computed: {},
  methods: {
    formatZero,
    reset_flt() {
      this.flt = {
        page: 1,
        size: 10
      };
      this.getList();
    },
    reset() {
      this.form_data = {
        id: undefined,
        name: "",
        desc: ""
      };
    },
    async getList() {
      this.table_loading = true;
      let params = {
        pageNum: this.flt.page,
        pageSize: this.flt.size
      };
      let data = await get_source_page(params);
      this.table_data = data.data.result;
      this.table_total = data.data.totalCount;
      this.flt.page = data.data.pageNum;
      this.flt.size = data.data.pageSize;
      this.table_loading = false;
      this.dialog_cof.visible = false;
    },
    handleDialog(title, row) {
      let self = this;
      self.reset();
      self.dialog_cof.title = title;
      self.dialog_cof.visible = true;
      if (self.dialog_cof.title == "编辑来源") {
        let data = row.row;
        self.form_data = {
          id: data.id,
          name: data.name,
          desc: data.desc
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      self.$refs["form"].validate(async valid => {
        if (valid) {
          let params = {
            name: self.form_data.name,
            sourceDesc: self.form_data.desc
          };
          add_source(params).then(res => {
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
            name: self.form_data.name,
            sourceDesc: self.form_data.desc,
          };
          modify_source(params).then(res => {
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
      let params = {
        id:item.id,
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_source({...params}).then(res => {
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
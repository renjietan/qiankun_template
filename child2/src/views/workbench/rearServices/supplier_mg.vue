<!-- 
 * @description: 供应商管理
 * @fileName: supplier_mg.vue 
 * @author: 王文涛 
 * @date: 2022-02-21 15:53:07
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
                <el-form-item label="供应商名称:">
                  <el-input
                    clearable
                    v-model="flt.name"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="rest_list">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>供应商管理表</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '添加')"
            >添加供应商</el-button
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
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="name"
          label="供应商名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="contact"
          label="联系人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="说明"
        ></el-table-column>
        <el-table-column
          align="operatorId"
          prop="remark"
          label="管理员"
        ></el-table-column>

        <el-table-column align="center" width="240" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '编辑')"
              >详情</el-link
            >

            <el-link
              type="danger"
              @click="handleNav(scope.row, '删除')"
              :underline="false"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.current"
        :limit.sync="flt.size"
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
        :rules="rules"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="供应商名称" prop="name">
              <el-input
                clearable
                v-model="form_data.name"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="must-fill" label="联系人" prop="contact">
              <el-input
                clearable
                v-model="form_data.contact"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="联系电话" prop="telephone">
              <el-input
                clearable
                v-model="form_data.telephone"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="optional" label="地址" prop="address">
              <el-input
                clearable
                v-model="form_data.address"
                maxlength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col>
              <el-form-item class="default" label="说明">
                <el-input
                  type="textarea"
                  v-model="form_data.remark"
                  clearable
                  maxlength="300"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleNav('', '取消')">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit(dialog_cof.title)"
          >确 认</el-button
        >
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
  list,
  add,
  update,
  deletel,
} from "@/api/pensionagency/rearServices/supplier";
import { formatZero } from "@/filters";
import { isPhone } from "@/utils/validate";

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
      flt: {
        name: undefined,
        current: 1,
        size: 10,
      },
      table_total: 0,
      table_data: [],
      table_loading: false,
      form_loading: false,
      form_data: {
        id: undefined,
        name: "", //供应商名称
        contact: "", // 联系人
        telephone: "", //联系电话
        address: undefined, //地址
        remark: undefined, // 说明
      },
      rules: {
        name: [
          { required: true, message: "供应商不可为空", trigger: "change" },
        ],
        contact: [
          { required: true, message: "联系人不可为空", trigger: "change" },
        ],
        telephone: [
          { required: true, message: "联系人不可为空", trigger: "change" },
          { validator: isPhone, trigger: "change" },
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    formatZero,
    // 获取数据
    getList() {
      this.table_loading = true;
      list(this.flt).then((res) => {
        this.table_data = res?.data.records ?? [];
        this.table_total = res?.data.total ?? 0;
        this.table_loading = false;
      });
    },
    //重置数据
    rest_list() {
      this.flt.name = undefined;
      this.flt.current = 1;
      this.flt.size = 10;
      this.getList();
    },
    // 重置表单
    reset_form() {
      this.form_data.name = undefined;
      this.form_data.contact = undefined;
      this.form_data.telephone = undefined;
      this.form_data.address = undefined;
      this.form_data.remark = undefined;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    handleNav(data, type) {
      switch (type) {
        case "添加":
           this.reset_form();
          this.dialog_cof.title = type;
          this.dialog_cof.visible = true;
          break;
        case "编辑":
          this.dialog_cof.title = type;
          this.form_data.id = data.id;
          this.form_data.name = data.name;
          this.form_data.contact = data.contact;
          this.form_data.telephone = data.telephone;
          this.form_data.address = data?.address ?? "";
          this.form_data.remark = data?.remark ?? "";
          this.dialog_cof.visible = true;
          break;
        case "删除":
          this.$confirm(`删除, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            deletel(data.id).then((res) => {
              if (res.code === 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getList();
              }
            });
          });
          break;
      }
    },
    // 添加|修改
    handleSubmit(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          switch (type) {
            case "添加":
              add(this.form_data).then((res) => {
                if (res.code === 0) {
                  this.$message({
                    message: "提交成功",
                    type: "success",
                  });
                  this.reset_form();
                  this.getList();
                  this.dialog_cof.visible = false;
                } 
              });
              break;
            case "编辑":
              update(this.form_data, this.form_data.id).then((res) => {
                if (res.code === 0) {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  this.dialog_cof.visible = false;
                  this.getList();
                  this.dialog_cof.visible 
                }
              });
              break;
          }
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 52px;
  line-height: 52px;
}
</style>
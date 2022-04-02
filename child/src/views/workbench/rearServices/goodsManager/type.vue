<!-- 
 * @description: 
 * @fileName: type.vue 
 * @author: 王文涛 
 * @date: 2022-02-21 15:50:58
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
                <el-form-item label="物品名称类别">
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
        <span>物品类别管理表</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '添加')"
            >添加物品类别</el-button
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
          label="物品类别名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="warehouseName"
          label="所属仓库"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operatorName"
          label="管理员"
        ></el-table-column>
        <el-table-column align="center" width="240" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '编辑')"
              >编辑</el-link
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
            <el-form-item class="must-fill" label="所属仓库" prop="warehouseId">
              <el-select
                v-model="form_data.warehouseId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in warehouse_options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              class="must-fill"
              label="物品类别名称"
              prop="articleTypeName"
            >
              <el-input
                clearable
                v-model="form_data.articleTypeName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(dialog_cof.title)"
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
} from "@/api/pensionagency/rearServices/goodsType";
import { all_warehouse } from "@/api/pensionagency/rearServices/warehouse";
import { formatZero } from "@/filters";

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
      form_data: {
        id: undefined,
        articleTypeName: undefined, //物品类别
        warehouseId: undefined, //所属仓库
      },
      warehouse_options: [],
      table_total: 0,
      table_data: [],
      table_loading: false,
      form_loading: false,
      rules: {
        warehouseId: [
          { required: true, message: "所属仓库", trigger: "blur" }, //仓库名称
        ],
        articleTypeName: [
          { required: true, message: "仓库不可为空", trigger: "change" }, //仓库名称
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
    getOptions() {
      all_warehouse().then((res) => {
        this.warehouse_options = res?.data ?? [];
      });
    },
    //重置数据
    rest_list() {
      this.flt.name = undefined;
      this.flt.current = 1;
      this.flt.size = 10;
      this.getList();
    },

    handleNav(data, type) {
      switch (type) {
        case "添加":
          this.reset_form();
          this.dialog_cof.title = type;
          this.dialog_cof.visible = true;
          break;
        case "编辑":
          this.form_data.id = data.id;
          this.form_data.articleTypeName = data.name;
          this.form_data.warehouseId = data.warehouseId;
          this.dialog_cof.title = type;
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
    reset_form() {
      this.form_data.warehouseId = undefined;
      this.form_data.articleTypeName = undefined;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
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
                  this.dialog_cof.visible;
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
    this.getOptions();
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
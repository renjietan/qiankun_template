<!-- 
 * @description: 仓库管理
 * @fileName: warehouse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:22:44
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 查询条件 -->
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="6">
                <el-form-item label="仓库名称：">
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
    <!-- 仓库表格 -->
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>仓库管理表</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '添加')"
            >添加仓库</el-button
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
            <span :style="{ color: $variables.baseColor }">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="仓库图片">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.imageUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="warehouseCode"
          label="仓库编码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="warehouseName"
          label="仓库名称"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="bedName"
          label="仓库物品数量"
        ></el-table-column> -->

        <el-table-column
          align="center"
          prop="operatorName"
          label="管理员"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="说明"
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
    <!-- 添加仓库 -->
    <el-dialog
      v-el-drag-dialog
      center
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
            <el-row>
              <el-form-item
                class="readonly"
                label="仓库编码"
                prop="warehouseCode"
              >
                <el-input
                  clearable
                  v-model="form_data.warehouseCode"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="must-fill"
                label="仓库名称"
                prop="warehouseName"
              >
                <el-input
                  clearable
                  v-model="form_data.warehouseName"
                  maxlength="60"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12" class="img">
            <el-col :span="10">
              <el-form-item class="readonly" label="仓库图片" prop="code">
                <el-upload
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :http-request="beforeAvatarUpload"
                >
                  <img
                    v-if="form_data.imageUrl"
                    :src="form_data.imageUrl"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon upload_icon"
                  >
                    <div class="uploader_desc">上传图片</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <span class="tip">图片文件请控制 在10M以内</span>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col>
              <el-form-item class="optional" label="说明">
                <el-input
                  type="textarea"
                  v-model="form_data.remark"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
} from "@/api/pensionagency/rearServices/warehouse";
import { formatZero } from "@/filters";
export default {
  name: "rearServices_warehouse",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      dialog_cof: {
        visible: false,
        title: "添加仓库",
        escape: false,
        destroy: true,
        modal: false,
      },
      table_loading: false,
      table_data: [],
      flt: {
        name: undefined,
        current: 1,
        size: 10,
      },
      table_total: 0,
      form_data: {
        id: undefined,
        warehouseCode: undefined, //仓库编码
        warehouseName: undefined, //仓库名称
        imageUrl: undefined, //仓库图片
        remark: undefined, //说明
      },
      form_loading: false,
      rules: {
        warehouseName: [
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
    //重置数据
    rest_list() {
      this.flt.name = undefined;
      this.flt.current = 1;
      this.flt.size = 10;
      this.getList();
    },
    // 重置表单
    reset_form() {
      this.form_data.warehouseCode = undefined;
      this.form_data.warehouseName = undefined;
      this.form_data.imageUrl = undefined;
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
          this.form_data.warehouseCode = data.warehouseCode;
          this.form_data.warehouseName = data.warehouseName;
          this.form_data.imageUrl = data.imageUrl;
          this.form_data.remark = data.remark;
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
    beforeAvatarUpload(res) {
      const formdata = new FormData();
      formdata.append("file", res.file);
      formdata.append("centerId", this.orgInfo.id);
      formdata.append("fileType", uploadType["长者体检报告"]);
      upload_pics(formdata).then((res) => {
        if (!!res)
          this.medicalReportIds = [res.toString(), ...this.medicalReportIds];
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
  },
};
</script>
<style lang='scss' scoped>
.tip {
  color: #999;
  position: absolute;
  bottom: 18%;
  left: 42%;
}
.img {
  position: relative;
}
</style>
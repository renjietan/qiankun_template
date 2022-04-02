<!-- 
 * @description: 菜品管理
 * @fileName: foods_mg.vue 
 * @author: 姜纬杰 
 * @date: 2021-06-14 00:25:28
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row class="filter_date" :gutter="40">
          <el-col :span="5">
            <el-form-item class="filter" label="分类：">
              <el-select v-model="flt.category" clearable placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="菜品名称：">
              <el-input v-model="flt.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right">
            <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
            <el-button type="primary" plain @click="handleScreen(flt, '重置')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px; margin-top: -30px">
        <el-col :span="6">
          <div class="title">膳食列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加菜品')">添加</el-button>
        </el-col>
      </el-row>
      <el-table
        border
        class="table_data"
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div
              :style="{
                color: $variables.baseColor,
              }"
            >{{ formatZero(scope.$index + 1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px;border-radius:50%"
              :src="scope.row.pictureUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="foodName" align="center" label="菜品名称"></el-table-column>
        <el-table-column prop="foodClassifyDesc" align="center" label="分类">
        </el-table-column>
        <el-table-column prop="ingredient" align="center" label="食材"></el-table-column>
        <el-table-column prop="specification" align="center" label="说明"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleDialog('编辑菜品',scope.row)">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 弹框：新增菜品 -->
    <el-dialog
      align="center"
      class="el-dialog-2"
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
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="菜品名称" class="must-fill" prop="foodName">
              <el-input clearable v-model="form_data.foodName"></el-input>
            </el-form-item>
            <el-form-item label="菜品类别" class="must-fill" prop="foodClassify">
              <el-select v-model="form_data.foodClassify" clearable placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜品图片" class="must-fill" prop="pictureUrl" style="text-align: left">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic"
              >
                <img v-if="form_data.pictureUrl" :src="form_data.pictureUrl" class="avatar" />
                <i
                  style="height: 126px; width: 160px; line-height: 120px"
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                >
                  <div class="uploader_desc">请上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="食材" class="default" prop="ingredient">
              <el-input clearable v-model="form_data.ingredient"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="说明" class="default" prop="specification">
              <el-input type="textarea" clearable v-model="form_data.specification"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title == '编辑菜品' ? handleSubmit_edit() : handleSubmit_create()"
        >保 存</el-button>
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
import QuickDatePickerDay from "@/components/Quick_DatePicker/day";
  import { uploadType } from "@/utils/enum";

import {
  get_Dishes_list,
  del_Dishes,
  add_Dishes,
  get_category,
  modify_dishes
} from "@/api/pensionagency/eating/food_mg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";
export default {
  name: "eating_foods_mg",
  components: { Pagination, QuickDatePickerDay },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        category: undefined,
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        foodName: [{ required: true, message: "不可为空", trigger: "change" }],
        foodClassify: [
          { required: true, message: "不可为空", trigger: "change" }
        ]
        // img: [{ required: true, message: "不可为空", trigger: "change" }]
      },
      form_data: {
        id: null,
        foodName: "", //	菜品名称
        foodClassify: undefined, //菜品分类
        ingredient: "", //食材
        specification: "", //说明
        pictureUrl: "",
        centerId: null
      },
      categoryList: [],
      table_data: [],
      table_loading: false,
      table_total: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
//   filters:{
// foodClassify(type) {
//         let foodClassifyName = "";
//         switch (type) {
//           case "1":
//             foodClassifyName = "主食";
//             break;
//           case '2':
//             foodClassifyName = "汤类";
//             break;
//           case '3':
//             foodClassifyName = "家常菜";
//             break;
//           case '4':
//             foodClassifyName = "下午茶";
//             break;
//         }
//         return foodClassifyName;
//       }
//   },
  methods: {
    formatZero,
    getPickerData(val) {
      this.flt.date_time = val;
    },
    getList() {
      this.table_loading = true;
      get_Dishes_list({ ...this.flt }).then(res => {
        this.table_loading = false;
        this.table_data = res.result;
        this.table_total = res.totalCount;
      });
    },
    // 筛选表格数据
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          (self.flt = {
            category: undefined,
            name: "",
            pageNum: 1,
            pageSize: 10
          }),
            self.getList();
          break;
      }
    },
    //获取菜品种类
    getCategory() {
      get_category().then(res => {
        this.categoryList = res;
      });
    },
    handleDialog(title, row) {
      let self = this;
      self.dialog_cof.title = title;
      self.dialog_cof.visible = true;
      self.reset();
      if (self.dialog_cof.title == "编辑菜品") {
        let data = row;
        self.form_data = {
          id: data.id,
          foodName: data.foodName,
          foodClassify: Number(data.foodClassify) ,
          ingredient: data.ingredient,
          specification: data.specification,
          centerId: data.centerId,
          pictureUrl: data.pictureUrl
        };
      }
    },
    handleSubmit_create() {
      let self = this;
      let params = {};
      self.$refs["form"].validate(async valid => {
        if (valid) {
          params = {
            foodName: self.form_data.foodName,
            foodClassify:Number( self.form_data.foodClassify),
            ingredient: self.form_data.ingredient,
            specification: self.form_data.specification,
            centerId: self.form_data.centerId,
            pictureUrl: self.form_data.pictureUrl
          };
          add_Dishes(params).then(res => {
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
            foodName: self.form_data.foodName,
            foodClassify: Number (self.form_data.foodClassify),
            ingredient: self.form_data.ingredient,
            specification: self.form_data.specification,
            centerId: self.form_data.centerId,
            pictureUrl: self.form_data.pictureUrl
            // operateType: handleType["编辑"]
          };
          modify_dishes(params).then(res => {
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
    handleDel(row) {
      let self = this;
      let params = {
        id: row.id
        // operaType: handleType["删除"]
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_Dishes(params).then(async res => {
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
    },
    reset() {
      this.form_data = {
        id: null,
        foodName: "", //	菜品名称
        foodClassify: undefined, //菜品分类
        ingredient: "", //食材
        specification: "", //说明
        pictureUrl: "",
        centerId: null
      };
    },
    //上传图片
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["菜品图片"]);
        upload_pic(formData).then((res) => {
          self.form_data.pictureUrl = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
  },
  mounted() {
    this.getList();
    this.getCategory();
  }
};
</script>
<style lang='scss' scoped>
@import "../../../styles/variables.scss";

.filter_date {
  .el-tag {
    height: 33px;
    line-height: 33px;
    margin-left: -110px;
    position: absolute;
    background: transparent;
    border: 0;
    color: rgb(96, 98, 102);
  }
}
</style>
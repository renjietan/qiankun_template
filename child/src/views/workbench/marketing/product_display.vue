<!-- 
 * @description:适老化产品管理 
 * @fileName: product_display.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-08 10:00:43
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
                <el-form-item label="产品名称：">
                  <el-input clearable v-model="flt.productName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="产品类别：">
                  <el-select v-model="flt.category" clearable placeholder="请选择">
                    <el-option
                      v-for="item in category_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
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
        <span>适老化产品列表 </span>
        <div style="display: inline-block">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加适老化产品')">添加</el-button>
          <el-button type="success" icon="el-icon-upload2" @click="handleScreen('', '导出')">导出</el-button>
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        highlight-current-row
        fit
        :cell-style="{padding: '3.5px'}"
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pictureUrl" label="产品图片">
          <template slot-scope="scope">
            <el-image style="width:40px; height: 40px;margin-top:4px" :src="scope.row.pictureUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="productName" label="产品名称"></el-table-column>
        <el-table-column align="center" prop="categoryDesc" label="产品类别"></el-table-column>
        <el-table-column align="center" prop="price" label="单价（元）"></el-table-column>
        <el-table-column align="center" prop="unit" label="单位"></el-table-column>
        <el-table-column align="left" show-overflow-tooltip prop="introduce" label="产品介绍"></el-table-column>
        <el-table-column align="center" prop="sales" label="产品销量"></el-table-column>
        <el-table-column align="center" prop="createDate" label="上传日期"></el-table-column>
        <el-table-column align="center" prop="operatorName" label="上传人"></el-table-column>
        <el-table-column align="center" label="是否上架">
          <template slot-scope="scope">
            <el-switch :value="scope.row.status == 1" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="left" width="120" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="handleDialog('编辑适老化产品',scope.row)">编辑</el-link>
            <el-link type="danger" @click="handleDel(scope.row)" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination  style="display: flex; justify-content: flex-end;"
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
            <el-form-item class="must-fill" label="产品名称" prop="productName">
              <el-input clearable v-model="form_data.productName"></el-input>
            </el-form-item>
            <el-form-item class="must-fill" label="产品类别" prop="category">
              <el-select clearable v-model="form_data.category" placeholder="请选择">
                <el-option
                  v-for="item in category_list"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="default" prop="pictureUrl" label="产品图片">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic"
              >
                <img v-if="form_data.pictureUrl" :src="form_data.pictureUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">点击上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="must-fill" label="单价（元）" prop="price">
              <el-input clearable  v-enter-float v-model="form_data.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="单位" prop="unit">
              <el-input clearable v-model="form_data.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="产品介绍" prop="introduce">
              <el-input type="textarea" clearable v-model="form_data.introduce"></el-input>
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
import { uploadType } from "@/utils/enum";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { upload_pic } from "@/api/pensionagency/administrative/administrative";
import { get_all_product,add_product,modify_product ,del_product,detail_product,get_category_list} from "@/api/pensionagency/marketing/agingProducts";
import enterFloat from "@/directive/enterFloat";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
export default {
  name: "marketing_product_display",

  components: { Pagination },
  directives: { waves, permission, elDragDialog, enterFloat },
  data() {
    return {
      flt: {
              productName: "",
            category: "",
            pageNum: 1,
            pageSize: 10
      },
      table_total: 1,
      table_loading: false,
      table_data: [],
      status_options: [],
      category_list: [],//产品类别列表
      options: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {
        // avName: [{ required: true, message: "不可为空", trigger: "change" }],
        // avType: [{ required: true, message: "不可为空", trigger: "change" }],
        // feeType: [{ required: true, message: "不可为空", trigger: "change" }],
        // isLinked: [{ required: true, message: "不可为空", trigger: "change" }],
        // unitPrice: [{ required: true, message: "不可为空", trigger: "change" }],
        // pictureUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
      },
      form_data: {
        id: null,
        productName: "",
        category: undefined,
        introduce:"",
        pictureUrl: null,
        price: undefined,
        unit: undefined,
      }
    };
  },
  methods: {
    formatZero,
    getList(){
      get_all_product({...this.flt}).then(res=>{
        this.table_data=res.result
        this.table_total=res.totalCount

      })
    },
    //上传图片
    UploadPic(file) {
      let self = this;
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("fileType", uploadType["增值服务"]);
      upload_pic(formData).then(res => {
        self.form_data.pictureUrl = res;
        self.$notify({
          title: "提示",
          message: "上传成功",
          type: "success"
        });
      });
    },
    //头部搜索
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          self.flt = {
            productName: "",
            category: "",
            pageNum: 1,
            pageSize: 10
          };
          self.getList();
          break;
      }
    },
    getCategoryList() {
      get_category_list().then(res=>{
        this.category_list=res
      })
    },
    changeStatus(val) {
        const self = this;
      if (val.status == 0) {
        val.status = "1";
        val = {
          id: val.id,
          status: val.status
        };
        modify_product({ ...val }).then(res => {
          self.getList();
          self.$notify({
            title: "",
            message: "商品上架成功",
            type: "success"
          });
        });
      } else {
        val.status = "0";
        val = {
          id: val.id,
          status: val.status
        };
        modify_product({ ...val }).then(res => {
          self.getList();
          self.$notify({
            title: "",
            message: "商品下架成功",
            type: "success"
          });
        });
      }
    },
    handleDialog(title, row) {
      let self = this;
      self.dialog_cof.title = title;
      self.dialog_cof.visible = true;
      self.reset();
      if (self.dialog_cof.title == "编辑适老化产品") {
        let data = row;
        self.form_data = {
          id: data.id,
          productName: data.productName,
          category: parseInt(data.category),
          price: parseInt(data.price),
          unit: data.unit,
          introduce: data.introduce,
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
            productName: self.form_data.productName,
            category:parseInt( self.form_data.category),
            price:parseInt (self.form_data.price),
            unit: self.form_data.unit,
            introduce: self.form_data.introduce,
            operatorName: this.$store.getters.userInfo.empNm,
            // pictureUrl: self.form_data.pictureUrl
          };
          add_product(params).then(res => {
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
            productName: self.form_data.productName,
            category:parseInt( self.form_data.category),
            price:parseInt (self.form_data.price),
            unit: self.form_data.unit,
            introduce: self.form_data.introduce,
            operatorName: this.$store.getters.userInfo.empNm,
            // pictureUrl: self.form_data.pictureUrl
          };
          modify_product(params).then(res => {
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
        id
      };
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del_product(params).then(res => {
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
        productName: "",
        category: undefined,
        pictureUrl: null,
        price: undefined,
        unit: undefined,
        introduce: undefined
      };
    }
  },
  mounted() {
    this.getList()
    this.getCategoryList()
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__fixed-header-wrapper th {
  padding: 3.5px 0;
}
</style>
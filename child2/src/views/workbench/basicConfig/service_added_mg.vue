<!-- 
 * @description: 增值服务管理
 * @fileName: service_added_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:55:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
    <div class="container_card">
      <el-form :inline="true">
        <el-row :getter="40">
          <el-col :span="20">
            <el-row>
              <el-col :span="6">
                <el-form-item label="增值服务名称:">
                  <el-input placeholder="请输入" v-model="flt.avName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务类型：">
                  <el-select v-model="flt.avType" placeholder="请选择">
                    <el-option v-for="item in all_avtype_list" :key="item.id" :label="item.avType" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 过滤栏结束 @date:2021-05-26 18:13:33 @author: 谭人杰 !-->
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">服务项目列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加增值服务')">添加服务</el-button>
          <el-button type="success" icon="el-icon-upload2" disabled>数据导出</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        index
        <el-table-column width="55" align="center" type="index" label="序号"></el-table-column>
        <el-table-column width="120" align="center" prop="picUrl" label="增值服务图片">
          <template slot-scope="scope">
            <el-image style="width: 50px; height: 50px;border-radius:50%" :src="scope.row.picUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" prop="avName" label="增值服务名称"></el-table-column>
        <el-table-column width="120" align="center" prop="avTypeDesc" label="增值服务类型"></el-table-column>
        <el-table-column width="120" align="center" prop="data" label="收费次数"></el-table-column>
        <el-table-column width="120" align="center" prop="unitPrice" label="单价（元）"></el-table-column>
        <el-table-column width="120" align="center" prop="isLinked" label="需要关联物品">
          <template slot-scope="scope">{{scope.row.isLinked==0 ?"否":"是"}}</template>
        </el-table-column>
        <el-table-column width="120" align="center" label="关联物品类别">
          <template slot-scope="scope">{{ scope.row.linkType | flt_goods_type }}</template>
        </el-table-column>
        <el-table-column width="120" align="center" label="关联物品名称">
          <template slot-scope="scope">{{ scope.row.linName | flt_goods_name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="rsv" label="说明"></el-table-column>
        <el-table-column width="200" align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('编辑增值服务',scope.row)" :underline="false">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
        @pagination="getList" />
      <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->
    </div>

    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="增值服务名称" prop="avName">
              <el-input clearable v-model="form_data.avName"></el-input>
            </el-form-item>
            <el-form-item class="must-fill" label="增值服务类型" prop="avType">
              <el-select clearable v-model="form_data.avType" placeholder="请选择">
                <el-option v-for="item in all_avtype_list" :key="item.id" :label="item.avType" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="default" prop="picUrl" label="增值服务图片">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic">
                <img v-if="form_data.picUrl" :src="form_data.picUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">点击上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="must-fill" label="收费标准" prop="feeType">
              <el-input clearable v-model="form_data.feeType" placeholder="例如：次、包、件..."></el-input>
              <!-- <el-select clearable v-model="form_data.feeType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="单价" prop="unitPrice">
              <el-input clearable v-enter-float v-model="form_data.unitPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="must-fill" label="需要关联物品" prop="isLinked">
              <el-select clearable v-model="form_data.isLinked" @change="handleChange_isLink" placeholder="请选择">
                <el-option v-for="item in isLinkedList" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11" v-if="this.form_data.isLinked==1">
            <el-form-item class="default" label="关联物品类别" prop="linkType">
              <el-select clearable v-model="form_data.linkType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" v-if="this.form_data.isLinked==1">
            <el-form-item class="default" label="关联物品名称" prop="linName">
              <el-select clearable v-model="form_data.linName" placeholder="请选择">
                <el-option v-for="item in goods_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item class="optional" label="说明" prop="rsv">
              <el-input type="textarea" clearable v-model="form_data.rsv"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_cof.title == '编辑增值服务' ? handleSubmit_edit() : handleSubmit_create()">
          确认</el-button>
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
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { handleType, uploadType, addvalue_fee_type } from "@/utils/enum";
  import { } from "@/utils/validate";
  import variables from "@/styles/variables.scss";
  import { formatZero } from "@/filters";
  import {mapGetters} from 'vuex';
  import {
    all_av_type,
    add_av_service,
    batch_av_service,
    manager_av_service
  } from "@/api/pensionagency/basicConfig/basicConfig";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";
  let _this;
  export default {
    name: "basicConfig_service_added_mg",
    components: { Pagination },
    directives: { waves, permission, elDragDialog, enterFloat },
    data() {
      _this = this;
      return {
        all_avtype_list: [], //所有服务类型列表
        table_data: [],
        goods_list: [
          {
            id: 1,
            name: "一次性手套"
          },
          {
            id: 2,
            name: "雨伞"
          }
        ],
        isLinkedList: [
          {
            key: 0,
            label: "否"
          },
          {
            key: 1,
            label: "是"
          }
        ],
        table_loading: false,
        table_total: 0,
        variables,
        flt: {
          avName: "",
          avType: undefined,
          pageNum: 1,
          pageSize: 10
        },
        options: addvalue_fee_type,
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false
        },
        rules: {
          avName: [{ required: true, message: "不可为空", trigger: "change" }],
          avType: [{ required: true, message: "不可为空", trigger: "change" }],
          feeType: [{ required: true, message: "不可为空", trigger: "change" }],
          isLinked: [{ required: true, message: "不可为空", trigger: "change" }],
          unitPrice: [{ required: true, message: "不可为空", trigger: "change" }],
          // picUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
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
        }
      };
    },
    filters: {
      flt_goods_type(val) {
        let temp = _this.options.filter(item => item.value == val)[0]?.label;
        return temp;
      },
      flt_goods_name(val) {
        let temp = _this.goods_list.filter(item => item.id == val)[0]?.name;
        return temp;
      }
    },
    computed:{
       ...mapGetters(["orgInfo","userInfo"])
    },
    methods: {
      //上传图片
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["增值服务"]);
        upload_pic(formData).then(res => {
          self.form_data.picUrl = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success"
          });
        });
      },
      formatZero,
      handleChange_isLink() {
        this.form_data.linName = undefined;
        this.form_data.linkType = undefined;  
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
      async getList() {
        this.table_loading = true;
        let params = {
          centerId: this.orgInfo?.id??this.userInfo?.centerId
        };
        let data = await batch_av_service({ ...this.flt }, { ...params });
        this.table_data = data?.result;
        this.table_total = data?.totalCount;
        this.flt.pageNumber = data?.pageNum;
        this.flt.pageSize = data?.pageSize;
        this.table_loading = false;
      },
      handleScreen(data, type) {
        const self = this;
        switch (type) {
          case "查询":
            self.flt.pageNum = 1;
            self.getList();
            break;
          case "重置":
            (self.flt = {
              avName: "", //姓名
              avType: undefined,
              pageNum: 1,
              pageSize: 10
            }),
              self.getList();
            break;
        }
      },
      handleDel(item) {
        let id = item.id;
        let params = {
          id,
          operateType: handleType["删除"]
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
      getAvTypeList() {
        all_av_type().then(res => {
          this.all_avtype_list = res;
        });
      },
      handleDialog(title, row) {
        let self = this;
        self.dialog_cof.title = title;
        self.dialog_cof.visible = true;
        self.reset();
        if (self.dialog_cof.title == "编辑增值服务") {
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
              centerId: self.orgInfo?.id??self.userInfo?.centerId,
              picUrl: self.form_data.picUrl
            };
            add_av_service(params).then(res => {
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
            manager_av_service(params).then(res => {
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(res) { }
    },
    mounted() {
      this.getList();
      this.getAvTypeList();
    }
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-textarea {
    textarea {
      height: 150px;
    }
  }
</style>
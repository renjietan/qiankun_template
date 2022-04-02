<!-- 
 * @description:添加联系人 
 * @fileName: link_man_item.vue 
 * @author: 王文涛 
 * @date: 2021-08-03 20:22:05
 * @后台人员:  
!-->
<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <el-button icon="el-icon-zhengjian" disabled v-waves type="warning">读取证件</el-button>
      <div>
        <el-button icon="el-icon-delete" style="margin-right: 10px; padding: 10px 15px" class="red-btn" v-waves
          type="danger" @click="handleAction('删除联系人')">删除联系人</el-button>
        <!-- <el-button icon="el-icon-plus" v-waves type="primary" @click="handleAction('添加联系人')">添加联系人</el-button> -->
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-form :inline="true" :model="items" ref="form" hide-required-asterisk status-icon>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item :prop="'item.'+index+'.name'" label="姓名" class="must-fill"
              :rules="{ required: true,message:'姓名不能为空', trigger: 'change' }">
              <el-input v-model="items.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="sex" label="性别" class="must-fill">
              <el-checkbox-group v-model="items.sex" :max="1">
                <el-checkbox label="男" border style="padding-left: 55px"></el-checkbox>
                <el-checkbox label="女" border style="padding-left: 55px"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="title" label="与长者关系" class="must-fill">
              <el-select clearable v-model="items.relation" placeholder="请选择与长者的关系">
                <el-option v-for="item in relationList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="title" label="是否为付款人" class="must-fill">
              <el-select clearable v-model="items.isPayer" placeholder="请选择付款人">
                <el-option v-for="item in isPayerList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="checkList" label="联系人类型" class="must-fill">
              <el-select clearable v-model="items.contactType" placeholder="请选择类型">
                <el-option v-for="item in contactList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="sort" label="联系人顺序" class="must-fill">
              <el-input v-model="items.sort" placeholder="联系人顺序"></el-input>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item prop="title" label="手机号" class="must-fill">
              <el-input v-model="items.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="checkList" label="固定电话" class="default">
              <el-input v-model="items.telephone" placeholder="请输入固定电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="papersType" label="证件类型" class="must-fill">
              <el-select clearable v-model="items.papersType" placeholder="请选择证件类型">
                <el-option v-for="item in id_list" :key="item.type" :label="item.desc" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="title" label="证件号码" class="must-fill">
              <el-input v-model="items.papersCode" placeholder="请输入证件号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="address" label="居住地址" class="optional">
              <el-input v-model="items.address" placeholder="请输入居住地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="unit" label="工作单位" class="optional">
              <el-input class="long_input" v-model="items.unit" placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :getter="20">
          <el-col :span="4">
            <el-form-item class="default" prop="title" label="身份证正面">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic">
                <img v-if="items.title" :src="items.idHead" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传正面</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="title" label="身份证反面">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic1">
                <img v-if="items.title" :src="items.idTail" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传反面</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="title" label="户口本首页">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic2">
                <img v-if="items.title" :src="items.bookletFirst" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传首页</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="title" label="户口本本人页">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic3">
                <img v-if="items.title" :src="items.bookletOneself" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传本人页</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import { handleType, uploadType } from "@/utils/enum";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { id_type_list } from "@/api/pensionagency/administrative/administrative";
  import { isTrue, contactList, relationList } from "@/utils/enum"
  export default {
    name: "linkManItem",
    directives: { waves },

    props: {
      index: {
        type: Number,
        required: true,
      },
      items: {
        type: Array,
        default: Array,
      },
    },
    data() {
      return {
        required: true,
        id_list: [], //证件类型列表
        isPayerList: isTrue,
        contactList,
        relationList,
      };
    },
    methods: {
      getOptions() {
        Promise.all([id_type_list()]).then((res) => {
          this.id_list = res[0];
        });
      },
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证正面"]);
        upload_pic(formData).then((res) => {
          self.form_data.title = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },

      UploadPic1(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证反面"]);
        upload_pic(formData).then((res) => {
          self.form_data.title = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic2(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证反面"]);
        upload_pic(formData).then((res) => {
          self.form_data.title = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic3(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证反面"]);
        upload_pic(formData).then((res) => {
          self.form_data.title = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      handleAction(type) {
        let self = this;
        switch (type) {
          case "添加联系人":
            break;
          case "删除联系人":
            self.$emit("deleteIndex", this.index);
            break;

          default:
            break;
        }
      },
    },
    mounted() {
      this.getOptions();
    },
  };
</script>
<style lang='scss' scoped>
  .upload_icon {
    width: 240px;
    height: 150px;
    line-height: 120px;
    font-size: 40px;
  }
</style>
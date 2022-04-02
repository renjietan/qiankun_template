<!-- 
 * @description: 
 * @fileName: HandlerServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 20:56:09
 * @后台人员:  
!-->
<template>
  <div class="">
    <div style="margin-bottom: 20px">
      <!-- <el-button type="success" icon="el-icon-plus">收费标准确认书</el-button>
      <el-button type="success" icon="el-icon-plus">护理等级确认书</el-button> -->
    </div>
    <el-form
      :inline="true"
      ref="form"
      :model="form_data"
      :rules="rules"
      hide-required-asterisk
      status-icon
    >
      <el-row :gutter="40">
        <el-col :span="4">
          <el-form-item
            class="default"
            prop="rates_img"
            label="收费标准确认书（签名）"
          >
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
               :http-request="beforeAvatarUpload"
            >
              <img
                v-if="form_data.rates_img"
                :src="form_data.rates_img"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                <div class="uploader_desc">上传文件</div>
              </i>
              <div class="upload_icons">
                <el-button
                  icon="el-icon-camera"
                  size="mini"
                  plain
                  type="warning"
                  >拍取</el-button
                >
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { upload_pic } from "@/api/pensionagency/administrative/administrative";
  import {uploadType,} from "@/utils/enum";

export default {
  name: "HandlerServerLevel",
  data() {
    return {
      form_data: {
        rates_img: "",
        nurse_img: "",
      },
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
      let self = this;
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("fileType", 'serveType');
      upload_pic(formData).then((res) => {
        self.form_data.rates_img = res;
        self.$notify({
          title: "提示",
          message: "上传成功",
          type: "success",
        });
      });
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
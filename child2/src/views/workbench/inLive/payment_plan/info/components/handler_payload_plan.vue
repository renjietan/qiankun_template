<!-- 
 * @description: 付款计划调整办理
 * @fileName: handler_payload_plan.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 18:35:00
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form
      :inline="true"
      ref="form"
      :model="form_data"
      hide-required-asterisk
      status-icon
    >
      <el-row :inline="true" :gutter="40">
        <el-col :span="5">
          <el-form-item
            prop="type"
            class="readonly"
            label="收费标准确认书（签名）"
          >
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :http-request="beforeAvatarUpload"
            >
              <img
                v-if="form_data.title"
                :src="form_data.title"
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

export default {
  name: "handler_payload_plan",
  data() {
    return {
      form_data: {
        img: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(file);
      let self = this;
      let formData = new FormData();
      formData.append("file", file).file;
      formData.append("fileType", "planType");
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
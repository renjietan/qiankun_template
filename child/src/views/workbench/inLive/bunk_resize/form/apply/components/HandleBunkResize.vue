<!-- 
 * @description: 
 * @fileName: HandlerServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 20:56:09
 * @后台人员:  
!-->
<template>
  <div class>
    <div style="margin-bottom: 20px;">
      <el-button type="success">
        <span class="btn_pic">
          <img class="pic" src="~@/assets/images/AJFR/biaoge.png" />收费标准确认书
        </span>
      </el-button>
      <!-- <el-button type="success" icon="el-icon-plus">护理等级确认书</el-button> -->
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
          <el-form-item class="optional" prop="rates_img" label="收费标准确认书（签名）">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form_data.rates_img" :src="form_data.rates_img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                <div class="uploader_desc">上传文件</div>
              </i>
              <div class="upload_icons">
                <el-button icon="el-icon-camera" size="mini" plain type="warning">拍取</el-button>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "HandlerServerLevel",
  data() {
    return {
      form_data: {
        rates_img: "",
        nurse_img: ""
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -1.2px;
  }
</style>
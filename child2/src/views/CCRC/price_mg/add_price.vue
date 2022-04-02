<!-- 
 * @description:新增价格方案 
 * @fileName: add_price.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-25 15:48:34
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        label-width="180px"
        label-position="left"
      >
        <el-row>
          <el-form-item label="价格方案名称:" class="required">
            <el-input v-model="name" placeholder="请输入方案名称" style="width:485px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="上传价格方案:" class="required">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
              >
                <img v-if="form_data.empHeads" :src="form_data.empHeads" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">点击上传</div>
                </i>
              </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="计价方式：" class="required">
            <el-radio-group v-model="radio" style="width:300px;color:#222">
              <el-radio :label="0">按建筑面积</el-radio>
              <el-radio :label="1">按套内面积</el-radio>
              <el-radio :label="2">按套</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="价格标准：" class="required">
            <el-radio-group v-model="radio1" style="width:300px;color:#222">
              <el-radio :label="0">以标准总价为准</el-radio>
              <el-radio :label="1">以建筑单价为准</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="已售房间：" class="required">
            <el-radio-group v-model="radio2" style="width:300px;color:#222">
              <el-radio :label="0">参与调价</el-radio>
              <el-radio :label="1">不参与调价</el-radio>
            </el-radio-group>
            <div class="text">已售房间包含认购、签约，且导入价格后只会更新房间价格，不影响已售信息。</div>
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="调价说明：" class="noRequired">
            <el-input
              v-model="name"
              placeholder="请输入"
              type="textarea"
              style="width:1510px"
              :rows="6"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
      <div class="footer">

      <el-button type="primary" @click="handleSubmit">保 存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
      
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "price_mg_add_price",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      name:'',
      form_data: {},
      fileList:[],
      radio: 1,
      radio1: 0,
      radio2: 0,
      dialog_cof: {
        visible: true,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    UploadPic(){},
    handleSubmit(){},
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.container_card {
  .text {
    color: #8a8a8a;
  }
  .required {
    /deep/.el-form-item__label {
      color: #222;

      font-weight: 400;

      &:after {
        display: inline-block;
        content: "*";
        text-indent: 5px;
        color: red;
      }
    }
  }
  .noRequired {
    /deep/.el-form-item__label {
      color: #222;
      font-weight: 400;
    }
  }
}
</style>
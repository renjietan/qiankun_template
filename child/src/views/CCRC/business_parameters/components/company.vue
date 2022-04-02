<!-- 
 * @description:公司级 
 * @fileName: company.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 20:14:18
 * @后台人员:  
!-->
<template>
  <div style="padding-bottom: 20px;">
    <el-form :inline="true" label-position="right">
      <el-row>
        <el-col :span="20">
          <el-form-item label="公司：" label-width="120">
            <el-select v-model="company" placeholder="请选择" style="width:300px;margin-left:-10px">
              <el-option
                v-for="item in company_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">
      <span>配置类参数</span>
      <div class="btn_group" style="text-align: right">
        <el-button type="success">
          <span class="btn_pic">
            <img class="pic" src="~@/assets/images/CCRC/introduce.png" />引入参数
          </span>
        </el-button>
        <el-button type="primary">
          <span class="btn_pics">
            <img class="pic" src="~@/assets/images/CCRC/daochu.png" />导出到Excel
          </span>
        </el-button>
        <el-button type="primary">
          <span class="btn_pics">
            <img class="pic" src="~@/assets/images/CCRC/daochu.png" />从Excel导出
          </span>
        </el-button>
      </div>
    </div>
    <div class="parameter_content" style="padding-top:24px;color:#222;font-weight:400">
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        label-width="180px"
        label-position="left"
      >
        <el-row>
          <el-form-item label="允许审批中执行价格方案：">
            <el-radio-group v-model="radio" style="width:300px">
              <el-radio :label="0">允许</el-radio>
              <el-radio :label="1">不允许</el-radio>
            </el-radio-group>
            <div class="text">若启用，则调价方案发起审批后，就可以执行。但后续审批会控制只能审批通过。</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="启用面积变更审核：">
            <el-radio-group v-model="radio1" style="width:300px;color:#222">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">不启用</el-radio>
            </el-radio-group>
            <div class="text">若启用，则房间定价后再修改面积，需要在“面积变更审核：中审核后才会更新房间价格。</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="启用退房审核：">
            <el-radio-group v-model="radio2" style="width:300px">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">不启用</el-radio>
            </el-radio-group>
            <div class="text">1、若启用，则房间发生换、退房后，需要在“退房价格审核”中审核后才能销售。</div>
            <div class="text">2、若启用，则房间定价后再修改面积，需要在“面积变更审核“中审核后才会更新房间价格。</div>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "Company",
  components: {
    Pagination
  },
  directives: {
    waves
  },

  data() {
    return {
      company: "",
      company_list: [], //公司列表
      form_data: {},
      radio: 1,
      radio1: 0,
      radio2: 0
    };
  },
  computed: {},
  methods: {},

  mounted() {}
};
</script>
<style lang='scss' scoped>
.btn_pic {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -3px;
  }
}
.btn_pics {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2px;
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}
/deep/.el-form-item__label {
  color: #262626;
  line-height: 40px;
  font-weight: 400;
}
.title {
  margin-top: 5px;
  letter-spacing: 1px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
.parameter_content {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #222;

    font-weight: 400;
  }
}
</style>
<!-- 
 * @description: 
 * @fileName: conclusion.vue 
 * @author: 谭人杰 
 * @date: 2021-06-23 19:14:39
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-button type="warning"  disabled>退住总结单</el-button>
    <el-form :inline="true" style="margin-top: 20px" :model="form_data" ref="ruleForm">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item class="default" label="入院健康情况" prop="admissionHealth">
            <el-input v-model="form_data.admissionHealth" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="default" label="入院疾病状况" prop="admissionDisease">
            <el-input v-model="form_data.admissionDisease" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="default" label="入院期间健康状况及主要治疗经过" prop="treatment">
            <el-input v-model="form_data.treatment" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="default" label="出院健康状况" prop="leaveHealth">
            <el-input v-model="form_data.leaveHealth" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="default" label="出院诊断" prop="leaveTreatment">
            <el-input v-model="form_data.leaveTreatment" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="default" label="出院指导" prop="leaveGuide">
            <el-input v-model="form_data.leaveGuide" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { set_back_live, get_back_live } from "@/api/pensionagency/inLive/back_to_live";
  export default {
    name: "conclusion",
    data() {
      return {
        form_data: {
          elderId: undefined,
          admissionHealth: "", //入院健康情况
          admissionDisease: "", //入院疾病状况
          treatment: "", //入院期间健康状况及主要治疗经过
          leaveHealth: "", //出院健康状况
          leaveTreatment: "", //出院诊断
          leaveGuide: "", //出院指导
        },
      };
    },
    methods: {
      submit() {
        let self = this
        self.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            set_back_live(self.form_data).then((res) => {
              self.$notify({
                message: "提交成功",
                type: "success",
                title: "提示"
              });
            });
          }
        });
      },
      resetFormValue() {
        this.form_data = {
          elderId: undefined,
          admissionHealth: "", //入院健康情况
          admissionDisease: "", //入院疾病状况
          treatment: "", //入院期间健康状况及主要治疗经过
          leaveHealth: "", //出院健康状况
          leaveTreatment: "", //出院诊断
          leaveGuide: "", //出院指导
        };
      },
    },
    mounted() {
      this.form_data.elderId = this.$route.params.id
      get_back_live({
        elderId: this.form_data.elderId
      }).then(res => {
        if(res != null) {
          this.form_data = res
        }
      })
    },
  };
</script>

<style lang='scss' scoped>
  .el-textarea {
    /deep/ .el-textarea__inner {
      height: 150px;
    }
  }
</style>
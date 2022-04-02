<!-- 
 * @description: 审核状况 
 * @fileName: verify.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true" ref="form_verify" hide-required-asterisk status-icon>
      <el-row style="height:250px;background-color:#FAFAFA; padding: 0 20px;">
        <el-col :span="4">
          <el-form-item class="readonly" label="审核日期">
            <el-date-picker readonly v-model="form_data.apply_date" type="date" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="填写人">
            <el-input readonly v-model="form_data.apply_person" required placeholder="请输入填写人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="床位名称">
            <el-input readonly v-model="form_data.bedName" required placeholder="请输入床位名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import { arrayGroupBy } from "@/utils/index";
  import { getApplyStatus } from '@/api/pensionagency/goLive/goLive';
  export default {
    name: "verify",
    directives: { waves },
    data() {
      return {
        form_data: {
          apply_date: "", //审核日期
          apply_person: "", //填写人
          bedName: "", //床位号
        },
      };
    },
    methods: {
      
    },
    mounted() {
      let { id } = this.$route.params
      let self = this
      getApplyStatus({elderId: id}).then(res => {
        self.form_data.apply_date = res.checkDate ?? ""
        self.form_data.apply_person = res.operator ?? ""
        self.form_data.bedName = res.bedName
      })
    }
  };
</script>
<style lang='scss' scoped>
</style>
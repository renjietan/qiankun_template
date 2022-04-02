<!-- 
 * @description:体检状况 
 * @fileName: medical.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-04 17:19:23
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true" ref="form_medical" hide-required-asterisk status-icon>
      <el-row style="height:300px;background-color:#FAFAFA; padding: 0 20px;">
        <el-col :span="4">
          <el-form-item class="readonly" label="体检日期">
            <el-date-picker readonly v-model="form_data.physical_date" type="date" placeholder="申请时未填写此项">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="体检单位">
            <el-input readonly v-model="form_data.physical_company" required placeholder="申请时未填写此项"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="填写人">
            <el-input readonly v-model="form_data.physical_person" required placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="服务套餐">

            <el-input readonly v-model="form_data.service_menu" required placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col></el-col>
        <el-row style="margin-left:40px">
          <el-col :span="4">
            <el-form-item class="readonly" label="营养状况">
              <el-input readonly v-model="form_data.nutrition_status" required placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="生活自理能力">
              <el-input readonly v-model="form_data.living_status" required placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left:40px">
          <el-col :span="4">
            <el-form-item class="readonly" label="精神状况">
              <el-input readonly v-model="form_data.spirit_status" required placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="行为能力">
              <el-input readonly v-model="form_data.behavior" required placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>

  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import {
    get_older_healthinfo,
  } from "@/api/pensionagency/goLive/goLive";
  import { arrayGroupBy } from "@/utils/index";
  import {
    nutritionalStatus,
    mentalStatus,
    selfCareAbility,
    capacityList
  } from "@/utils/enum";
  export default {
    name: "medical",
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        server_package_opt: [],
        form_data: {
          physical_date: "", //体检日期
          physical_company: "", //体检单位
          physical_person: "", //填写人
          service_menu: "", //服务套餐
          nutrition_status: "", //营养状况
          living_status: "", //生活自理能力
          spirit_status: "", //精神状况
          behavior: "", //行为能力
        },
      };
    },
    methods: {
    },
    mounted() {
      let { id } = this.$route.params

      get_older_healthinfo({
        elderId: id
      }).then(res => {
        this.form_data.physical_date = res.medicalDate ?? ""
        this.form_data.physical_company = res.medicalUnit ?? ""
        this.form_data.physical_person = res.operator ?? ""
        this.form_data.service_menu = res.cimboName ?? ""
        this.form_data.nutrition_status = nutritionalStatus.filter(item => item.value == res.nutritionStatus)[0]?.label ?? ""
        this.form_data.living_status = selfCareAbility.filter(item => item.value == res.selfCareAbility)[0]?.label ?? ""
        this.form_data.spirit_status = mentalStatus.filter(item => item.value == res.mentalStatus)[0]?.label ?? ""
        this.form_data.behavior = capacityList.filter(item => item.value == res.behaviorAbility)[0]?.label ?? ""
      })
    }
  };
</script>
<style lang='scss' scoped>
</style>
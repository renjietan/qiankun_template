<!-- 
 * @description: 评估/评估中心-查看记录-能力评估-详情
 * @fileName: assess_form_record_info.vue 
 * @author: 谭人杰 
 * @date: 2021-06-16 19:57:13
 * @后台人员:  
!-->
<template>
  <div class="container" v-loading="form_loading">
    <Basicinfo :olderInfo="olderInfo"></Basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">能力评估</div>
      <el-form :inline="true" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="5">
            <el-form-item class="readonly" label="评估人">
              <el-input
                readonly
                v-model="form_data.operator"
                placeholder="请输入评估人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item class="readonly" label="评估时间">
              <el-date-picker
                readonly
                v-model="form_data.checkDate"
                type="datetime"
                placeholder="请选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="crumbs" style="margin: 0 0 25px 0">
        <div
          v-for="(item, index) in tags"
          @click="handle_switchModel(item)"
          :key="index"
        >
          <span
            :class="[
              'crumbs_font',
              cur_tag.name == item.name ? 'crumbs_font_active' : '',
            ]"
            >{{ item.name }}</span
          >
          <span class="crumbs_sprit"> / </span>
        </div>
      </div>
      
      <!--  防止后期 UI更改  -->
      <component
        @getData="getData"
        :is="cur_tag.component"
        :key="cur_tag.component"
      ></component>
    </div>

    
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import Acitves from "../../../goLive/form/ability_assess/components/acitves";
import Spirit from "../../../goLive/form/ability_assess/components/spirit";
import Perception from "../../../goLive/form/ability_assess/components/perception";
import Social from "../../../goLive/form/ability_assess/components/social";
import AssessLevel from "../../../goLive/form/ability_assess/components/result";
import {} from "@/utils/validate";
import Basicinfo from "@/components/Basicinfo";
import { get_assess_info } from "@/api/pensionagency/goLive/goLive";

export default {
  name: "assess_form_record_info",
  components: {
    Pagination,
    Acitves,
    Spirit,
    Perception,
    Social,
    AssessLevel,
    Basicinfo,
  },
  directives: { waves },
  data() {
    return {
      level: ["物业服务", "轻度失眠", "中度失眠", "重度失眠"],
      olderInfo: null,
      tags: [
        {
          name: "日常生活活动",
          component: "Acitves",
        },
        {
          name: "精神状态",
          component: "Spirit",
        },
        {
          name: "感知觉与沟通",
          component: "Perception",
        },
        {
          name: "社会参与",
          component: "Social",
        },
        {
          name: "评估等级",
          component: "AssessLevel",
        },
      ],
      cur_tag: {},
      form_data: {
        checkDate: "",
        operator: "",
      },
      form_loading: false,
      options: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 0,
        },
      ],
    };
  },
  methods: {
      handle_switchModel(val) {
      this.cur_tag = val;
    },
   
  },
  mounted() {
    
    this.cur_tag = this.tags[0];
     get_assess_info({ elderId: this.$route.params.id}).then(res => {
      
        this.form_data.checkDate = res?.checkDate ?? ""
        this.form_data.operator = res?.operator ?? ""
      })
      // this.getDetail();
  },
};
</script>
<style lang='scss' scoped>
</style>
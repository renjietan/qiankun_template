<!-- 
 * @description: 入住体检
 * @fileName: examination.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 11:36:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">入住体检</div>
      <div class="crumbs" style="margin: 0 0 25px 0">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span
            :class="[
              'crumbs_font',
              cur_tag.name == item.name ? 'crumbs_font_active' : '',
            ]"
          >{{ item.name }}</span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>
      <!--  防止后期 UI更改  -->
      <component ref="component" :is="cur_tag.component" :key="cur_tag.name"></component>
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
import { tabs } from "@/utils/enum";
import HealthEval from "./components/health_eval";
import lifeHabits from "./components/life_habits";
import passMedicalHistory from "./components/pass_medical_history";
import physicalExamination from "./components/physical_examination";
import SupplementaryEamination from "./components/Supplementary_xamination";
export default {
  name: "goLive_form_examination",
  components: {
    Pagination,
    HealthEval,
    lifeHabits,
    passMedicalHistory,
    physicalExamination,
    SupplementaryEamination
  },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      // tags: [
      //   {
      //     name: "健康评价",
      //     component: "HealthEval"
      //   },
      //   {
      //     name: "生活习惯",
      //     component: "lifeHabits"
      //   },
      //   {
      //     name: "既往病史",
      //     component: "passMedicalHistory"
      //   },
      //   {
      //     name: "体格检查",
      //     component: "physicalExamination"
      //   },
      //   {
      //     name: "辅助检查",
      //     component: "SupplementaryEamination"
      //   }
      // ],
      cur_tag: {},
      tags: tabs,
      olderInfo: null
    };
  },
  methods: {
    handle_switchModel(val) {
      this.cur_tag = val;
    },
    userInfo() {
      get_older_baseinfo({
        elderId: this.form_data.elderId
      }).then(res => {
        if (res != null) {
          this.olderInfo = res;
        }
      });
    }
  },
  mounted() {
    this.cur_tag = this.tags[0];
  }
};
</script>
<style lang='scss' scoped>
</style>
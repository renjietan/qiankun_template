<!-- 
 * @description:业务参数设置 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 15:02:10
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 18px 0;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{
            item.name }}
          </span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>

      <!--  防止后期 UI更改  -->
      <component :is="cur_tag.component" :key="cur_tag.component"></component>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import Group from "./components/group";
  import Company from "./components/company";
  import { } from "@/utils/validate";
  export default {
    name: "business_parameters_list",
    components: {
      Pagination,
      Group,
      Company,
    },
    directives: { waves },
    data() {
      return {
        tags: [
          {
            name: "集团级",
            component: "Group"
          },
          {
            name: "公司级",
            component: "Company"
          },
        ],
        cur_tag: {},
        assessor: "",
        assessDate: new Date(),
      };
    },
    methods: {
      handle_switchModel(val) {
        this.cur_tag = val;
      }
    },
    mounted() {
      this.cur_tag = this.tags[0];
    }
  };
</script>
<style lang='scss' scoped>
.crumbs{
     border-bottom: 1px solid #E9E9E9;
    }
 
</style>
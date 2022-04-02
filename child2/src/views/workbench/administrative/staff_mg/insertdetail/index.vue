<!-- 
 * @description: 新增职工 
 * @fileName: administrative_staff_mg_insert.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px;">{{this.$route.query.title}}</div>
      <div class="crumbs" style="margin: 0 0 25px 0;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{
            item.name }}
          </span>
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
import BasicinfoDetail from "./components/basic_info_detail";

export default {
  name: "administrative_staff_mg_insertdetail",
  components: { Pagination, BasicinfoDetail },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      join_list: [],
      take_list: [],
      cur_tag: {},
      tags: [
        {
          name: "基本信息",
          component: "BasicinfoDetail"
        },
        // {
        //   name: "详细信息",
        //   component: "Livingstatus"
        // },
        // {
        //   name: "电子文档",
        //   component: "Hobby"
        // }
      ]
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
</style>
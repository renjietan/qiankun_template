<!-- 
 * @description: 在住-服务等级调整-申请
 * @fileName: resize_server_level.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 19:29:00
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 25px 0">
        <div
          v-if="bunk_resize_apply_tagList.length > 1"
          v-for="(item, index) in bunk_resize_apply_tagList"
          @click="handleSelect(item)"
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
      <div style="margin-top: 10px">
        <component
          ref="component"
          :is="cur_tag.component"
          :key="cur_tag.name"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import BasicInfoTable from "@/components/Basicinfo/table";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { bunk_resize_apply_tagList } from "@/utils/enum";
import ApplyBunkResize from "./components/ApplyBunkResize";
import AuditBunkResize from "./components/AuditBunkResize";
import ConfirmPaymentPlan from "./components/ConfirmPaymentPlan";
import HandleBunkResize from "./components/HandleBunkResize";
export default {
  name: "inLive_bunk_resize_form_apply",
  components: {
    Pagination,
    BasicInfoTable,
    ApplyBunkResize,
    AuditBunkResize,
    ConfirmPaymentPlan,
    HandleBunkResize,
  },
  directives: { waves, permission },
  data() {
    return {
      bunk_resize_apply_tagList,
      cur_tag: {},
    };
  },
  methods: {
    handleSelect(item) {
      this.cur_tag = item;
    },
  },
  mounted() {
    const { nav } = this.$route.query;
    if (!isNaN(Number(nav))) {
      this.cur_tag = this.bunk_resize_apply_tagList[nav];
    }
  },
  activated() {
    const { nav } = this.$route.query;
    if (!isNaN(Number(nav))) {
      this.cur_tag = this.bunk_resize_apply_tagList[nav];
    }
  },
  deactivated() {
    const { nav } = this.$route.query;
    if (!isNaN(Number(nav))) {
      this.cur_tag = this.bunk_resize_apply_tagList[nav];
    }
  },
};
</script>
<style lang='scss' scoped>
</style>
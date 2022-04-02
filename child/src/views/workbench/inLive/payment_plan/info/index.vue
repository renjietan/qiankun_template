<!-- 
 * @description: 
 * @fileName: payload_plan_info.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 14:06:05
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 25px 0">
        <div
          v-if="payload_plan_tagList.length > 1"
          v-for="(item, index) in payload_plan_tagList"
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
import { payload_plan_tagList } from "@/utils/enum";
import ApplyPayloadPlan from "./components/apply_payload_plan";
import AuditPayloadPlan from "./components/audit_payload_plan";
import HandlerPayloadPlan from "./components/handler_payload_plan";
export default {
  name: "inLive_payment_plan_info",
  components: {
    BasicInfoTable,
    ApplyPayloadPlan,
    AuditPayloadPlan,
    HandlerPayloadPlan,
  },
  data() {
    return {
      cur_tag: {},
      payload_plan_tagList,
      flt: {
        name: "",
        status: undefined,
      },
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
      this.cur_tag = this.payload_plan_tagList[nav];
    }
  },
  activated() {
   const { nav } = this.$route.query;
    if (!isNaN(Number(nav))) {
      this.cur_tag = this.payload_plan_tagList[nav];
    }
  },
  deactivated() {
    const { nav } = this.$route.query;
    if (!isNaN(Number(nav))) {
      this.cur_tag = this.payload_plan_tagList[nav];
    }
  },
};
</script>
<style lang='scss' scoped>
</style>
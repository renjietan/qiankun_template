<!-- 
 * @description: 付款计划
 * @fileName: payload_plan.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 11:43:48
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basicinfo :olderInfo="olderInfo"></basicinfo>
    <div class="container_card" style="padding: 30px">
      <table-fee></table-fee>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import Basicinfo from "@/components/Basicinfo";
  import TableFee from "./components/table_fee";
  import { } from "@/utils/validate";
  import {

    get_older_baseinfo,
  } from "@/api/pensionagency/goLive/goLive";
  export default {
    name: "goLive_form_payment_plan",
    components: { Pagination, Basicinfo, TableFee },
    directives: { waves },
    data() {
      return {
        elderId: undefined,
        olderInfo: {},
      };
    },
    methods: {
      userInfo() {
        get_older_baseinfo({
          elderId: this.elderId,
        }).then((res) => {
          this.olderInfo = res;
        });
      },
    },
    mounted() {
      const { id } = this.$route.params;
      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.userInfo();
      }
    },
  };
</script>
<style lang='scss' scoped>
</style>
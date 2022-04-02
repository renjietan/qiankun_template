<!-- 
 * @description: 
 * @fileName: pay_play.vue 
 * @author: 王文涛 
 * @date: 2021-11-16 15:48:35
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class>
      <basic-info-table></basic-info-table>
    </div>
    <div class="container_card" style="min-height: 600px">
        <table-fee></table-fee>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import BasicInfoTable from "@/components/Basicinfo/table";
import TableFee from "./components/table_fee.vue";

export default {
  components: { Pagination,TableFee,BasicInfoTable },
  directives: { waves, permission, elDragDialog,  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
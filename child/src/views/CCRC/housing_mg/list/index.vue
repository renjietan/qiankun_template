<!-- 
 * @description: 房源管理
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2021-10-20 16:46:16
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="btn-box" style="margin-bottom: 25px">
        <el-button
          :type="index == active_index ? 'primary' : 'default'"
          v-for="(item, index) in button_group"
          @click="handleChange(index)"
          :key="index"
          >{{ item.name }}</el-button
        >
      </div>
       <component ref="component"  :is="cur_tag.component" :key="cur_tag.name"></component>
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
import roomInformation from "./components/room_information/list_table.vue";
import areaOfAdjustment from './components/area_of_adjustment/list_table.vue';
import roomBind from './components/room_bing/list_table.vue';
import roomInfoOther from './components/room_other_info/list_table.vue';
import saleInfo from './components/sale_info/sale_info.vue'
export default {
  components: { Pagination,roomInformation,areaOfAdjustment,roomBind,roomInfoOther,saleInfo},
  directives: { waves, permission, elDragDialog },
  name: "CCRC_list_hourse_mg",
  data() {
    return {
      cur_tag: {},
      button_group: [
        {
          name: "房间资料",
          component: "roomInformation",
        },
        {
          name: "面积调整",
          component: "areaOfAdjustment",
        },
        {
          name: "房间绑定",
          component: "roomBind",
        },
        // {
        //   name: "销许信息",
        //   component: "saleInfo",
        // },
        // {
        //   name: "房间其他信息",
        //   component: "roomInfoOther",
        // },
      ],
     
      visible: false,
      flt: {
        elderName: "",
        bedName: "",
      },
      active_index: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
    };
  },
  methods: {
    handleChange(index) {
      this.active_index = index;
      this.cur_tag = this.button_group[this.active_index];
    },
  },
  mounted() {
      this.cur_tag = this.button_group[0];
  },
};
</script>
<style lang='scss' scoped>
</style>
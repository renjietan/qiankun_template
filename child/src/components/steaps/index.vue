<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 17:55:27
 * @后台人员:  
!-->
<template>
  <div class="box">
    <el-steps :active="number" align-center>
      <el-step
        v-for="(item, index) in data"
        :key="index"
        @click.native="changeClick(index)"
        :title="item.name"
      ></el-step>
    </el-steps>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "steaps",
  props: {
    data: {
      default: () => [],
      type: Array,
    },
    number:{
      default:()=>2,
      type:Number  
    }
  },
  data() {
    return {};
  },
  methods: {
    changeClick(index) {
      this.$emit("onChange", index);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>

</style>
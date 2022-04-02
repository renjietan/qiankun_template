<!-- 
 * @description: 出入库记录
 * @fileName: inventory_mg.vue 
 * @author: 王文涛 
 * @date: 2022-02-22 14:42:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="5" v-for="(item, index) in recordList" :key="index">
        <div
          :class="[
            `container_card ${
              index == active ? 'container_card2' : 'container_card1'
            }`,
          ]"
          :style="`background:${getStyle(index)}`"
          @click="handleSwitch(index)"
        >
          <div class="img-icon">
             <svg-icon :icon-class="`i_${index == active?index+3:index+1}`" class="icon"></svg-icon>
          </div>
          <div class="text-block">
            <h4>{{ item.label }}</h4>
            <p>
              <span>{{ item.num }}</span
              >条记录（本月）
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <component
      :is="recordList[active].components"
      :key="recordList[active].label"
    ></component>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { colorList } from "@/utils/enum";
import Out from "./components/outBound/list";
import In from "./components/inBound/list";
export default {
  components: { Pagination, Out, In },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      active: 0,
    
      colorList,
      
      recordList: [
        {
          label: "入库记录",
          num: 200,
          components: In,
        },
        {
          label: "出库记录",
          num: 200,
          components: Out,
        },
      ],
    };
  },
  methods: {
    getStyle(index) {
      return this.active == index ? this.colorList[this.active] : "";
    },
    handleSwitch(index) {
      this.active = index;
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.container_card1 {
  padding: 21px 24px;
  .img-icon {
    display: inline-block;
    .icon {
      font-size: 40px;
      text-align: center;
    }
  }
  .text-block {
    font-size: 16px;
    line-height: 9px;
    margin-left: 22px;
    p {
      span {
        font-size: 24px;
      }
      color: #017cff;
    }
    display: inline-block;
  }
}

.container_card2 {
  @extend .container_card1;
  .text-block {
    p {
      color: #fff;
    }
  }
  color: #fff;
}
</style>
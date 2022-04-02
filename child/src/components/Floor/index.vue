<!-- 
 * @description: 调整房间
 * @fileName: floor.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 14:52:32
 * @后台人员:  
!-->
<template>
  <div class="floor-box">
    <div class="floor-container">
      <div class="floor-title"></div>
      <div class="box">
        <div class="box_header"></div>
        <div class="box_header"  v-for="(item,index) in units" :key="index">{{item}}</div>
      </div>
      <div class="box" v-for="(item, index) in data" :key="index">
        <div class="box_item" v-for="(v, i) in item.rowName" :key="i"> 
          <span>{{v.label }}</span>
          <p
            class="code"
            :class="index>0 && m != ''?'code_border':''"
            v-for="(m, x) in v.unit"
            :key="x"
            :style="index>0?saleStatus[m.status]:''"
            @click="popDraw(m)"
          >{{m.num}}</p>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot-box">
        <p class="icon"></p>
        <p class="text">待售</p>
      </div>
      <div class="foot-box">
        <p class="icon" style="background: #1fcda0; border: 1px solid #1fcda0"></p>
        <p class="text">预留</p>
      </div>
      <div class="foot-box">
        <p class="icon" style="background: #017cff; border: 1px solid #017cff"></p>
        <p class="text">签约</p>
      </div>
      <div class="foot-box">
        <p class="icon" style="background: #ff8b43; border: 1px solid #ff8b43"></p>
        <p class="text">预订</p>
      </div>
        <!-- <div class="foot-box">
        <p class="icon" style="background: #fe3d65; border: 1px solid #fe3d65"></p>
        <p class="text">解约</p>
      </div> -->
      <div class="foot-box">
        <p class="icon" style="background: #d6d6d6; border: 1px solid #d6d6d6"></p>
        <p class="text">销控</p>
      </div>
      <div class="foot-box">
        <p class="icon" style="background: #B0C4DE; border: 1px solid #B0C4DE"></p>
        <p class="text">价格失效</p>
      </div>
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
import { saleStatus } from "@/utils/enum";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  props: {
    data: {
      default: () => [],
      type: Array
    },
    units:{
      default:()=>[],
      type:Array
    }
  },
  data() {
    return {
      saleStatus
    };
  },
  methods: {
    popDraw(v) {
      this.$emit("popDraw", v);
    }
  },
  mounted() {
  }
};
</script>
<style lang='scss' scoped>
.floor-box {
  margin-top: 32px;
  .floor-container {
    height: 600px;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    overflow-y: scroll;
    .box {
      display: flex;
      font-size: 14px;
        overflow: hidden;

      &:nth-of-type(3) {
        // 长度需更具单元数计算
        background: rgba(1, 124, 255, 0.05);
      }

      .box_header {
        // 更根据编号计算长度
        width: 135px;
        height: 36px;
        margin-top: 12px;
        border-bottom: 36px solid #017cff;
        border-left: 37px solid transparent;
        border-right: 37px solid transparent;
        text-align: center;
        line-height: 36px;
        color: #fff;
        &:nth-of-type(1) {
          width: 135px;
          height: 36px;
          margin-top: 12px;
          background: none;
          border:none;
        }
        &:nth-of-type(n+2) {
          width: 178px;
          border-bottom: 36px solid #017cff;
          border-left: 37px solid transparent;
          border-right: 37px solid transparent;
          text-align: center;
          line-height: 36px;
          color: #fff;
        }
        &:nth-of-type(n+3) {
          width:180px;
          @extend:nth-of-type(n+2);
          margin-left: 10px;
        }
        // &:nth-of-type(4) {
        //   width: 178px;
        //   @extend:nth-of-type(2);
        //   margin-left: 10px;
        // }
      }

      .box_item {
        width: 132px;
        text-align: center;
        line-height: 36px;
        height: 36px;
        border: 1px solid #017cff;

        &:nth-of-type(n+2) {
          width: 181px;
          display: flex;
          justify-content: center;
          .code {
            width: 69px;
            height: 34px;
            margin-top: 1px;
            text-align: center;
          }
          .code_border {
            margin-top: 2px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #c8c8c8;
            margin-right: 2px;
          }
        }
        &:nth-of-type(n+3) {
          width: 181px;
          margin-left: 9px;
          justify-content: center;
          display: flex;
          .code {
            width: 69px;
            height: 34px;
            margin-top: 1px;
            justify-content: center;
            text-align: center;
          }
          .code_border {
            margin-top: 2px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #c8c8c8;
            margin-right: 2px;
          }
        }
        // &:nth-of-type(4) {
        //   width: 235px;
        //   margin-left: 9px;
        //   justify-content: center;
        //   display: flex;
        //   .code {
        //     width: 69px;
        //     height: 34px;
        //     margin-top: 1px;
        //     justify-content: center;
        //     text-align: center;
        //   }
        //   .code_border {
        //     margin-top: 2px;
        //     height: 30px;
        //     line-height: 30px;
        //     border: 1px solid #c8c8c8;
        //     margin-right: 2px;
        //   }
        // }
      }
    }
  }
  .foot {
    width: 100%;
    display: flex;
    .foot-box {
      display: flex;
      margin-right: 48px;
      line-height: 18px;
      .icon {
        width: 18px;
        height: 18px;
        border: 1px solid #c8c8c8;
        margin-right: 12px;
        margin-top: 14px;
        border-radius: 2px;
      }
    }
  }
}
</style>
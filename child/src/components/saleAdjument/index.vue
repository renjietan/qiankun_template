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
      <div class="floor-title" @click="popDraw">东区住宅-01栋</div>
      <div class="box">
        <div class="box_header"></div>
        <div class="box_header"></div>
        <div class="box_header"></div>
      </div>
      <div class="box" v-for="(item, index) in data" :key="index">
        <div class="box_item" v-for="(v, i) in item.rowName" :key="i">
          <el-checkbox v-show="v.show" v-model="v.isChecked" @change="checkMethod(i)"></el-checkbox>
          <p class="code">{{ v.label }}</p>
          <div
            v-show="v.floorlabel"
            class="item-header"
            v-for="(x, y) in v.floorlabel"
            :key="y"
          >
            <el-checkbox :label="x.name" v-model="x.isChecked"></el-checkbox>
          </div>

          <div v-show="index !== 0 && i == 1">
            <p class="code">房间号</p>
            <p class="code">景观</p>
            <p class="code">朝向</p>
          </div>
          <div
            class="status-box"
            v-show="v.infoData"
            v-for="(n, m) in v.infoData"
            :key="m"
            :style="index > 0 ? saleStatus[n.status] : ''"
          >
            <p class="code-name">{{ n.name }}</p>
            <p class="code-name">{{ n.toward }}</p>
            <p class="code-name">{{ n.landscape }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot-box">
        <p class="icon"></p>
        <p class="text">待售</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #1fcda0; border: 1px solid #1fcda0"
        ></p>
        <p class="text">预留</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #fe3d65; border: 1px solid #fe3d65"
        ></p>
        <p class="text">小订</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #017cff; border: 1px solid #017cff"
        ></p>
        <p class="text">认购</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #ff8b43; border: 1px solid #ff8b43"
        ></p>
        <p class="text">草签</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #a140de; border: 1px solid #a140de"
        ></p>
        <p class="text">网签</p>
      </div>
      <div class="foot-box">
        <p
          class="icon"
          style="background: #d6d6d6; border: 1px solid #d6d6d6"
        ></p>
        <p class="text">销控</p>
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
      type: Array,
    },
  },
  data() {
    return {
      saleStatus,
    };
  },
  methods: {
    popDraw() {
      this.$emit("popDraw", 0);
    },
    checkMethod(i){
      this.$emit("checkMethod",i);
    }
  },
  mounted() {
    console.log(this.data);
  },
};
</script>
<style lang='scss' scoped>
.floor-box {
  margin-top: 32px;
  .floor-container {
    width: 1291px;
    height: 600px;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    overflow-y: scroll;
    .box {
      display: flex;
      font-size: 14px;
      .box_header {
        width: 346px;
        height: 36px;
        margin-top: 12px;
        &:nth-of-type(3) {
          width: 2234px;
          border-bottom: 36px solid #017cff;
          border-left: 37px solid transparent;
          border-right: 37px solid transparent;
          text-align: center;
          line-height: 36px;
          color: #fff;

          
        }
      }

      .box_item {
        width: 132px;
        text-align: center;

        min-height: 30px;
        border: 1px solid #017cff;

        &:nth-of-type(2) {
          width: 161px;
          padding-top: 12px;
          .code {
            width: 69px;
            line-height: 12px;
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
        &:nth-of-type(3) {
          width: 991px;
          display: flex;
          align-items: center;
          .code {
            width: 69px;
            height: 34px;
            margin-top: 1px;
            justify-content: center;
            text-align: center;
          }
          .el-checkbox {
            width: 121px;
           
            margin-right: 12px;
            margin-top: 12px;
          }
          .code_border {
            margin-top: 2px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #c8c8c8;
            margin-right: 2px;
          }
          .status-box {
            width: 120px;
            height: 84px;
            border: 1px solid #ccc;
            line-height: 10px;
            margin-right: 16px;
          }
        }
      }
    }
  }

  .el-checkbox {
    
    float: right;
    margin-right: 12px;
    margin-top: 12px;
  }
  .foot {
    width: 100%;
    display: flex;
    .foot-box {
      display: flex;
      margin-right: 12px;
      .icon {
        width: 20px;
        height: 20px;
        border: 1px solid #c8c8c8;
        margin-right: 12px;
        margin-top: 14px;
        border-radius: 2px;
      }
    }
  }
}
</style>
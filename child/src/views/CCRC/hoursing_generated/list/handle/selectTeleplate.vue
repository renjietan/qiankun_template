<!-- 
 * @description: 选择模板
 * @fileName: selectTeleplate.vue 
 * @author: 王文涛 
 * @date: 2021-10-26 10:19:24
 * @后台人员:  
!-->
<template>
  <div class="box">
    <div class="table-box">
      <div
        class="list-item"
        v-for="(item, index) in selectImg"
        :key="index"
        @click="changeImg(index)"
      >
        <img
          :src="active != index?item.normalPath:item.activePath"
          alt=""
          srcset=""
          width="197"
          height="auto"
        />
        <p class="list-title">{{ item.title }}</p>
      </div>
    </div>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')" class="btn"
       :disabled="true"
        >上一步</el-button
      >
      <el-button type="primary" @click="submitForm('next')" class="btn"
        >下一步</el-button
      >
      <el-button class="btn" @click="submitForm('exit')">取消</el-button>
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
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      dialog_cof: {
        visible: true,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      active: 0,
      selectImg: [
        {
          normalPath: require("@/assets/images/CCRC/hourse_normal.png"),
          activePath: require("@/assets/images/CCRC/hourse_fill.png"),
          disable: false,
          title: "普通住宅",
        },
        {
          normalPath: require("@/assets/images/CCRC/bussing.png"),
          activePath: require("@/assets/images/CCRC/bussing_fill.png"),
          disable: false,
          title: "商业房间",
        },
        {
          normalPath: require("@/assets/images/CCRC/car_null.png"),
          activePath: require("@/assets/images/CCRC/car_fill.png"),
          disable: false,
          title: "车位",
        },
        {
          normalPath: require("@/assets/images/CCRC/bigHourse.png"),
          activePath: require("@/assets/images/CCRC/bigHoursefill.png"),
          disable: false,
          title: "别墅",
        },
      ],
    };
  },
  methods: {
    changeImg(index) {
      this.active = index;  
    },
    submitForm(type) {
       var self = this;
       const actionType = {
         'back':()=>{self.backup()},
         'next':()=>{self.nextsteap()},
         "exit":()=>{self.exit()}
       }
      actionType[type]();
    },
    // 返回上一步；
    backup(){
      this.$emit('backup',1)
    },
    // 下一步
    nextsteap(){
      this.$emit('nextsteap',2) 
    },
    exit(){
      this.$emit('closeTap','')
    }
  },
  mounted() {
    this.active = 0;
  },
};
</script>
<style lang='scss' scoped>
.table-box {
  display: flex;
  margin-top: 80px;
  text-align: center;
   justify-content: center;
  .list-item {
    margin-right: 43px;
    &:last-child {
      margin-right: 0;
    }
  }
  .list-title {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
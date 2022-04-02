<!-- 
 * @description:低价详情  
 * @fileName: cost_price_detail.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-28 19:56:18
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_cards">
      <div class="title1">
        <el-row>
          <img src="~@/assets/images/CCRC/building.png" style="width:40px;height:40px" />
          <div style="margin-top:-33px;margin-left:65px">
            <span>颐瑞公司-南京颐养中心-01栋-201</span>
          </div>
        </el-row>
      </div>
      <el-row :gutter="10" style="margin-top:40px;margin-bottom:24px">
        <el-col :span="6">
          <span>销售状态：</span>
          <span style="color:#222">待售</span>
        </el-col>
        <el-col :span="6">
          <span>建筑面积：</span>
          <span style="color:#222">134.0000</span>
        </el-col>
        <el-col :span="6">
          <span>套内面积：</span>
          <span style="color:#222">134.0000</span>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="container_cards">
      <div class="price_name">当前面价</div>
      <el-divider></el-divider>
      <el-row :gutter="10" style="margin-top:24px;margin-bottom:24px">
        <el-col :span="8">
          <span>面价建筑单价：</span>
          <span style="color:#222">14,667.00</span>
        </el-col>
        <el-col :span="8">
          <span>面价套内单价：</span>
          <span style="color:#222">123,667.00</span>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom:24px">
        <el-col :span="6">
          <span>套内面积：</span>
          <span style="color:#222">1,144,667.00</span>
        </el-col>
      </el-row>
    </div> -->
    <div class="container_cards">
      <div class="price_name">当前底价</div>
      <el-divider></el-divider>
      <el-row :gutter="10" style="margin-top:24px;margin-bottom:24px">
        <el-col :span="8">
          <span>底价建筑单价：</span>
          <span style="color:#222">0.00 元</span>
        </el-col>
        <el-col :span="8">
          <span>底价总价：</span>
          <span style="color:#222">0.00 元</span>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10" style="margin-bottom:24px">
        <el-col :span="6">
          <span>底价总价：</span>
          <span style="color:#222">0.00 元</span>
        </el-col>
      </el-row> -->
    </div>
    <div class="footer">
      <el-button @click="$router.go(-1)">返 回</el-button>
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
import {price_programme_detail} from "@/api/CCRC/price";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      id:null
    };
  },
  methods: {
    priceProgrammeDetail(){
      this.id=this.$route.query.id
      price_programme_detail(this.id).then(res=>{
console.log(res);
      })
    },
  },
  mounted() {
    this.priceProgrammeDetail()
  }
};
</script>
<style lang='scss' scoped>
.price_name {
  color: #262626;
  font-size: 16px;
  font-weight: 600;

  &:before {
    content: ".";
    width: 3px;
    height: 16px;
    color: #017cff;
    background-color: #017cff;
    font-size: 9px;
    margin-right: 7px;
  }
}
.container_cards {
  color: #000000a6;
  background: #fff;
  padding: 24px 24px 10px 32px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  font-size: 14px;
}
.title1 {
  color: #262626;
  font-weight: bold;
  font-size: 18px;

  span {
    font-weight: bold;
  }
}
</style>
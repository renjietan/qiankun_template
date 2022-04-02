<!-- 
 * @description:房间详情
 * @fileName: detail.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-11 20:05:01
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- <div class="container_cards">
      <div class="title1">
        <el-row>
          <img src="~@/assets/images/building.png" style="width:40px;height:40px" />
          <div style="margin-top:-33px;margin-left:65px">
            <span>-01栋-201</span>
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
    </div>-->
    <div class="container_cards">
      <div class="price_name">基本信息</div>
      <el-divider></el-divider>
      <div >
        <el-row style="margin-top:24px;margin-bottom:24px">
          <el-col :span="6">
            <span>房间：</span>
            <span style="color:#222">{{name}}</span>
          </el-col>
          <el-col :span="6">
            <span>户型名称：</span>
            <span style="color:#222">{{houseType.typeId}}</span>
          </el-col>
          <el-col :span="6">
            <span>房间状态：</span>
            <span style="color:#222">{{status}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:24px">
          <el-col :span="6">
            <span>建筑面积：</span>
            <span style="color:#222">{{houseType.buildingArea}} 平米</span>
          </el-col>
          <el-col :span="6">
            <span>室内面积：</span>
            <span style="color:#222">{{houseType.realArea}} 平米</span>
          </el-col>
        </el-row>
        <!-- <el-row style="margin-bottom:24px">
        <el-col :span="6">
          <span>面积建筑单价：</span>
          <span style="color:#222">0.00元</span>
        </el-col>
        <el-col :span="6">
          <span>面积标准总价：</span>
          <span style="color:#222">0.00元</span>
        </el-col>
        </el-row>-->
      </div>
    </div>
    <div class="container_cards">
      <div class="price_name">定价信息</div>
      <el-divider></el-divider>
      <el-row
        style="margin-top:24px;margin-bottom:24px"
      >
        <el-col :span="6">
          <span>建筑单价：</span>
          <span style="color:#222">{{priceInfo.unitPrice}} 元</span>
        </el-col>
        <el-col :span="6">
          <span>建筑总价：</span>
          <span style="color:#222">{{priceInfo.totalPrice}} 元</span>
        </el-col>
      </el-row>
    </div>
    <div class="container_cards">
      <div class="price_name">预订信息</div>
      <el-divider></el-divider>

        <el-row style="margin-top:24px;margin-bottom:24px">
          <el-col :span="6">
            <span>客户姓名：</span>
            <span style="color:#222">{{reserveInfo.name ? reserveInfo.name:""}}</span>
          </el-col>
          <el-col :span="6">
            <span>证件类型：</span>
            <span style="color:#222">{{reserveInfo.identityType || ""}}</span>
          </el-col>
          <el-col :span="6">
            <span>证件号码：</span>
            <span style="color:#222">{{reserveInfo.identityNum || ""}}</span>
          </el-col>
          <el-col :span="6">
            <span>手机号：</span>
            <span style="color:#222">{{reserveInfo.phone || ""}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top:24px;margin-bottom:24px">
          <el-col :span="6">
            <span>地址：</span>
            <span style="color:#222">{{reserveInfo.address || ""}}</span>
          </el-col>
          <el-col :span="6">
            <span>定金：</span>
            <span style="color:#222">{{reserveInfo.earnest || ""}}</span>
          </el-col>
          <el-col :span="6">
            <span>预定日期：</span>
            <span style="color:#222">{{reserveDate}}</span>
          </el-col>
        </el-row>

    </div>
    <div class="container_cards">
      <div class="price_name">签约信息</div>
      <el-divider></el-divider>
        <el-row style="margin-top:24px;margin-bottom:24px">
          <el-col :span="6">
            <span>签约日期：</span>
            <span style="color:#222">{{signInfo.signingDate}}</span>
          </el-col>
          <el-col :span="6">
            <span>合同编号：</span>
            <span style="color:#222">{{signInfo.contractNo}}</span>
          </el-col>
          <el-col :span="6">
            <span>交房日期：</span>
            <span style="color:#222">{{signInfo.deliveryDate}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top:24px;margin-bottom:24px">
          <el-col :span="6">
            <span>销售人员：</span>
            <span style="color:#222">{{signInfo.seller}}</span>
          </el-col>
          <el-col :span="6">
            <span>经办人：</span>
            <span style="color:#222">{{signInfo.operator}}</span>
          </el-col>
        </el-row>
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
import { get_houses_detail } from "@/api/CCRC/housing";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      name: "", //房间名称
      id: "", //房间户型
      reserveDate: "", //预订日期
      status: "", //房间状态
      baseInfo: {}, //基本信息
      priceInfo: {}, //定价信息
      reserveInfo: {}, //预定信息
      signInfo: {}, //签约信息
      houseType: {} //房间信息
    };
  },
  methods: {
    getHousesDetail() {
      let id = this.$route.query.id;
      get_houses_detail(id).then(res => {
        this.name = res.data.name;
        this.id = res.data.id;
        this.status = res.data.status;
        this.reserveDate = res.data.reserveDate;
        this.baseInfo = res.data.baseInfo??[];
        this.priceInfo = res.data.price ??[];
        this.reserveInfo = res.data.booking ??[];
        this.signInfo = res.data.signing??[];
        this.houseType = res.data.houseType??[];
      });
    }
  },
  mounted() {
    this.getHousesDetail();
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
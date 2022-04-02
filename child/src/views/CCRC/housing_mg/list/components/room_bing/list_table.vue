<!-- 
 * @description: 房间绑定
 * @fileName: list_table.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 14:20:51
 * @后台人员:  
!-->
<template>
  <div>
    <el-divider></el-divider>
    <el-form :inline="true" style="margin-top: 24px">
      <el-row>
        <el-col :span="19">
          <el-row>
            <el-col :span="8">
              <el-form-item class="filter" label="项目：">
                <el-select v-model="pageable.projectId" @change="chooseProject" placeholder="请选择">
                  <el-option
                    v-for="item in project_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div class="select-box">
      <div class="select-left">
        <div class="left">
          <el-select
            v-model="pageable.areaId"
            placeholder="请选择"
            @change="chooseDistrcts()"
            placeholder-style="color:#017cff"
          >
            <el-option
              v-for="(item,index) in districts_list"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="taps" v-for="(item, index) in taps" :key="index" @click="change(item,index)">
          <div :class="index !== active ? 'taps_item' : 'taps_active'">
            {{item.name}}
            <div class="normal-line"></div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <Floor @popDraw="popDraw" :data="floorData" :units="this.info.headerForUnits" />

    <el-drawer :visible.sync="drawer" @close="drawerBack">
      <div style="padding: 0 16px; position: relative">
        <el-row :gutter="2">
          <el-col :span="2">
            <img
              src="@/assets/images/CCRC/hourse.png"
              alt
              srcset
              style="width: 24px; height: 24px; margin-top: 10px"
            />
          </el-col>
          <el-col :span="22">
            <p class="hourse_title" style="font-weight:600">{{house_detail_list.name}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 32px">
          <el-col :span="5">销售状态:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.status}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">户型:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">房间类型:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.typeName}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">折扣方案:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.discountName}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">建筑面积:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.buildingArea}} 平米</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">套内面积:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.realArea}} 平米</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">面价建筑单价:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.unitPrice}} 元</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">面价总价:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.totalPrice}} 元</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 25px">
          <el-col :span="5">成交价:</el-col>
          <el-col :span="19">
            <span class="hourse_title">{{house_detail_list.finalAmount}} 元</span>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="margin-top: 50px">
          <el-button
            type="success"
            size="medium"
            :underline="false"
            @click="handleReserve(house_data, '预留')"
          >预留</el-button>
          <el-button
            type="warning"
            size="medium"
            :underline="false"
            @click="handleDialog(house_data, '预订')"
          >预订</el-button>
          <el-button
            type="primary"
            size="medium"
            :underline="false"
            @click="handleDialog(house_data, '签约')"
          >签约</el-button>
          <el-button
            type="danger"
            size="medium"
            :underline="false"
            @click="handleRescind(house_data, '解约')"
          >解约</el-button>
        </el-row>
        <el-row :gutter="2" style="margin-top: 50px" v-if="this.priceShow=='价格失效'">
          <div class="Price_invalidation">
            <i class="el-icon-warning" style="color:red;margin:0 8px"></i>价格失效
          </div>
        </el-row>
      </div>
      <div class="foot_draw">
        <el-button type="primary" @click="bindMethod">绑定折扣</el-button>
        <el-button @click="drawerBack">返回</el-button>
      </div>
    </el-drawer>
    <!-- <el-dialog
      v-el-drag-dialog
      width="80%"
      center
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form :inline="true">
        <el-row>
          <el-col :span="22">
            <el-row>
              <el-col :span="8">
                <el-form-item class="filter" label="项目:">
                  <el-input
                    placeholder="请输入"
                    v-model="flt.elderName"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="filter" label="房间:">
                  <el-input
                    placeholder="请输入"
                    v-model="flt.elderName"
                    clearable
                    
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-checkbox
                  label="只显示可被绑定的房间"
                  style="margin-top: 5px"
                ></el-checkbox>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="data" style="margin-top: 14px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" label="序号" width="80">
            <template slot-scope="scope">
              <span :style="{ color: $variables.baseColor }">{{
                formatZero(scope.$index + 1, 2)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="房间"> </el-table-column>
          <el-table-column label="产品类型"> </el-table-column>
          <el-table-column label="销售状态"> </el-table-column>
          <el-table-column label="绑定状态"> </el-table-column>
          <el-table-column label="建筑面积"> </el-table-column>
          <el-table-column label="套内面积"> </el-table-column>
          <el-table-column label="标准总价"> </el-table-column>
        </el-table>
        <div style="text-aligin: right">
          <pagination
            v-show="table_total > 0"
            :total="table_total"
            :page.sync="flt.pageNum"
            :limit.sync="flt.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
      <div class="foot">
        <el-divider></el-divider>

        <el-button type="primary" @click="submitForm('add')" class="btn"
          >确 定</el-button
        >

        <el-button class="btn" @click="outFile.dialog_cof.visible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>-->
    <el-dialog
      class="el-dialog-3"
      center
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        label-position="top"
        style="min-height: 420px"
      >
        <div v-if="this.dialog_cof.title == '预订'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机号" class="optional" prop="phone">
                <el-input v-model="form_data.phone" maxlength="11" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button @click="searchPeople" style="margin-top:53px" type="primary">查询</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="证件类型" class="optional" prop="identityType">
                <el-select v-model="form_data.identityType" placeholder="请选择">
                  <el-option
                    v-for="item in certificates_type"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码 " class="optional" prop="identityNum">
                <el-input v-model="form_data.identityNum" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户姓名 " class="optional" prop="targetCustomer">
                <el-input v-model="form_data.targetCustomer" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备选电话" class="default">
                <el-input v-model="form_data.alternativePhone" maxlength="11" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="定金" class="optional" prop="earnest">
              <el-input v-model="form_data.earnest" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="通讯地址" class="default">
              <el-input v-model="form_data.address" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title == '签约'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="签约日期 " class="optional" prop="signingDate">
                <el-date-picker
                  v-model="form_data.signingDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请输入"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号 " class="optional" prop="contractNo">
                <el-input v-model="form_data.contractNo" disabled placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="交房日期" class="optional" prop="deliveryDate">
                <el-date-picker
                  v-model="form_data.deliveryDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请输入"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <!-- <el-col :span="8">
              <el-form-item label="业绩归属日期 " class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="置业顾问 " class="optional" prop="seller">
                <el-input v-model="form_data.seller" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人" class="optional" prop="operator">
                <el-input v-model="form_data.operator" disabled placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title=='预订'? handleSubmit_booking():handleSubmit_signing()"
        >确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="el-dialog-2"
      center
      v-el-drag-dialog
      :visible.sync="discount_dialog_cof.visible"
      :title="discount_dialog_cof.title"
      :destroy-on-close="discount_dialog_cof.destroy"
      :close-on-click-modal="discount_dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="discount_form"
        :model="discount_form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-form-item label="折扣方案" class="optional">
            <el-select v-model="discount_form_data.discountId" placeholder="请选择">
              <el-option
                v-for="item in discount_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="discount_dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import Floor from "@/components/Floor/index.vue";
import { formatZero } from "@/filters";
import { mapGetters } from "vuex";
import { isNumber_mustFill, isCert_code, isPhone } from "@/utils/validate";
import { get_project_list, get_districts_list } from "@/api/CCRC/project";
import { get_houses_list, get_house_detail } from "@/api/CCRC/housing";
import { get_clients_byphone } from "@/api/CCRC/intended";
import { get_discount_list, add_discount } from "@/api/CCRC/discounts";
import {
  house_signin,
  house_resign,
  house_reserving,
  house_booking
} from "@/api/CCRC/sign";

export default {
  components: { Pagination, Floor },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      nowTime: "", //获取当前时间
      priceShow: undefined, //价格是否失效
      consumerId: "", //意向客户id
      buildingNum: undefined, //楼栋id
      project_list: [], //项目列表
      districts_list: [], //分区列表
      discount_list: [], //折扣列表
      house_detail_list: [], //房间详情列表
      certificates_type: [
        {
          id: 1,
          name: "身份证"
        }
      ], //证件类型
      house_data: {}, //
      room_number: "",
      pageable: {
        projectId: undefined,
        areaId: undefined
      },
      house_id: "", //房间id
      table_total: 1,
      drawer: false,
      taps: [],
      active: 0,
      tableData: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      discount_dialog_cof: {
        visible: false,
        title: "",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {
        earnest: [
          { validator: isNumber_mustFill, trigger: "blur" },
          { required: true, message: "不可为空", trigger: "change" }
        ],
        identityNum: [{ trigger: "change", validator: isCert_code }],
        identityType: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        targetCustomer: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        contractNo: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        signingDate: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        deliveryDate: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        seller: [{ required: true, message: "不可为空", trigger: "change" }],
        deliveryDate: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        operator: [{ required: true, message: "不可为空", trigger: "change" }],
        phone: [
          { required: true, message: "不可为空", trigger: "change" },
          { validator: isPhone, trigger: "blur" }
        ]
      },
      form_data: {
        id: undefined,
        contractNo: "XY" + this.nowTime, //合同编号
        signingDate: "", //签约日期
        deliveryDate: "", //交割日期
        seller: "", //置业顾问
        operator: this.$store.getters.userInfo.empNm, //经办人
        phone: "", //手机号
        identityType: "", //证件类型
        identityNum: "", //证件号码
        targetCustomer: "", //客户姓名
        alternativePhone: "", //备选电话
        earnest: null, //定金
        address: "" //通讯地址
      },
      discount_form_data: {
        discountId: "" //折扣方案
      },
      info: {},
      floorData: [
        // {
        //   istop: 1,
        //   rowName: [
        //     {
        //       label: "楼层",
        //     },
        //     {
        //       label: "",
        //       unit: [{ num: "01" }, { num: "02" }],
        //     },
        //     {
        //       label: "",
        //       unit: [{ num: "01" }, { num: "02" }, { num: "03" }],
        //     },
        //   ],
        // },
        // {
        //   istop: 0,
        //   rowName: [
        //     {
        //       label: "18",
        //     },
        //     {
        //       label: "",
        //       unit: [{ num: "1801", status: "sale_wait" }, ""],
        //     },
        //     {
        //       unit: [
        //         { num: "1801", status: "reserved" },
        //         { num: "1801", status: "small_order" },
        //         { num: "1801", status: "subscribe" },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   istop: 0,
        //   rowName: [
        //     {
        //       label: "17",
        //     },
        //     {
        //       unit: [{ num: "1701", status: "sale_wait" }, ""],
        //     },
        //     {
        //       unit: [
        //         { num: "1701", status: "reserved" },
        //         { num: "1702", status: "small_order" },
        //         { num: "1703", status: "subscribe" },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   istop: 0,
        //   rowName: [
        //     {
        //       label: "16",
        //     },
        //     {
        //       unit: [{ num: "1601", status: "pin_control" }, ""],
        //     },
        //     {
        //       unit: [
        //         { num: "1601", status: "pin_control" },
        //         { num: "1602", status: "small_order" },
        //         { num: "1603", status: "subscribe" },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   istop: 0,
        //   rowName: [
        //     {
        //       label: "18",
        //     },
        //     {
        //       label: "",
        //       unit: [{ num: "1801", status: "sale_wait" }, ""],
        //     },
        //     {
        //       unit: [
        //         { num: "1801", status: "reserved" },
        //         { num: "1801", status: "small_order" },
        //         { num: "1801", status: "subscribe" },
        //       ],
        //     },
        //   ],
        // },
      ],
      options: []
    };
  },
  methods: {
    getHousesList() {
      let params = {
        // projectId: this.$route.query.projectId,
        projectId: this.projectId,
        buildingNum: this.buildingNum
      };
      get_houses_list(params).then(res => {
        this.info = res.data;
        this.process();
      });
    },
    getDiscountList() {
      get_discount_list().then(res => {
        this.discount_list = res.data;
      });
    },
    getHouseDetail() {
      let id = this.house_id;
      get_house_detail(id).then(res => {
        this.house_detail_list = res.data;
        this.priceShow = res.data.status;
      });
    },
    searchPeople() {
      let params = {
        phone: this.form_data.phone
      };
      get_clients_byphone(params).then(res => {
        
        this.form_data.targetCustomer = res.data.targetCustomer;
        this.form_data.alternativePhone = res.data.alternativePhone;
        this.form_data.address = res.data.address;
        this.consumerId = res.data.id;
      });
    },
    drawerBack() {
      this.info = [];
      this.drawer = false;
      this.getHousesList();
    },
    process() {
      this.floorData = [];
      for (let i in this.info.rowsForFloor) {
        this.floorData.push({
          rowName: [{ label: this.info.rowsForFloor[i].floor }]
        });
      }
      for (let j in this.floorData) {
        
        for (let x in this.info.rowsForFloor[j].house) {
          console.log(this.info.rowsForFloor[j].house[x]);
          this.floorData[j].rowName.push({
            unit: this.info.rowsForFloor[j].house[x]
          });
        }
      }
      this.floorData.unshift({
        rowName: [
          {
            label: this.info.secondHeader.nameOfRow
          }
        ]
      });
      for (let y in this.info.secondHeader.numForUnits) {
        this.floorData[0].rowName.push({ unit: [] });
        for (let z in this.info.secondHeader.numForUnits[y]) {
          this.floorData[0].rowName[parseInt(y) + 1].unit.push({
            num: this.info.secondHeader.numForUnits[y][z]
          });
        }
      }
      console.log(this.floorData);
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    chooseProject(val) {
      this.projectId = val;
      this.pageable.areaId = undefined;
      this.districts_list = [];
      this.taps = [];
      this.getDistrictsList(val);
    },
    chooseDistrcts() {
      this.floorData = [];
      if (this.pageable.areaId == undefined) return;
      this.taps = this.districts_list.filter(
        item => item.name == this.pageable.areaId
      )[0]?.buildings;
    },
    getDistrictsList(id) {
      get_districts_list(id).then(res => {
        this.districts_list = res.data ?? [];
      });
    },
    formatZero,
    popDraw(item) {
      if (!!item.id) {
        this.house_id = item.id;
        this.house_data = item;
        this.getHouseDetail();
        this.drawer = true;
      }
    },
    change(data, index) {
      this.floorData = [];
      this.buildingNum = data.num;
      this.active = index;
      this.getHousesList();
    },
    handleSubmit() {
      let self = this;
      let id = self.house_id;
      let discountId = self.discount_form_data.discountId;
      self.$refs["discount_form"].validate(vaild => {
        if (vaild) {
          add_discount(id, discountId).then(res => {
            self.$notify({
              type: "success",
              message: "绑定折扣成功",
              title: "成功"
            });
            self.getHouseDetail();
          });
          self.discount_dialog_cof.visible = false;
        }
      });
    },
    handleSubmit_booking() {
      let self = this;
      let id = self.house_id;
      let params = {
        consumerId: self.consumerId,
        earnest: self.form_data.earnest,
        identityType: self.form_data.identityType,
        identityNum: self.form_data.identityNum,
        phone: self.form_data.phone,
        name: self.form_data.targetCustomer,
        standbyPhone: self.form_data.alternativePhone,
        address: self.form_data.address
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          house_booking(id, params).then(res => {
            self.$notify({
              type: "success",
              message: "预定成功",
              title: "成功"
            });
          });
          self.dialog_cof.visible = false;
        }
        self.getHouseDetail();
      });
    },
    handleSubmit_signing() {
      let self = this;
      let id = self.house_id;
      let params = {
        id,
        contractNo: self.form_data.contractNo,
        signingDate: self.form_data.signingDate,
        deliveryDate: self.form_data.deliveryDate,
        seller: self.form_data.seller,
        operator: self.form_data.operator
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          house_signin(id, params).then(res => {
            self.$notify({
              type: "success",
              message: "签约成功",
              title: "成功"
            });
          });
          self.dialog_cof.visible = false;
        }
        self.getHouseDetail();
      });
    },
    handleDialog(data, type) {
      let self = this;
      switch (type) {
        case "预订":
          self.clear_form_data();
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "预订";
          break;
        case "签约":
          self.clear_form_data();
          self.dialog_cof.visible = true;
          self.formatDate()
          self.dialog_cof.title = "签约";
          self.form_data.contractNo = "XY" + self.nowTime;
          break;
      }
    },
      formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      // let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowTime = `${year}${month}${day}${hour}${minute}${second}`;
    },
  
    handleReserve(house_data) {
      let self = this;
      this.$confirm(`预留, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = house_data.id;
          house_reserving(id).then(res => {
            self.$notify({
              type: "success",
              message: "预留成功!",
              title: ""
            });
          });
          self.getHouseDetail();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleRescind(house_data) {
      let self = this;
      this.$confirm(`解约, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = house_data.id;
          house_resign(id).then(res => {
            self.$notify({
              type: "success",
              message: "解约成功!",
              title: ""
            });
            self.getHouseDetail();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    //绑定折扣
    bindMethod() {
      this.clear_discount_form_data();
      this.discount_dialog_cof.visible = true;
      this.getDiscountList();
    },
    clear_form_data() {
      this.form_data = {
        id: null,
        contractNo: "", //合同编号
        signingDate: "", //签约日期
        deliveryDate: "", //交割日期
        seller: "", //置业顾问
        operator: this.$store.getters.userInfo.empNm, //经办人
        phone: "", //手机号
        identityType: "", //证件类型
        identityNum: "", //证件号码
        targetCustomer: "", //客户姓名
        alternativePhone: "", //备选电话
        earnest: null, //定金
        address: "" //通讯地址
      };
    },
    clear_discount_form_data() {
      this.discount_form_data = {
        discountId: "" //折扣方案
      };
    }
  },
  mounted() {
    this.getProjectList();
  }
};
</script>
<style lang='scss' scoped>
.Price_invalidation {
  color: red;
  border: 1px solid #fe3d65;
  height: 32px;
  line-height: 32px;
  background-color: #fff6f8;
}
.box {
  width: 100%;
  height: 48px;
  background: rgba(1, 124, 255, 0.09);
  display: flex;
  padding: 8px 12px;
}
.hourse_title {
  margin-left: 12px;
  color: #222;
}
.foot_draw {
  width: 100%;
  height: 56px;
  position: absolute;
  background: #f2f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
}

.taps {
  width: 118px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .taps_item {
    width: 118px;
    text-align: center;
    font-size: 14px;
  }
  .taps_active {
    width: 118px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    color: #017cff;
    border-bottom: 1px solid #017cff;
    .normal-line {
      width: 68px;
      height: 2px;
      background: #017cff;
      margin: -6px auto;
    }
  }

  .line {
    width: 1px;
    height: 11px;
    background: #d8d8d8;
  }
}
.select-left {
  display: flex;
  align-items: center;
  .left {
    width: 178px;
    /deep/ .el-select .el-input__inner {
      border: 1px solid #017cff;
      color: #017cff;
    }
    display: flex;
    /deep/ .el-icon-arrow-up:before {
      color: #017cff;
    }
  }
}
</style>
<!-- 
 * @description:来访登记 
 * @fileName: come_signIn.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-08 09:33:32
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="title" style="margin-top: 10px;">
      <div>{{$route.query.title}}</div>
    </div>
    <div style="margin-top: 20px">
      <el-form
        :inline="true"
        :model="form_data"
        :rules="rules"
        ref="form"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="visitTime" class="optional" label="登记日期">
                  <el-date-picker
                    v-model="form_data.visitTime"
                    type="date"
                    disabled
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="visitorName" class="must-fill" label="代表姓名">
                  <el-input v-model="form_data.visitorName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="peopleNumber" class="must-fill" label="人数">
                  <el-select v-model="form_data.peopleNumber" placeholder="请选择">
                    <el-option
                      v-for="item in sum_people_list"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="companyName" class="optional" label="单位名称">
                  <el-input v-model="form_data.companyName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="telephone" class="optional" label="联系电话">
                  <el-input v-model="form_data.telephone" placeholder="请输入" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="visitTypeId" class="optional" label="类别">
                  <el-select v-model="form_data.visitTypeId" placeholder="请选择">
                    <el-option
                      v-for="item in visit_type_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="visitIntentionId" class="optional" label="来访意图">
                  <el-select v-model="form_data.visitIntentionId" placeholder="请选择">
                    <el-option
                      v-for="item in intention_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="receptionlistId" class="must-fill" label="接待人员">
                  <el-select v-model="form_data.receptionlistId" placeholder="请选择">
                    <el-option
                      v-for="item in salesmen_list"
                      :key="item.id"
                      :label="item.empNm"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="remark" class="optional" label="备注">
                  <el-input v-model="form_data.remark" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import elDragDialog from "@/directive/el-drag-dialog";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  isCert_code,
  isPhone,
  isOldman_name,
  isPostal_code,
  isPhone_maybeNull
} from "@/utils/validate";
import { handleType, uploadType } from "@/utils/enum";
import {
  get_record_page,
  add_visit_registration,
  modify_visit_registration,
  detail_visit_registration,
  get_come_type,
  get_visiting_intention
} from "@/api/pensionagency/marketing/visitRecord";
import { get_salesmen } from "@/api/pensionagency/marketing/intendedCustomer";
import solarLunar from "solarlunar-es";

import {
  provinceAndCityData,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "marketing_come_signIN",
  components: { Pagination },
  directives: { waves, elDragDialog },
  props: {
    isNeedPrinter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visit_type_list: [], //类别列表
      sum_people_list: [], //人数列表
      intention_list: [], //意图列表
      salesmen_list: [], //接待人员列表
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      required: true,
      options: [],
      rules: {
        // elderName: [{ required: true, message: "不可为空", trigger: "change" }],
        // sex: [{ required: true, message: "不可为空", trigger: "change" }],
        // phone: [
        //   {
        //     validator: isPhone,
        //     trigger: "change"
        //   }
        // ],
        // lunarBirthday: [
        //   {
        //     required: true,
        //     message: "不可为空",
        //     trigger: "change"
        //   }
        // ],
        // phone2: [
        //   {
        //     validator: isPhone_maybeNull,
        //     trigger: "change"
        //   }
        // ]
      },
      form_data: {
        visitTime: new Date(), //登记日期
        id: null,
        visitorName: "", //代表姓名
        peopleNumber: undefined, //人数
        companyName: "", //单位名称
        telephone: "", //联系电话
        visitTypeId: undefined, //类别
        visitIntentionId: undefined, //来访意图
        receptionlistId: undefined, //接待人员
        remark: "" //备注
      }
    };
  },
  methods: {
    getDetial() {
      let self = this;
      if (self.$route.query.id != null) {
        detail_visit_registration({ id: self.$route.query.id }).then(res => {
          self.form_data = res;
        });
      }
    },
    getComeType() {
      get_come_type().then(res => {
        this.visit_type_list = res;
      });
    },
    getVisitingIntention() {
      get_visiting_intention().then(res => {
        this.intention_list = res;
      });
    },
    getSalesmen() {
      get_salesmen().then(res => {
        this.salesmen_list = res;
      });
    },
    handleSubmit() {
      let self = this;
      let params = {};
      this.$refs["form"].validate(valid => {
        if (valid) {
          params = {
            visitTime: self.form_data.visitTime,
            visitorName: self.form_data.visitorName,
            peopleNumber: self.form_data.peopleNumber,
            companyName: self.form_data.companyName,
            telephone: self.form_data.telephone,
            id: self.form_data.id,
            visitTypeId: parseInt(self.form_data.visitTypeId),
            visitIntentionId: parseInt(self.form_data.visitIntentionId),
            receptionlistId: parseInt(self.form_data.receptionlistId),
            remark: self.form_data.remark
          };
          if (self.form_data.id == null) {
            add_visit_registration(params).then(res => {
              if (res?.body == null) {
                self.$notify({
                  type: "success",
                  message: "新增成功",
                  title: "成功"
                });
                self.$router.go(-1);
              }
            });
          } else {
            modify_visit_registration(params).then(res => {
              self.$notify({
                type: "success",
                message: "修改成功",
                title: "成功"
              });
              self.$router.go(-1);
            });
          }
        }
      });
    }
  },
  mounted() {
    this.getComeType();
    this.getVisitingIntention();
    this.getSalesmen();
    this.getDetial();
    this.sum_people_list = Array.from({ length: 10 }, (v, k) => k + 1);
    const { id, step } = this.$route.params;
    this.form_data.operatorId = this.$store.getters.userInfo.empId;
    if (!isNaN(Number(id))) {
      this.form_data.id = id;
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  background-color: #fff;
}
</style>
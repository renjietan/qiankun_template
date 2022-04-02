<!-- 
 * @description: 目前生活状态 
 * @fileName: living_status.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-top: 20px">
      <el-form :inline="true" :model="form_data" ref="form" hide-required-asterisk status-icon :rules="
      rules">
        <el-row>
          <el-col :span="4">
            <el-form-item class="default" prop="liveCondition" label="居住状况">
              <el-input v-model="form_data.liveCondition" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="houseNature" label="住房性质">
              <el-select clearable v-model="form_data.houseNature" placeholder="请选择">
                <el-option
                  v-for="item in live_status_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item class="default" prop="birthPlace" label="出生地">
              <el-cascader v-model="form_data.birthPlace" :options="area_options" placeholder="请选择"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="nativePlace" label="籍贯">
              <el-cascader
                v-model="form_data.nativePlace"
                :options="area_options"
                placeholder="请选择"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" prop="isLocal" label="是否本地户籍">
              <el-select clearable v-model="form_data.isLocal" placeholder="请选择">
                <el-option
                  v-for="item in local_account_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" prop="education" label="文化程度">
              <el-select clearable v-model="form_data.education" placeholder="请选择">
                <el-option
                  v-for="item in education_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="religion" label="宗教信仰">
              <el-select clearable v-model="form_data.religion" placeholder="请选择">
                <el-option
                  v-for="item in religious_belief_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="isDisability" label="是否残疾人">
              <el-select clearable v-model="form_data.isDisability" placeholder="请选择">
                <el-option
                  v-for="item in is_disabled_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="politicsStatus" label="政治面貌">
              <el-select clearable v-model="form_data.politicsStatus" placeholder="请选择">
                <el-option
                  v-for="item in political_outlook_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" prop="maritalStatus" label="婚姻状况">
              <el-select clearable v-model="form_data.maritalStatus" placeholder="请选择">
                <el-option
                  v-for="item in marital_status_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="children" label="有无子女">
              <el-select clearable v-model="form_data.children" placeholder="请选择">
                <el-option
                  v-for="item in have_children_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="income" label="经济收入">
              <el-select clearable v-model="form_data.income" placeholder="请选择">
                <el-option
                  v-for="item in income_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="economicsStatus" label="经济状况">
              <el-select clearable v-model="form_data.economicsStatus" placeholder="请选择">
                <el-option
                  v-for="item in situation_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="originalUnitType" label="原单位类型">
              <el-select clearable v-model="form_data.originalUnitType" placeholder="请选择">
                <el-option
                  v-for="item in orignaUnit_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="originalUnit" label="原工作单位">
                 <el-input v-model="form_data.originalUnit" placeholder="请输入"></el-input>
              <!-- <el-select clearable v-model="form_data.originalUnit" placeholder="请选择">
                <el-option
                  v-for="item in orignaUnit_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="profession" label="原职业">
                <el-input v-model="form_data.profession" placeholder="请输入"></el-input>
              <!-- <el-select clearable v-model="form_data.profession" placeholder="请选择">
                <el-option
                  v-for="item in situation_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="medicalCostType" label="医疗费用类型">
              <el-select clearable v-model="form_data.medicalCostType" placeholder="请选择">
                <el-option
                  v-for="item in medical_expense_type_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="sscCode" label="社保卡号">
              <el-input v-model="form_data.sscCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="adoptionType" label="收养类型">
              <el-select clearable v-model="form_data.adoptionType" placeholder="请选择">
                <el-option
                  v-for="item in adoption_type_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="qq" label="QQ号">
              <el-input v-model="form_data.qq" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" prop="email" label="邮箱">
              <el-input v-model="form_data.email" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="wechat" label="微信号">
              <el-input v-model="form_data.wechat" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button :disabled="step >= 7 ? 'disabled' : false" type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { add_live_lifeState, elder_info } from "@/api/pensionagency/goLive/goLive";
import { provinceAndCityData } from "element-china-area-data";
import {
  live_status_list,
  local_account_list,
  religious_belief_list,
  education_list,
  is_disabled_list,
  political_outlook_list,
  marital_status_list,
  have_children_list,
  income_list,
  situation_list,
  medical_expense_type_list,
  adoption_type_list,
  orignaUnit_list
} from "@/utils/enum";
import {validateEMail} from '@/utils/validate'
export default {
  name: "living_status",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      step: undefined,
      live_status_list, //住房性质
      local_account_list, //是否本地户口
      education_list, //文化程度
      religious_belief_list, //宗教信仰
      is_disabled_list, //是否是残疾人
      political_outlook_list, //政治面貌
      marital_status_list, //婚姻状况
      have_children_list, //有无子女
      income_list, //经济收入
      situation_list, //经济状况
      medical_expense_type_list, // 医疗费用类型
      adoption_type_list, //收养类型
       orignaUnit_list,  //原工作单位类型
       elderId: undefined,
      form_data: {
       
        liveCondition: "", //居住状况
        houseNature: undefined, //住房性质
        birthPlace: undefined, //出生地
        nativePlace: undefined, //籍贯
        isLocal: undefined, //是否本地户口
        education: undefined, //文化程度
        religion: undefined, //宗教信仰
        isDisability: undefined, //是否是残疾人
        politicsStatus: undefined, //政治面貌
        maritalStatus: undefined, //婚姻状况
        children: undefined, //有无子女
        income: undefined, //经济收入
        economicsStatus: undefined, //经济状况
        medicalCostType: undefined, //医疗费用类型
        sscCode: undefined, //社保卡号
        adoptionType: undefined, //收养类型
        qq: undefined, //QQ号
        email: undefined, //邮箱
        wechat: undefined //微信号
      },
      rules:{
        email:[{
           validator:validateEMail, trigger: "change"
        }]
      },
      options: [],
      area_options: provinceAndCityData
    };
  },
  methods: {
    beforeAvatarUpload(res) {},
    getDetail() {
      let self = this;
      elder_info({ elderId: this.elderId }).then(res => {
        if (res != null) {
          res.birthPlace = res?.birthPlace?.split(",");
          res.nativePlace = res?.nativePlace?.split(",");
          self.form_data = res;
        }
      });
    },
    handleSubmit() {
      this.$refs["form"].validate(vaild => {
        if (vaild) {
          const { birthPlace, nativePlace} = this.form_data;
          add_live_lifeState({
            ...this.form_data,
            elderId: this.elderId,
            birthPlace: !!birthPlace ? birthPlace.join(",") : undefined,
            nativePlace: !!nativePlace ? nativePlace.join(",") : undefined
          }).then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          });
        }
      });
    },
    reset() {
      this.form_data = {
        liveCondition: undefined, //居住状况
        live_nature: undefined, //住房性质
        birthPlace: undefined, //出生地
        nativePlace: undefined, //籍贯
        isLocal: undefined, //是否本地户口
        education: undefined, //文化程度
        religion: undefined, //宗教信仰
        isDisability: undefined, //是否是残疾人
        politicsStatus: undefined, //政治面貌
        maritalStatus: undefined, //婚姻状况
        children: undefined, //有无子女
        income: undefined, //经济收入
        economicsStatus: undefined, //经济状况
        medicalCostType: undefined, //医疗费用类型
        adoptionType: undefined, //收养类型
        qq: undefined, //QQ号
        email: undefined, //邮箱
        wechat: undefined //微信号
      };
    }
  },
  mounted() {
    const { id, step } = this.$route.params;
    this.step = step
    if (!isNaN(Number(id))) {
      this.elderId = id;
       if(this.$route.query.isSubmit !== '0'){
            this.getDetail();
       }
    }
  }
};
</script>
<style lang='scss' scoped>
.upload_icon {
  width: 240px;
  height: 150px;
  line-height: 120px;
  font-size: 40px;
}
</style>
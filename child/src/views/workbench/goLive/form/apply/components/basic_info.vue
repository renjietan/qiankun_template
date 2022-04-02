<!-- 
 * @description: 入住申请 
 * @fileName: basic_info.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <el-button icon="el-icon-zhengjian" disabled v-waves type="warning">读取证件</el-button>
    <div style="margin-top: 20px">
      <el-form :inline="true" :model="form_data" :rules="rules" ref="form" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="18">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="elderName" class="must-fill" label="长者姓名">
                  <el-input v-model="form_data.elderName" placeholder="请输入长者姓名" maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="sex" class="must-fill" label="性别">
                  <el-checkbox-group v-model="form_data.sex" :max="1">
                    <el-checkbox label="男" border></el-checkbox>
                    <el-checkbox label="女" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="phone" class="must-fill" label="联系电话1">
                  <el-input v-model="form_data.phone" placeholder="请输入联系电话" maxlength="11"></el-input>
                </el-form-item>
              </el-col>`
              <el-col :span="6">
                <el-form-item style="margin-top: -15px" prop="phone2" class="default" label="联系电话2">
                  <el-input v-model="form_data.phone2" placeholder="请输入联系电话" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="national" class="default" label="民族">
                  <el-select clearable v-model="form_data.national" placeholder="请选择民族">
                    <el-option v-for="item in nation_list" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="birthday" class="must-fill" label="出生日期">
                  <el-date-picker :pickerOptions="pickerOptions"
                    :disabled="form_data.calendarType.length == 0 || form_data.calendarType[0] == '公历' ? false : 'disabled'"
                    v-model="form_data.birthday" type="date" placeholder="请选择出生日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="lunarBirthday" class="must-fill" label="农历日期">
                  <el-date-picker @blur="handleBlur" v-if="calendar_isVisiable" v-model="form_data.lunarBirthday"
                    type="date" placeholder="请选择农历日期" value-format="yyyy-MM-dd"></el-date-picker>
                  <el-input v-else @focus="handleFocus"
                    :disabled="form_data.calendarType[0] == '农历' ? false : 'disabled'"
                    v-model="form_data.lunarBirthday_s" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="calendarType" class="optional" label="生日">
                  <el-checkbox-group :max="1" v-model="form_data.calendarType">
                    <el-checkbox label="公历" border></el-checkbox>
                    <el-checkbox label="农历" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="nationality" class="optional" label="国籍">
                  <el-select clearable v-model="form_data.nationality" placeholder="请选择国籍">
                    <el-option v-for="item in nationality_list" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="zipCode" class="optional" label="邮编">
                  <el-input v-model="form_data.zipCode" placeholder="请输入邮编" maxlength="7"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="papersType" class="must-fill" label="证件类型">
                  <el-select clearable v-model="form_data.papersType" placeholder="请选择">
                    <el-option v-for="item in id_list" :key="item.type" :label="item.desc" :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="papersCode" class="must-fill" label="证件号码">
                  <el-input v-model="form_data.papersCode" placeholder="请输入证件号码" maxlength="18"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item prop="papersAddress" class="optional" label="证件住址" maxlength="50">
                  <el-input class="long_input" v-model="form_data.papersAddress" placeholder="请输入证件住址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="address" class="optional" label="现住地址">
                  <el-input class="long_input" v-model="form_data.address" placeholder="请输入现住地址" maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-form-item class="default" prop="avater" label="添加头像">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic">
                <img v-if="form_data.headUrl" :src="form_data.headUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">上传头像</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :getter="40">
          <el-col :span="4">
            <el-form-item class="default" prop="idHead" label="身份证正面">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic1">
                <img v-if="form_data.idHead" :src="form_data.idHead" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传正面</div>
                </i>
                <div class="upload_icons">
                  <el-button icon="el-icon-camera" size="mini" plain type="warning">拍取</el-button>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="idTail" label="身份证反面">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic2">
                <img v-if="form_data.idTail" :src="form_data.idTail" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传反面</div>
                </i>
                <div class="upload_icons">
                  <el-button icon="el-icon-camera" size="mini" plain type="warning">拍取</el-button>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="bookletFirst" label="户口本首页">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic3">
                <img v-if="form_data.bookletFirst" :src="form_data.bookletFirst" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传首页</div>
                </i>
                <div class="upload_icons">
                  <el-button icon="el-icon-camera" size="mini" plain type="warning">拍取</el-button>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="bookletOneself" label="户口本本人页">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic4">
                <img v-if="form_data.bookletOneself" :src="form_data.bookletOneself" class="avatars" />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传本人页</div>
                </i>
                <div class="upload_icons">
                  <el-button icon="el-icon-camera" size="mini" plain type="warning">拍取</el-button>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="isNeedPrinter">
            <el-row style="margin-top: 30px">
              <el-col class="margin-top">
                <el-button class="width" type="primary">打印身份证</el-button>
              </el-col>
              <el-col class="margin-top">
                <el-button class="width" type="primary">打印户口本</el-button>
              </el-col>
              <el-col class="margin-top">
                <el-button class="width" type="primary">全部打印</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" :disabled="step >= 7 ? 'disabled' : false" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { nation, nationality } from "@/utils/dict";
  import {
    isCert_code,
    isPhone,
    isOldman_name,
    isPostal_code,
    isPhone_maybeNull,
  } from "@/utils/validate";
  import { handleType, uploadType } from "@/utils/enum";
  import { id_type_list } from "@/api/pensionagency/administrative/administrative";
  import { get_live_stop, add_base_info, get_older_baseinfo } from "@/api/pensionagency/goLive/goLive";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";
  import solarLunar from "solarlunar-es";
  import { mySite } from '@/utils/city';
  import { parse_cert_card } from '@/utils/index';
  
  import {
    provinceAndCityData,
    CodeToText,
    TextToCode,
  } from "element-china-area-data";
  export default {
    name: "basic_info",
    components: { Pagination },
    directives: { waves },
    props: {
      isNeedPrinter: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        step: undefined,
        calendar_isVisiable: false,
        required: true,
        id_list: [], //证件类型列表
        nationality_list: [], //国籍列表
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now();
          }
        },
        rules: {
          elderName: [{ required: true, message: "不可为空", trigger: "change" }],
          sex: [{ required: true, message: "不可为空", trigger: "change" }],
          phone: [
            {
              validator: isPhone,
              trigger: "change",
            },
          ],
          lunarBirthday: [
            {
              required: true,
              message: "不可为空",
              trigger: "change",
            },
          ],
          phone2: [
            {
              validator: isPhone_maybeNull,
              trigger: "change",
            },
          ],
          papersType: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          zipCode: [{ validator: isPostal_code, trigger: "change" }],
          papersCode: [
            { trigger: "change", validator: isCert_code },
          ],
          birthday: [{ required: true, message: "不可为空", trigger: "change" }],
        },
        form_data: {
          operatorId: null, //操作员工id
          id: undefined,
          elderName: "", //老人姓名
          sex: [], //性别
          phone: "", //手机号
          phone2: "",
          birthday: null, //出生日期
          calendarType: ["公历"], //农历日期
          lunarBirthday: null, //农历日期
          lunarBirthday_s: "", //农历
          national: undefined, //民族
          nationality: null, //国籍
          zipCode: "", //邮编
          headUrl: "", //头像
          papersType: undefined, //证件类型
          papersCode: "", //证件号码
          papersAddress: "", //证件住址
          address: "", //现住地址
          idHead: "", //身份证正面
          idTail: "", //身份证反面
          bookletFirst: "", //户口本正面
          bookletOneself: "", //户口本反面
        },
        options: [],
        mySite: {},
        nation_list: [],
        area_options: provinceAndCityData,
      };
    },
    watch: {
      "form_data.birthday": function (n, o) {
        if (this.form_data.calendarType.length == 0 || this.form_data.calendarType[0] == "公历") {
          let dates = n.split("-");
          let lunarBirthday = solarLunar.solar2lunar(dates[0], dates[1], dates[2]);
          let lunarBirthday_str = `${lunarBirthday.gzYear}年(${lunarBirthday.lYear}) ${lunarBirthday.monthCn} ${lunarBirthday.dayCn}`
          this.form_data.lunarBirthday_s = lunarBirthday_str;
          this.form_data.lunarBirthday = n
        }
      },
      "form_data.lunarBirthday": function (n, o) {
        if (this.form_data.calendarType[0] == "农历") {
          let dates = n.split("-");
          let lunarBirthday = solarLunar.solar2lunar(dates[0], dates[1], dates[2]);
          let lunarBirthday_str = `${lunarBirthday.gzYear}年(${lunarBirthday.lYear}) ${lunarBirthday.monthCn} ${lunarBirthday.dayCn}`
          this.form_data.lunarBirthday_s = lunarBirthday_str;
          this.form_data.birthday = n
        }
      },
      "form_data.papersCode": function (n, o) {
        let self = this
        self.$refs.form.validateField("papersCode", value => {
          if (value == "") {
            let data = { ...self.form_data }
            let res = parse_cert_card(data.papersCode, self.mySite)            
            // self.form_data.address = res.addr
            self.form_data.sex = res.sex
            self.form_data.papersAddress = res.addr
            self.form_data.birthday = res.birthday
          }
        })
      }
    },
    methods: {
      idTypeList() {
        id_type_list().then((res) => {
          this.id_list = res;
        });
      },
      handleFocus() {
        this.calendar_isVisiable = true
      },
      handleBlur() {
        this.calendar_isVisiable = false
      },
      // getChange(e) {
      //   let dates = e.split("-");
      //   if (this.form_data.calendarType[0] == "公历" || this.form_data.calendarType.length == 0) {
      //     let lunarBirthday = solarLunar.lunar2solar(
      //       Number(dates[0]),
      //       Number(dates[1]),
      //       Number(dates[2])
      //     );
      //     let lunarBirthday_str = `${lunarBirthday.cYear}-${(lunarBirthday.cMonth =
      //       lunarBirthday.cMonth < 10
      //         ? "0" + lunarBirthday.cMonth
      //         : lunarBirthday.cMonth)}-${(lunarBirthday.cDay =
      //           lunarBirthday.cDay < 10
      //             ? "0" + lunarBirthday.cDay
      //             : lunarBirthday.cDay)}`;
      //   }

      //   this.form_data.lunarBirthday = lunarBirthday_str;
      // },
      //上传图片
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工头像"]);
        upload_pic(formData).then((res) => {
          self.form_data.headUrl = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic1(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证正面"]);
        upload_pic(formData).then((res) => {
          self.form_data.idHead = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic2(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证反面"]);
        upload_pic(formData).then((res) => {
          self.form_data.idTail = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic3(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工户口本正面"]);
        upload_pic(formData).then((res) => {
          self.form_data.bookletFirst = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic4(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工户口本反面"]);
        upload_pic(formData).then((res) => {
          self.form_data.bookletOneself = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      handleSubmit() {
        this.$refs["form"].validate((vaild) => {
          if (vaild) {
            const { sex, calendarType } = this.form_data;
            add_base_info({
              ...this.form_data,
              sex: sex[0] == "男" ? "0" : "1",
              calendarType: calendarType[0] === "农历" ? "N" : "G",
            }).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              // this.$router.push(`/workbench/goLive/form/apply/${res}`);
              this.$router.go(-1);
              // localStorage.setItem("elderId", res);
            });
          }
        });
      },
      // 获取详情信息
      getDetail() {
        get_older_baseinfo({
          elderId: this.form_data.id,
        }).then((res) => {
          if (res != null) {
            res["sex"] = res["sex"] == "0" ? ["男"] : ["女"];
            res["calendarType"] =
              res["calendarType"] == "N" ? ["农历"] : ["公历"];
            this.form_data = res;
          }
        });
      },
    },
    mounted() {
      (this.nation_list = nation), (this.nationality_list = nationality);
      this.idTypeList();
      const { id, step } = this.$route.params;
      this.form_data.operatorId = this.$store.getters.userInfo.empId;
      this.step = step
      this.mySite = mySite.reduce((cur, pre) => {
        cur[pre["code"]] = pre.title
        return cur
      }, {})
      if (!isNaN(Number(id))) {
        this.form_data.id = id;

        this.getDetail();
      }
    },
  };
</script>
<style lang='scss' scoped>
  // .s {}

  .width {
    width: 120px;
  }

  .upload_icon {
    width: 240px;
    height: 150px;
    line-height: 120px;
    font-size: 40px;
  }

  .margin-top {
    margin-top: 15px;
  }
</style>
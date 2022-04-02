<!-- 
 * @description: 编辑职工
 * @fileName: basic_info.vue 
 * @author: 姜纬杰
 * @date: 2021-07-27 19:21:31
 * @后台人员:  
!-->
<template>
  <div>
    <el-button icon="el-icon-zhengjian" disabled v-waves type="warning"
      >读取证件</el-button
    >
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
              <el-col :span="5">
                <el-form-item prop="empNm" class="must-fill" label="员工姓名">
                  <el-input
                    v-model="form_data.empNm"
                    placeholder="不可为空"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="empSex" class="must-fill" label="性别">
                  <el-checkbox-group :max="1" v-model="form_data.empSex">
                    <el-checkbox label="男" border></el-checkbox>
                    <el-checkbox label="女" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="empPhone"
                  class="must-fill"
                  label="联系电话"
                >
                  <el-input
                    v-model="form_data.empPhone"
                    maxlength="11"
                    placeholder="不可为空"
                  ></el-input>
                </el-form-item> </el-col
              >`
              <el-col :span="5">
                <el-form-item
                  prop="empBirthday"
                  class="optional"
                  label="出生日期"
                >
                  <el-date-picker
                    v-model="form_data.empBirthday"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col></el-col>
              <el-col :span="5">
                <el-form-item prop="empNation" class="optional" label="民族">
                  <el-select
                    clearable
                    v-model="form_data.empNation"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in nation_list"
                      :key="item.id"
                      :label="item.empNation"
                      :value="item.empNation"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="idType" class="must-fill" label="证件类型">
                  <el-select
                    clearable
                    v-model="form_data.idType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in id_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.desc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="idNum" class="must-fill" label="证件号码">
                  <el-input
                    v-model="form_data.idNum"
                    maxlength="20"
                    placeholder="不可为空"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="empNo" class="readonly" label="职工编号">
                  <el-input
                    v-model="form_data.empNo"
                    readonly
                    placeholder="自动生成"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="idAdress" class="optional" label="证件地址">
                  <el-input
                    v-model="form_data.idAdress"
                    placeholder="不可为空"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="depmId" class="must-fill" label="部门">
                  <el-select
                    clearable
                    v-model="form_data.depmId"
                    placeholder="请选择"
                    @change="handleSwitch_dep"
                  >
                    <el-option
                      v-for="item in department_list"
                      :key="item.id"
                      :label="item.depmName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="positionId" class="must-fill" label="职位">
                  <el-select
                    clearable
                    v-model="form_data.positionId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in position_list"
                      :key="item.id"
                      :label="item.positionName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="joinDate" class="optional" label="入职日期">
                  <el-date-picker
                    v-model="form_data.joinDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="joinType	"
                  class="must-fill"
                  label="就职状态"
                >
                  <el-select
                    clearable
                    v-model="form_data.joinType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in join_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="employType"
                  class="optional"
                  label="员工形式"
                >
                  <el-select
                    clearable
                    v-model="form_data.employType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in take_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="contractEndDate"
                  class="optional"
                  label="合同终止日"
                >
                  <el-date-picker
                    v-model="form_data.contractEndDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="margin-left: -10%">
            <el-form-item class="default" prop="empHeads" label="添加头像">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic"
              >
                <img
                  v-if="form_data.empHeads"
                  :src="form_data.empHeads"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">上传头像</div>
                </i>
              </el-upload>
            </el-form-item>
            <el-form-item
              style="margin-top: -10px"
              prop="areaId"
              class="must-fill"
              label="所属区域"
            >
              <el-select
                clearable
                v-model="form_data.areaId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in area_list"
                  :key="item.id"
                  :label="item.areaName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item class="default" prop="idHead" label="身份证正面">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic1"
              >
                <img
                  v-if="form_data.idHead"
                  :src="form_data.idHead"
                  class="avatars"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传正面</div>
                </i>
                <div class="upload_icons">
                  <el-button
                    icon="el-icon-camera"
                    size="mini"
                    plain
                    type="warning"
                    >拍取</el-button
                  >
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="default" prop="idTail" label="身份证反面">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic2"
              >
                <img
                  v-if="form_data.idTail"
                  :src="form_data.idTail"
                  class="avatars"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                  <div class="uploader_desc">上传反面</div>
                </i>
                <div class="upload_icons">
                  <el-button
                    icon="el-icon-camera"
                    size="mini"
                    plain
                    type="warning"
                    >拍取</el-button
                  >
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { uploadType } from "@/utils/enum";
import { arrayGroupBy } from "@/utils/index";
import { nation_list } from "./nation_list";
import {
  isCert_code,
  isPhone,
  isOldman_name,
  isPostal_code,
} from "@/utils/validate";
import {
  join_type_list,
  take_type_list,
  id_type_list,
  add_employee,
  get_all_department,
  get_position,
  get_employee_info,
  upload_pic,
  get_all_areas,
} from "@/api/pensionagency/administrative/administrative";
import { parse_cert_card } from "@/utils/index";
import { mySite } from "@/utils/city";

export default {
  name: "basic_info",
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      blongDepm: undefined,
      department_list: [], //部门列表
      position_list: [], //职位列表
      nation_list: [], //民族列表
      join_list: [], //就职状态列表
      take_list: [], //用工列表
      area_list: [], //区域列表
      id_list: [], //证件类型列表
      required: true,
      rules: {
        empNm: [
          {
            validator: isOldman_name,
            trigger: "change",
          },
        ],
        empSex: [{ required: true, message: "不可为空", trigger: "change" }],
        empPhone: [
          {
            validator: isPhone,
            trigger: "change",
          },
        ],
        areaId: [{ required: true, message: "不可为空", trigger: "change" }],
        idType: [{ required: true, message: "不可为空", trigger: "change" }],
        idNum: [{ trigger: "change", validator: isCert_code }],
        depmId: [{ required: true, message: "不可为空", trigger: "change" }],
        positionId: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        joinType: [{ required: true, message: "不可为空", trigger: "change" }],
      },
      form_data: {
        empNm: "", //员工姓名
        empSex: [], //性别
        empPhone: "", //手机号
        empBirthday: null, //出生日期
        empNation: undefined, //民族
        empHeads: "", //头像
        idType: undefined, //证件类型
        idNum: "", //证件号码
        idAdress: "", //证件住址
        empNo: "", //职工编号
        depmId: undefined, //部门
        positionId: undefined, //职位
        joinDate: null, //入职日期
        joinType: undefined, //就职状态
        employType: undefined, //员工形式
        contractEndDate: null, //合同终止日
        idHead: null, //身份证正面
        areaId: null, //区域id
        idTail: null, //身份证反面
      },
      options: [],
      mySite: {},
    };
  },
  watch: {
    "form_data.idNum": function (n, o) {
      self = this;
      self.$refs["form"].validateField("idNum", (value) => {
        if (value == "") {
          let data = { ...self.form_data };
          let res = parse_cert_card(data.idNum, self.mySite);
          self.form_data.empSex = res.sex;
          self.form_data.empBirthday = res.birthday;
          self.form_data.idAdress = res.addr;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "orgInfo"]),
  },
  created() {
    this.mySite = mySite.reduce((cur, pre) => {
      cur[pre["code"]] = pre.title;
      return cur;
    }, {});
    this.nation_list = nation_list;
    this.joinTypeList();
    this.takeTypeList();
    this.idTypeList();
    this.getAllDepartment();
    this.getAllAreas();
  },
  activated() {
    if (this.$route.query.title == "添加员工") {
      this.reset();
    }
  },
  methods: {
    getAllAreas() {
      get_all_areas().then((res) => {
        this.area_list = res;
      });
    },
    // 获取职位列表
    getPosition(blongDepm) {
      get_position({ blongDepm }).then((res) => {
        this.position_list = res;
      });
    },
    //获取部门列表
    getAllDepartment() {
      get_all_department().then((res) => {
        this.department_list = res;
      });
    },
    joinTypeList() {
      join_type_list().then((res) => {
        this.join_list = res;
      });
    },
    takeTypeList() {
      take_type_list().then((res) => {
        this.take_list = res;
      });
    },
    idTypeList() {
      id_type_list().then((res) => {
        this.id_list = res;
      });
    },

    handleSwitch_dep(val) {
      this.form_data.positionId = undefined;
      this.getPosition(this.form_data.depmId);
    },
    //上传图片
    UploadPic(file) {
      let self = this;
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("fileType", uploadType["员工头像"]);
      upload_pic(formData).then((res) => {
        self.form_data.empHeads = res;
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
    handleSubmit() {
      let self = this;
      let params = {};
      this.$refs["form"].validate((valid) => {
        if (valid) {
          params = {
            empNm: self.form_data.empNm,
            empSex: self.form_data.empSex == "女" ? 1 : 0,
            empPhone: self.form_data.empPhone,
            empBirthday: self.form_data.empBirthday,
            empNation: self.form_data.empNation,
            idType: self.form_data.idType,
            idNum: self.form_data.idNum,
            idAdress: self.form_data.idAdress,
            depmId: parseInt(self.form_data.depmId),
            positionId: parseInt(self.form_data.positionId),
            areaId: parseInt(self.form_data.areaId),
            joinDate: self.form_data.joinDate,
            joinType: self.form_data.joinType,
            employType: self.form_data.employType,
            contractEndDate: self.form_data.contractEndDate,
            empHeads: self.form_data.empHeads,
            idHead: self.form_data.idHead,
            idTail: self.form_data.idTail,
            centerId: parseInt(self.orgInfo?.id) ?? self.userInfo?.centerId,
          };
          add_employee(params).then((res) => {
            if (res?.body == null) {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功",
              });
              self.$router.go(-1);
            }
          });
        }
      });
    },
    reset() {
      this.form_data = {
        empNm: "", //员工姓名
        empSex: [], //性别
        empPhone: "", //手机号
        empBirthday: null, //出生日期
        empNation: undefined, //民族
        empHeads: "", //头像
        idType: undefined, //证件类型
        idNum: "", //证件号码
        idAdress: "", //证件住址
        empNo: "", //职工编号
        depmId: undefined, //部门
        positionId: undefined, //职位
        joinDate: null, //入职日期
        joinType: undefined, //就职状态
        employType: undefined, //员工形式
        contractEndDate: null, //合同终止日
        areaId: null, //区域id
        idHead: null, //身份证正面
        idTail: null, //身份证反面
      };
    },
  },
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
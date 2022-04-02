<!-- 
 * @description: 机构信息管理
 * @fileName: administrative_staff_mg_arg_msg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:39:44
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="no-data">
      <img :src="no_data" alt />
    </div>
    <!-- <div class="container_card">
      <div class="title" style="margin-bottom: 20px">机构信息管理</div>
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="机构代码" prop="arg_code">
              <el-input readonly v-model="form_data.arg_code" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="机构名称" prop="arg_name">
              <el-input readonly v-model="form_data.arg_name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="管理员" prop="admin">
              <el-input readonly v-model="form_data.admin" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" label="机构昵称" prop="arg_nickname">
              <el-input v-model="form_data.arg_nickname" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item class="optional" label="地址" prop="arg_addr">
              <el-cascader :options="options_addr" v-model="form_data.arg_addr" :props="{ checkStrictly: true }"
                clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item class="optional" label="详细地址" prop="arg_detailAddr">
              <el-input v-model="form_data.arg_detailAddr" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9"></el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" label="电话1" prop="phone1">
              <el-input v-model="form_data.phone1" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" label="电话2" prop="phone2">
              <el-input v-model="form_data.phone2" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"></el-col>
          <el-col :span="4">
            <el-form-item class="optional" label="机构类别" prop="arg_type">
              <el-select v-model="form_data.arg_type" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="机构性质" prop="arg_property">
              <el-select v-model="form_data.arg_property" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="兴办主体" prop="main_part">
              <el-select v-model="form_data.main_part" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="兴办主体类型" prop="main_part_type">
              <el-select v-model="form_data.main_part_type" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="房产权属" prop="main_part_type">
              <el-select v-model="form_data.property_right" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24"></el-col>
          <el-col :span="4">
            <el-form-item class="optional" label="法人代表" prop="corporate">
              <el-input v-model="form_data.corporate" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="负责人" prop="signer">
              <el-select v-model="form_data.signer" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="执业许可证书编号" prop="work_license_code">
              <el-input v-model="form_data.work_license_code" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="许可证书编号" prop="license_code">
              <el-input v-model="form_data.license_code" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="法人证书编号" prop="legaler_code">
              <el-input v-model="form_data.legaler_code" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="optional" label="接收老人类型" prop="accept_oldman_type">
              <el-checkbox-group :max="1" v-model="form_data.accept_oldman_type">
                <el-checkbox label="自理"></el-checkbox>
                <el-checkbox label="非自理"></el-checkbox>
                <el-checkbox label="半自理"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="成立时间" prop="setUp_date">
              <el-date-picker v-model="form_data.setUp_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="扩展改造时间" prop="remould_date">
              <el-date-picker v-model="form_data.remould_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="占地面积" prop="cover_area">
              <el-input v-model="form_data.cover_area" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="土地权限" prop="Land_permission">
              <el-select v-model="form_data.Land_permission" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item class="optional" label="房间总数" prop="house_sum">
              <el-input v-model.number="form_data.house_sum" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="床位总数" prop="bed_sum">
              <el-input v-model.number="form_data.bed_sum" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="微信公众号账号" prop="wx_Official_account">
              <el-input v-model="form_data.wx_Official_account" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="微信公众号账号登录密码" prop="wx_Official_password">
              <el-input type="password" v-model="form_data.wx_Official_password" placeholder="请输入">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div> -->
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { regionData } from "element-china-area-data";
  import { isBusiness_lic } from "@/utils/validate";
  export default {
    name: "administrative_staff_mg_arg_msg",
    directives: { waves, permission },
    data() {
      return {
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
        options_addr: regionData,
        options: [],
        form_data: {
          // title: "",
          // checkList: [],
          arg_code: "", //机构代码
          arg_name: "", //机构名称
          admin: "", //管理员
          arg_nickname: "", //机构略称
          arg_addr: [], //机构地址
          arg_detailAddr: "", // 机构详细地址
          phone1: "", //电话1
          phone2: "", //电话2
          arg_type: null, //机构类别
          arg_property: null, //机构性质
          main_part: null, //兴办主体
          main_part_type: null, //兴办主体类型
          corporate: "", //法人代表
          signer: "", //负责人
          work_license_code: "", //执业许可证书编号
          license_code: "", //许可证书编号
          legaler_code: "", // 法人证书编号
          accept_oldman_type: [], //接受老人类型
          setUp_date: null, //成立时间
          remould_date: null, //扩展改造时间
          cover_area: "", // 占地面积
          Land_permission: null, //土地权限
          house_sum: "", //房间总数
          bed_sum: "", // 床位总数
          property_right: "",//房产权属
          wx_Official_account: "", //微信公众号账号
          wx_Official_password: "", //微信公众号登录密码
        },
        rules: {
          phone1: [{ required: true, message: "不可为空", trigger: "change" }],
          arg_type: [{ required: true, message: "不可为空", trigger: "change" }],
          arg_property: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          main_part: [{ required: true, message: "不可为空", trigger: "change" }],
          main_part_type: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          corporate: [{ required: true, message: "不可为空", trigger: "change" }],
          work_license_code: [{ validator: isBusiness_lic, trigger: "change" }],
          license_code: [{ validator: isBusiness_lic, trigger: "change" }],
          legaler_code: [{ validator: isBusiness_lic, trigger: "change" }],
          accept_oldman_type: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          setUp_date: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          remould_date: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          cover_area: [
            {
              type: "number",
              required: true,
              message: "请输入数字",
              trigger: "change",
            },
          ],
          Land_permission: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          house_sum: [
            {
              type: "number",
              required: true,
              message: "请输入数字",
              trigger: "change",
            },
          ],
          bed_sum: [
            {
              type: "number",
              required: true,
              message: "请输入数字",
              trigger: "change",
            },
          ],
        },
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => { });
      },
    },
    mounted() { },
  };
</script>
<style lang='scss' scoped>
</style>
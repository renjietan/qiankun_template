<!-- 
 * @description: 健康评价 
 * @fileName: health_eval.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
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
          <el-col style="width: auto; min-width: 25%">
            <el-form-item
              class="default"
              prop="medicalReportIds"
              label="体检报告"
            >
              <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action
                :http-request="beforeAvatarUpload"
                :limit="4"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div
                    class="uploader_desc"
                    style="background: #017cff; color: white"
                  >
                    上传文件
                  </div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col style="width: auto; min-width: 25%">
            <el-form-item
              class="default"
              prop="healthStatementIds"
              label="健康陈述书"
            >
              <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action
                :limit="4"
                :http-request="beforeAvatarUpload1"
              >
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div
                    class="uploader_desc"
                    style="background: #dfefff; color: #017cff"
                  >
                    上传文件
                  </div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item class="default" label="体检日期" prop="medicalDate">
              <el-date-picker
                v-model="form_data.medicalDate"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="default" label="体检单位" prop="medicalUnit">
              <el-input
                v-model="form_data.medicalUnit"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item
              class="must-fill"
              label="营养状况"
              prop="nutritionStatus"
            >
              <el-select
                v-model="form_data.nutritionStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nutritionalStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item
              class="must-fill"
              label="生活自理能力"
              prop="selfCareAbility"
            >
              <el-select
                v-model="form_data.selfCareAbility"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in selfCareAbility"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item
              class="must-fill"
              label="精神状况"
              prop="mentalStatus"
            >
              <el-select v-model="form_data.mentalStatus" placeholder="请选择">
                <el-option
                  v-for="item in mentalStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item
              class="must-fill"
              label="行为能力"
              prop="behaviorAbility"
            >
              <el-select
                v-model="form_data.behaviorAbility"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in capacityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item class="optional" label="入住诊断" prop="title">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form_data.inDiagnosis"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item class="optional" label="用药情况" prop="title">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form_data.drugUsage"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item
              class="optional"
              label="风险评估及注意事项"
              prop="title"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form_data.attention"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button
        :disabled="step >= 7 ? 'disabled' : false"
        type="primary"
        @click="handleSubmit"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  nutritionalStatus,
  mentalStatus,
  selfCareAbility,
  capacityList,
} from "@/utils/enum";
import {} from "@/utils/validate";
import { arrayGroupBy } from "@/utils/index";
import { handleType, uploadType } from "@/utils/enum";
import { mapGetters } from "vuex";
import {
  add_live_health,
  get_older_healthinfo,
} from "@/api/pensionagency/goLive/goLive";
import { upload_pics } from "@/api/system/upLoadFile";

export default {
  name: "health_eval",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      step: undefined,
      nutritionalStatus,
      mentalStatus,
      selfCareAbility,
      capacityList,
      imageUrl: "",
      imageUrl1: "",
      medicalReportIds: [],
      healthStatementIds: [],
      rules: {
        nutritionStatus: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        selfCareAbility: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        mentalStatus: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        behaviorAbility: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
      },
      form_data: {
        elderId: null, //长者id
        operatorId: null, //操作员工id
        medicalReportIds: null, //体检报告文件
        healthStatementIds: null, //健康陈述书文件
        medicalDate: null, //体检日期
        medicalUnit: null, //体检单位
        nutritionStatus: null, //营养状况
        selfCareAbility: null, //生活自理能力
        mentalStatus: null, //精神状况
        behaviorAbility: null, //行为能力
        inDiagnosis: null, //入住诊断
        drugUsage: null, //用药情况
        attention: null, //风险预估及注意事项
      },
    };
  },
  computed: {
    ...mapGetters(["orgInfo", "userInfo"]),
  },
  methods: {
    beforeAvatarUpload(res) {
      const formdata = new FormData();
      formdata.append("file", res.file);
      formdata.append("centerId", this.orgInfo.id ?? this.userInfo.centerId);
      formdata.append("fileType", uploadType["长者体检报告"]);
      upload_pics(formdata).then((res) => {
        if (!!res)
          this.medicalReportIds = [res.toString(), ...this.medicalReportIds];
      });
    },
    beforeAvatarUpload1(res) {
      const formdata = new FormData();
      formdata.append("file", res.file);
      formdata.append("centerId", this.orgInfo.id ?? this.userInfo.centerId);
      formdata.append("fileType", uploadType["长者健康陈述书"]);
      upload_pics(formdata).then((res) => {
        if (!!res)
          this.healthStatementIds = [
            res.toString(),
            ...this.healthStatementIds,
          ];
      });
    },
    getDetail() {
      let self = this;
      get_older_healthinfo({
        elderId: this.form_data.elderId,
      }).then((res) => {
        self.form_data = res;
      });
    },
    handleSubmit() {
      const { healthStatementIds, medicalReportIds } = this;
      let self = this;
      self.$refs["form"].validate((vaild) => {
        if (vaild) {
          console.log(self.$route.params.id)
          let params = {
            elderId: Number(self.$route.query.id)||Number(self.$route.params.id),
            operatorId: Number(self.form_data.operatorId),
            medicalDate: self.form_data.medicalDate,
            medicalUnit: self.form_data.medicalUnit,
            nutritionStatus: self.form_data.nutritionStatus,
            selfCareAbility: self.form_data.selfCareAbility,
            mentalStatus: self.form_data.mentalStatus,
            behaviorAbility: self.form_data.behaviorAbility,
            inDiagnosis: self.form_data.inDiagnosis,
            drugUsage: self.form_data.drugUsage,
            attention: self.form_data.attention,
            healthStatementIds,
            medicalReportIds,
          };
          add_live_health(params).then((res) => {
            self.$notify({
              type: "success",
              message: "新增成功",
              title: "成功",
            });
          });
          self.$router.go(-1);
        }
      });
    },
  },
  mounted() {
    const id = this.$route.query.id || this.$route.params.id;
    const { step } = this.$route.params;
    this.step = step;
    this.form_data.operatorId = this.$store.getters.userInfo.empId;
    if (!isNaN(Number(id))) {
      this.form_data.elderId = id;
      console.log(this.$route.query.isSubmit);
      if (this.$route.query.isSubmit != '0') {
        this.getDetail();
      }
    }
  },
};
</script>
<style lang='scss' scoped>
/deep/.el-upload-list__item-actions:hover {
  background-color: red;
  opacity: 0.3;
}
/deep/ .el-textarea {
  textarea {
    height: 150px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #017cff;
  width: 129px;
  height: 129px;
  line-height: 99px;
  text-align: center;
  position: relative;

  .uploader_desc {
    position: absolute;
    bottom: 0;
    left: -12px;
    font-size: 12px;
    background: #dff0fe;
    width: 120%;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
}
.upload_icon {
  width: 240px;
  height: 150px;
  line-height: 120px;
  font-size: 40px;
}
</style>
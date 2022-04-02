<!-- 
 * @description: 签订合同
 * @fileName: contract_signing.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 14:19:11
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basicinfo></basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 30px">合同信息</div>
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" plain disabled>入住申请书</el-button>
        <el-button type="primary" plain disabled>入住健康风险知情同意书</el-button>
        <el-button type="primary" plain disabled>评估结果确认书</el-button>
        <el-button type="primary" plain disabled>护理等级确认书</el-button>
        <el-button type="primary" plain disabled>服务项目确认书</el-button>
        <el-button type="primary" plain disabled>收费标准确认书</el-button>
        <el-button type="primary" disabled>一键打印</el-button>
      </el-row>
      <el-form :inline="true" :rules="rules" :model="form_data" ref="form" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="床位号" prop="bedNum">
              <el-input disabled placeholder="请输入" v-model="form_data.bedNum" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="是否包房" prop="isPrivateRoom">
              <el-input disabled placeholder="请输入" v-model="form_data.isPrivateRoom" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="服务等级" prop="server_level">
              <el-input disabled placeholder="请输入" v-model="form_data.server_level" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="服务套餐" prop="server_menu">
              <el-input disabled placeholder="请输入" v-model="form_data.server_menu" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="readonly" label="档案号" prop="record_file_num">
              <el-input disabled placeholder="请输入" v-model="form_data.record_file_num" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item class="optional" label="合同类型" prop="contract_type">
              <el-select v-model="form_data.contract_type" placeholder="请选择">
                <el-option v-for="item in contract_type_list" :key="item.type" :label="item.desc" :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="must-fill" label="合同开始日" prop="con_start_date">
              <el-date-picker v-model="form_data.con_start_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="must-fill" label="合同结束日" prop="con_end_date">
              <el-date-picker v-model="form_data.con_end_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="合同年限">
              <el-input disabled placeholder="请输入" readonly v-model="time_limit" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="备注" prop="remark">
              <el-input placeholder="请输入" v-model="form_data.remark" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title" style="line-height: 60px; margin-bottom: 10px">
          入住费用一览
          <div>
            <!-- <el-button type="warning" :disabled="step == 10" icon="el-icon-s-operation" @click="dialog_cof.visible = true">调整入住费用周期</el-button> -->
            <el-button type="primary" icon="el-icon-printer" disabled>打印费用单</el-button>
          </div>
        </div>
        <el-table :span-method="arraySpanMethod" border class="table_data" ref="data_table" :data="table_data" fit>
          <el-table-column width="100" align="center" prop="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="planName" label="费用名称"></el-table-column>
          <el-table-column align="center" prop="fee" label="费用"></el-table-column>
          <el-table-column align="center" prop="cycle" label="费用周期"></el-table-column>
          <el-table-column align="center" prop="rsv" label="备注"></el-table-column>
        </el-table>
        <el-form-item class="upload" prop="title" label="合同文件">
          <el-upload class="avatar-uploader" list-type="picture-card" action :http-request="beforeAvatarUpload"
            :limit="4">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon">
              <div class="uploader_desc" style="background:#dfefff; color: #017CFF">上传文件</div>
            </i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer">
      <el-button v-loading="btn_loading" :disabled="step > 7 ? 'disabled' : false" type="primary" v-waves @click="handleSubmit">签订合同</el-button>
    </div>
    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="formTime" :model="form_data_time" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="开始时间" prop="con_start_date">
              <el-date-picker v-model="form_data_time.con_start_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="结束时间" prop="con_end_date">
              <el-date-picker v-model="form_data_time.con_end_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  import Pagination from "@/components/Pagination";
  import Basicinfo from "@/components/Basicinfo";
  import waves from "@/directive/waves";
  import { upload_pics } from "@/api/system/upLoadFile";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import {
    get_older_contractInfo,
    set_older_contractInfo,
    type
  } from "@/api/pensionagency/goLive/goLive";
  import { by_elder_id } from "@/api/pensionagency/basicConfig/basicConfig";
  import { bt_getDays, parseTime } from "@/utils/index";
  import { } from "@/utils/validate";
  export default {
    name: "goLive_form_contract_signing",
    components: { Pagination, Basicinfo },
    directives: { waves, elDragDialog },
    data() {
      return {
        step: undefined,
        imageUrl: "",
        elderId: undefined,
        olderInfo: {},
        contract_type_list: [],
        btn_loading: false,
        dialog_cof: {
          visible: false,
          title: "调整入住费用周期",
          escape: false,
          destroy: true,
          modal: false
        },
        form_data: {
          beforeId: undefined,
          bedNum: "", //床位号
          isPrivateRoom: "", //是否包厢
          server_level: "", //服务等级
          server_menu: "", //服务套餐
          record_file_num: "", //档案号
          con_start_date: null, //合同开始日
          con_end_date: null, //合同结束日
          remark: "", //备注
          totalFee: 0, //合计
          contract_type: undefined
        },
        form_data_time: {
          con_start_date: null, //入住费用周期---开始日期
          con_end_date: null, //入住费用周期---结束日期
          contract_type: undefined
        },
        rules: {
          con_start_date: [
            { required: true, message: "不可为空", trigger: "change" }
          ],
          con_end_date: [
            { required: true, message: "不可为空", trigger: "change" }
          ]
        },
        table_data: []
      };
    },
    computed: {
      time_limit: function () {
        let start_date = parseTime(this.form_data.con_start_date);
        let end_date = parseTime(this.form_data.con_end_date);
        if (start_date != null && end_date != null) {
          let arr = bt_getDays(start_date, end_date);
          return `${arr.y}年  ${arr.m}月   ${arr.d}天`;
        } else {
          return "";
        }
      }
    },
    methods: {
      get_contract_type_list() {
        type().then(res => {
          this.contract_type_list = res;
        });
      },
      get_goLive_date() {
        let self = this;
        by_elder_id({ elderId: self.elderId }).then(res => {
          self.form_data.con_start_date = new Date(res.planCheckDate);
        });
      },
      beforeAvatarUpload(res) {
        const formdata = new FormData();
        formdata.append("file", res.file);
        formdata.append("centerId", this.orgInfo.id);
        formdata.append("fileType", uploadType["长者体检报告"]);
        upload_pics(formdata).then(res => {
          if (!!res)
            this.medicalReportIds = [res.toString(), ...this.medicalReportIds];
        });
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (!row.id) {
          return columnIndex == 0 ? [1, 1] : [1, 4];
        } else {
          return [1, 1];
        }
      },
      handleSubmit() {
        let self = this;
        let params = {
          beforeId: self.form_data.beforeId,
          contractYears: self.time_limit,
          elderId: self.elderId,
          endDate: parseTime(self.form_data.con_end_date, "{y}{m}{d}"),
          fileIds: [],
          contractType:self.form_data.contract_type,
          remark: self.form_data.remark,
          startDate: parseTime(self.form_data.con_start_date, "{y}{m}{d}"),
          totalFee: self.form_data.totalFee
        };
        self.$refs.form.validate(valid => {
          if (valid) {
            set_older_contractInfo(params).then(res => {
              self.$notify({
                title: "成功",
                message: `合同签订成功`,
                type: "success"
              });
            });
            self.get_older_contractInfo()
            self.dialog_cof.visible = false
            self.$router.go(-1);
          }
        });
      
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      get_older_contractInfo() {
        let self = this;
        get_older_contractInfo({
          elderId: this.elderId
        }).then(res => {
          self.form_data.beforeId = res.id
          self.form_data.bedNum = res.bedName;
          self.form_data.isPrivateRoom = res.isAllRoom == 0 ? "否" : "是";
          self.form_data.server_level = res.levelName;
          self.form_data.server_menu = res.cimboName;
          self.form_data.record_file_num = res.fileNum;
          self.form_data.totalFee = res.totalFee;
          self.form_data.con_start_date =
            res.contractStartDate ?? self.form_data.con_start_date;
          self.form_data.con_end_date = res.contractEndDate;
          self.form_data.remark = res.remark;
          let arr = res.elderPayPlan.map((item, index) => {
            item.index = index + 1;
            return item;
          });
          arr.push({ index: "合计", planName: res.totalFee });
          self.table_data = arr;
        });
      },
    },
    mounted() {
        const { id } = this.$route.query;
        const { step } = this.$route.params;
        this.step = step
        this.get_contract_type_list()
        if (!isNaN(Number(id))) {
          this.elderId = id;
          this.get_older_contractInfo();
          this.get_goLive_date()
        }
      },
  };
</script>
<style lang='scss' scoped>
/deep/.el-upload-list__item-actions:hover {

    background-color: red;
    opacity: 0.3;

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
  /deep/ .el-form-item__label {
    line-height: 45px;
  }

  /deep/ .el-form-item__content {
    width: 100%;
  }

  /deep/ .el-input {
    width: 270px;
  }

  /deep/ .el-form-item {
    width: 100%;
  }

  .signing_date {
    width: 100%;
  }
  .table_data /deep/ table tbody td {
    padding: 10px 0 !important;
  }
</style>
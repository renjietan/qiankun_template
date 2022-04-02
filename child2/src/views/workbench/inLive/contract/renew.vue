<!-- 
 * @description: 
 * @fileName: contract_renew.vue 
 * @author: 谭人杰 
 * @date: 2021-06-24 14:13:19
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="title">合同信息</div>
      <el-form ref="formData" :model="form_data">
        <el-row :gutter="40">
          <el-col :span="4">
            <el-form-item class="readonly" prop="file_number" label="档案号">
              <el-input readonly v-model="form_data.file_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="contract_expireTime" label="上次合同截至日期">
              <el-input readonly v-model="form_data.contract_expireTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" prop="contract_startTime" label="本次合同开始日">
              <el-date-picker v-model="form_data.contract_startTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" prop="contract_endTime" label="合同到期日">
              <el-date-picker v-model="form_data.contract_endTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="contract_days" label="合同期限">
              <el-input readonly v-model="contract_days"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="bed" label="床位">
              <el-input readonly v-model="form_data.bed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="house" label="包房">
              <el-input readonly v-model="form_data.house"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="server_level" label="服务等级">
              <el-input readonly v-model="form_data.server_level"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="readonly" prop="server_package" label="服务套餐">
              <el-input readonly v-model="form_data.server_package"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">续签合同</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import BasicInfoTable from "@/components/Basicinfo/table";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { bt_getDays, parseTime } from "@/utils/index";
  import { get_contract_detail } from "@/api/pensionagency/inLive/contract";
  import { set_older_contractInfo } from "@/api/pensionagency/goLive/goLive";

  export default {
    name: "inLive_contract_renew",
    components: { Pagination, BasicInfoTable },
    directives: { waves, permission },
    data() {
      return {
        form_data: {
          operatorId: undefined,
          file_number: "", //档案号
          contract_expireTime: null, //上次合同截至日期
          contract_startTime: null, //本次合同截至日期
          contract_endTime: null, //本次合同截至日期
          bed: "", //床位
          house: undefined, //包房
          server_level: "", //服务等级
          server_package: "" //服务套餐
        }
      };
    },
    computed: {
      contract_days() {
        let res = "";
        let startTime = this.form_data.contract_startTime;
        let endTime = this.form_data.contract_endTime;
        if (startTime && endTime) {
          startTime = parseTime(startTime);
          endTime = parseTime(endTime);
          let temp = bt_getDays(startTime, endTime);
          let y = temp.y == 0 ? "" : `${temp.y}年`;
          let m = temp.m == 0 ? "" : `${y == 0 ? "" : "     "}${temp.m}月`;
          let d = `${y == 0 && m == 0 ? "" : "    "}${temp.d}天`;
          res = `${y}${m}${d}`;
        }
        return res;
      }
    },
    methods: {
      getElderContract() {
        let self = this;
        get_contract_detail({ id: self.$route.query.id }).then(res => {
          console.log(res);
          self.form_data.file_number = res.fileNum;
          self.form_data.house = res.isAllRoom == 0 ? "否" : "是";
          self.form_data.contract_expireTime = res.contractEndDate;
          self.form_data.contract_startTime = res.contractEndDate;
          self.form_data.bed = res.bedName;
          self.form_data.server_level = res.levelName;
          self.form_data.server_package = res.cimboName;
        });
      },

      handleSubmit() {
        let self = this;
        let params = {
          beforeId: self.$route.query.id,
          contractYears: self.contract_days,
          elderId: self.$route.params.id,
          contractType: "CM",
          endDate: parseTime(self.form_data.contract_endTime, "{y}{m}{d}"),
          operatorId: self.form_data.operatorId,
          startDate: parseTime(self.form_data.contract_startTime, "{y}{m}{d}")
        };
        self.$refs["formData"].validate(valid => {
          if (valid) {
            set_older_contractInfo(params).then(res => {
              self.$notify({
                title: "成功",
                message: `续签合同成功`,
                type: "success"
              });
              self.$router.go(-1)
            });
          }
        });
      }
    },
    mounted() {
      this.getElderContract();
    }
  };
</script>
<style lang='scss' scoped>
</style>
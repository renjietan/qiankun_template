<!-- 
 * @description: 
 * @fileName: AuditServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 21:03:01
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
      <el-row :gutter="40">
        <el-col :span="4">
          <el-form-item class="readonly" label="审核人">
            <el-input readonly v-model="form_data.auditor"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="审核时间">
            <el-input readonly v-model="form_data.auditDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item class="optional" label="审核意见" prop="auditOpinion">
            <el-input type="textarea" v-model="form_data.auditOpinion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button :disabled="cur_step == 3 && processStatus != 'P' ? false : 'disabled'" plain @click="handleSubmit(0,'驳回')">驳回申请</el-button>
      <el-button :disabled="cur_step == 3 && processStatus != 'P' ? false : 'disabled'" type="primary" @click="handleSubmit(1,'审核')">审核通过
      </el-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import { audit } from "@/api/pensionagency/inLive/bed_just";
  import moment from "moment";
  import { get_charge_process_byId_byType, get_AuditInfo } from '@/api/pensionagency/inLive/server_level';

  export default {
    name: "AuditServerLevel",
    data() {
      return {
        cur_step: 0,
        processStatus: undefined,
        form_data: {
          elderId: undefined,
          processId: undefined,
          auditor: "",
          auditorId: "",
          auditDate: "",
          auditOpinion: "",
        },
        rules: {
          auditOpinion: [
            { required: true, message: "请输入审核意见", trigger: "change" },
          ],
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      async getDetail(id) {
        let res = await get_charge_process_byId_byType({
          elderId: id,
          type: "P"
        })
        if (res.id != null) {
          this.form_data.processId = res.id
          this.cur_step = res.processIn
        }
        if ((this.cur_step >= 3 && this.processStatus == "P") || this.cur_step >= 4) {
          get_AuditInfo({ "processId": id, auditType: "P" }).then(res => {
            self.form_data.auditOpinion = res?.auditOpinion ?? ""
          })
        }
      },
      handleSubmit(auditStatus, type) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            audit({ ...this.form_data, auditStatus }).then((res) => {
              this.cur_step = 4
              this.$notify({
                title: "提示",
                message: `${type}成功`,
                type: "success",
              });
            });
          }
        });
      },
    },
    mounted() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;
      if (!isNaN(Number(id))) {
        this.form_data.auditorId = this.userInfo.empId;
        this.form_data.elderId = id;
        this.form_data.auditor = this.userInfo.empNm;
        this.form_data.auditDate = moment().format("YYYY-MM-DD");
        this.getDetail(id)
      }
      if (!isNaN(Number(record))) {
        get_AuditInfo({ "processId": record, auditType: "P" }).then(res => {
          this.form_data.auditOpinion = res?.auditOpinion ?? ""
        })
      }
    },
  };
</script>
<style lang='scss' scoped>
  .el-textarea {
    /deep/ .el-textarea__inner {
      height: 150px;
    }
  }
</style>
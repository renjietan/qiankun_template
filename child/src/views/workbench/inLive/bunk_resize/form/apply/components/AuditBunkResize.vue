<!-- 
 * @description: 
 * @fileName: AuditServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 21:03:01
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
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
      <el-button plain :disabled="cur_step == 3 && processStatus != 'P'  ? false : 'disabled'" @click="handleSubmit(0)">
        驳回申请</el-button>
      <el-button :disabled="cur_step == 3 && processStatus != 'P'  ? false : 'disabled'" type="primary"
        @click="handleSubmit(1)">审核通过</el-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import { audit } from "@/api/pensionagency/inLive/bed_just";
  import { get_charge_process_byId_byType, get_AuditInfo } from '@/api/pensionagency/inLive/server_level';
  import { base_info } from "@/api/pensionagency/inLive/bed_just";
  import moment from "moment";
  export default {
    name: "AuditServerLevel",
    data() {
      return {
        cur_step: 0,
        processStatus: undefined,
        form_data: {
          elderId: undefined,
          auditor: "",
          auditorId: "",
          auditDate: "",
          auditOpinion: "",
          processId: undefined
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      handleSubmit(auditStatus) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            audit({ ...this.form_data, auditStatus }).then((res) => {
              this.$notify({
                title: "提示",
                message: `${auditStatus === '0' ? '驳回' : '审核'}成功`,
                type: "success",
              });
              this.cur_step = 4
            });
          }
        });
      },
      async getDetail() {
        let self = this
        let result = await get_charge_process_byId_byType({
          elderId: this.form_data.elderId,
          type: "B"
        })
        if (result.id != null) {
          self.cur_step = result?.processIn
          let res = await get_AuditInfo({ "processId": result?.id, auditType: "B" })
          self.form_data.auditOpinion = res?.auditOpinion ?? ""
          self.form_data.processId = result?.id
        }
      },
      getInfo(id) {
        let self = this
        base_info({ id }).then(res => {
          if (res.id != null) {
            self.cur_step = res.processIn
            self.processStatus = res?.processStatus
          }
        })
        if ((this.cur_step >= 3 && this.processStatus == "P") || this.cur_step >= 4) {
          get_AuditInfo({ "processId": id, auditType: "B" }).then(res => {
            self.form_data.auditOpinion = res?.auditOpinion ?? ""
          })
        }

      },
    },
    mounted() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;
      this.form_data.auditorId = this.userInfo.empId;
      this.form_data.auditor = this.userInfo.empNm;
      this.form_data.auditDate = moment().format("YYYY-MM-DD");
      if (!isNaN(Number(id))) {
        this.form_data.elderId = id;

        this.getDetail()
      }
      if (!isNaN(Number(record))) {
        this.getInfo(record);
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
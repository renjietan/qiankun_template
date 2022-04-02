<!-- 
 * @description: 入住审核
 * @fileName: goLive_health.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 14:19:11
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basicinfo></basicinfo>
    <div class="container_card">
      <div class="title">审核信息</div>
      <div class="crumbs" style="margin: 10px 0 25px 0; z-index: 30000;position: absolute;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{item.name }}
          </span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>
      <!--  防止后期 UI更改  -->
      <div style="margin-top: 70px;">
        <component ref="component" :is="cur_tag.component" :key="cur_tag.component"></component>
      </div>
      <div class="footer">
        <el-button :disabled="step >= 7 ? 'disabled' : false" type="info" plain v-waves @click="handleDialog('驳回审核')">
          驳回审核</el-button>
        <el-button :disabled="step >= 7 ? 'disabled' : false" type="primary" v-waves @click="handleDialog('审核通过')">审核通过
        </el-button>
      </div>
    </div>
    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :modal="dialog_cof.modal" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="审核人" prop="auditorName">
              <el-input disabled clearable v-model="form_data.auditorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="审核时间" prop="auditDate">
              <el-input disabled clearable v-model="form_data.auditDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="dialog_cof.title == '驳回审核'">
            <el-form-item class="must-fill" label="驳回步骤" prop="returnStep">
              <el-select v-model="form_data.returnStep" placeholder="请选择">
                <el-option v-for="item in verify_steps" :key="item.type" :label="item.desc" :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="optional" label="审核意见" prop="auditOpinion">
              <el-input type="textarea" clearable v-model="form_data.auditOpinion"></el-input>
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
  import Pagination from "@/components/Pagination";
  import Basicinfo from "@/components/Basicinfo";
  import elDragDialog from "@/directive/el-drag-dialog";
  import waves from "@/directive/waves";
  import { parseTime } from "@/utils/index";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { set_verify_status, get_verify_steps } from "@/api/pensionagency/goLive/goLive";
  import Assessment from "./components/assessment";
  import Medical from "./components/medical";
  import Payload from "./components/payload";
  import Services from "./components/services";
  import Verify from "./components/verify";
  import {
    nutritionalStatus,
    mentalStatus,
    selfCareAbility,
    capacityList
  } from "@/utils/enum";
  import { } from "@/utils/validate";
  export default {
    name: "goLive_form_verify",
    components: {
      Pagination,
      Assessment,
      Medical,
      Payload,
      Services,
      Verify,
      Basicinfo
    },
    directives: { waves, elDragDialog },
    data() {
      return {
        dialog_cof: {
          visible: false,
          title: "审核通过",
          escape: false,
          destroy: true,
          modal: false
        },
        rules: {
          returnStep: [{ required: true, message: "不可为空", trigger: "change" }]
        },
        tags: [
          {
            name: "申请状况",
            component: "Verify"
          },
          {
            name: "体检状况",
            component: "Medical"
          },
          {
            name: "评估状况",
            component: "Assessment"
          },
          {
            name: "服务项目",
            component: "Services"
          },
          {
            name: "付款计划",
            component: "Payload"
          }
        ],
        step: undefined,
        cur_tag: {},
        olderInfo: {},

        form_data: {
          auditDate: "", //审核时间
          auditOpinion: "", //审核意见
          auditStatus: "", //审核状态
          auditorId: "", //审核人员工ID
          elderId: "", //长者ID
          returnStep: "", //驳回步骤
          auditorName: "" //审核人名称
        },
        verify_steps: []
      };
    },
    methods: {
      handleSubmit() {
        let self = this;
        if (self.dialog_cof.title == "审核通过") {
          set_verify_status(self.form_data).then(res => {
            self.$notify({
              title: "提示",
              message: "操作成功",
              type: "success"
            });
            self.dialog_cof.visible = false;
            self.$router.push("/workbench/goLive/list")
          });
        } else {
          self.$refs.form.validate(valid => {
            if (valid) {
              set_verify_status(self.form_data).then(res => {
                self.$notify({
                  title: "提示",
                  message: "操作成功",
                  type: "success"
                });
                self.dialog_cof.visible = false;
                self.$router.push("/workbench/workbench/goLive/list")
              });
            }
          });
        }
      },
      handleDialog(title) {
        let self = this;
        self.dialog_cof.visible = true;
        self.dialog_cof.title = title;
        self.form_data.auditDate = parseTime(new Date(), "{y}-{m}-{d}");
        self.form_data.auditorName = self.$store.getters.userInfo.empNm;
        self.form_data.auditorId = self.$store.getters.userInfo.empId;
        self.form_data.elderId = self.$route.params.id;
        self.form_data.auditStatus = title == "审核通过" ? 1 : 0;
      },
      handle_switchModel(val) {
        this.cur_tag = val;
      }
    },
    mounted() {
      let self = this;
      const { step } = this.$route.params;
      this.step = step
      self.cur_tag = self.tags[0];
      get_verify_steps().then(res => {
        self.verify_steps = res;
      });
    }
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-form-item__label {
    line-height: 45px;
  }

  /deep/ .el-form-item__content {
    width: 100%;
  }

  /deep/ .textarea {
    width: 100%;
  }

  /deep/ .el-textarea {
    width: 100%;
    height: 200px;

    .el-textarea__inner {
      height: 200px !important;
    }
  }
</style>
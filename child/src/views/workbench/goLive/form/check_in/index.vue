<!-- 
 * @description: 办理入住
 * @fileName: check_in.vue 
* @author: 谭人杰 
 * @date: 2021-05-16 22:57:29
 * @后台人员:  
!-->
<template>
  <div class="container mainbox">
    <basicinfo></basicinfo>
    <div class="container_card filters" style="margin-top: 30px;">
      <div class="title" style="margin-bottom: 20px;">入住信息</div>
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="optional" label="床位号" prop="bedNum">
              <el-input disabled v-model.number="form_data.bedNum" required placeholder="请输入床位号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="optional" label="合同开始日期" prop="startDate">
              <el-date-picker disabled v-model="form_data.startDate" type="date" placeholder="请选择合同开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="must-fill" label="实际入住日期" prop="livingDate">
              <el-date-picker v-model="form_data.livingDate" :picker-options="pickerOptions" type="date" placeholder="请选择入住日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button :disabled="step > 9" type="primary" @click="handleSubmit">办理入住</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import Basicinfo from "@/components/Basicinfo";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { parseTime } from "@/utils/index";
  import elHeightAdaptiveTable from "@/directive/el-table";
  import { get_older_contractInfo, handle_live } from "@/api/pensionagency/goLive/goLive";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  export default {
    name: "goLive_form_check_in",
    components: { Pagination, Basicinfo },
    directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
    data() {
      return {
        step: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() && parseTime(time, "{y}-{m}-{d}") != parseTime(Date.now(), "{y}-{m}-{d}");
          },
        },
        form_data: {
          bedNum: "",
          startDate: null,
          olderInfo: {},
          livingDate: null
        },
        rules: {
          livingDate: [{ required: true, message: "不可为空", trigger: "change" }]
        }
      };
    },
    methods: {
      handleSubmit() {
        let self = this;
        self.$refs.form.validate(valid => {
          if (valid) {
            handle_live({
              checkInDate: parseTime(self.form_data.livingDate, "{y}-{m}-{d}"),
              elderId: self.$route.query.id
            }).then(res => {
              self.step = 10;
              self.$notify({
                title: "成功",
                message: `入住成功`,
                type: "success"
              });
              self.$router.push("/workbench/workbench/goLive/list")
            });
          }
        });
      },
    },
    mounted() {
      let self = this;
      self.step = self.$route.params.step
      get_older_contractInfo({
        elderId: this.$route.query.id
      }).then(res => {
        self.form_data.bedNum = res.bedName;
        self.form_data.startDate = res.contractStartDate;
        self.form_data.livingDate = res.checkInDate
      });
    }
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-form-item__content {
    width: 100%;
  }

  /deep/ .el-form-item__label {
    line-height: 45px;
  }
</style>
<!-- 
 * @description: 
 * @fileName: apply_back.vue 
 * @author: 谭人杰 
 * @date: 2021-06-24 16:09:05
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basicinfo></basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">合同信息</div>
      <el-form
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
      >
        <el-row :gutter="40">
          <el-col :span="4" :gutter="40">
            <el-form-item
              prop="dateTime"
              class="must-fill"
              label="预估退住日期"
            >
              <el-input
                placeholder="请输入"
                clearable
                v-model="form_data.dateTime"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="reason" class="must-fill" label="退住原因">
              <el-select
                placeholder="请选择"
                clearable
                v-model="form_data.reason"
              >
                <el-option
                  v-for="item in reason_options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="remark" class="default" label="说明">
              <el-input
                placeholder="请输入"
                clearable
                v-model="form_data.remark"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary"> 退住申请 </el-button>
    </div>
  </div>
</template>
<script>
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import { valid_error_msg } from "@/utils/valid-error-msg";
import Basicinfo from "@/components/Basicinfo";
import {} from "@/utils/validate";
export default {
  name: "inLive_handle_form_apply_back",
  components: { Basicinfo },
  directives: { waves, permission },
  data() {
    return {
      rules: {
        dateTime: [{ required: true, trigger: "blur", message: "不可为空" }],
        reason: [{ required: true, trigger: "blur", message: "不可为空" }],
      },
      form_data: {
        dateTime: null, //退住日期
        reason: null, //退住原因
        remark: "",
      },
      reason_options: [],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
/deep/ .el-textarea__inner {
  height: 200px;
}
</style>
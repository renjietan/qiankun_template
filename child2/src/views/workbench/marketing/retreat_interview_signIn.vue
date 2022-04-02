<!-- 
 * @description:退住约谈登记 
 * @fileName: retreat_interview_signIn.vue 
 * @author: 姜纬杰 
 * @date: 2022-03-04 11:35:45
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="title" style="margin-bottom: 10px">
        <div class="title">登记约谈信息</div>
      </div>
      <el-form :inline="true" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="退住意向时间">
              <el-input v-model="totalScore" :disabled="true" required placeholder="请选择退住意向时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-form-item class="readonly" label="退住原因">
            <el-input v-model="totalScore" type="textarea" :rows="4" required placeholder="请输入"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item class="readonly" label="客户经理">
                  <el-input v-model="totalScore" :disabled="true" required placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="readonly" label="约谈时间">
                  <el-input v-model="totalScore" required placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item class="readonly" label="退住原因">
                <el-input v-model="totalScore" type="textarea" :rows="4" required placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item class="readonly" label="院长">
                  <el-input v-model="totalScore" :disabled="true" required placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="readonly" label="约谈时间">
                  <el-input v-model="totalScore" required placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item class="readonly" label="退住原因">
                <el-input v-model="totalScore" type="textarea" :rows="4" required placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item class="readonly" label="营销责任人">
                  <el-input v-model="totalScore" :disabled="true" required placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="readonly" label="约谈时间">
                  <el-input v-model="totalScore" required placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item class="readonly" label="退住原因">
                <el-input v-model="totalScore" type="textarea" :rows="4" required placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <el-row></el-row>
      <div class="footer">
        <el-button type="primary" @click="handleSubmit">确认结算费用</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero } from "@/filters";

export default {
  name: "marketing_retreat_interview_signIn",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      form_data: {
        title: null,
        date: null
      }
    };
  },
  methods: {
    formatZero,
    handleSubmit() {
      this.$message({
        message: "结算成功",
        type: "success"
      });
    }
  },
  mounted() {
    this.table_data = [
      {
        name: 1
      }
    ];
  }
};
</script>
<style lang='scss' scoped>
</style>
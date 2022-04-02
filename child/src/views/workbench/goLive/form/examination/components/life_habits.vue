<!-- 
 * @description:生活习惯 
 * @fileName: life_habits.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-03 11:06:00
 * @后台人员:  
!-->
<template>
  <div>
    <el-form
      :inline="true"
      :model="form_data"
      ref="form"
      hide-required-asterisk
      status-icon
      label-position="top"
    >
      <el-row>
        <el-col :span="20">
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="elderName" class="default" label="运动">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" class="default" label="频率">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>`
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="持续时间">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">克/每天</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="饮食">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="口味">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="饮食量">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="nationality" class="default" label="睡眠">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="zipCode" class="default" label="睡眠时间">
                <el-input v-model="form_data.zipCode" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">小时/每天</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="nationality" class="default" label="二便">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="zipCode" class="default" label="其他">
                <el-input v-model="form_data.zipCode" placeholder="请输入" maxlength="7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="nationality" class="default" label="吸烟史">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="zipCode" class="default" label="持续时间">
                <el-input v-model="form_data.zipCode" placeholder="请输入邮编" maxlength="7"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="zipCode" class="default" label="吸烟量">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="nationality" class="default" label="饮酒史">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="zipCode" class="default" label="酒量">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button type="primary" :disabled="step >= 7 ? 'disabled' : false" @click="handleSubmit">保 存</el-button>
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
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      step: undefined,
      value: "",
      form_data: {
        operatorId: null, //操作员工id
        id: undefined
      },
      options: []
    };
  },
  methods: {
    handleSubmit() {}
  },
  mounted() {
    const { id, step } = this.$route.params;
    this.form_data.operatorId = this.$store.getters.userInfo.empId;
    this.step = step;
  }
};
</script>
<style lang='scss' scoped>
  /deep/ .el-form-item__label {
      color: #333;
    }
</style>
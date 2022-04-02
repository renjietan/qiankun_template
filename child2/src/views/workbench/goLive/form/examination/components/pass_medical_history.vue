<!-- 
 * @description:既往病史 
 * @fileName: pass_medical_history.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-03 14:15:03
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
        <el-col :span="23">
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">血型：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="血型情况">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="RH阴性">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">既往病史:</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="must-fill" label="疾病">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="phone" class="must-fill" label="病史说明">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">手术史：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="手术史情况">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">外伤史：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="外伤史情况">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">输血史：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="输血史情况">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">暴露史：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="暴露史">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">过敏史：</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="药物过敏史">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">遗传病史:</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="遗传病史情况">
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
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">家族病史:</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="must-fill" label="父亲">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="must-fill" label="母亲">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
              <el-form-item prop="elderName" class="must-fill" label="兄弟姐妹">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">残疾情况:</div>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="elderName" class="default" label="残疾情况">
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
            <el-col :span="5">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
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
.title {
  font-size: 14px;
  margin-left: 14px;
  margin-top: 14px;
}
/deep/ .el-form-item__label {
  color: #333;
}
</style>
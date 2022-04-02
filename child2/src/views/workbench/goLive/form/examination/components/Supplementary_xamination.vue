<!-- 
 * @description:辅助检查 
 * @fileName: Supplementary_xamination.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-03 16:08:19
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
              <div class="title">血常规：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="血红蛋白">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">g/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="白细胞">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">10^9/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血小板">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">10^9/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">尿常规：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="尿道白">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="尿糖">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="尿酮体">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="尿潜血">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">肝功：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="血清谷丙转氨酶">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">U/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血清谷草转氨酶">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">U/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="白蛋白">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">g/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="总胆红素">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">μmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="结合胆红素">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">μmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
              <el-form-item prop="elderName" class="default" label="乙肝表面抗原">
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
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="乙肝表面抗体">
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
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="e抗原">
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
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="e抗体">
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
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="核心抗体">
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
              <div class="title">肾功：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="血清肌酐">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">μmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血氨尿氮">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">μmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">血脂：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="总胆固醇">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="甘油三酯">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血清低密度脂蛋白胆固醇">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血清低密度脂蛋白胆固醇">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">血糖：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="空腹血糖">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="餐后血糖">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="糖化血红蛋白">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">%</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">电解质：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="血钾浓度">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="血钠浓度">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">mmol/L</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="phone" class="default" label="其他">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">心电图：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="心电图">
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
            <el-col :span="12">
              <el-form-item prop="phone" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">X线：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="胸透">
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
            <el-col :span="12">
              <el-form-item prop="phone" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2" style="margin-left:143px">
              <el-form-item prop="elderName" class="default" label="胸片">
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
            <el-col :span="12">
              <el-form-item prop="phone" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">骨密度：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="骨密度">
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
            <el-col :span="12">
              <el-form-item prop="phone" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">超声：</div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="elderName" class="default" label="超声">
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
            <el-col :span="12">
              <el-form-item prop="phone" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="2">
              <div class="title">其他检查:</div>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="phone" class="default" label="其他检查">
                <el-input type="textarea" :rows="3" v-model="value" placeholder="请输入"></el-input>
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
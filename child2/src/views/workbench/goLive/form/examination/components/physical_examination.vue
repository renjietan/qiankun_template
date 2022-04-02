<!-- 
 * @description:体格检查 
 * @fileName: physical_examination.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-03 15:31:51
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
              <el-form-item prop="elderName" class="default" label="身高">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">厘米</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" class="default" label="体重">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">千克</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="体温">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">体温</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="呼吸">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">次/每分</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="脉搏">
                <el-input v-model="value" placeholder="请输入">
                  <template slot="suffix">
                    <span style="color:#333;font-size:14px;font-weight:600">次/每分</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="血压（高/低）">
                <el-input v-model="value" style="width:120px" placeholder="请输入"></el-input>
                <span style="margin: 0 5px">/</span>
                <el-input v-model="value" style="width:120px" placeholder="请输入"></el-input>
                <span style="color:#333;font-size:14px;font-weight:600;margin-left:7px">mmHg</span>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="发育">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="营养">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="意识">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="语言">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="对答">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="淋巴结">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="皮肤">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="巩膜">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="黏膜">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="头颅">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="颈部">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="颈静脉">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="颈动脉搏动">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="甲状腺">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="外眼">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="对光反射">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="左眼视力">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="national" class="default" label="右眼视力">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="双耳听力">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="鼻外观">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="鼻唇沟">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="口腔">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="牙齿">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="咽扁桃体">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="轮廓">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="乳房">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="双肺呼吸音">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="干湿啰音">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="心界">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="心率">
                <el-input v-model="value" style="width:260px" placeholder="请输入"></el-input>
                <span style="color:#333;font-size:14px;font-weight:600">次/分</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="心律">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="心脏杂音">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="phone2" class="default" label="腹部">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="腹部压痛">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="腹部包块">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="肝">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="右肋下">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="双肾">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="脾">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="左肋下">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="移动性浊音">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="脊柱畸形">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="四肢畸形">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="直肠肛门">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item prop="phone2" class="default" label="外生殖器">
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
            <el-col :span="18">
              <el-form-item prop="national" class="default" label="备注">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="神经反射">
                <el-input v-model="value" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="national" class="default" label="病理反射">
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
/deep/ .el-form-item__label {
  color: #333;
}
</style>
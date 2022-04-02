<!-- 
 * @description:新增-----付款方式 
 * @fileName: add_payment_method.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-26 14:03:55
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item class="filter" label="所属项目：">
              <span style="color:#262626">清江山水一期</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="required" label="方案名称：">
              <el-input v-model="flt.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="应用范围：">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">整个项目</el-radio>
                <el-radio :label="1">指定楼栋</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="生效时间：">
              <el-date-picker v-model="flt.time" type="date" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="失效时间：">
              <el-date-picker v-model="flt.time" type="date" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="按揭银行：">
              <el-select v-model="model" placeholder>
                <el-option
                  v-for="item in mortgage_bank_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="按揭精度：">
              <el-select v-model="model1" placeholder>
                <el-option
                  v-for="item in mortgage_accuracy_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="公积金银行：">
              <el-select v-model="model" placeholder>
                <el-option
                  v-for="item in provident_bank_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="公积金精度：">
              <el-select v-model="model1" placeholder>
                <el-option
                  v-for="item in provident_accuracy_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="创建人：">
              <span style="color:#262626">系统管理员</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="创建时间：">
              <span style="color:#262626">2018-09-17</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">付款方式管理表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreat('新增')">新增</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="付款时间" width="228" align="left" prop="elderName"></el-table-column>
        <el-table-column label="天" width="120" align="left" prop="bedName"></el-table-column>
        <el-table-column label="月" width="120" align="left" prop="disease"></el-table-column>
        <el-table-column label="款项类型" width="165" align="left" prop="fixedFood"></el-table-column>
        <el-table-column label="项目名称" width="165" align="left" prop="breakfast"></el-table-column>
        <el-table-column label="金额（元）" width="165" align="left" prop="lunch"></el-table-column>
        <el-table-column label="比例（%）" width="165" align="left" prop="dinner"></el-table-column>
        <el-table-column label="分期" width="200" align="left" prop="startTime"></el-table-column>
        <el-table-column label="扣除定金" width="200" align="left" prop="endTime"></el-table-column>
        <el-table-column align="left" label="操作" width="110">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleEdit(scope.row, '编辑')">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDialog(scope.row, '删除')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
      />
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
      <el-button type="primary" @click="handleSubmit">保存并返回</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <el-dialog
      class="el-dialog-3"
      center
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        label-position="top"
        style="min-height:580px"
      >
        <el-row>
          <el-form-item label="付款时间" class="default">
            <el-select v-model="form_data.cimboName" placeholder="请选择" style="width:941px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="几天内 " class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="几个月内" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="款项类型" class="optional">
              <el-select v-model="form_data.cimboName" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款项名称" class="optional">
              <el-select v-model="form_data.cimboName" placeholder="请选择">
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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="比例" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="币种" class="default">
              <el-select v-model="form_data.cimboName" placeholder="请选择">
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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否扣除定金" class="default">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分期" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
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
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import { formatZero } from "@/filters";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "add_payment_method",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      options: [],
      radio: null,
      table_total: 0,
      table_data: [
        {
          bedName: "12"
        }
      ],
      table_loading: false,
      model: "中国工商银行",
      model1: "万位",
      flt: {},
      mortgage_bank_list: [
        {
          value: 0,
          label: "中国工商银行"
        }
      ], //按揭银行列表
      provident_bank_list: [
        {
          value: 0,
          label: "中国工商银行"
        }
      ], //公积金银行列表
      mortgage_accuracy_list: [
        {
          value: 0,
          label: "万位"
        }
      ], //按揭精度列表
      provident_accuracy_list: [
        {
          value: 0,
          label: "万位"
        }
      ], //公积金精度列表
      radio: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      form_data: {
        id: null,
        cimboName: "", //套餐名称
        levelName: "", //服务等级
        cimboFee: "", //套餐费用
        abilityLevel: undefined //能力评估等级
      },
      rules: {
        levelName: [{ required: true, message: "不可为空", trigger: "change" }],
        cimboName: [{ required: true, message: "不可为空", trigger: "change" }],
        abilityLevel: [
          { required: true, message: "不可为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    formatZero,
    handleEdit(data, type) {
      let self = this;
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "编辑付款明细";
    },
    handleSubmit() {},
    handleCreat() {
      let self = this;
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "新增付款明细";
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
.default {
  /deep/.el-form-item__label {
    width: 100%;
    text-align: left;
    line-height: 25px;
    color: #222;
  }
}
.optional {
  /deep/.el-form-item__label {
    width: 100%;
    text-align: left;
    line-height: 25px;
    color: #222;
  }
}

.required {
  width: 100%;
  display: flex;

  /deep/.el-form-item__label {
    text-align: left;
    padding: 0 5px 0 0;
    font-size: 14px;

    &:after {
      display: inline-block;
      content: "*";
      text-indent: 5px;
      color: red;
    }
  }
  /deep/.el-form-item__content {
    width: calc(100% - 80px);

    & > div {
      width: 100%;
    }
  }
}
/deep/.el-form-item__label {
  color: #262626;
  font-weight: 400;
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
</style>
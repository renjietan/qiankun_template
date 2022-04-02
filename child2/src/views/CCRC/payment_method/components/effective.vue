<!-- 
 * @description:生效的 
 * @fileName: effective.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-26 11:52:21
 * @后台人员:  
!-->
<template>
  <div>
    <el-row style="padding-bottom: 20px">
      <el-col>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <!-- <div class="title" v-if="title">{{ title }}</div> -->
          <div>
            <el-button type="primary" icon="el-icon-plus" @click="handleCreat()">新增</el-button>
            <el-button type="success" @click="hanldeAction()">
              <span class="btn_pic">
                <img class="pic" src="~@/assets/images/CCRC/introduce.png" />引入付款方式
              </span>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="150" align="left" label="序号">
        <template slot-scope="scope">
          <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="left" prop="planName" label="价格方案"></el-table-column>
      <el-table-column width="300" align="left" prop="planName" label="底均价对比"></el-table-column>
      <el-table-column width="300" align="left" prop="tollStandard" label="面均价对比"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="状态"></el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="指定信息"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="审批信息"></el-table-column>
      <el-table-column align="left" label="操作" width="110">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleClick(scope.row, '编辑')">编辑</el-link>
            <el-link :underline="false" type="danger" @click="handleClick(scope.row, '删除')">删除</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
      />
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
        label-width="60px"
        label-position="left"
      >
        <el-row>
          <el-form-item label="项目：" class="projects">
            <el-select v-model="project" placeholder="请选择">
              <el-option
                v-for="item in project_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table
        border
        ref="form_data_table"
        :data="form_table_data"
        v-loading="form_table_loading"
        fit
        class="form_table"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="150" align="left" label="序号">
          <template slot-scope="scope">
            <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="310" align="left" prop="payName" label="付款方式名称"></el-table-column>
        <el-table-column width="428" align="left" prop="projectName" label="项目名称"></el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="form_table_total"
        :page.sync="form_data.pageNum"
        :limit.sync="form_data.pageSize"
      />
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
import { formatZero } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import elDragDialog from "@/directive/el-drag-dialog";
import {} from "@/utils/validate";
export default {
  name: "Effective",
  components: {
    Pagination
  },
  directives: {
    waves,
    elDragDialog
  },

  data() {
    return {
      flt:{},
      table_total:0,
      form_table_total:0,
      project: "清江山水-一期",
      project_list: [
        {
          value: 0,
          label: "清江山水-一期"
        }
      ],
      table_loading: false,
      table_data: [
        {
          planName: "1"
        }
      ],
      form_table_loading: false,
      form_table_data: [
        {
          payName: "分期",
          projectName: "南京颐养中心",
        },
        {
          payName: "一次性（7天内）",
          projectName: "南京颐养中心",
        },
      ],
      company: "",
      company_list: [], //公司列表
      form_data: {},
      radio: 1,
      radio1: 0,
      radio2: 0,
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
        abilityLevel: undefined, //能力评估等级
        pageNum: 1, //能力评估等级
        pageSize: 10, //能力评估等级
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
  computed: {},
  methods: {
    formatZero,
    hanldeAction() {
      let self = this;
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "引入付款方式";
    },
    handleClick(data, type) {
      let self = this;
      switch (type) {
        case "编辑":
          self.$router.push({
            path: "/CCRC/payment_method/add_payment_method"
          });
          break;

        case "删除":
          break;
      }
    },
    handleCreat() {
      let self = this;
      self.$router.push({ path: "/CCRC/payment_method/add_payment_method" });
    },
    handleSubmit() {}
  },

  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/.el-dialog .el-dialog__body {
    min-height: 550px;
}
.form_table{
    /deep/ .el-table__header-wrapper {
    th {
      background: #fafafa;
      border-right: 1px solid #dfe6ec !important;
      font-size: 15px;
      font-weight: bolder;
      color: black;
      padding: 15px 0;
    }
  }

  /deep/.el-table__body-wrapper  .el-table__row {
    td {
      border-right: 1px solid #dfe6ec !important;
    }
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}
/deep/.el-form-item__label {
  color: #262626;
  line-height: 40px;
  font-weight: 400;
}
.title {
  margin-top: 5px;
  letter-spacing: 1px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
.projects {
  /deep/.el-form-item__label {
    color: #262626;
    font-weight: 400;
  }
  /deep/.el-input__inner {
    color: #262626;
    width: 300px;
    font-weight: 400;
    margin-top: 3px;
    margin-left: -14px;
  }
}
</style>
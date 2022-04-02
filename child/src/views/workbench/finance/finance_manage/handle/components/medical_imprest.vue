<!-- 
 * @description: 医疗备用金
 * @fileName: medical_imprest.vue 
 * @author: 王文涛 
 * @date: 2021-11-15 11:03:15
 * @后台人员:  
!-->
<template>
  <div>
    <div>
      <el-form :inline="true" label-position="top">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="4">
                <el-form-item label="账户操作类型">
                  <el-select
                    v-model="flt.processIn"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in status_options"
                      :key="item.step"
                      :label="item.codeDesc"
                      :value="item.step"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="账户操作时间">
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')"
                >查询</el-button
              >
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="title" style="margin-bottom: 20px">
        <span>账户明细表</span>
        <div style="display: inline-block">
          <el-button type="primary" @click="handleAction('', '充值')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/chongzhi.png" />充值
            </span>
          </el-button>
           <el-button type="warning" @click="handleAction('', '取款')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/qukuan.png" />转账
            </span>
          </el-button>
          <el-button type="warning" @click="handleAction('', '取款')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/qukuan.png" />取款
            </span>
          </el-button>
          <el-button type="primary" @click="handleAction('', '付款计划')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/fee_plan.png" />付款计划
            </span>
          </el-button>
          <el-button
            type="success"
            icon="el-icon-upload2"
            @click="handleAction('', '导出')"
            >导出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-printer"
            @click="handleAction('', '打印')"
            >打印</el-button
          >
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        highlight-current-row
        fit
      >
        <el-table-column align="center" width="80" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          width="150"
          prop="bedName"
          label="时间"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          prop="bedName"
          label="账户操作类型"
        ></el-table-column>
        <el-table-column
          align="center"
          width="130"
          prop="bedName"
          label="入账金额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          width="130"
          prop="bedName"
          label="出账金额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          width="200"
          prop="bedName"
          label="余额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          width="200"
          prop="bedName"
          label="经办人"
        ></el-table-column>
        <el-table-column
          align="left"
          width="558"
          prop="bedName"
          label="说明"
        ></el-table-column>
        <el-table-column align="left" width="170" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '支付详情')"
              >支付详情</el-link
            >
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
    <el-dialog
      class="el-dialog-2"
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
      >
        <el-row v-if="this.dialog_cof.title == '充值'">
          <el-col :span="11">
            <el-form-item class="must-fill" label="充值账户" prop="avName">
              <el-input clearable v-model="form_data.avName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="default" label="支付方式" prop="avName">
              <el-select
                clearable
                v-model="form_data.avType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.avType"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="金额（元）" prop="rsv">
              <el-input clearable v-model="form_data.avName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="default" label="说明" prop="rsv">
              <el-input
                type="textarea"
                clearable
                v-model="form_data.rsv"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  name: "medical_imprest",
  data() {
    return {
      value1: "",
      flt: {},
      table_total: 1,
      table_loading: false,
      table_data: [
        {
          bedName: "1",
        },
        {
          bedName: "1",
        },
        {
          bedName: "1",
        },
      ],
      options: [],
      status_options: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      rules: {},
      form_data: {
        id: null,
        avName: "",
        avType: undefined,
        feeType: undefined,
        rsv: "",
      },
    };
  },
  methods: {
    formatZero,
    //头部搜索
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          // self.getList();
          break;
        case "重置":
          self.flt = {
            name: "",
            bed: "",
            level: undefined,
            pageNum: 1,
            pageSize: 10,
          };
          // self.getList();
          break;
      }
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "充值":
          self.$router.push({
            path: "/workbench/finance/cost_mg",
            query: {},
          });
          break;
        case "取款":
          self.$router.push({
            path: "/workbench/finance/cost_sum",
            query: {},
          });
          break;
        case "付款计划":
          self.$router.push({
            path: "/workbench/finance/handle/pay_play",
            query: {},
          });
          break;
        case "支付详情":
          self.$router.push({
            path: "/workbench/finance/billing_details",
            query: {},
          });
          break;
        default:
          break;
      }
    },
    handleSubmit() {},
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.btn_pic {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.5px;
  }
}
</style>
<!-- 
 * @description:收退费 
 * @fileName: return_money_mg.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-08 18:34:30
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名">
                  <el-input
                    clearable
                    v-model="flt.elderName"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="床位">
                  <el-input
                    clearable
                    v-model="flt.bedName"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="rest_data">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>收退费管理表</span>
        <div style="display: inline-block">
          <el-button type="warning" @click="handleAction('', '登记费用')"
            >登记费用</el-button
          >
          <el-button
            type="success"
            icon="el-icon-upload2"
            @click="handleAction('', '导出')"
            >导出</el-button
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
        <el-table-column align="center" width="100" prop="name" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="elderName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="床位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="prepayments"
          label="预付款金额（元）"
        >
          <template slot-scope="scope">
            <span>{{ parsetNumber(scope.row.prepayments) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fee" label="费用金额（元）">
          <template slot-scope="scope">
            <span>{{ scope.row.fee?parsetNumber(scope.row.fee):undefined }}</span>
          </template>
        </el-table-column>

        <el-table-column align="left" width="95" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '收退费')"
              >收退费</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
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
        ref="from"
        :model="form_data"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="default"
              label="长者姓名"
              prop="name"
              :rules="{
                required: true,
                message: '请选择长者姓名',
                trigger: 'change',
              }"
            >
              <el-autocomplete
                v-model="form_data.name"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="must-fill"
              label="费用科目"
              prop="feeSubject"
              :rules="{
                required: true,
                message: '请选择费用科目',
                trigger: 'blur',
              }"
            >
              <el-select
                clearable
                v-model="form_data.feeSubject"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options_fee"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item
              class="must-fill"
              label="账户/费用"
              prop="feeType"
              :rules="{
                required: true,
                message: '请选择账户/费用',
                trigger: 'blur',
              }"
            >
              <el-select
                clearable
                v-model="form_data.feeType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options_feeType"
                  :key="item.types"
                  :label="item.desc"
                  :value="item.types"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              class="must-fill"
              label="收退区分"
              prop="isPay"
              :rules="{
                required: true,
                message: '收退区分',
                trigger: 'blur',
              }"
            >
              <el-select
                clearable
                v-model="form_data.isPay"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options_money"
                  :key="item.types"
                  :label="item.desc"
                  :value="item.types"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item
              class="must-fill"
              label="金额(元)"
              prop="amt"
              :rules="{
                required: true,
                message: '请输入金额',
                trigger: 'blur',
              }"
            >
              <el-input clearable v-model="form_data.amt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item class="default" label="说明" prop="rsv">
              <el-input
                type="textarea"
                clearable
                v-model="form_data.desc"
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
import { formatZero, parsetNumber } from "@/filters";
import {
  refund_list,
  all_fee_subject,
  all_fee_add,
} from "@/api/pensionagency/fsm/refund-record";
import {} from "@/utils/validate";
import { get_elder_all } from "@/api/pensionagency/inLive/index";

export default {
  name: "finance_return_money_mg",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        elderName: undefined,
        bedName: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      form_data: {
        amt: undefined, //金额
        name: undefined, //长者
        elderId: undefined, //长者id
        feeSubject: undefined, //费用类型
        feeType: undefined, //预付款：P， 费用：F
        desc: undefined,
      },
      options_fee: [],

      options_feeType: [],
      options_money: [
        {
          types: "TL",
          desc: "收费",
        },
        {
          types: "RF",
          desc: "退费",
        },
      ],
      table_total: 0,
      table_loading: false,
      table_data: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
    };
  },
  watch: {
    "form_data.feeSubject"(val) {
      this.options_feeType = [];
      if (val === "RD") {
        this.options_feeType = [
          {
            types: "P",
            desc: "预付款",
          },
        ];
      } else {
        this.options_feeType = [
          {
            types: "P",
            desc: "预付款",
          },
          {
            types: "F",
            desc: "费用",
          },
        ];
      }
    },
  },
  methods: {
    formatZero,
    parsetNumber,
    //头部搜索
    getList() {
      this.table_loading = true;
      refund_list(this.flt).then((res) => {
        this.table_loading = false;
        this.table_data = res ? res.result : [];
        this.table_total = res ? res.totalCount : 0;
      });
    },
    rest_data() {
      this.flt.liveStatus = undefined;
      this.flt.elderName = undefined;
      this.flt.bedName = undefined;
      this.flt.pageNum = 1;
      this.flt.pageSize = 10;
      this.getList();
    },
    handleSelect(item) {
      this.form_data.elderId = item.elderId;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 300 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.elderName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "收退费":
          self.$router.push({
            path: "/workbench/workbench/finance/return_money_detail",
            query: { id: data.elderId },
          });
          break;
        case "登记费用":
          this.dialog_cof.visible = true;
          this.dialog_cof.title = type;
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      var self = this;
      self.$refs["from"].validate((isvaild) => {
        if (isvaild) {
          all_fee_add(this.form_data).then((res) => {
            this.$notify({
              type: "success",
              message: "操作成功!",
              title: "成功",
            });
            this.$refs["from"].clearValidate();
            this.$nextTick(() => {
              this.restFrom();
              this.getList();
            });
          });
        }
      });
    },
    restFrom() {
      this.form_data = {
        // 拆分金额
        amt: undefined, //金额
        name: undefined, //长者
        elderId: undefined, //长者id
        feeSubject: undefined, //费用类型
        feeType: undefined, //预付款：P， 费用：F
        desc: undefined,
      };
      this.dialog_cof.visible = false;
    },
    feeSubject() {
      all_fee_subject().then((res) => {
        this.options_fee = res;
      });
    },
    getOlder() {
      get_elder_all().then((res) => {
        this.restaurants = res.map((el) => {
          el.value = el.elderName;
          return el;
        });
      });
    },
  },
  mounted() {
    this.getList();
    this.getOlder();
    this.feeSubject();
  },
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
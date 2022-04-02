<!-- 
 * @description: 增值服务
 * @fileName: addedValue_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 12:06:33
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item class="filter" label="姓名：">
              <el-input placeholder="请输入" v-model="flt.elderName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="床位：">
              <el-input placeholder="请输入" v-model="flt.bedName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="服务名称：">
              <el-input placeholder="请输入" v-model="flt.avServiceName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="登记人：">
              <el-input placeholder="请输入" v-model="flt.operator" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="服务时间">
              <el-date-picker
                type="daterange"
                value-format="yyyy-MM-dd"
                v-model="flt.server_dateTime"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <div>增值服务列表</div>
        <div>
          <el-button icon="el-icon-plus" type="primary" @click="handleDialog('', '新增增值服务')">新增增值服务</el-button>
          <el-button icon="el-icon-upload2" type="success" disabled>数据导出</el-button>
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="headUrl" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="bedName" show-overflow-tooltip  label="床位"></el-table-column>
        <el-table-column align="center" prop="liveStatusDesc" label="状态"></el-table-column>
        <el-table-column width="120" align="center" prop="avServiceName" label="服务名称"></el-table-column>
        <el-table-column width="120" align="center" prop="avServiceTypeName" label="服务类型"></el-table-column>
        <el-table-column width="120" align="center" prop="serviceDate" label="服务发生日"></el-table-column>
        <el-table-column align="center" prop="unitPrice" label="单价"></el-table-column>
        <el-table-column align="center" prop="feeType" label="收费标准">
          <!-- <template slot-scope="scope">
            <div>{{ scope.row.feeType | parseAddValueType }}</div>
          </template> -->
        </el-table-column>
        <el-table-column align="center" prop="size" label="数量"></el-table-column>
        <el-table-column align="center" prop="totalFee" label="合计"></el-table-column>
        <el-table-column align="left" width="150" prop="rsv" label="说明"></el-table-column>
        <el-table-column align="left" width="120" prop="payStatus" label="支付状态"></el-table-column>
        <el-table-column align="left" width="100" prop="operator" label="登记人"></el-table-column>
        <el-table-column width="150" align="left" prop="operateDateDesc" label="登记日"></el-table-column>
        <el-table-column align="left" width="120" label="操作" class="lastColumn">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleDialog(scope.row, '编辑')">修改</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
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
    <!-- 弹框：添加增值服务 -->
    <el-dialog
      v-el-drag-dialog
      class="el-dialog-2"
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form_addvalue"
        hide-required-asterisk
        status-icon
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="长者" prop="elderName">
              <el-autocomplete
                :disabled="dialog_cof.title == '编辑' ? 'disabled' : false"
                v-model="form_addvalue.elderName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务类型" prop="avType">
              <el-select
                @change="handleChange_serverType"
                v-model="form_addvalue.avType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in server_type_options"
                  :key="item.id"
                  :label="item.avType"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务名称" prop="avId">
              <el-select
                @change="handleChange_serverName"
                v-model="form_addvalue.avId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in server_name_options"
                  :key="item.id"
                  :label="item.avName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务发生日" prop="serviceDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form_addvalue.serviceDate"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="数量" prop="size">
              <el-input type="number" v-model="form_addvalue.size"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="单价">
              <el-input disabled v-model="form_addvalue.unitPrice" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="收费标准">
              <el-select disabled v-model="form_addvalue.rates" clearable placeholder="请选择">
                <el-option
                  v-for="item in addvalue_fee_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="readonly" label="备注">
              <el-input type="textarea" v-model="form_addvalue.rsv" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit">确 认</el-button>
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
import { all_av_type, add_av_service, get_av_byType } from "@/api/pensionagency/basicConfig/basicConfig";
import { addvalue_fee_type } from "@/utils/enum";
import {
  addValueInfo,
  get_addValue_list,
  set_or_del_addValue
} from "@/api/pensionagency/inLive/addValue";
import { getElderByName } from "@/api/pensionagency/inLive/specail";
export default {
  name: "inLive_addedValue_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      server_type_options: [],
      flt: {
        elderName: undefined, //姓名
        bedName: undefined, //床位
        avServiceName: undefined, //服务名称
        operator: undefined, //登记人
        server_dateTime: null, //服务时间
        pageNum: 1,
        pageSize: 10
      },
      addvalue_fee_type_options: addvalue_fee_type,
      server_name_options: [],
      server_type_options: [],
      form_addvalue: {
        elderId: undefined, //老人ID
        elderName: "", //老人姓名
        avType: undefined, //增值服务类型
        avId: undefined, //增值服务名称
        serviceDate: null, //服务发生日期
        size: 0, //数量
        unitPrice: 0, //单价
        rates: undefined, //收费标准
        rsv: "" //备注
      },
      form_loading: false,
      dialog_cof: {
        visible: false,
        title: "",
        escape: false,
        destroy: true,
        modal: false
      },
      rules: {
        avType: [{ required: true, message: "不可为空", trigger: "change" }],
        avId: [{ required: true, message: "不可为空", trigger: "change" }],
        serviceDate: [
          { required: true, message: "不可为空", trigger: "change" }
        ],
        size: [{ required: true, message: "不可为空", trigger: "change" }]
      }
    };
  },

  methods: {
    formatZero,
    handleChange_serverName(n) {
      let r = this.server_name_options.filter(item => item.id == n)[0];
      this.form_addvalue.unitPrice = r?.unitPrice ?? 0;
      this.form_addvalue.rates = r?.feeType ?? undefined;
    },
    handleChange_serverType(n) {
      this.form_addvalue.unitPrice = 0;
      this.form_addvalue.rates = undefined;
      this.form_addvalue.avId = undefined;
      this.server_name_options = [];
      get_av_byType({
        typeId: n
      }).then(res => {
        this.server_name_options = res;
      });
    },
    getList() {
      let params = { ...this.flt };
      params.startTime = (this.flt.server_dateTime ?? [])[0];
      params.endTime = (this.flt.server_dateTime ?? [])[1];
      get_addValue_list(params).then(res => {
        this.flt.pageNum = res.pageNum;
        this.flt.pageSize = res.pageSize;
        this.table_total = res.totalCount;
        this.table_data = res.result ?? [];
      });
      // this.table_loading = true;
      // servesList(this.flt).then((res) => {
      //   this.table_data = res.list;
      //   this.table_total = res.total;
      //   this.table_loading = false;
      // });
    },
    querySearchAsync(queryString, callback) {
      this.form_addvalue.elderId = undefined;
      getElderByName({
        elderName: queryString
      }).then(res => {
        res = (res ?? []).map(item => {
          let r = {
            address: item.id,
            value: item.elderName
          };
          return r;
        });
        callback(res);
      });
    },
    handleSelect(v) {
      this.form_addvalue.elderId = v.address;
    },
    reset_flt() {
      this.flt = {
        elderName: undefined, //姓名
        bedName: undefined, //床位
        avServiceName: undefined, //服务名称
        operator: undefined, //登记人
        server_dateTime: null, //服务时间
        pageNum: 1,
        pageSize: 10
      };
      this.getList();
    },
    handleDialog(data, type) {
      this.reset_form();
      this.dialog_cof.title = type;
      this.dialog_cof.visible = true;
      if (type == "编辑") {
        this.form_addvalue.elderName = data.elderName;
        this.form_addvalue.elderId = data.elderId;

        this.form_addvalue.avType = data.avServiceType;
        this.form_addvalue.serviceDate = data.serviceDate;
        this.form_addvalue.size = data.size;
        this.form_addvalue.unitPrice = data.unitPrice;
        this.form_addvalue.rates = data.feeType;
        this.form_addvalue.rsv = data.rsv;
        this.form_addvalue.id = data.id;
        get_av_byType({
          typeId: this.form_addvalue.avType
        }).then(res => {
          this.server_name_options = res;
          this.form_addvalue.avId = data.avServiceId;
        });
      }
    },

    get_avType_list() {
      all_av_type().then(res => {
        this.server_type_options = res;
      });
    },
    reset_form() {
      this.form_addvalue = {
        elderId: undefined, //老人ID
        elderName: "", //老人姓名
        avType: undefined, //增值服务类型
        avId: undefined, //增值服务名称
        serviceDate: null, //服务发生日期
        size: 0, //数量
        unitPrice: 0, //单价
        rates: undefined, //收费标准
        rsv: "" //备注
      };
    },
    handleDel(data) {
      let self = this;
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          set_or_del_addValue({ id: data.id, operateType: "D" }).then(res => {
            self.getList();
            self.dialog_cof.visible = false;
            self.$notify({
              title: "提示",
              message: "操作成功",
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleSubmit() {
      let self = this;
      if (!this.form_addvalue.elderId) {
        self.$message({
          message: "请选择长者",
          type: "warning"
        });
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let totalFee = self.form_addvalue.size * self.form_addvalue.unitPrice;
          if (this.dialog_cof.title == "编辑") {
            set_or_del_addValue({ ...self.form_addvalue, totalFee }).then(
              res => {
                self.getList();
                self.dialog_cof.visible = false;
                self.$notify({
                  title: "提示",
                  message: "操作成功",
                  type: "success"
                });
              }
            );
          } else {
            addValueInfo({ ...self.form_addvalue, totalFee }).then(res => {
              self.dialog_cof.visible = false;
              self.getList();
              self.$notify({
                title: "提示",
                message: "操作成功",
                type: "success"
              });
            });
          }
        }
      });
    }
  },
  mounted() {
    this.getList();
    this.get_avType_list();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-textarea__inner {
  height: 140px;
}
/deep/ .cell {
  padding: 15px 0;
}
</style>
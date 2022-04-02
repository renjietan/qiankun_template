<!-- 
 * @description:新增-----折扣方式 
 * @fileName: add_discount.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-26 15:47:40
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form
        :inline="true"
        ref="form"
        :rules="rules"
        hide-required-asterisk
        :model="discount_data"
        status-icon
        label-width="120px"
      >
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item class="filter" label="所属项目：">
              <span style="color:#262626">清江山水一期</span>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="6">
            <el-form-item class="required" label="方案名称：" prop="name">
              <el-input v-model="discount_data.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1" v-if="this.$route.query.title=='编辑'">
            <el-form-item class="required" label="状态：" prop="status">
              <el-select disabled  v-model="discount_data.status" placeholder="请选择">
                <el-option
                  v-for="item in discount_status"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="应用范围：">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">整个项目</el-radio>
                <el-radio :label="1">指定楼栋</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="6">
            <el-form-item class="required" label="生效日期：" prop="startDate">
              <el-date-picker
                v-model="discount_data.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item class="required" label="失效日期：" prop="endDate">
              <el-date-picker
                v-model="discount_data.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="filter" label="创建人：">
              <span style="color:#262626">系统管理员</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" :offset="1">
            <el-form-item class="filter" label="创建日期：">
              <el-date-picker v-model="discount_data.startDate" type="date" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">折扣管理表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleCreat('新增')"
            :disabled="$route.query.disabled"
          >新增</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="left" prop="name"></el-table-column>
        <el-table-column label="折扣类型" align="left" prop="method">
          <template slot-scope="scope">{{scope.row.method=="1"?"总价优惠":""}}</template>
        </el-table-column>
        <!-- <el-table-column label="计算方法" align="left" prop="disease"></el-table-column> -->
        <!-- <el-table-column label="应用场景" align="left" prop="fixedFood"></el-table-column> -->
        <el-table-column label="折扣" align="left" prop="money"></el-table-column>
        <!-- <el-table-column label="生效日期" align="left" prop="lunch"></el-table-column> -->
        <!-- <el-table-column label="失效日期" align="left" prop="dinner"></el-table-column> -->
        <!-- <el-table-column label="应用范围" align="left" prop="startTime"></el-table-column> -->
        <el-table-column align="left" label="操作" width="110">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleEdit(scope.row, '编辑')">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDel(scope.row, '删除')">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="discount_data.pageNum"
        :limit.sync="discount_data.pageSize"
      />
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
      <!-- <el-button type="primary" @click="handleSubmit">保存并返回</el-button> -->
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
        ref="formTable"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        label-position="top"
        style="min-height:480px"
      >
        <el-row>
          <el-form-item label="折扣名称 " class="optional" prop="name">
            <el-input
              v-model="form_data.name"
              :disabled="disabled"
              placeholder="请输入"
              style="width:941px"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="折扣类型 " class="optional" prop="method">
              <el-select v-model="form_data.method" placeholder="请输入">
                <el-option
                  v-for="item in type_list"
                  :key="item.type"
                  :label="item.desc"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div style="margin-top:32px;color:#8A8A8A">
              <span>同一类型的折扣一次只能使用一次</span>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计算方法：" class="default">
              <el-radio-group v-model="radio">
                <el-radio disabled :label="0">打折</el-radio>
                <el-radio :label="1">总价优惠</el-radio>
                <el-radio disabled :label="2">单价优惠</el-radio>
                <el-radio disabled :label="3">减点</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-form-item label="优惠金额 " class="optional" prop="money">
            <el-input v-model="form_data.money" placeholder="请输入" style="width:941px"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item class="default" label="生效日期" prop="expectDate">
              <el-date-picker
                v-model="form_data.expectDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="default" label="失效日期" prop="expectDate">
              <el-date-picker
                v-model="form_data.expectDate1"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>-->
        <!-- <el-row>
          <el-col :span="5">
            <el-form-item label="允许调整：" class="default">
              <el-radio-group v-model="radio">
                <el-radio :label="0">允许</el-radio>
                <el-radio :label="1">不允许</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div style="margin-top:34px;color:#8A8A8A;margin-left:-15px">
              <span>折扣使用时，是否可以调整折扣或金额</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="应用场景：" class="default">
              <el-radio-group v-model="radio">
                <el-radio :label="0">日常折扣</el-radio>
                <el-radio :label="1">审批折扣</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div style="margin-top:34px;color:#8A8A8A;margin-left:-15px">
              <span>审批折扣只适用于价格变更申请</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="应用范围：" class="default">
              <el-radio-group v-model="radio">
                <el-radio :label="0">不限制</el-radio>
                <el-radio :label="1">制定楼栋</el-radio>
                <el-radio :label="2">制定房间</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div style="margin-top:34px;color:#8A8A8A">
              <span>不限制，折扣项范围和折扣方案的范围一致</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="指定楼栋 " class="optional">
            <el-select v-model="form_data.cimboName" placeholder="请输入">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitTable">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { formatZero } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import { get_price_status } from "@/api/CCRC/price";
import {
  add_discounts,
  modify_discounts,
  get_discounts_detail,
  add_discountPar,
  modify_discountPar,
  del_discountPar,
  get_discount_type
} from "@/api/CCRC/discounts";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      disabled: false,
      type_list: [],
      table_total: 0,
      table_data: [],
      discount_status: [],
      table_loading: false,
      model: "中国工商银行",
      model1: "万位",
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
      radio: 1,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      form_data: {
        id: null,
        name: "", //方案名称
        method: "", //折扣类型
        money: null, //优惠费用
      },
      discount_data: {
        id: null,
        name: "", //方案名称
        startDate: "", //生效时间
        endDate: "" ,//生效时间
        status: null //折扣方案状态

      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "change" }],
        status: [{ required: true, message: "不可为空", trigger: "change" }],
        startDate: [{ required: true, message: "不可为空", trigger: "change" }],
        endDate: [{ required: true, message: "不可为空", trigger: "change" }],
        method: [{ required: true, message: "不可为空", trigger: "change" }],
        money: [{ required: true, message: "不可为空", trigger: "change" }]
      }
    };
  },
  methods: {
    formatZero,
    getDetail() {
      let self = this;
      let id = self.$route.query.id;
      if(!!id){
          get_discounts_detail(id).then(res => {
        self.discount_data.id = res.data.id;
        self.discount_data.name = res.data.name;
        self.discount_data.startDate = res.data.startDate;
        self.discount_data.endDate = res.data.endDate;
        self.discount_data.status = res.data.status;
        self.table_data = res.data.discountDetailVoList;
      });
      }
     
    },
    getDiscountType() {
      get_discount_type().then(res => {
        this.type_list = res.data;
      });
    },
    getPriceStatus() {
      get_price_status().then(res => {
        this.discount_status = res.data;
      });
    },
    handleEdit(data, type) {
      let self = this;
      self.dialog_cof.visible = true;
      self.clearFormData();
      self.disabled = true;
      self.form_data.id = data.id;
      self.dialog_cof.title = "编辑折扣明细";
      self.form_data.name = data.name;
      self.form_data.method = data.method;
      self.form_data.money = data.money;
    },

    handleCreat() {
      let self = this;
      self.disabled = false;
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "新增折扣明细";
      self.clearFormData();
    },
    handleSubmit() {
      let self = this;
      let params = {
        id: self.discount_data.id,
        name: self.discount_data.name,
        startDate: self.discount_data.startDate,
        endDate: self.discount_data.endDate,
        particulars: self.table_data,
        status: self.discount_data.status
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          if (self.discount_data.id == null) {
            add_discounts(params).then(res => {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
              self.$router.go(-1);
            });
          } else {
            let id = self.discount_data.id;
            modify_discounts(id, params).then(res => {
              self.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功"
              });
            });
            self.$router.go(-1);
          }
        }
      });
    },
    handleSubmitTable() {
      let self = this;
      let params = {
          discountId: self.$route.query.id,
        name: self.form_data.name,
        method: self.form_data.method,
        money: parseInt(self.form_data.money)
      };
      self.$refs["formTable"].validate(vaild => {
        if (vaild) {
          if (self.dialog_cof.title == "新增折扣明细") {
            // let data = {
            //   id: self.$route.query.id
            // };
            add_discountPar({ ...params }).then(res => {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
              self.getDetail();
            });
            self.dialog_cof.visible = false;
          } else {
            let name = self.form_data.name;
            params.id = self.form_data.id;
            modify_discountPar(name, params).then(res => {
              self.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功"
              });
              self.getDetail();
            });
            self.dialog_cof.visible = false;
          }
        }
      });
    },
    handleDel(data) {
      let self = this;
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let name = data.name;
          let query = {
            name: data.name,
            discountId: self.$route.query.id
          };
          del_discountPar(name, query).then(res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getDetail();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    clearFormData() {
      this.form_data = {
        id: null,
        name: "", //方案名称
        type: "", //折扣类型
        money: null //优惠费用
      };
    }
  },
  mounted() {

    this.getDetail();
    this.getDiscountType();
    this.getPriceStatus();
  }
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
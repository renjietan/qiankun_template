<!-- 
 * @description:签约管理 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-12 11:09:41
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="8">
                <el-form-item class="filter" label="项目：">
                  <el-input clearable v-model="flt.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="filter" label="房间号：">
                  <el-input clearable v-model="flt.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <!-- <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">意向客户管理表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleAction('新增')">新增意向客户</el-button>
        </el-col>
      </el-row>-->
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <!-- <el-table-column width="80" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
          </template>
        </el-table-column>-->
        <el-table-column label="房间" align="left" prop="disease"></el-table-column>
        <el-table-column label="建筑面积" align="left" prop="fixedFood"></el-table-column>
        <el-table-column label="套内面积" align="left" prop="breakfast"></el-table-column>
        <el-table-column label="建筑单价" align="left" prop="breakfast"></el-table-column>
        <el-table-column label="折扣" align="left" prop="breakfast"></el-table-column>
        <el-table-column label="签约状态" align="left" prop="breakfast"></el-table-column>
        <el-table-column align="left" label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" @click="handleReserve(scope.row, '预留')">预留</el-link>
            <el-link type="warning" :underline="false" @click="handleDialog(scope.row, '预定')">预定</el-link>
            <el-link type="primary" :underline="false" @click="handleDialog(scope.row, '签约')">签约</el-link>
            <el-link type="danger" :underline="false" @click="handleRescind(scope.row, '解约')">解约</el-link>
            <!-- <el-link type="danger" :underline="false" @click="handleDialog(scope.row, '删除')">删除</el-link> -->
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
        <div v-if="this.dialog_cof.title=='预定'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户姓名" class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型 " class="optional">
                <el-radio-group v-model="form_data.cimboName" style="width:300px;color:#222">
                  <el-radio :label="0">个人</el-radio>
                  <el-radio :label="1">公司</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型" class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="证件号码 " class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机 " class="default">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备选电话" class="default">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="所占份额 " class="default">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="通讯地址" class="optional">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="户籍地址" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
        </div>
        <div v-if="this.dialog_cof.title=='签约'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="签约日期 " class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号   " class="default">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网签日期" class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="业绩归属日期 " class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="置业顾问 " class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人" class="optional">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="推荐人 " class="default">
                <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="附加条款" class="default">
              <el-input v-model="form_data.cimboName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
        </div>
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
import elDragDialog from "@/directive/el-drag-dialog";
import { formatZero } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "sign_contract_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_total: 0,
      table_data: [
        {
          bedName: "12"
        }
      ],
      table_loading: false,
      flt: {},
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
      rules: {}
    };
  },
  methods: {
    formatZero,
    handleSubmit() {},
    handleDialog(data, type) {
      let self = this;
      switch (type) {
        case "预定":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "预定";
          break;
        case "签约":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "签约";
          break;
      }
    },
    handleReserve(data) {
      let self = this;
      this.$confirm(`预留, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = data.id;
          del_discounts(id).then(res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getDiscountsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
    handleRescind(data) {
      let self = this;
      this.$confirm(`解约, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = data.id;
          del_discounts(id).then(res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getDiscountsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    }
    // handleAction(type) {
    //   let self = this;
    //   self.dialog_cof.title = "新增意向客户";
    //   self.dialog_cof.visible = true;
    // }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/.el-form--label-top .el-form-item__label {
  color: #222;
  padding-bottom: 0;
}
/deep/.el-dialog__title {
  font-weight: 600;
}
</style>
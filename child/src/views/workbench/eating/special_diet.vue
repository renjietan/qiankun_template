 <!-- 
 * @description: 特殊膳食管理
 * @fileName: special_diet.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:03:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item class="filter" label="长者姓名:">
              <el-input placeholder="请输入" v-model="flt.elderName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter" label="床位:">
              <el-input placeholder="请输入" v-model="flt.bedName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right;">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="reset_flt">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px;margin-top: -30px;">
        <el-col :span="6">
          <div class="title">膳食列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('', '添加')">添加</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="120" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="120" align="center" prop="elderName"></el-table-column>
        <el-table-column label="床位" width="120" align="center" prop="bedName"></el-table-column>
        <el-table-column label="疾病" width="120" align="center" prop="disease"></el-table-column>
        <el-table-column label="固定特殊膳食" width="150" align="center" prop="fixedFood"></el-table-column>
        <el-table-column label="特殊早餐主食" width="150" align="center" prop="breakfast"></el-table-column>
        <el-table-column label="特殊中餐主食" width="150" align="center" prop="lunch"></el-table-column>
        <el-table-column label="特殊晚餐主食" width="150" align="center" prop="dinner"></el-table-column>
        <el-table-column label="开始时间" width="200" align="center" prop="startTime"></el-table-column>
        <el-table-column label="结束时间" width="200" align="center" prop="endTime"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="handleDialog(scope.row, '编辑')">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDialog(scope.row, '删除')">删除</el-link>
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
      @close="close"
    >
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者姓名" prop="elderName">
              <el-autocomplete
                v-model="form_data.elderName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="疾病" prop="disease">
              <el-input clearable v-model="form_data.disease" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="开始时间" prop="startTime">
              <el-date-picker
                v-model="form_data.startTime"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="结束时间" prop="endTime">
              <el-date-picker
                v-model="form_data.endTime"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="固定特殊膳食 " prop="fixedFood">
              <el-input clearable v-model="form_data.fixedFood"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊早餐主食" prop="breakfast">
              <el-input clearable v-model="form_data.breakfast"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊午餐主食" prop="lunch">
              <el-input clearable v-model="form_data.lunch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊晚餐主食" prop="dinner">
              <el-input clearable v-model="form_data.dinner"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 认</el-button>
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
import {
  getSpecialList,
  addSpecailINfo,
  updateSpecailInfo,
  getElderByName
} from "@/api/pensionagency/inLive/specail";

import {} from "@/utils/validate";

export default {
  name: "eating_special_diet",
  components: { Pagination },

  directives: { waves, permission, elDragDialog },
  data() {
    return {
      createDate: new Date().getTime(),
      // 开始时间限制
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.form_data.startTime) {
            // eslint-disable-next-line max-len
            return (
              time.getTime() > new Date(this.form_data.startTime).getTime() ||
              time.getTime() <= new Date(this.createDate).getTime() - 86400000
            );
          }
          return (
            time.getTime() <= new Date(this.createDate).getTime() - 86400000
          );
        }
      },
      // 结束时间限制
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.form_data.startTime) {
            return (
              time.getTime() < new Date(this.form_data.startTime).getTime()
            );
          }
          return (
            time.getTime() <= new Date(this.createDate).getTime() - 86400000
          );
        }
      },
      flt: {
        elderName: "",
        bedName: "",
        pageNum: 1,
        pageSize: 10
      },
      form_data: {
        elderId: undefined, //长者ID
        elderName: "", //长者姓名
        disease: undefined, //疾病
        startTime: null, //开始时间
        endTime: null, //结束时间
        fixedFood: "", //固定膳食
        breakfast: "", //特殊早餐饮食
        lunch: "", //中餐饮食
        dinner: "" //晚餐饮食
      },
      table_data: [],
      table_loading: false,
      table_total: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    formatZero,
    getList() {
      this.table_loading = true;
      getSpecialList(this.flt).then(res => {
        this.table_data = res.result;
        this.table_total = res.totalCount;
        this.table_loading = false;
      });
    },
    querySearchAsync(queryString, callback) {
      this.form_data.elderId = undefined;
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
      this.form_data.elderId = v.address;
    },
    handleDialog(data, type) {
      this.dialog_cof.title = type;
      this.resetFrom();
      switch (type) {
        case "编辑":
          this.dialog_cof.visible = true;
          this.form_data = data;
          break;
        case "添加":
          this.dialog_cof.visible = true;
          break;
        case "删除":
          const { id } = data;
          this.$confirm("确定要删除么?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(res => {
            updateSpecailInfo({ id, operateType: "D" }).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            });
          });

          break;
      }
    },
    // 提交按钮
    handleSubmit() {
      const { title } = this.dialog_cof;
      if (!this.form_data.elderId) {
        this.$message({
          message: "请选择长者",
          type: "warning"
        });
        return;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (title === "添加") {
            addSpecailINfo(this.form_data).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.getList();
              this.dialog_cof.visible = false;
            });
          } else {
            updateSpecailInfo(this.form_data).then(res => {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.getList();
              this.dialog_cof.visible = false;
            });
          }
        }
      });
    },
    close() {
      this.resetFrom();
    },
    resetFrom() {
      this.form_data = {
        elderId: undefined, //长者ID
        elderName: "", //长者姓名
        disease: undefined, //疾病
        startTime: null, //开始时间
        endTime: null, //结束时间
        fixedFood: "", //固定膳食
        breakfast: "", //特殊早餐饮食
        lunch: "", //中餐饮食
        dinner: "" //晚餐饮食
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },

    reset_flt() {
      this.flt = {
        elderName: "",
        bedName: "",
        pageNum: 1,
        pageSize: 10
      };
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
.query {
  /deep/ .el-form-item__label {
    opacity: 0;
  }
}
</style>
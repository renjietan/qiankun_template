<!-- 
 * @description: 特殊膳食一览
 * @fileName: food_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 16:22:16
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="handleDialog('', '添加')">添加特殊膳食</el-button>
    </div>
    <el-table class="table_data" border ref="table_data" :data="table_data" v-loading="table_loading" stripe
      highlight-current-row fit>
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span :style="{ color: $variables.baseColor }">{{
            formatZero(scope.$index + 1, 2)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <el-avatar :size="45" :src="scope.row.headUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="bedName" label="床位"></el-table-column>

      <el-table-column align="center" prop="disease" label="疾病"></el-table-column>
      <el-table-column align="center" prop="fixedFood" label="固定特殊膳食"></el-table-column>
      <el-table-column align="center" prop="breakfast" label="特殊早餐主食"></el-table-column>
      <el-table-column align="center" prop="lunch" label="特殊中餐主食"></el-table-column>
      <el-table-column align="center" prop="dinner" label="特殊晚餐主食"></el-table-column>
      <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
      <el-table-column align="center" width="200" fixed="right" label="操作" class="lastColumn">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" @click="handleDialog(scope.row, '编辑')">编辑</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link :underline="false" type="danger" @click="handleDialog(scope.row, '删除')">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
      @pagination="getList" />
    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal" @close="close">
      <el-form :inline="true" ref="form" :model="form_data" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者姓名" prop="elderName">
              <el-autocomplete v-model="form_data.elderName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                @select="handleSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="疾病" prop="disease">
              <el-select v-model="form_data.disease" clearable placeholder="请选择">
                <el-option v-for="item in disease_list" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="开始时间" prop="startTime">
              <el-date-picker v-model="form_data.startTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="结束时间" prop="endTime">
              <el-date-picker v-model="form_data.endTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="固定特殊膳食" prop="fixedFood">
              <el-input clearable v-model="form_data.fixedFood"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊早餐饮食" prop="breakfast">
              <el-input clearable v-model="form_data.breakfast"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊午餐饮食" prop="lunch">
              <el-input clearable v-model="form_data.lunch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊晚餐饮食" prop="dinner">
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
  import { disease_list } from '@/utils/enum';
  import { } from "@/utils/validate";
  import { formatZero } from "@/filters";
  import {
    getSpecialList,
    addSpecailINfo,
    updateSpecailInfo,
    getElderByName
  } from "@/api/pensionagency/inLive/specail";
  export default {
    name: "inLive_special_foods_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        flt: {
          pageNum: 1,
          pageSize: 10
        },
        table_loading: false,
        table_total: 0,
        table_data: [],
        disease_list,
        form_data: {
          elderId: undefined, //长者ID
          elderName: "", //长者姓名
          disease: undefined, //疾病
          startTime: null, //开始时间
          endTime: null, //结束时间
          fixedFood: "", //固定膳食
          breakfast: "", //特殊早餐饮食
          lunch: "", //中餐饮食
          dinner: "", //晚餐饮食
        },
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
      };
    },
    methods: {
      formatZero,
      querySearchAsync(queryString, callback) {
        this.form_data.elderId = undefined
        getElderByName({
          elderName: queryString
        }).then(res => {
          res = (res ?? []).map(item => {
            let r = {
              address: item.id,
              value: item.elderName
            }
            return r
          })

          callback(res)
        })
      },
      handleSelect(v) {
        this.form_data.elderId = v.address
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
              type: "warning",
            }).then((res) => {
              updateSpecailInfo({ id, operateType: "D" }).then((res) => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getList();
              });
            });

            break;
        }
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
          dinner: "", //晚餐饮食
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      },
      // 提交按钮
      handleSubmit() {
        const { title } = this.dialog_cof;
        if (!this.form_data.elderId) {
          this.$message({
            message: "请选择长者",
            type: "warning",
          });
          return
        }
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (title === "添加") {
              addSpecailINfo(this.form_data).then((res) => {
                this.$message({
                  message: "提交成功",
                  type: "success",
                });
                this.getList();
                this.dialog_cof.visible = false;
              });
            } else {
              updateSpecailInfo(this.form_data).then((res) => {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.getList();
                this.dialog_cof.visible = false;
              });
            }
          }
        });
      },

      getList() {
        this.table_loading = true;
        getSpecialList(this.flt).then((res) => {
          this.table_data = res.result;
          this.table_total = res.totalCount
          this.table_loading = false;
        });
      },

      reset_flt() {
        this.flt = {
          pageNum: 1,
          pageSize: 10
        };
        this.getList();
      },
    },
    mounted() {
      this.getList();
    },
  };
</script>
<style lang='scss' scoped>
</style>
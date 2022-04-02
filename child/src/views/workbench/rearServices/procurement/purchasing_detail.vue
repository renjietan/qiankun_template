<!-- 
 * @description: 
 * @fileName: purchasing_detail.vue 
 * @author: 王文涛 
 * @date: 2022-02-21 15:45:59
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>采购申请</span>
      </div>
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="仓库名称：" class="default">
                  <el-input
                    readonly
                    clearable
                    v-model="form_data.warehouse"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请日期" class="must-fill">
                  <el-date-picker
                    v-model="form_data.date"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="采购仓库" class="optional">
                  <el-select
                    v-model="form_data.warehouse"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in warehouse_options"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <div style="display: inline-block; margin-left: 10px">
                <el-button
                  type="success"
                  icon="el-icon-upload2"
                  @click="handleAction('', '导出')"
                  >导出</el-button
                >
                <el-button
                  type="primary"
                  icon="el-icon-printer"
                  @click="handleNav('', '采购申请')"
                  >打印采购单</el-button
                >
              </div>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <div class="title" style="margin-bottom: 20px">
            <span style="font-weight: normal"
              >采购申请<span style="color: red">*</span></span
            >
          </div>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-table
                class="table_data"
                border
                ref="table_data"
                :data="form_data.table_data1"
                v-loading="table_loading"
                stripe
                highlight-current-row
                fit
              >
                <el-table-column align="center" label="序号">
                  <template slot-scope="scope">
                    <span :style="{ color: $variables.baseColor }">
                      {{ formatZero(scope.$index + 1, 2) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="物品类别">
                </el-table-column>
                <el-table-column align="center" label="物品名称">
                </el-table-column>
                <el-table-column align="center" prop="bedName" label="规格型号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="单位"
                ></el-table-column>
                <el-table-column align="center" label="采购单价">
                </el-table-column>
                <el-table-column align="center" label="采购数量">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="小计"
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <el-table
                class="table_data"
                border
                ref="table_data"
                :data="form_data.table_data2"
                v-loading="table_loading"
                stripe
                highlight-current-row
                fit
              >
                <el-table-column align="center" label="供应商">
                </el-table-column>
                <el-table-column align="center" label="联系人">
                </el-table-column>

                <el-table-column align="center" prop="bedName" label="联系电话">
                </el-table-column>
                <el-table-column align="center" prop="bedName" label="地址">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>

        <el-row style="margin-top: 20px" :gutter="20">
          <el-col :span="6">
            <el-form-item label="总金额:" class="default">
              <el-input
                readonly
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购物品:" class="default">
              <el-input
                readonly
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购数量:" class="default">
              <el-input
                readonly
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col>
              <el-form-item class="default" label="说明">
                <el-input
                  type="textarea"
                  v-model="form_data.rsv"
                  :rows="4"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </div>
    
    <div class="footer" v-if="this.flag === '取消申请'">
      <el-button type="primary" @click="handleSubmit('取消申请')"
        >取消申请</el-button
      >
    </div>
    <div class="footer" v-if="this.flag === '取消采购'">
      <el-button type="primary" @click="handleSubmit('一键入库')"
        >一键入库</el-button
      >
      <el-button type="danger" @click="handleSubmit('取消采购')"
        >取消采购</el-button
      >
    </div>
    <div class="footer" v-if="this.flag === '重新申请'" >
      <el-button type="primary" @click="handleSubmit('重新申请')"
        >重新申请</el-button
      >
      <el-button type="danger" @click="handleSubmit('删除记录')"
        >删除记录</el-button
      >
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
import { formatZero } from "@/filters";

export default {
  name: "rearServices_purchasing_verify",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flag: "取消申请",
      form_data: {
        warehouse: undefined, //仓库名称
        date: undefined, //申请日期
        table_data1: [
          {
            type: 1,
            warehouse: undefined,
          },
        ], // 采购申请
        table_data2: [
          {
            type: 1,
            warehouse: undefined,
          },
        ],
      },
      goods_options: [], // 物品类别
      warehouse_options: [],
    };
  },
  methods: {
    formatZero,
    handleSubmit(type) {
      switch (type) {
        case "取消申请":
          this.flag = "重新申请";
          break;
        case "重新申请":
          this.flag = "取消申请";
          break;
      }
    },
  },
  mounted() {
    const { flag } = this.$route.query;
    this.flag = flag;
  },
};
</script>
<style lang='scss' scoped>
</style>
<!-- 
 * @description: 
 * @fileName: outBounddetail.vue 
 * @author: 王文涛 
 * @date: 2022-02-22 15:53:26
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>出库</span>
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
                <el-form-item label="出库单号" class="default">
                  <el-input
                    disabled
                    clearable
                    v-model="form_data.warehouse"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出库日期" class="must-fill">
                  <el-date-picker
                  :disabled="flag === '详情' ? true : false"
                    v-model="form_data.date"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
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
          <el-col :span="5">
            <el-form-item label="出库仓库" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                style="width: 96%"
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title" style="margin-bottom: 20px">
            <span style="font-weight: normal; color: red"
              >采购申请<span>*</span></span
            >
          </div>
          <el-row :gutter="10">
            <el-col :span="14">
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

                <el-table-column align="center" label="物品名称">
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="bedName"
                  label="单位"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="均价"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="出库数量"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="小计"
                ></el-table-column>
                <el-table-column align="center" width="240" label="操作">
                  <template slot-scope="scope">
                    <el-link
                      type="danger"
                      @click="handleNav(scope.row, 'delete')"
                      :underline="false"
                      >删除</el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>
        <el-row :gutter="4" style="margin-top: 20px"  v-if="flag === ''">
          <el-col :span="2">
            <div style="display: inline-block; margin-left: 10px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="handleNav('', '添加采购商品')"
                >添加出库物品</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px" :gutter="20">
          <el-col :span="5">
            <el-form-item label="申领人:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="总金额:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="出库物品:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="出库数量:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
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
                :disabled="flag === '详情' ? true : false"
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
    <div class="footer"  v-if="flag === ''">
      <el-button type="primary" @click="handleSubmit('提交申请')"
        >提交申请</el-button
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
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flag:'',
      form_data: {},
      table_total:1,
    };
  },
  methods: {},
  mounted() {
    const { flag } = this.$route.query ?? "";
    this.flag = flag;
  },
};
</script>
<style lang='scss' scoped>
</style>
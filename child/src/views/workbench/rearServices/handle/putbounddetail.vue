<!-- 
 * @description: 采购审批 
 * @fileName: purchasing_verify.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:23:51
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">

        <span v-if="flag === '一键入库'">一键入库</span><span v-else>入库</span>
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
                <el-form-item label="入库单号" class="default">
                  <el-input
                    disabled
                    clearable
                    v-model="form_data.warehouse"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="入库日期" class="must-fill">
                  <el-date-picker
                    :disabled="flag === '详情' ? true : false"
                    v-model="form_data.date"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
               <el-col :span="6" >
                <el-form-item label="关联采购单号" class="optional" v-if="flag === '一键入库'">
                  <el-input
                    clearable
                    v-model="form_data.warehouse"
                    placeholder="请输入"
                  ></el-input>
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
            <el-form-item label="入库仓库" class="default">
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
            <span style="font-weight: normal"
              >入库明细<span style="color: red">*</span></span
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
                  <template slot-scope="scope">
                    <el-select
                      :disabled="flag === '详情' ? true : false"
                      v-model="scope.row.type"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in goods_options"
                        :key="item.type"
                        :label="item.desc"
                        :value="item.type"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="物品名称">
                  <template slot-scope="scope">
                    <el-select
                      :disabled="flag === '详情' ? true : false"
                      v-model="scope.row.name"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in goods_options"
                        :key="item.type"
                        :label="item.desc"
                        :value="item.type"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="bedName" label="规格型号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="单位"
                ></el-table-column>
                <el-table-column align="center" label="采购单价">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="flag === '详情' ? true : false"
                      clearable
                      v-model="scope.row.warehouse"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="采购数量">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="flag === '详情' ? true : false"
                      clearable
                      v-model="scope.row.warehouse"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bedName"
                  label="小计"
                ></el-table-column>
                <el-table-column
                  align="center"
                  width="240"
                  label="操作"
                  v-if="flag === ''"
                >
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
                <el-table-column align="center" label="联系人">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="flag === '详情' ? true : false"
                      clearable
                      v-model="scope.row.warehouse"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="bedName" label="联系电话">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="flag === '详情' ? true : false"
                      clearable
                      v-model="scope.row.warehouse"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="bedName" label="地址">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="flag === '详情' ? true : false"
                      clearable
                      v-model="scope.row.warehouse"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>
        <el-row :gutter="4" style="margin-top: 20px" v-if="flag === '' || flag === '一键入库'">
          <el-col :span="2">
            <div style="display: inline-block; margin-left: 10px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="handleNav('', '添加采购商品')"
                >添加入库物品</el-button
              >
            </div>
          </el-col>
          <el-col :span="4">
            <span style="color: #ff8b43; display: block; margin: 6px 20px"
              >仓库中没有要采购的物品？<el-link type="primary"
                >点击添加</el-link
              ></span
            >
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px" :gutter="20">
          <el-col :span="6">
            <el-form-item label="总金额:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购物品:" class="default">
              <el-input
                :disabled="flag === '详情' ? true : false"
                clearable
                v-model="form_data.warehouse"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购数量:" class="default">
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
    <div class="footer" v-if="flag === ''">
      <el-button type="default" @click="handleSubmit">暂存申请</el-button>
      <el-button type="primary" @click="handleSubmit">提交申请</el-button>
    </div>
     <div class="footer" v-if="flag === '一键入库'">
      <el-button type="primary" @click="handleSubmit">提交申请</el-button>
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
      flag: "",
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
  },
  mounted() {
    const { flag } = this.$route.query ?? "";
    this.flag = flag;
  },
};
</script>
<style lang='scss' scoped>
</style>
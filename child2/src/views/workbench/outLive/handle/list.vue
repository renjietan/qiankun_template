<!-- 
 * @description: 退住办理一览
 * @fileName: outLive_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-06-16 21:44:20
 * @后台人员:  
!-->
<template>
<!-- <div class="container">
    <div class="no-data">
      <img :src="no_data" alt />
    </div>
  </div> -->
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="4">
            <el-form-item class="filter" label="姓名：">
              <el-input placeholder="请输入" v-model="flt.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="filter" label="办理状态：">
              <el-select v-model="flt.status" placeholder="请选择">
                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item class="filter" label="申请日期：">
              <el-date-picker v-model="flt.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title">退住列表</div>
      <el-table class="table_data" ref="data_table" :data="table_data" v-loading="table_loading" stripe
        highlight-current-row fit>
        <el-table-column width="50" align="center" label="序号">
          <template slot-scope="scope">
            <span>{{ formatZero(scope.$index + 1, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="70" align="center" prop="avator" label="头像"></el-table-column>
        <el-table-column width="50" align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column width="50" align="center" prop="bed" label="床位"></el-table-column>
        <el-table-column width="50" align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column width="50" align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column  align="center" width="120" prop="date" label="入住日期"></el-table-column>
        <el-table-column  align="center" width="120" prop="date2" label="退住申请日期"></el-table-column>
        <el-table-column width="80" align="center" prop="status1" label="退住申请">
          <template slot-scope="scope">
            <span v-if="scope.row.status1 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status1 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '申请')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="退住审核">
          <template slot-scope="scope">
            <span v-if="scope.row.status2 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status2 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '审核')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="退住办理">
          <template slot-scope="scope">
            <span v-if="scope.row.status3 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status3 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '办理')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="退住确认">
          <template slot-scope="scope">
            <span v-if="scope.row.status4 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status4 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '确认')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="退住结算">
          <template slot-scope="scope">
            <span v-if="scope.row.status5 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status5 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '结算')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="退住支付">
          <template slot-scope="scope">
            <span v-if="scope.row.status6 === 0" class="el-icon-circle-check"
              style="font-size: 20px; color: #40c397"></span>
            <el-button v-else-if="scope.row.status6 === 1" type="warning" plain size="small"
              @click="handleNav(scope.row, '支付')">办理</el-button>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" prop="date3" label="退住日期"></el-table-column>
        <el-table-column  align="center" prop="reson" label="退住原因"></el-table-column>
        <el-table-column align="center" width="400" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="handleNav(scope.row,'详情')">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="danger">取消办理</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="primary" @click="handleNav(scope.row,'个人档案')">个人档案</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="primary" @click="handleNav(scope.row,'退住总结单')">退住总结单</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="info">再入住</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber" :limit.sync="flt.pageSize"
        @pagination="getList" />
    </div>
    <el-dialog v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal" class="el-dialog-2">
      <el-form :inline="true" v-if="dialog_cof.title == '退住审核'" ref="form" :model="form_apply" :rules="rules"
        hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="name">
              <el-input clearable v-model="form_apply.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="床位" prop="bed">
              <el-input clearable v-model="form_apply.bed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="申请日期 " prop="date">
              <el-date-picker v-model="form_apply.date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="预定退住日期 " prop="out_date">
              <el-date-picker v-model="form_apply.out_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="退住原因" prop="reson">
              <el-input clearable v-model="form_apply.reson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="readonly" label="说明" prop="remark">
              <el-input type="textarea" clearable v-model="form_apply.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="readonly" label="审核意见" prop="suggess">
              <el-input type="textarea" clearable v-model="form_apply.suggess"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="dialog_cof.title == '退住审核'" slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">驳回申请</el-button>
        <el-button type="primary" @click="handleSubmit('审核')">审核通过</el-button>
      </div>
      <el-form v-if="dialog_cof.title == '退住办理'" :inline="true" ref="form" :model="form_process" :rules="rules"
        hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="name">
              <el-input clearable v-model="form_process.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="床位" prop="bed">
              <el-input clearable v-model="form_process.bed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="申请日期 " prop="date">
              <el-date-picker v-model="form_process.date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="预定退住日期 " prop="out_date">
              <el-date-picker v-model="form_process.out_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="readonly" label="退住原因" prop="reson">
              <el-input clearable v-model="form_process.reson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="审核结果" prop="name">
              <el-input clearable v-model="form_process.result"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="退住日期 " prop="out_date">
              <el-date-picker v-model="form_process.out_date1" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="dialog_cof.title == '退住办理'" slot="footer" class="dialog-footer">

        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('办理')">确认办理</el-button>
      </div>
      <el-form v-if="dialog_cof.title == '退住确认'" :inline="true" ref="form" :model="form_sure" hide-required-asterisk
        status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者姓名 " prop="name">
              <el-input clearable v-model="form_sure.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="床位" prop="bed">
              <el-input clearable v-model="form_sure.bed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="申请日期 " prop="date">
              <el-date-picker v-model="form_sure.date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="预定退住日期 " prop="out_date">
              <el-date-picker v-model="form_sure.out_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="readonly" label="退住原因" prop="reson">
              <el-input clearable v-model="form_sure.reson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="审核日期" prop="aduit_date">
              <el-date-picker v-model="form_sure.aduit_date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="审核结果" prop="name">
              <el-input clearable v-model="form_sure.result"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="退住日期 " prop="out_date">
              <el-date-picker v-model="form_sure.out_date1" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="确认人" prop="sure_by">
              <el-input clearable v-model="form_sure.sure_by"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="dialog_cof.title == '退住确认'" slot="footer" class="dialog-footer">

        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('退住')">退住确认</el-button>
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
  import elHeightAdaptiveTable from "@/directive/el-table";
  import { formatZero } from "@/filters";
  import { } from "@/utils/validate";
  export default {
    name: "outLive_handle_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
    data() {
      return {
        flt: {
          name: "",
          status: undefined,
          date: null,
          pageNumber: 1,
          pageSize: 10,
        },
        table_data: [],
        options:[],
        table_loading: false,
        table_total: 40,
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
        form_apply: {
          id: undefined,
          name: "",
          bed: "",
          date: null,
          out_date: null,
          reson: null,
          remark: null,
          suggess: "",
        },
        form_process: {
          id: undefined,
          name: "",
          bed: "",
          date: null,
          out_date: null,
          reson: null,
          result: "",
          out_date1: "",
        },
        form_sure: {
          id: undefined,
          name: "",
          bed: "",
          date: null,
          out_date: null,
          reson: null,
          result: "",
          out_date1: "",
          audit_date: '',
          sure_by: '',
        },
      };
    },
    methods: {
      formatZero,
      getList() { },
      handleNav(data, type) {
        switch (type) {
          case "个人档案":
            this.$router.push(`/workbench/workbench/inLive/handle/form/case_file/1`);
            break;
          case "申请":
            break;
          case "审核":
            this.dialog_cof.visible = true;
            this.dialog_cof.title = "退住审核";
            break;
          case "办理":
            this.dialog_cof.visible = true;
            this.dialog_cof.title = "退住办理";
            break;
          case "确认":
            this.dialog_cof.visible = true;
            this.dialog_cof.title = "退住确认";
            break;
          case "结算":
            this.$router.push(`/workbench/workbench/outLive/handle/final`);
            break;
          case "详情":
            this.$router.push(`/workbench/workbench/outLive/handle/final`);
            break;
          case "退住总结单":
            this.$router.push({ path: "/workbench/workbench/inLive/handle/form/case_file/1", query: { navid: 13 } })
            break;
        }
      },
      handleSubmit(type) {
        this.$message({
          message: `${type}成功`,
          type: "success",
        });
        this.dialog_cof.visible = false;
      },
    },
    mounted() {
      this.table_data = [
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 2,
          status3: 2,
          status4: 2,
          status5: 2,
          status6: 2,
          date3: "2020-02-02",
          reson: "12312",
        },
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 1,
          status3: 2,
          status4: 2,
          status5: 2,
          status6: 2,
          date3: "2020-02-02",
          reson: "12312",
        },
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 0,
          status3: 1,
          status4: 2,
          status5: 2,
          status6: 2,
          date3: "2020-02-02",
          reson: "12312",
        },
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 0,
          status3: 0,
          status4: 1,
          status5: 2,
          status6: 2,
          date3: "2020-02-02",
          reson: "12312",
        },
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 0,
          status3: 0,
          status4: 0,
          status5: 1,
          status6: 2,
          date3: "2020-02-02",
          reson: "12312",
        },
        {
          avator: "1.png",
          name: "李思",
          bed: 2,
          sex: "男",
          age: "20",
          date: "2020-02-02",
          date2: "2020-02-02",
          status1: 0,
          status2: 0,
          status3: 0,
          status4: 0,
          status5: 0,
          status6: 0,
          date3: "2020-02-02",
          reson: "12312",
        },
      ];
    },
  };
</script>
<style lang='scss' scoped>

</style>
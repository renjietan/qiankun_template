<!-- 
 * @description: 班次管理。
 * @fileName: shift_manage.vue 
 * @author: 王文涛 
 * @date: 2021-09-07 09:22:26
 * @后台人员:  
!-->

<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>班次管理</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '添加')"
          >
            添加</el-button
          >
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
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">{{
              formatZero(scope.$index + 1, 2)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="班次名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="颜色"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="每日数量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="每组每日数量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="说明"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="管理时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="管理人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="接班人"
        ></el-table-column>
        <el-table-column
          align="center"
          width="160"
          label="操作"
          class="lastColumn"
        >
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '详情')"
              >详情</el-link
            >
            <el-link
              type="danger"
              @click="handleNav(scope.row, 'delete')"
              :underline="false"
              >删除</el-link
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
        :rules="rules_log"
        hide-required-asterisk
        status-icon
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="班次名称" prop="name">
              <el-input clearable v-model="form_data.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="班次颜色" prop="color">
             <el-input type="color" clearable v-model="form_data.color"></el-input>
              
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="每日数量" prop="num">
              <el-input clearable v-model="form_data.num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="must-fill"
              label="每组每日数量"
              prop="group_num"
            >
              <el-input clearable v-model="form_data.group_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="default" label="说明" prop="rsv">
              <el-input
                type="textarea"
                clearable
                v-model="form_data.rsv"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit"
          >确 认</el-button
        >
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
import {} from "@/utils/validate";
import { formatZero } from "@/filters";

export default {
  name: "services_handover_work",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        pageNum: 1,
        pageSize: 10,
      },
      table_data: [],
      table_loading: false,
      table_total: 1,
      form_data: {
        name: "", //班次名称
        color: "", //班次颜色，
        num: "", //每日数量
        group_num: "", //每组每日数量
        rsv: "", //说明
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
    getList() {
      this.table_data = [{ date: "1" }];
    },
    handleNav(data, type) {
      switch (type) {
        case "添加":
          this.dialog_cof.title = "添加班次";
          this.dialog_cof.visible = true;
          break;
        case "详情":
          this.dialog_cof.title = "班次详情";
          this.dialog_cof.visible = true;
          break;
      }
    },
    handleSubmit(){
      console.log(this.form_data);
    },
    reset_flt() {
      this.flt = {
        time: [], //时间范围
        startTime: null, //开始时间,
        endTime: null, // 结束时间
        pageNum: 1,
        pageSize: 10,
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
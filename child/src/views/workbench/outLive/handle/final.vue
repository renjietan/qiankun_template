<!-- 
 * @description: 退住结算
 * @fileName: outLive_final.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 14:24:55
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="title" style="margin-bottom: 10px">
        <div class="title">退住结算信息</div>
      </div>
      <div style="margin-bottom: 10px">
        <el-form
          :inline="true"
          :model="form_data"
          :rules="rules"
          ref="form"
          hide-required-asterisk
          status-icon
        >
          <el-row>
            <el-col :span="3">
              <el-form-item class="default" prop="title" label="居住状况">
                <el-input
                  v-model="form_data.title"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-form-item class="must-fill" prop="date" label="费用截止日期">
                <el-date-picker
                  v-model="form_data.date"
                  type="date"
                  placeholder="请选择"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="title" style="margin-bottom: 10px">
        <div class="title">退住结算（截止到费用截止日）</div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-dayin"
            @click="handleNav('', '打印')"
            >打印</el-button
          >
        </div>
      </div>
      <el-table
        border
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        fit
      >
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            <span>{{ formatZero(scope.$index + 1, 1, 2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="224"
          prop="name"
          label="费用科目"
        ></el-table-column>
        <el-table-column
          width="160"
          align="center"
          prop="name"
          label="应收金额（元）"
        ></el-table-column>
        <el-table-column
          width="160"
          align="center"
          prop="name"
          label="应退金额（元）"
        ></el-table-column>
        <el-table-column
          width="160"
          align="center"
          prop="name"
          label="修改应收金额（元）"
        ></el-table-column>
        <el-table-column
          width="160"
          align="center"
          prop="name"
          label="修改应退金额（元）"
        ></el-table-column>
        <el-table-column
          width="160"
          align="center"
          prop="name"
          label="修改应退金额（元）"
        ></el-table-column>
        <el-table-column
          width="200"
          align="center"
          prop="name"
          label="费用期间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="收费说明"
        ></el-table-column>
      </el-table>
      <div class="sum-box" style="margin-bottom: 30px">
        <div class="sum-item" style="width: 100px">合计</div>
        <div class="sum-item" style="width: 224px"></div>
        <div class="sum-item" style="width: 160px">1</div>
        <div class="sum-item" style="width: 160px">0</div>
        <div class="sum-item" style="width: 160px">1</div>
        <div class="sum-item" style="width: 160px">0</div>
      </div>
      <div class="title" style="margin-bottom: 20px">
        <div class="title">账户余额</div>
      </div>
      <el-table
        border
        ref="data_table"
        :data="table_data_account"
        v-loading="table_loading"
        fit
      >
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            <span>{{ formatZero(scope.$index + 1, 1, 2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="综合账户"></el-table-column>
      </el-table>
      <div class="footer">
        <el-button type="primary" @click="handleSubmit">确认结算费用</el-button>
      </div>
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
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
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero } from "@/filters";

export default {
  name: "outLive_handle_final",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      table_data: [],
      form_data: {
        title: null,
        date: null,
      },
    };
  },
  methods: {
    formatZero,
    handleSubmit() {
      this.$message({
        message: "结算成功",
        type: "success",
      });
    },
  },
  mounted() {
    this.table_data = [
      {
        name: 1,
      },
    ];
    this.table_data_account = [
      {
        name: 1,
      },
    ];
  },
};
</script>
<style lang='scss' scoped>
.sum-box {
  background: rgba(1, 124, 255, 0.2);
  display: flex;
  .sum-item {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: rgba(1, 124, 255, 1);
    border-left: 0.1px solid rgba(232, 232, 232, 1);
  }
}
</style>
<!-- 
 * @description: 长者绑定 
 * @fileName: elder_bind.vue 
 * @author: 王文涛 
 * @date: 2021-12-14 09:16:35
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="6">
                <el-form-item label="用户名/手机号：">
                  <el-input
                    clearable
                    v-model="flt.nameOrBed"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="注册时间：">
                  <el-date-picker
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    v-model="time"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="rest_data">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>账户管理</span>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        highlight-current-row
        fit
      >
        <el-table-column align="center" width="80" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createDate"
          label="注册时间"
        ></el-table-column>
        <el-table-column align="left" width="400" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '查看绑定长者')"
              >查看绑定长者</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleAction(scope.row, '绑定长者')"
              >绑定长者</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleAction(scope.row, '解除绑定')"
              >解除绑定</el-link
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
      <find-elder
        v-if="dialog_cof.title === '查看绑定长者'"
        :elder="elderInfos"
        @exit="exit"
      />
      <bind-elder
        v-if="dialog_cof.title === '绑定长者'"
        :fuserId="fuserId"
        :elder="elderInfos"
        @exit="exit"
      />
      <un-bind-elder
        v-if="dialog_cof.title === '解除绑定'"
        :fuserId="fuserId"
        :elder="elderInfos"
        @exit="exit"
      />
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
import { find_bind_elder } from "@/api/pensionagency/basicConfig/basicConfig";
import bindElder from "./compontent/bind_elder.vue";
import unBindElder from "./compontent/un_bind_elder.vue";
import findElder from "./compontent/find_elder.vue";
var self = null;
export default {
  components: { Pagination, bindElder, unBindElder, findElder },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        name: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      elderInfos: [],
      time: null,
      table_total: 0,
      table_loading: false,
      table_data: [],
      fuserId: undefined,
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
    exit() {
      this.dialog_cof.visible = false;
      this.getList();
    },
    getList() {
      self = this;
      self.table_loading = true;
      find_bind_elder({
        ...self.flt,
        startTime: self.time ? self.time[0] : undefined,
        endTime: self.time ? self.time[1] : undefined,
      }).then((res) => {
        self.table_data = res ? res.result : [];
        self.table_total = res.totalCount;
        self.table_loading = false;
      });
    },
    rest_data() {
      this.flt = {
        name: undefined,
        pageNum: 1,
        pageSize: 10,
      };
      this.time = null;
    },
    handleAction(data, type) {
      this.elderInfos = data.elderBaseInfos;
      this.fuserId = data.fuserId;
      this.dialog_cof.title = type;
      this.dialog_cof.visible = true;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 42px;
  line-height: 42px;
}
</style>
<!-- 
 * @description:服务记录一览
 * @fileName: care_for_record.vue 
 * @author: 王文涛 
 * @date: 2021-09-06 16:34:22
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="1">
                <el-button type="primary" plain icon="el-icon-caret-left" @click="getList"></el-button>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter">
                  <el-date-picker v-model="flt.dateTime" type="date" placeholder="请输入时间" value-format="yyyy-MM-dd"
                    style="width: 180px"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain icon="el-icon-caret-right" @click="getList"></el-button>
              </el-col>
              <el-col :span="1" style="margin-left:-12px;margin-right:2px">
                <el-button type="primary" plain @click="handleTime('今日')">今日</el-button>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter" label="姓名/床位">
                  <el-input clearable v-model="flt.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter" label="完成状态">
                  <el-select v-model="flt.processIn" clearable placeholder="请选择">
                    <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                      :value="item.step"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter" label="服务等级">
                  <el-select v-model="flt.processIn" clearable placeholder="请选择">
                    <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                      :value="item.step"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter" label="状态">
                  <el-select v-model="flt.processIn" clearable placeholder="请选择">
                    <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                      :value="item.step"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item class="filter" label="服务类型">
                  <el-select v-model="flt.processIn" clearable placeholder="请选择">
                    <el-option v-for="item in status_options" :key="item.step" :label="item.codeDesc"
                      :value="item.step"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="text-align: left">
                <div style="display: inline-block; margin-left: 10px">
                  <el-button type="primary" @click="getList">查询</el-button>
                  <el-button @click="reset_flt">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="success" @click="getList" icon="el-icon-upload2">导出</el-button>
              <el-button @click="reset_flt" type="primary" icon="el-icon-dayin">打印</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>服务记录一览</span>
      </div>
      <el-table class="table_data" border ref="table_data" :data="table_data" v-loading="table_loading" stripe
        highlight-current-row fit :cell-style="{ padding: '3.5px' }">
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">
              {{
              formatZero(scope.$index + 1, 2)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="头像">
          <template slot-scope="scope">
            <el-image style="width: 40px; height: 40px; border-radius: 50%" :src="scope.row.avator" fit="fit">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
        <el-table-column align="center" prop="bedName" label="服务等级"></el-table-column>
        <el-table-column align="center" prop="bedName" label="状态"></el-table-column>
        <template>
          <el-table-column v-for="(item, index) in table" :key="index" align="center" :prop="item.prop"
            :label="item.label"></el-table-column>
        </template>
        <el-table-column align="center" width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '详情')">详情</el-link>
            <el-link type="danger" @click="handleNav(scope.row, 'delete')" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
        @pagination="getList" />
    </div>
    <el-dialog v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal"></el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { formatZero } from "@/filters";
  import { table } from "@/utils/enum";
  import { } from "@/utils/validate";
  export default {
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        table,
        flt: {
          name: "",
          dateTime: null
        },
        status_options: [],
        table_data: [],
        table_total: 1,
        table_loading: false,
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
      getList() { },
      reset_flt() {
        this.flt = {
          name: "",
          dateTime: null
        }
      },
      handleTime(type) {
        let self = this;
        let start_between = [];
        switch (type) {
          case "今日":
            start_between = new Date();
            self.flt.dateTime = start_between;
            break;
        }
      },
    },
    mounted() { }
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-table__fixed-header-wrapper th {
    padding: 3.5px 0;
  }
</style>
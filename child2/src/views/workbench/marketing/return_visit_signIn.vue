<!-- 
 * @description：入住回访登记 
 * @fileName: return_visit_signIn.vue 
 * @author: 姜纬杰 
 * @date: 2022-03-04 10:54:38
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table></basic-info-table>
    <div class="container_card">
      <div class="title" style="margin-bottom: 10px">
        <div class="title">登记回访信息</div>
      </div>
      <el-row>
        <el-table
          class
          border
          ref="table_data"
          :data="table_data"
          v-loading="table_loading"
          stripe
          highlight-current-row
          fit
        >
          <el-table-column align="center" label="序号" width="55">
            <template slot-scope="scope">
              <span :style="{ color: $variables.baseColor }">
                {{formatZero(scope.$index + 1, 2)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="left" width="192" label="跟进状态">
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.checked"
                ref="editInput"
                @blur="inputBlur(scope)"
                v-model="scope.row.status"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <span v-else>{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" width="192" label="跟进时间">
            <template slot-scope="scope">
              <el-date-picker
                v-if="scope.row.checked"
                placeholder="请选择"
                v-model="scope.row.time"
                ref="editInput"
                @blur="inputBlur(scope)"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <span v-else>{{scope.row.time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="跟进详细信息">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.checked"
                placeholder="请选择"
                v-model="scope.row.info"
                ref="editInput"
                @blur="inputBlur(scope)"
              ></el-input>
              <span v-else>{{scope.row.info}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" width="121" label="操作">
            <template slot-scope="scope">
              <el-link
                :underline="false"
                type="primary"
                @click.native="handleAction(scope.row, '编辑')"
              >编辑</el-link>
              <el-link type="danger" @click="handleAction(scope.row, '删除')" :underline="false">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          icon="el-icon-plus"
          style="width:100%;background-color:#e9f4ff;color:#017CFF"
          @click="add"
        >添加</el-button>
      </el-row>
      <div class="footer">
        <el-button type="primary" @click="handleSubmit">确认结算费用</el-button>
      </div>
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
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero } from "@/filters";

export default {
  name: "marketing_return_visit_signIn",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_obj: {
        status: "",
        time: "",
        info: "",
        checked: true
      },
      table_data: [],
      form_data: {
        title: null,
        date: null
      }
    };
  },
  methods: {
    formatZero,
    //输入框失去焦点事件
    inputBlur(scope) {
      scope.row.checked = false;
    },
    add() {
      this.table_data.push(JSON.parse(JSON.stringify(this.table_obj)));
    },
    handleSubmit() {
      this.$message({
        message: "结算成功",
        type: "success"
      });
    }
  },
  mounted() {
    this.table_data = [
      {
        name: 1
      }
    ];
  }
};
</script>
<style lang='scss' scoped>
</style>
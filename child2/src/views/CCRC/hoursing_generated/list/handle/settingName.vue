<!-- 
 * @description: 设置楼层名称
 * @fileName: settingName.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 19:22:54
 * @后台人员:  
!-->
<template>
  <div style="margin-top: 24px">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="楼层名称" width="85">
        <template slot-scope="scope">
          <div class="table_box">
            <el-input
              type="text"
              v-model="scope.row.name"
              placeholder="请设置楼层"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="table_title">单元名称</div>
          <div class="table_title" style="padding-top:10px">户数</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(v, index) in unit" :key="index">
        <template slot="header"  slot-scope="scope">
          <div class="table_title">
            <el-input type="text" v-model="v.unitName" placeholder="请设置单元" />
          </div>
          <div class="title-small">
            <div class="item">
              <el-input type="text" style="padding-top:10px" v-model="v.num" placeholder="请设置户数" />
            </div>
          </div>
        </template>

        <!-- <template slot-scope="scope">
          <el-input
            type="text"
            v-model="scope.row[`num${i}`]"
            placeholder="请设置户数"
            @change="getNum"
          />
        </template> -->
      </el-table-column>
    </el-table>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')">上一步</el-button>
      <el-button type="primary" @click="submitForm('next')" :disabled="true"
        >下一步</el-button
      >
      <el-button type="primary" @click="submitForm('submit')" class="btn"
        >提交</el-button
      >
      <el-button class="btn" @click="submitForm('exit')">取消</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      form_data: {},
      tableData: [],
      numOfUnit: [],
      unit: [],
      value: "",
    };
  }, 
  methods: {
    getData() {
      const { floor, unit } = JSON.parse(localStorage.getItem("floor"));
      this.tableData = Array.from({ length: floor }, (v, k) => {
        return {
          name: k + 1,
        };
      }).reverse();

      this.unit = Array.from({ length: unit }, (m, n) => {
        return {
          unitName: `${n + 1}单元`,
          num: 0,
        };
      });
    },
    changeVal() {
      this.$forceUpdate();
    },
    submitForm(type) {
      var self = this;
      const actionType = {
        back: () => {
          self.backup();
        },
        next: () => {
          self.nextsteap();
        },
        exit: () => {
          self.exit();
        },
        submit: () => {
          self.submit();
        },
      };
      actionType[type]();
    },
    exit() {
      this.$emit("closeTap", "");
    },
    // 返回上一步；
    backup() {
      this.$emit("backup", 2);
    },
    // 下一步
    nextsteap() {
      this.$emit("nextsteap", 4);
    },
    //数据提交
    submit() {
      this.$emit("submit", {
        floor: this.tableData,
        unit: this.unit,
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang='scss' scoped>
.table_box {
  width: 64px;
  height: 32px;
  background: #f3f3f3;
  text-align: center;
  line-height: 32px;
}
/deep/ .el-table thead.is-group th {
  border: 1px solid #ccc;
  text-align: center;
  height: 42px;
}
/deep/ .el-table__body-wrapper .el-table__row td {
  border-bottom: 1px solid #ccc;
  &:nth-of-type(1) {
    border-left: none;
  }
  border-left: 1px solid #ccc;
}
</style>
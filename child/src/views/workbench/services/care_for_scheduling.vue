<!-- 
 * @description: 排班管理
 * @fileName: care_for_scheduling.vue 
 * @author: 姜纬杰
 * @date: 2021-05-31 14:33:10
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row :gutter="10">
        <el-col :span="3">
          <div
            :class="[
                      'content-item',
                      cur_area == 'all' ? 'content-active' : '',
                    ]"
            @click="handleSwitch_allArea()"
          >
            <div class="content" style="margin-left: 12px">
              <p style="line-height: 0; font-size: 14px;font-weight:600;cursor: pointer">整体排班</p>
            </div>
          </div>
        </el-col>

        <div v-for="(item, index) in area_list" :key="index">
          <el-col :span="3">
            <div
              :class="[
                      'content-item',
                      cur_area == index ? 'content-active' : '',
                    ]"
              @click="handleSwitch_area(item,index)"
            >
              <div style="display: flex">
                <div class="content" style="margin-left: 12px">
                  <p
                    style="line-height: 0; font-size: 14px;font-weight:600;cursor: pointer;"
                  >{{item.areaName}}</p>
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="container_card">
      <div class="title">排班管理</div>
      <el-form :inline="true">
        <el-row style="margin-top:20px">
          <el-col :span="9">
            <quick-date-picker-shift-week @getData="getDateTime"></quick-date-picker-shift-week>
          </el-col>
          <el-col :span="10">
            <div style="display:flex">
              <div style="line-height:32px;font-size: 14px;font-weight:600">选择班次：</div>
              <div
                v-for="(item, index) in shift_list"
                class="shift-active"
                :key="index"
                @click="handleSwitch_shift(item)"
                :style="{ 'background': cur_shift.id == item.id ? item.color : 'rgba(1, 124, 255, 0.09)', 'border': `1px solid ${cur_shift.id == item.id ? item.color : '#017cff'}`, 'width': '50px' , 'color': cur_shift.id == item.id ? 'white' : 'black' ,'margin-left':'12px'}"
              >
                <!-- :class="[
                      'shift-item',
                      $$(cur_shift).id == item.id ? 'shift-active' : '',
                ]"-->
                <div class="content" style="text-align:center">
                  <p
                    style="line-height: 0; font-size: 14px;font-weight:600;cursor: pointer"
                  >{{item.shiftName}}</p>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :span="5" style="text-align: right;">
            <el-button type="primary" icon="el-icon-edit-outline" @click="handleSave()">保存</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="handleClick('','导出')" disabled>导出</el-button>
            <el-button type="primary" icon="el-icon-printer" @click="handleClick('','打印')" disabled>打印</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        :span-method="arraySpanMethod"
        fit
        @cell-click="handleChoeseShift"
      >
        <el-table-column align="center" width="110px" prop="dempName" label="部门"></el-table-column>
        <el-table-column align="center" width="110px" prop="empName" label="姓名"></el-table-column>
        <el-table-column align="center" width="100px" prop="positionName" label="职位"></el-table-column>
        <el-table-column
          align="center"
          v-for="(item,index) in column"
          :key="index"
          :label="item.label"
        >
          <template slot-scope="scope">
            <div
              class="table_data_cell"
              :style="{ 'background': scope.row[item.prop] == null ? '' : scope.row[item.prop].shiftColor }"
            >
              {{
              scope.row[item.prop] == null ? "" : scope.row[item.prop].shiftName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="rsv" label="备注">
          <template  slot-scope="scope">
            <el-input v-model="scope.row.rsv" placeholder=""></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import QuickDatePickerShiftWeek from "@/components/Quick_DatePicker/shift_week";
import {
  get_schedule_list,
  update_schedule,
  get_all_types
} from "@/api/pensionagency/servers/serves";
import {} from "@/utils/validate";
import { get_all_areas } from "@/api/pensionagency/administrative/administrative";
import { Calendar, deepClone } from "@/utils/index";

export default {
  name: "services_care_for_scheduling",
  components: { Pagination, QuickDatePickerShiftWeek },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        date_time: [],
        areaId: "",
        pageNum: 1
      },
      areaId: "", //区域id
      columns: [],
      table_data: [],
      table_loading: false,
      area_list: [], //区域列表
      shift_list: [], //班次列表
      cur_area: "all", //当前区域
      cur_shift: {}, //当前班次
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  computed: {
    column() {
      let data = this.columns[this.flt.pageNum - 1] ?? [];
      // console.log(data);
      let dir = {
        0: "mon",
        1: "tue",
        2: "wed",
        3: "thu",
        4: "fir",
        5: "sat",
        6: "sun"
      };
      data = data.map((item, index) => {
        return {
          label: item.replace(/星期/, "周"),
          prop: dir[index]
        };
      });
      this.flt.date_time =
        data == null || data.length == 0
          ? []
          : [data[0].label.split(" ")[0], data[6].label.split(" ")[0]];
      return data;
    }
  },
  watch: {
    flt: {
      deep: true,
      handler: function(newval, oldval) {
        let self = this;
        self.getList();
      }
    }
  },
  methods: {
    // getColor_by_ShiftName(shiftName) {
    //   let res = this.shift_list.filter(item => item.shiftName == shiftName);
    //   let color = res[0]?.color ?? "";
    //   return color;
    // },
    //获取所有班次
    getAllTypes() {
      get_all_types().then(res => {
        this.shift_list = res.map(item => {
          item.shiftId = item.id;
          item.shiftColor = item.color;
          return item;
        });
      });
    },
    //切换时间-周
    getDateTime(val) {
      this.columns = val;
    },
    //单元格方法---添加班次
    handleChoeseShift(row, column, cell, event) {
      let dir = {
        "周一） ": "mon",
        "周二） ": "tue",
        "周三） ": "wed",
        "周四） ": "thu",
        "周五） ": "fir",
        "周六） ": "sat",
        "周日） ": "sun"
      };
      let label = column.label.split("（")[1];
      let columnIndex = dir[label];
      let rowIndex = row.index;
      const res = { ...row };
      if (!!this.cur_shift?.id && res[columnIndex] == null) {
        res[columnIndex] = this.cur_shift;
        this.$set(this.table_data, rowIndex, res);
        return;
      }
      if (res[columnIndex] != null) {
        res[columnIndex] = null;
        this.$set(this.table_data, rowIndex, res);
        return;
      }
      if (column.label != "备注") {
        this.$notify({
          title: "提醒",
          type: "warning",
          message: "请选择班次"
        });
      }
    },
    //按部门分组
    flitterTableData() {
      let spanArr = [];
      let concat = 0;
      this.table_data.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
        } else {
          if (item.dempName === this.table_data[index - 1].dempName) {
            spanArr[concat] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            concat = index;
          }
        }
      });
      return {
        one: spanArr
      };
    },
    //合并部门
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.flitterTableData(this.table_data).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    //选择区域查看排班
    handleSwitch_area(item, index) {
      this.cur_area = index;
      this.areaId = item.id;
      this.getList();
    },
    //查看所有排班
    handleSwitch_allArea() {
      this.cur_area = "all";
      this.getList();
    },
    //选择班次
    handleSwitch_shift(item) {
      if (this.cur_shift.id == item.id) {
        this.cur_shift = {};
        return;
      }
      this.cur_shift = item;
    },
    //获取所有区域
    getAllAreas() {
      get_all_areas().then(res => {
        this.area_list = res;
      });
    },
    //获取表格数据
    getList() {
      let self = this;
      self.table_loading = true;
      let flt = { ...self.flt };
      flt.monDate = flt.date_time[0];
      flt.endDate = flt.date_time[1];
      if (this.cur_area != "all") {
        flt.areaId = self.areaId;
      } else {
        flt.areaId = "";
      }
      if (flt.date_time?.length != 2) {
        return;
      }
      get_schedule_list(flt).then(res => {
        self.table_data = res.map((item, index) => {
          item.index = index;
          return item;
        });
        self.table_loading = false;
      });
    },
    handleSave() {
      let self = this;
      let monDate = self.flt.date_time[0];
      let elderShift = this.table_data.map(item => {
        let res = {};
        res.monShift = item.mon?.shiftId ?? 0;
        res.tueShift = item.tue?.shiftId ?? 0;
        res.wedShift = item.wed?.shiftId ?? 0;
        res.thuShift = item.thu?.shiftId ?? 0;
        res.firShift = item.fir?.shiftId ?? 0;
        res.satShift = item.sat?.shiftId ?? 0;
        res.sunShift = item.sun?.shiftId ?? 0;
        res.id = item?.wsId ?? null;
        res.rsv = item?.rsv ?? null;
        res.empId = item?.empId ?? null;
        return res;
      });
      let params_all = {
        monDate,
        elderShift
      };
      update_schedule(params_all).then(res => {
        self.$notify({
          title: "提示",
          message: "操作成功",
          type: "success"
        });
        self.getList();
      });
    },
    handleClick(data, type) {
      let self = this;
      switch (type) {
        case "导出":
          break;
        case "打印":
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.Calendar_obj = new Calendar();
    this.getAllAreas();
    this.getList();
    this.getAllTypes();
  }
};
</script>
<style lang='scss' scoped>
.content-item {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}

.table_data {
  &_cell {
    padding: 10px 0;
    border-radius: 2px;
    color: black;
  }
}

.content-active {
  border: 1px solid #017cff;
  background: rgba(1, 124, 255, 0.09);
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}

.shift-item {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 1px;
}

.shift-active {
  /* border: 1px solid #017cff;
    background: rgba(1, 124, 255, 0.09); */
  border-radius: 5px;
  margin-bottom: 15px;
  color: white;
}

.values {
  width: 208px;
  text-align: center;
  line-height: 46px;
  border-right: 1px solid #dfe6ec;
}

.values_active {
  width: 208px;
  text-align: center;
  line-height: 46px;
  border: 1px solid #017cff;
  color: #017cff;
  background: rgba(1, 124, 255, 0.09);
}

/deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid #dfe6ec !important;
    font-size: 15px;
    font-weight: bolder;
    color: black;
    padding: 15px 0;
  }
}

/deep/.el-table__body-wrapper .el-table__row {
  td {
    border-right: 1px solid #dfe6ec !important;
  }
}
</style>
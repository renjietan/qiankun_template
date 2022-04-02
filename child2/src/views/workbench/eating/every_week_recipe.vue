<!-- 
 * @description: 每周食谱
 * @fileName: every_week _recipe.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 14:58:04
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row>
        <el-col :span="18">
          <quick-date-picker-week @getData="getDateTime"></quick-date-picker-week>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" icon="el-icon-printer" disabled>打印食谱</el-button>
          <el-button disabled>去验餐</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="container_card">
      <el-table border class="table_data_2" @cell-dblclick="handleDialog" :header-cell-style="customHeader"
        :cell-style="customCell" ref="data_table" :data="table_data" v-loading="table_loading" stripe fit>
        <el-table-column label="就餐时间" prop="title"></el-table-column>
        <el-table-column v-for="(item,index) in column" :key="index" :label="item.label">
          <template slot-scope="scope">
            <div class="cell-template">
              <ul>
                <li v-for="item in getColumn(scope).data">
                  <span>{{ item.foodName }}</span>
                </li>
              </ul>
            </div>
            <div class="cell-number" v-if="getColumn(scope).data.length != 0">{{ getColumn(scope).count }}</div>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-dialog class="el-dialog-3" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-row>
        <el-col :span="8">
          <div class="dining-title">
            <span>{{ dialog_data.date }}</span>
            <span>{{ dialog_data.type }}</span>
          </div>
          <div class="dining-content">
            <div class="dining-content-title">
              已选菜品
            </div>
            <div class="dining-content-list">
              <ul>
                <li v-for="item in dialog_data.foods_selected">
                  <span>{{ item.foodName }}</span>
                  <el-link @click="handleDel_dialog(item)" :underline="false" type="danger">删除</el-link>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="15" :offset="1">
          <el-form :inline="true" :model="dialog_flt" class="demo-form-inline">
            <el-form-item label="分类">
              <el-select v-model="dialog_flt.food_type" clearable placeholder="请选择">
                <el-option v-for="item in food_type_options" :label="item.desc" :value="item.type" :key="item.type">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜品">
              <el-input v-model="dialog_flt.food_name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div class="dining-list">
            <el-row class="dining-list-box">
              <el-col v-for="item in foods" :span="6" :key="item.id">
                <div :class="[isSelected(item) ? 'dining-list-item-selected' : '' ,'dining-list-item']"
                  @click="handleSelect_foods(item)">
                  <el-avatar :size="55" :src="item.pictureUrl"></el-avatar>
                  <div class="dining-list-item-desc">
                    <div class="dining-list-item-desc-name">{{ item.foodName }}</div>
                    <div class="dining-list-item-desc-type">{{ item.foodClassifyDesc }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import {
    get_this_week_recipe,
    query_recipe,
    add_cook_book
  } from "@/api/pensionagency/eating/every_week_recipe";
  import {
    get_category,
    get_foodsList_By
  } from "@/api/pensionagency/eating/food_mg";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import elHeightAdaptiveTable from "@/directive/el-table";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { Calendar, deepClone } from "@/utils/index";
  import QuickDatePickerWeek from "@/components/Quick_DatePicker/week";
  import { } from "@/utils/validate";
  export default {
    name: "eating_every_week_recipe",
    components: { Pagination, QuickDatePickerWeek },
    directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
    data() {
      return {
        table_data: [],
        table_loading: false,
        flt: {
          date_time: [],
          pageNum: 1,
          pageSize: 7
        },
        dialog_cof: {
          visible: false,
          title: "制定膳食计划",
          escape: false,
          destroy: true,
          modal: false
        },
        columns: [],
        dialog_flt: {
          food_type: undefined,
          food_name: "",
        },
        dialog_data: {
          foods_selected: [],
          date: "",
          type: ""
        },
        food_type_options: [],
        foods: [],
      };
    },
    computed: {
      column() {
        let data = this.columns[this.flt.pageNum - 1] ?? [];
        data = data.map((item, index) => {
          return {
            label: item,
            prop: `column${index}`
          };
        });
        this.flt.date_time =
          data == null || data.length == 0
            ? []
            : [data[0].label.split(" ")[0], data[6].label.split(" ")[0]];
        return data;
      },
    },
    watch: {
      dialog_flt: {
        deep: true,
        handler: function (n) {
          let params = {
            type: this.dialog_flt.food_type ?? "",
            name: this.dialog_flt.food_name,
          }
          get_foodsList_By(params).then(res => {
            this.foods = res ?? []
          })
        },
        immediate: true
      },
      flt: {
        deep: true,
        handler: function (newval, oldval) {
          let self = this;
          self.getList();
        },
      }
    },
    methods: {
      isSelected(data) {
        let { id } = data
        let foods_selected = [...this.dialog_data.foods_selected]
        foods_selected = foods_selected.reduce((cur, pre) => {
          cur[pre.id] = pre
          return cur
        }, {})
        return foods_selected[id] ? true : false
      },
      handleDel_dialog(data) {
        let { id } = data
        let foods_selected = [...this.dialog_data.foods_selected]
        foods_selected = foods_selected.reduce((cur, pre) => {
          cur[pre.id] = pre
          return cur
        }, {})
        delete foods_selected[id]
        this.dialog_data.foods_selected = Object.values(foods_selected)
      },
      handleSelect_foods(data) {
        let { id } = data
        let foods_selected = [...this.dialog_data.foods_selected]
        foods_selected = foods_selected.reduce((cur, pre) => {
          cur[pre.id] = pre
          console.log( cur[pre.id]);
          return cur
        }, {})
        if (foods_selected[id]) {
          delete foods_selected[id]
          this.dialog_data.foods_selected = Object.values(foods_selected)
        } else {
          this.dialog_data.foods_selected.push(data)
        }
      },
      reset_dialog_flt() {
        this.dialog_flt = {
          food_type: undefined,
          dining_name: ""
        }
      },
      getDateTime(val) {
        this.columns = val;
      },
      getColumn(data) {
        let column_label = data.column.label.split("（")[1].split("）")[0];
        let temp = {
          星期一: 0,
          星期二: 1,
          星期三: 2,
          星期四: 3,
          星期五: 4,
          星期六: 5,
          星期日: 6
        };
        let res = data.row[`column${temp[column_label]}`];
        return res;
      },
      customHeader(data) {
        let curDay = this.Calendar_obj.format(new Date());
        let { row, columnIndex } = data;
        return columnIndex == row.findIndex(item => item.label == curDay)
          ? "background:#C1DEFE;color:#005DE5"
          : "";
      },
      customCell(data) {
        let curDay = this.Calendar_obj.format(new Date());
        let { column } = data;
        return column.label == curDay
          ? "background:rgba(1, 124, 255, 0.09);color:#005DE5"
          : "";
      },
      handleDialog(row, column, cell, event) {

        let date = column.label.split(" ")[0];
        let c = column.id.split("_")
        c = `column${new Date(new Date(column.label.split("  ")[0])).getDay()-1}`
        const foods_selected = [...row[c].data]
        console.log(foods_selected);
        this.dialog_cof.visible = true
        this.dialog_data.date = column.label
        this.dialog_data.type = row.title
        this.dialog_data.foods_selected = foods_selected
        console.log(this.dialog_data.foods_selected);
        this.reset_dialog_flt()
      },
      get_dining_type() {
        get_category().then(res => {
          this.food_type_options = res
        })
      },
      handleSubmit() {
        let params = {
          date: this.dialog_data.date?.split(" ")[0],
        }
        if(this.dialog_data.type == "早餐") {
          params["breakfast"] = this.dialog_data.foods_selected.map(item => item.id).toString()
        }
        if(this.dialog_data.type == "点心") {
          params["dessert"] = this.dialog_data.foods_selected.map(item => item.id).toString()
        }
        if(this.dialog_data.type == "午餐") {
          params["lunch"] = this.dialog_data.foods_selected.map(item => item.id).toString()
        }
        if(this.dialog_data.type == "下午茶") {
          params["afternoonTea"] = this.dialog_data.foods_selected.map(item => item.id).toString()
        }
        if(this.dialog_data.type == "晚餐") {
          params["dinner"] = this.dialog_data.foods_selected.map(item => item.id).toString()
        }
        add_cook_book(params).then(res => {
          this.getList()
          this.dialog_cof.visible = false
        })
        console.log(params);
      },
      getList() {
        let self = this
        self.table_loading = true;
        let flt = { ...self.flt }
        flt.startDate = flt.date_time[0]
        flt.endDate = flt.date_time[1]
        if (flt.date_time?.length != 2) {
          return
        }
        query_recipe(flt).then(res => {
          var dining_type = {
            0: "早餐",
            1: "点心",
            2: "午餐",
            3: "下午茶",
            4: "晚餐"
          }
          var temp = Array.from({ length: 5 }, (item, index) => {
            let d = {
              title: dining_type[index]
            }
            Array.from({ length: 7 }).map((item, index) => {
              d[`column${index}`] = {}
              d[`column${index}`]["count"] = 0
              return d[`column${index}`]["data"] = []
            })
            return d
          })

          for (var item of res) {
            let week = new Date(item.date).getDay()
            week = week == 0 ? 7 : week
            temp[0][`column${week - 1}`].data = item.breakfasts ?? [] //早餐
            temp[1][`column${week - 1}`].data = item.dessert ?? [] //点心
            temp[2][`column${week - 1}`].data = item.lunch ?? []//午餐
            temp[3][`column${week - 1}`].data = item.afternoonTeas ?? [] //下午茶
            temp[4][`column${week - 1}`].data = item.dinners ?? []//晚餐
          }
          self.table_data = temp
          self.table_loading = false;
        })
      }
    },
    mounted() {
      this.Calendar_obj = new Calendar();
      this.get_dining_type()


    }
  };
</script>
<style lang='scss' scoped>
  @import "../../../styles/variables.scss";

  .table_data_2 /deep/ .el-table__row td {
    border-right: 1px solid #dfe6ec !important;
    padding: 0 !important;
    
  }
  .table_data_2 /deep/ .el-table__row td .cell{
    min-height: 40px;
    display: flex;
    align-items: center;
  }
  .table_data_2 /deep/ .el-table__header-wrapper th {
    border-right: 1px solid #dfe6ec !important;
  }


  .dining {
    &-title {
      line-height: 32px;
      background: rgba(1, 124, 255, 0.06);
      font-size: 14px;
      font-weight: bolder;
      border-left: 5px solid rgba(1, 124, 255, 1);
      border-radius: 5px;
      padding: 0 18px 0 15px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
    }

    &-content {
      margin-top: 18px;
      border: 1px solid #eee;
      box-sizing: border-box;

      &-title {
        font-size: 14px;
        font-weight: bolder;
        line-height: 44px;
        background: rgba(0, 0, 0, 0.05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .12), 0 0 1px rgba(0, 0, 0, .04);
        padding: 0 0 0 15px
      }

      &-list {
        height: 446px;
        overflow-y: scroll;

        ul {
          list-style: none;
          padding: 0;
          margin: 10px 0;

          li {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            align-items: center;
            padding: 0 0 0 10px;

            span {
              font-size: 14px;
              line-height: 35px;
              margin-left: 20px
            }

            &::before {
              content: "\02022";
              color: $baseColor;
              font-style: normal;
              text-decoration: none;
              font-size: 25px;
              position: absolute;
              line-height: 35px;
            }
          }
        }
      }
    }

    &-list {
      border: 1px solid #eee;
      box-sizing: border-box;
      height: 490px;
      overflow-y: scroll;
      padding: 20px 0;
      margin: 0 auto;

      &-box {
        width: 560px;
        margin: 0 auto
      }

      &-item-selected {
        background: rgba(1, 124, 255, 0.09) !important;
        border: 1px solid #017CFF !important;
      }

      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        width: 120px;
        height: 120px;
        background: rgba(0, 0, 0, 0.06);
        border: 2px dashed #eee;
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;

        &-desc {
          margin-top: 12px;
          text-align: center;

          &-name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 60px;
            font-weight: bolder;
          }

          &-type {
            color: #666666;
            margin-top: 3px;
          }
        }
      }
    }
  }
</style>
<!-- 
 * @description: 用餐记录
 * @fileName: meals_record.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 14:58:04
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card ">
            <el-row class="filter_date">
                <el-col style="display: flex;justify-content:space-between">
                    <!-- @change="handleChange_CheckBox" -->
                    <quick-date-picker-day @getData="getPickerData"></quick-date-picker-day>
                    <el-checkbox-group :max="1" v-model="flt.type">
                        <el-checkbox-button v-for="item in meals_type_list" :key="item.type" :label="item.type">
                            {{item.desc}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: right">

                </el-col>
            </el-row>
        </div>
        <div class="container_card ">
            <el-table border :span-method="handleMerge" :cell-class-name="tableCellClassName"
                :cell-style="handleCellStyle" ref="data_table" :data="table_data" v-loading="table_loading" stripe fit>
                <el-table-column width="100" align="center" label="序号">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.$index == 0 ? "总计" : formatZero(scope.$index, 2) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="床位">
                    <template slot-scope="scope">
                        <div v-if="scope.$index != 0">
                            {{ scope.row.bedName }}
                        </div>
                        <div v-else>
                            {{ scope.row.total }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100" prop="elderName" align="center" label="姓名"></el-table-column>
                <el-table-column width="100" align="center" label="主食">
                    <template slot-scope="scope">
                        <div v-if="scope.$index != 0">
                            {{ scope.row.fixedMainFood }}
                        </div>
                        <div v-else>
                            {{ scope.row.foods_total }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-for="(item, index) in columns" align="center" :key="index" :label="item.name">
                    <template slot-scope="scope">
                        <div v-if="isDining(scope)">
                            <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
                        </div>
                        <div v-else>
                            {{ scope.row[item.prop] }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="specialDiet" align="center" label="固定特殊膳食"></el-table-column>
                <el-table-column prop="rsv" align="center" label="备注"></el-table-column>
            </el-table>
            <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum"
                :limit.sync="flt.pageSize" @pagination="getList" />
        </div>

    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import { get_foodsMenu_total, get_foodsMenuType, get_category, get_dining_record, get_specialFoods_total } from '@/api/pensionagency/eating/food_mg';
    import { parseTime } from '@/utils/index';
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import QuickDatePickerDay from '@/components/Quick_DatePicker/day'
    import { formatZero } from '@/filters'
    import { } from '@/utils/validate'
    export default {
        name: 'eating_meals_record',
        components: { Pagination, QuickDatePickerDay },
        data() {
            return {
                table_data: [],
                table_loading: false,
                table_total: 0,
                meals_type_list: [],
                columns: [],
                flt: {
                    date_time: new Date(),
                    pageNum: 1,
                    pageSize: 10,
                    type: [],
                },
                dialog_cof: {
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                },
            };
        },
        watch: {
            "flt": {
                deep: true,
                handler: function (n, v) {
                    if (n.type.length != 0) {
                        this.init()
                    } else {
                        this.table_data = []
                    }
                }
            }
        },
        methods: {
            formatZero,
            // handleChange_CheckBox(v) {
            //     this.flt.type = v
            //     // this.flt.type = v
            //     this.init()
            // },
            tableCellClassName({ row, column, rowIndex, columnIndex }) {
                row.index = rowIndex;
                column.index = columnIndex;
            },
            isDining(data) {
                var id = this.columns[data.column.index - 4]?.id
                return (data.row.varietyIds ?? []).some(item => item == id)
            },
            async init() {
                if (this.meals_type_list.length == 0) {
                    let meals_type_list = await get_foodsMenuType()
                    this.meals_type_list = meals_type_list ?? []
                    this.flt.type = [this.meals_type_list[0]?.type ?? ""]
                }
                const params = { ...this.flt }
                params.type = params.type.toString()
                params.date = parseTime(params.date_time, "{y}-{m}-{d}")
                this.table_loading = true
                let columns = await get_foodsMenu_total(params)
                let table_sum = [{}]
                columns = columns.map((item, index) => {
                    item.prop = `column${index + 5}`
                    item.name = item.foodName
                    table_sum[0][`column${index + 5}`] = item.count
                    return item
                })
                this.columns = columns
                let res = await get_dining_record(params)
                let table_data = (res?.result ?? []).map(item => {
                    return item
                })
                this.flt.pageNum = res?.pageNum ?? 1
                this.flt.pageSize = res?.pageSize ?? 10
                this.table_total = res?.totalCount ?? 0
                table_sum[0]["total"] = res?.totalCount ?? 0
                let specialFoods_total = await get_specialFoods_total(params)
                table_sum[0]["foods_total"] = specialFoods_total
                this.table_data = [...table_sum, ...table_data]
                this.table_loading = false
            },

            getPickerData(val) {
                this.flt.date_time = val
            },
            handleMerge({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0 && columnIndex == 1) {
                    return [1, 2];
                } else if (rowIndex == 0 && columnIndex == 2) {
                    return [0, 0]
                }
            },
            handleCellStyle({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0 && (columnIndex == 0 || columnIndex == 1)) {
                    return `background: ${this.$variables.baseColor}; color: #fff; text-align:center`
                } else if (rowIndex == 0) {
                    return `background: rgba(1, 124, 255, 0.09); color: ${this.$variables.baseColor}`
                }
            },

            getList() {
                this.table_loading = true
                getList_record().then(res => {
                    this.table_loading = false
                    this.table_data = res.list
                    console.log(this.table_data);
                })
            },
            getColumns() {
                this.table_loading = true
                getList_food_columns().then(res => {
                    this.table_loading = false
                    this.columns = res.list
                    console.log(this.columns);
                })
            },
        },
        mounted() {
            // this.getColumns();
            // this.getList()
            this.init()
        },
    }
</script>
<style lang='scss' scoped>
    @import "../../../styles/variables.scss";

    .filter_date {
        .el-tag {
            height: 33px;
            line-height: 33px;
            margin-left: -110px;
            position: absolute;
            background: transparent;
            border: 0;
            color: rgb(96, 98, 102)
        }
    }

    /deep/ .el-table__body-wrapper {
        .el-table__row {
            td {
                border-right: 1px solid #dfe6ec !important;
            }
        }
    }
</style>
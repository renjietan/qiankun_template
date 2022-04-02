<!-- 
 * @description: 体温记录表
 * @fileName: services_record_temperature.vue 
 * @author: 谭人杰 
 * @date: 2021-10-04 13:18:39
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">体温记录表</div>
            <div style="display: inline-block;">
                <quick-date-picker-week :handler="set_curDate" :isShow_info="false" @getData="getDateTime">
                </quick-date-picker-week>
                <div style="display: inline-block; margin-left: 20px;">
                    <el-input placeholder="请输入姓名/床位" v-model="flt.nameOrBed" clearable></el-input>
                </div>
                <div style="display: inline-block; margin-left: 20px;">
                    <el-button type="primary" @click="init()">查询</el-button>
                    <el-button @click="handlRest()">重置</el-button>
                </div>
            </div>
        </div>
        <div class="container_card">
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
                <el-button type="warning">导出</el-button>
                <el-button type="primary">打印</el-button>
            </div>
            <el-table border :cell-class-name="tableCellClassName" class="table_data"  ref="table_data"
                :data="table_data" v-loading="table_loading" stripe highlight-current-row fit>
                <el-table-column width="120" fixed align="center" prop="elderName" label="姓名"></el-table-column>
                <el-table-column width="120" fixed align="center" prop="bedName" label="床位"></el-table-column>

                <el-table-column align="center" v-for="(item, index) in columns" :label="item.date" :key="index">
                    <el-table-column align="center" v-for="child in item.time" :label="child.columnName"
                        :key="child.columnName">
                        <template slot-scope="scope">
                            <div v-if="scope.row[child.prop]"
                                :class="['cell-content',scope.row[child.prop] > 38 ? 'cell-content-active' : '' ]">
                                {{ scope.row[child.prop] }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum"
                :limit.sync="flt.pageSize" @pagination="init" />
        </div>

    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import QuickDatePickerWeek from "@/components/Quick_DatePicker/week";
    import { get_project_record, get_project_child_list } from '@/api/pensionagency/servers/serves';
    import { Calendar } from "@/utils/index"

    import { } from '@/utils/validate'
    export default {
        name: 'services_record_temperature',
        components: { Pagination, QuickDatePickerWeek },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                set_curDate: false,
                Calendar_obj: null,
                table_loading: false,
                table_total: 0,
                flt: {
                    nameOrBed: "", //姓名/床位
                    pageNum: 1,  //页码
                    pageSize: 10, //条数
                    projectIds: [], //服务ID
                    startDate: undefined, //开始日期
                    endDate: undefined, //结束日期
                },
                columns: [],
                columns_obj: {}
            };
        },
        methods: {
            tableCellClassName({ row, column, rowIndex, columnIndex }) {
                row.index = rowIndex;
                column.index = columnIndex;
            },
            handlRest() {
                this.flt.nameOrBed = ""
                this.flt.pageNum = 1
                this.flt.pageSize = 10
                this.set_curDate = !this.set_curDate
            },
            getDateTime(val) {
                this.columns = (val[0] ?? []).map(item => {
                    // this.columns_obj[item] = []
                    return {
                        date: item,
                        time: [],
                    }
                });

                this.flt.startDate = this.columns[0]?.date?.split(" ")[0]
                this.flt.endDate = this.columns[this.columns.length - 1]?.date?.split(" ")[0]
                this.init()
            },
            async init() {
                let self = this
                self.table_loading = true
                let res = await get_project_record(self.flt)
                this.flt.pageNum = res?.pageNum ?? 1
                this.flt.pageSize = res?.pageSize ?? 10
                this.table_total = res?.totalCount ?? 0
                // let time_between_arr = {}
                let times = await get_project_child_list({ lvIds: this.flt.projectIds.toString() })
                if (Object.prototype.toString.call(times) == '[object Array]') {
                    times = times[0]?.time?.split(",") ?? []
                }
                let r = res?.result ?? []
                let table_data = []
                let d = []

                this.columns = this.columns.map(item => {
                    item.time = times.map((child, index) => {
                        return {
                            columnName: child,
                            prop: `${item.date}（${index}）`
                        }
                    })
                    return item
                })

                // this.columns.forEach(item => {
                //     time_between_arr[item.date] = []
                // })
                for (let i of r) {
                    let obj = {}
                    obj.elderId = i.elderId
                    obj.elderName = i.elderName
                    obj.bedName = i.bedName
                    obj.headPic = i.headPic
                    let t = i.dayOfServiceList ?? []
                    for (let item of t) {
                        obj.serviceDate = item.serviceDate
                        let s = item?.projectList ?? []
                        for (let child of s) {
                            d = d.concat(child?.timeGroups.map(item => {
                                item.serviceDate = this.Calendar_obj.format(new Date(obj.serviceDate))
                                item.elderId = obj.elderId
                                return item
                            }) ?? [])
                        }
                    }
                    table_data.push(obj)
                }
                // for (let p in time_between_arr) {
                //     time_between_arr[p] = times.map((item, index) => {
                //         return {
                //             columnName: item,
                //             prop: `${p}（${index}）`
                //         }
                //     })
                // }
                // for (let i of d) {
                //     this.columns = this.columns.map(item => {
                //         item.time = time_between_arr[item.date]
                //         return item
                //     })
                // }
                table_data = table_data.map(item => {
                    let t = d.filter(c => c.elderId == item.elderId)
                    t.forEach(el => {
                        let s = self.columns.filter(item => item.date == el.serviceDate)[0] ?? {}
                        let times = s.time ?? []
                        let res = times.filter(item => item.columnName == el.serviceTime)[0] ?? {}
                        item[res.prop] = el.data
                    })

                    return item
                })
                console.log(this.columns);
                this.table_data = table_data
                self.table_loading = false
            },
        },
        mounted() {
            let ids = this.$route.params?.serviceTypeId
            this.Calendar_obj = new Calendar()
            if (!isNaN(ids)) {
                this.flt.projectIds = ids.split(",")
                this.init()
            }
        },
    }
</script>
<style lang='scss' scoped>
    @import "../../../../styles/variables.scss";

    .cell-content {
        text-align: center;
        box-sizing: border-box;
        color: $baseColor;
        margin: 0 auto;
        height: 45px;
        &-active {
            border: 1px solid rgb(254, 61, 101);
            background: rgb(255, 228, 234);
            color: rgb(254, 61, 101);
            box-sizing: border-box;
        }
    }

    /deep/ .el-table__body-wrapper .el-table__row td {
        border-right: 1px solid #dfe6ec !important
    }

    /deep/ .el-table__row td {
        padding: 0 !important;

        .cell {
            padding: 0 !important;
            height: 45px;
            line-height: 45px
        }
    }

    /deep/ thead tr:nth-child(1) th {
        padding: 10px 0 !important;
    }

    /deep/ thead tr:nth-child(2) th {
        background: rgb(255, 235, 223);
        padding: 10px 0 !important;
        color: rgb(249, 147, 83)
    }
</style>
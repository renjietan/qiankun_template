<!-- 
 * @description: 卫生清洁表
 * @fileName: services_record_hygiene.vue 
 * @author: 谭人杰 
 * @date: 2021-10-05 16:16:06
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">卫生清洁表</div>
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
            <el-table border :cell-class-name="tableCellClassName" class="table_data" border ref="table_data"
                :data="table_data" v-loading="table_loading" stripe highlight-current-row fit>
                <el-table-column width="120" fixed align="center" prop="elderName" label="姓名"></el-table-column>
                <el-table-column width="120" fixed align="center" prop="bedName" label="床位"></el-table-column>

                <el-table-column align="center" v-for="(item, index) in columns" :label="item.date" :key="item.date">
                    <el-table-column align="center" v-for="child in item.time" :label="child.columnName"
                        :key="child.columnName">
                        <template slot-scope="scope">
                            <div v-if="scope.row[child.prop] && !isCompute(scope.row[child.prop])" class="cell-content cell-content-number">
                                {{ scope.row[child.prop] }}
                            </div>
                            <div v-if="scope.row[child.prop] && isCompute(scope.row[child.prop])"  class="cell-content">
                                <i class="el-icon-circle-check" style="font-size: 20px"></i>
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
        name: 'services_record_hygiene',
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
            };
        },
        methods: {
            tableCellClassName({ row, column, rowIndex, columnIndex }) {
                row.index = rowIndex;
                column.index = columnIndex;
            },
            isCompute(val) {
                let s = val?.split("/") ?? []
                if (s.length < 2) return false

                return s[0] < s[1] ? false : true
            },
            handlRest() {
                this.flt.nameOrBed = ""
                this.flt.pageNum = 1
                this.flt.pageSize = 10
                this.set_curDate = !this.set_curDate
            },
            getDateTime(val) {
                this.columns = (val[0] ?? []).map(item => {
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
                let project_child_list = await get_project_child_list({ lvIds: this.flt.projectIds.toString() })
                let times = project_child_list?.map(item => item.projectName) ?? []
                let r = res?.result ?? []
                let table_data = []
                this.columns = this.columns.map(item => {
                    item.time = times.map((child, index) => {
                        return {
                            columnName: child,
                            prop: `${item.date}（${index}）`
                        }
                    })
                    return item
                })
                for (let i of r) {
                    let obj = {}
                    obj.elderId = i.elderId
                    obj.elderName = i.elderName
                    obj.bedName = i.bedName
                    obj.headPic = i.headPic
                    let t = i.dayOfServiceList ?? []
                    for (let item of t) {
                        obj.serviceDate = item.serviceDate
                        let temp = new Date(obj.serviceDate).getMonth()
                        let s = item?.projectList ?? []
                        for (let child of s) {
                            let temp_index = times.findIndex(el => el == child.projectName)
                            let temp_j = project_child_list[temp_index]?.frequency ?? 0
                            obj[`${this.Calendar_obj.format(new Date(obj.serviceDate))}（${temp_index}）`] = child?.timeGroups?.length ? `${child.timeGroups.length}/${temp_j}` : ""
                        }
                    }
                    table_data.push(obj)
                }
                this.table_data = table_data
                self.table_loading = false
            },
        },
        mounted() {
            let ids = this.$route.params?.serviceTypeId?.split(",") ?? []
            this.Calendar_obj = new Calendar()
            if (!isNaN(ids[0])) {
                this.flt.projectIds = ids
                this.init()
            }
        },
    }
</script>
<style lang='scss' scoped>
    @import "../../../../styles/variables.scss";

    .cell-content {
        text-align: center;
        color: $baseColor;
        margin: 0 auto;
        &-number {
            color: red;
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
            line-height: 45px;

        }
    }

    /deep/ thead tr:nth-child(1) th {
        padding: 10px 0 !important;
    }

    /deep/ thead tr:nth-child(2) th {
        background: rgb(255, 235, 223);
        padding: 10px 0 !important;
        color: rgb(249, 147, 83);
        font-size: 10px;
    }
</style>
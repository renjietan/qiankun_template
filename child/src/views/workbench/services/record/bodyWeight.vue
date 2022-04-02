<!-- 
 * @description: 体重记录表
 * @fileName: services_record_bodyWeight.vue 
 * @author: 谭人杰 
 * @date: 2021-10-04 13:18:39
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">体重记录表</div>
            <div style="display: inline-block;">
                <el-date-picker value-format="yyyy-MM-dd" v-model="flt.yearDate" :clearable="false"
                    @change="handleChange" type="year" placeholder="选择年"></el-date-picker>
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
                            <div v-if="scope.row[child.prop]" class="cell-content">
                                <span>
                                    {{ scope.row[child.prop] }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum"
                :limit.sync="flt.pageSize" @pagination="init" />
        </div>
        <el-dialog v-el-drag-dialog :visible.sync='dialog_cof.visible' :title='dialog_cof.title'
            :destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import QuickDatePickerWeek from "@/components/Quick_DatePicker/week";
    import { get_project_record, get_project_child_list, } from '@/api/pensionagency/servers/serves';
    import { Calendar } from "@/utils/index"
    import { months_obj, months_obj_reverse } from '@/utils/enum';
    import { } from '@/utils/validate'
    export default {
        name: 'services_record_bodyWeight',
        components: { Pagination, QuickDatePickerWeek },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                set_curDate: false,
                table_loading: false,
                table_total: 0,
                flt: {
                    nameOrBed: "", //姓名/床位
                    pageNum: 1,  //页码
                    pageSize: 10, //条数
                    projectIds: [], //服务ID
                    startDate: undefined, //开始日期
                    endDate: undefined, //结束日期
                    yearDate: null,
                },
                dialog_cof: {
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
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
            handleChange(v) {
                if (v != null) {
                    let t = v.split("-")[0]
                    this.flt.startDate = `${t}-01-01`
                    this.flt.endDate = `${t}-12-31`
                    this.init()
                }
            },
            handlRest() {
                this.flt.nameOrBed = ""
                this.flt.pageNum = 1
                this.flt.pageSize = 10
                this.set_curDate = !this.set_curDate
            },

            async init() {
                let self = this
                self.table_loading = true
                let res = await get_project_record(self.flt)
                this.flt.pageNum = res?.pageNum ?? 1
                this.flt.pageSize = res?.pageSize ?? 10
                this.table_total = res?.totalCount ?? 0
                // let time_between_arr = {}
                let times = ["体重（增减）", "备注"]
                let r = res?.result ?? []
                let table_data = []
                // this.columns.forEach(item => {
                //     time_between_arr[item.date] = []
                // })
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
                        s = s[0]?.data
                        obj[`${months_obj[temp]}（0）`] = s
                    }
                    table_data.push(obj)
                }
                table_data = table_data.map(item => {
                    let keys = []
                    for (const key in item) {
                        let s = months_obj_reverse[key.split("（")[0]]
                        if (s != undefined) {
                            for (let i = 0; i < s; i++) {
                                let m = `${months_obj[i]}（0）`
                                if (item[m] != undefined) {
                                    let s = item[key].split("（")[0]
                                    let h = item[m].split("（")[0]
                                    item[key] = `${s}（${s - h}）`
                                }
                                    
                            }
                            
                        }
                    }
                    return item
                })
                this.table_data = table_data
                self.table_loading = false
            },
        },
        mounted() {
            let ids = this.$route.params?.serviceTypeId?.split(",") ?? []
            this.flt.yearDate = `${new Date().getFullYear()}-01-01`
            this.flt.startDate = `${new Date().getFullYear()}-01-01`
            this.flt.endDate = `${new Date().getFullYear()}-12-31`

            this.columns = Array.from({ length: 12 }, (item, index) => {
                return {
                    date: months_obj[index],
                    time: []
                }
            })
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
        border-radius: 50%;
        text-align: center;
        color: $baseColor;
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
        color: rgb(249, 147, 83);
        font-size: 9px;

        .cell {
            white-space: nowrap;
            width: 92px;
        }
    }
</style>
<!-- 
 * @description: 助浴记录表
 * @fileName: services_record_bath.vue 
 * @author: 谭人杰 
 * @date: 2021-10-05 16:16:06
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">助浴记录表</div>
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
                <el-button :type="isEdit ? 'danger' : 'primary'" @click="handle_unLock">
                    {{ isEdit ? '保存计划' : '编辑计划' }}
                </el-button>
                <el-button type="warning">导出</el-button>
                <el-button type="primary">打印</el-button>
            </div>
            <el-table border @cell-click="handleClick_Cell" :cell-class-name="tableCellClassName" class="table_data"
                border ref="table_data" :data="table_data" v-loading="table_loading">
                <el-table-column width="120" fixed align="center" prop="elderName" label="姓名"></el-table-column>
                <el-table-column width="120" fixed align="center" prop="bedName" label="床位"></el-table-column>
                <el-table-column align="center" v-for="(item, index) in columns" :label="item.date" :key="item.date">
                    <el-table-column align="center" v-for="child in item.time" :label="child.columnName"
                        :key="child.columnName">
                        <template slot-scope="scope">
                            <div v-if="scope.row[child.prop] && scope.column.label == '血压'"
                                class="cell-content cell-content-left">
                                <div v-if="scope.row[child.prop] > 0">
                                    {{ scope.row[child.prop] }}
                                </div>
                            </div>
                            <div v-if="scope.row[child.prop] && scope.column.label == '确认'"
                                class="cell-content cell-content-right">
                                <div v-if="scope.row[child.prop] == 1">
                                    <i class="el-icon-circle-check"
                                        :style="{'fontSize': '20px', color: $variables.baseColor}"></i>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="床品更换">
                    <template slot-scope="scope">
                        <div v-if="scope.row.bedclothes == 1">
                            <i class="el-icon-circle-check"
                                :style="{'fontSize': '20px', color: $variables.baseColor}"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="被褥暴晒">
                    <template slot-scope="scope">
                        <div v-if="scope.row.exposure == 1">
                            <i class="el-icon-circle-check"
                                :style="{'fontSize': '20px', color: $variables.baseColor}"></i>
                        </div>
                    </template>
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
    import { get_project_bath_record, set_bath_plan } from '@/api/pensionagency/servers/serves';
    import { Calendar } from "@/utils/index"

    import { } from '@/utils/validate'
    export default {
        name: 'services_record_bath',
        components: { Pagination, QuickDatePickerWeek },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                table_data_old: [],
                set_curDate: false,
                Calendar_obj: null,
                table_loading: false,
                table_total: 0,
                isEdit: false,
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
            handleClick_Cell(row, column, cell, event) {
                let self = this
                if (!self.isEdit) {
                    self.$notify({
                        type: "warning",
                        message: "请点击【编辑计划】按钮，进行解锁",
                        title: "提示"
                    });
                    return
                }
                let columnIndex = column.index - 2
                let rowIndex = row.index
                let date = this.columns[Math.floor(columnIndex / 2)]?.date
                const r = { ...row }
                if (r[`${date}（0）`] != undefined && r[`${date}（1）`] != undefined && r[`${date}（0）`] != -1 && r[`${date}（1）`] != -1) {
                    self.$notify({
                        type: "warning",
                        message: "不可选中",
                        title: "提示"
                    });
                    return
                } else if (r[`${date}（0）`] == -1 && r[`${date}（1）`] == -1) {
                    delete r[`${date}（0）`]
                    delete r[`${date}（1）`]
                } else {
                    r[`${date}（0）`] = -1
                    r[`${date}（1）`] = -1
                }
                this.$set(this.table_data, rowIndex, r)
            },
            handle_unLock() {
                this.isEdit = !this.isEdit
                let self = this
                if (!this.isEdit) {
                    let req = {}
                    let data = this.table_data.filter(item => Object.values(item).some(child => child == -1))
                    data.forEach(item => {
                        for (let i in item) {
                            let obj = {
                                elderId: item.elderId,
                            }
                            let arr = i.split("（")
                            if (arr.length >= 2 && item[i] == -1 && i.indexOf("（0）") >= 0) {
                                obj.serviceDate = arr[0].trim()
                                obj.columnName = i
                                obj.elderId = item.elderId
                                obj.elderName = item.elderName
                                obj.planId = item[`${i}_Id`]
                                if (req[item.elderId] == undefined) {
                                    req[item.elderId] = {}
                                }
                                req[item.elderId][obj.columnName] = obj
                            }
                        }
                    })
                    for (const key in this.table_data_old) {
                        let j = this.table_data_old[key]
                        if (req[key] == undefined && Object.keys(j).length > 0) {
                            req[key] = {}
                            for (const k in j) {
                                j[k].isCancel = 1
                                req[key][k] = j[k]
                            }
                        } else {
                            for (const k in j) {
                                if (req[key][k] == undefined) {
                                    j[k].isCancel = 1
                                    req[key][k] = j[k]
                                }
                            }
                        }

                    }
                    this.table_loading = true
                    req = Object.values(req).map(item => {
                        return Object.values(item)
                    }).flat()
                    set_bath_plan({ req }).then(res => {
                        this.init()
                        this.$notify({
                            type: "success",
                            message: "提交成功",
                            title: "成功"
                        })
                    })
                    this.table_loading = false
                }
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
                let res = await get_project_bath_record(self.flt)
                this.flt.pageNum = res?.pageNum ?? 1
                this.flt.pageSize = res?.pageSize ?? 10
                this.table_total = res?.totalCount ?? 0
                let times = ["血压", "确认"]
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
                    obj.bedclothes = i.bedclothes
                    obj.exposure = i.exposure
                    let t = i.days ?? []
                    for (let child of t) {
                        obj[`${this.Calendar_obj.format(new Date(child.serviceDate))}（0）`] = Object.prototype.toString.call(child.pressureData) == '[object Null]' ? -1 : child.pressureData
                        obj[`${this.Calendar_obj.format(new Date(child.serviceDate))}（1）`] = child.isFinishBath == 0 ? -1 : child.isFinishBath
                        obj[`${this.Calendar_obj.format(new Date(child.serviceDate))}（0）_Id`] = child.planId
                        obj[`${this.Calendar_obj.format(new Date(child.serviceDate))}（1）_Id`] = child.planId
                    }
                    table_data.push(obj)
                }
                this.table_data = table_data
                // this.table_data_old = table_data
                this.table_data_old = table_data.reduce((cur, pre) => {
                    let temp = {}
                    if (cur[pre.elderId] == undefined) {
                        cur[pre.elderId] = {}
                    }
                    for (let i in pre) {
                        if (pre[i] == -1 && i.indexOf("（0）") >= 0) {
                            temp[i] = {
                                planId: pre[`${i}_Id`],
                                elderName: pre.elderName,
                                elderId: pre.elderId,
                                serviceDate: i.split("（")[0].trim()
                                
                            }
                        }
                    }
                    cur[pre.elderId] = { ...cur[pre.elderId], ...temp }
                    return cur
                }, {})
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
        height: 45px;

        &-left {
            border-top: 1px solid $baseColor;
            border-left: 1px solid $baseColor;
            border-bottom: 1px solid $baseColor;
            box-sizing: border-box;
        }

        &-right {
            border-top: 1px solid $baseColor;
            border-right: 1px solid $baseColor;
            border-bottom: 1px solid $baseColor;
            border-left: 0
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
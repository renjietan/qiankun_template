<!-- 
 * @description: 翻身记录表
 * @fileName: services_record_rollover.vue 
 * @author: 谭人杰 
 * @date: 2021-10-05 16:16:06
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">翻身记录表</div>
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
            <el-table border :cell-class-name="tableCellClassName" class="table_data" border ref="table_data"
                :data="table_data" v-loading="table_loading" stripe highlight-current-row fit>
                <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
                <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
                <el-table-column align="center" prop="serviceDate" label="日期"></el-table-column>
                <el-table-column align="center" prop="serviceTime" label="时间"></el-table-column>
                <el-table-column align="center" prop="lie_down_pos" label="卧位"></el-table-column>
                <el-table-column align="center" prop="skin" label="皮肤情况"></el-table-column>
                <el-table-column align="center" prop="nursing" label="护理措施">
                    <template slot-scope="scope">
                        <div  class="cell-content">
                            {{ scope.row.nursing }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="operator" label="执行者"></el-table-column>
            </el-table>
            <div style="display: flex; justify-content: space-between; align-items: center">
                <div class="footer_score">
                    <div class="footer_score" v-for="item in rollover_score" :key="item.label">
                        <div class="footer_score_radius">
                            {{ item.value }}
                        </div>
                        <div class="footer_score_label">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum"
                    :limit.sync="flt.pageSize" @pagination="init" />
            </div>
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
    import { get_project_rollover_record, get_project_child_list } from '@/api/pensionagency/servers/serves';
    import { Calendar } from "@/utils/index"
    import { rollover_score } from '@/utils/enum';
    import { } from '@/utils/validate'
    export default {
        name: 'services_record_rollover',
        components: { Pagination, QuickDatePickerWeek },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                rollover_score,
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
                let res = await get_project_rollover_record(self.flt)
                this.flt.pageNum = res?.pageNum ?? 1
                this.flt.pageSize = res?.pageSize ?? 10
                this.table_total = res?.totalCount ?? 0
                let table_data = res?.result ?? []
                this.table_data = table_data.map(item => {
                    let { data } = item
                    data = (data ?? "").split("/")
                    item.lie_down_pos = data[0] ?? ""
                    item.skin = data[2] ?? "" 
                    let nursing = data[1] ?? ""
                    nursing = nursing.split(".")[0]
                    item.nursing = nursing
                    return item
                })
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
        width: 25px;
        line-height: 25px;
        margin: 7.5px auto !important;
        border-radius: 50%;
        text-align: center;
        border: 1px solid $baseColor;
        color: $green;
        margin: 0 auto;
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
        color: rgb(249, 147, 83)
    }
</style>
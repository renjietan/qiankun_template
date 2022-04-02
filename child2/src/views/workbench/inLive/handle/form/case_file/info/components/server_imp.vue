<!-- 
 * @description: 服务实施
 * @fileName: server_imp.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
    <div>
        <el-form :inline="true">
            <el-row>
                <el-col :span="4">
                    <el-form-item class="default" label="日期">
                        <!-- <el-date-picker  v-model="flt.dateTime" type="date" placeholder="请选择"></el-date-picker> -->
                        <el-date-picker :clearable="false" v-model="flt.dateTime" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
            <el-table-column width="100" align="center" prop="index" label="序号">
                <template slot-scope="scope">
                    <div :style="{color: $variables.baseColor }">
                        {{ formatZero(scope.$index + 1, 2) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="projectName" label="服务项目"></el-table-column>
            <el-table-column align="center" prop="planServiceTime" label="服务计划时间"></el-table-column>
            <el-table-column align="center" prop="actualServiceTime" label="服务实际时间"></el-table-column>
            <el-table-column align="center" prop="operator" label="服务人员"></el-table-column>
            <el-table-column align="center" prop="result" label="实施结果"></el-table-column>
            <!-- <el-table-column align="center" prop="name" label="备注"></el-table-column> -->
        </el-table>
        <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
            @pagination="init" />
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { formatZero } from '@/filters';
    import { get_project_record_by_elderId } from '@/api/pensionagency/servers/serves';
    import { Calendar, parseTime } from "@/utils/index"
    import { } from '@/utils/validate'
    export default {
        name: 'server_imp',
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                table_loading: false,
                table_total: 0,
                Calendar_obj: null,
                flt: {
                    pageNum: 1,
                    pageSize: 10,
                    dateTime: [],
                    elderId: undefined,
                },
            };
        },
        watch: {
            "flt": {
                deep: true,
                handler: function(n) {
                    console.log(n);
                }
            }
        },
        methods: {
            formatZero,
            async init() {
                let self = this
                const params = { ...self.flt }
                params.startDate = parseTime(self.flt.dateTime[0], "{y}-{m}-{d}")
                params.endDate = parseTime(self.flt.dateTime[1], "{y}-{m}-{d}")
                delete params.dateTime
                this.table_loading = true
                let data = await get_project_record_by_elderId(params)
                this.table_loading = false
                this.table_total = data?.totalCount ?? 0
                this.table_data = data?.result ?? []
                this.flt.pageNum = data?.pageNum ?? 0
                this.flt.pageSize = data?.pageSize ?? 0
            },
        },
        mounted() {
            let elderId = this.$route.params.id
            this.Calendar_obj = new Calendar()
            let curDate = this.Calendar_obj.ThisWeek(new Date())
            let start_between = new Date(curDate[0].split("  ")[0])
            let end_between = new Date(curDate[curDate.length - 1].split("  ")[0])
            this.flt.dateTime = [start_between, end_between]
            if (!isNaN(elderId)) {
                this.flt.elderId = parseInt(elderId)
                this.init()
            }
        },
    }
</script>
<style lang='scss' scoped>
</style>
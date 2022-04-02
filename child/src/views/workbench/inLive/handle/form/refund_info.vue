<!-- 
 * @description: 退费详情
 * @fileName: refund_info.vue 
 * @author: 谭人杰 
 * @date: 2021-06-24 23:45:40
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <basic-info-table></basic-info-table>
        <div class="container_card">
            <el-table class="table_data" border ref="table_data" :data="table_data" v-loading="table_loading" stripe
            highlight-current-row fit>
            <el-table-column align="center" label="序号">
                <template slot-scope="scope">
                    <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index + 1,2) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="科目费用"></el-table-column>
            <el-table-column align="center" prop="name" label="请假开始时间"></el-table-column>
            <el-table-column align="center" prop="name" label="请假结束时间"></el-table-column>
            <el-table-column align="center" prop="name" label="请假事由"></el-table-column>
            <el-table-column align="center" prop="name" label="实际返院日"></el-table-column>
            <el-table-column align="center" prop="name" label="计算开始日"></el-table-column>
            <el-table-column align="center" prop="name" label="计算结束日"></el-table-column>
            <el-table-column align="center" prop="name" label="请假天数"></el-table-column>
            <el-table-column align="center" prop="name" label="退费天数"></el-table-column>
            <el-table-column align="center" prop="name" label="退费金额"></el-table-column>
            <el-table-column align="center" prop="name" label="费用期"></el-table-column>
            <el-table-column align="center" prop="name" label="状态"></el-table-column>
            <el-table-column align="center" prop="name" label="操作者"></el-table-column>
            <el-table-column align="center" prop="name" label="操作时间"></el-table-column>
        </el-table>
        <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber"
            :limit.sync="flt.pageSize" @pagination="getList" />
        </div>
        <div class="footer">
            <el-button type="info" @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import BasicInfoTable from '@/components/Basicinfo/table';
    import elDragDialog from '@/directive/el-drag-dialog'
    import { formatZero } from '@/filters';
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { } from '@/utils/validate'
    export default {
        name: 'inLive_handle_form_refund_info',
        components: { Pagination, BasicInfoTable },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                flt: {
                    pageNumber: 1,
                    pageSize: 10,
                },
                table_data: [],
                table_total: 0,
                table_loading: false,
            };
        },
        methods: {
            formatZero,
            getList() {
                this.table_data = [{
                    name: 1
                }]
            },
        },
        mounted() {
            this.getList()
        },
    }
</script>
<style lang='scss' scoped>
</style>
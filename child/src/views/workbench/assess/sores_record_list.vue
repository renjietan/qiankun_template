<!-- 
 * @description: 评估中心-查看记录-压疮
 * @fileName: sores_record_list.vue 
 * @author: 谭人杰 
 * @date: 2021-06-16 19:57:13
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card" style="position: absolute; top: 0;width: 100%;left: 0;padding: 20px 30px;">
            <div class="title">能力评估记录--谭人杰</div>
        </div>
        <div class="container_card " style="margin-top: 60px;">
            <el-row style="margin-bottom: 20px;">
                <el-col :span="12">
                    <el-button icon="el-icon-takeaway-box" type="info">评估结果比较</el-button>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-button icon="el-icon-takeaway-box" type="warning">评估</el-button>
                </el-col>
            </el-row>
            <el-table  class="table_data" height="300px" v-el-height-adaptive-table="{bottomOffset: 100}"
                ref="data_table" :data="table_data" v-loading="table_loading" stripe highlight-current-row fit>
                <el-table-column align="center"  label="序号">
                    <template slot-scope="scope">
                        <span>{{ formatZero(scope.$index,2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="name" label="姓名"></el-table-column>
                <el-table-column align="center"  prop="name" label="评估日期"></el-table-column>
                <el-table-column align="center"  prop="name" label="评估结果"></el-table-column>
                <el-table-column align="center"  prop="name" label="评估人"></el-table-column>
                <el-table-column align="center" width="330" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-link :underline="false" type="primary" @click="$router.push(`/workbench/workbench/assess/form/record_sores_info/1`)">详情</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" type="warning">评估结果确认书</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="table_total > 0"  :total="table_total" :page.sync="flt.pageNumber"
                :limit.sync="flt.pageSize" @pagination="getList" />
        </div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import elHeightAdaptiveTable from '@/directive/el-table'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { formatZero } from '@/filters';
    import { } from '@/utils/validate'
    export default {
        name: 'assess_sores_record_list',
        components: { Pagination },
        directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
        data() {
            return {
                table_data: Array.from({length: 10}, (item,index) => {name: index}),
                table_loading: false,
                table_total: 400,
                flt: {
                    pageNumber: 1,
                    pageSize: 10
                },
                dialog_cof: {
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                }
            };
        },
        methods: {
            formatZero,
        },
        mounted() {
        },
    }
</script>
<style lang='scss' scoped>
</style>
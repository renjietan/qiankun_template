<!-- 
 * @description: 评估记录
 * @fileName: CV_record.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
    <div class="container">
        <div class="container_card">
            <div class="title" style="margin-bottom: 20px;">
                <div>能力评估记录</div>
                <div>
                    <el-button type="primary">服务等级调整</el-button>
                    <el-button type="info">评估结果确比较</el-button>
                    <el-button type="primary">评估结果统计</el-button>
                </div>
            </div>
            <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
                <el-table-column width="100" align="center" prop="index" label="序号">
                    <template slot-scope="scope">
                        <div :style="{color: $variables.baseColor }">
                            {{ formatZero(scope.$index + 1, 2) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" prop="name" label="评估日期"></el-table-column>
                <el-table-column align="center" prop="name" label="评估等级"></el-table-column>
                <el-table-column align="center" prop="name" label="日常生活活动"></el-table-column>
                <el-table-column align="center" prop="name" label="精神状态"></el-table-column>
                <el-table-column align="center" prop="name" label="感知觉与沟通"></el-table-column>
                <el-table-column align="center" prop="desc" label="社会参与"></el-table-column>
                <el-table-column align="center" prop="desc" label="评估人"></el-table-column>
                <el-table-column align="center" width="350" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-link :underline="false" type="primary">详情</el-link>
                            <el-link :underline="false" type="warning">评估结果确认书</el-link>
                            <el-link :underline="false" type="warning">能力评估表</el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber"
                :limit.sync="flt.pageSize" @pagination="getList" />
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
    import { formatZero } from '@/filters';
    import { } from '@/utils/validate'
    export default {
        name: 'inLive_handle_form_CV_record',
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                table_data: [],
                table_loading: false,
                table_total: 0,
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
            getList() {
                this.table_data = Array.from({ length: 10 }).map(item => {
                    return { name: "1" }
                })
                this.table_total = 45
            }
        },
        mounted() {
            this.getList()
        },
    }
</script>
<style lang='scss' scoped>
</style>
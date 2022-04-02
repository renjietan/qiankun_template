<!-- 
 * @description: 
 * @fileName: test1.vue 
 * @author: 谭人杰 
 * @date: 2021-05-16 22:57:29
 * @后台人员:  
!-->
<template>
    <div class=''>
        <el-table height="300px" v-el-height-adaptive-table="{bottomOffset: 30}">
            <el-table-column label="姓名"></el-table-column>
        </el-table>
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
    import elHeightAdaptiveTable from '@/directive/el-table'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { } from '@/utils/validate'
    export default {
        name: 'test1',
        components: { Pagination },
        directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
        data() {
            return {
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
        },
        mounted() {
        },
    }
</script>
<style lang='scss' scoped>
</style>
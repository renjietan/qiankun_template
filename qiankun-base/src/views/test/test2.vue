<!-- 
 * @description: 
 * @fileName: test2.vue 
 * @author: 谭人杰 
 * @date: 2020-06-11 17:23:02
 * @后台人员:  
!-->
<template>
    <div class=''>
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
    import { } from '@/utils/validate'
    export default {
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                dialog_cof: {
                    visible: true,
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
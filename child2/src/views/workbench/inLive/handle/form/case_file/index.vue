<!-- 
 * @description: 
 * @fileName: case_file.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 18:07:50
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <basic-info-table :olderInfo="$route.query.info"></basic-info-table>
        <div class="container_card">
            <div class="el-tag-box">
                <el-tag v-for="item in tag_list" :key="item.name" size="medium" @click="handleSelect(item)"
                    class="el-tag-cst" :type="item.name == cur_tag.name ? 'primary' : 'info'"
                    :effect="item.name == cur_tag.name ? 'dark' : 'plain'">
                    {{ item.name }}
                </el-tag>
            </div>
            
            <div class="el-tag-box-border"></div>
            <Info :tags="cur_tag.components"></Info>
        </div>

        <el-dialog class="el-dialog-2" v-el-drag-dialog :visible.sync='dialog_cof.visible' :title='dialog_cof.title'
            :destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import BasicInfoTable from '@/components/Basicinfo/table';
    import Info from './info';

    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { tag_list } from '@/utils/enum';
    import { } from '@/utils/validate'
    export default {
        name: 'inLive_handle_form_case_file',
        components: { Pagination, BasicInfoTable, Info },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                tag_list,
                cur_tag: {
                    components: []
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
            handleSelect(item) {
                this.cur_tag = item
            }
        },
        activated() {
            const {id} = this.$route.params;
            this.cur_tag = this.tag_list[this.$route.query.navid || 0];
        },
        mounted(){
            this.cur_tag = this.tag_list[0]
        }
    }
</script>
<style lang='scss' scoped>
    .el-tag-box {
        display: inline-block;
        padding-bottom: 30px;
        & .el-tag-cst {
            margin: 0 17px 0 0px;
            cursor: pointer;
        }

        & .el-tag-box-border {
            height: 15px;
        }
    }
</style>
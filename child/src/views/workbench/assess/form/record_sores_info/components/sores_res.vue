<!-- 
 * @description: 压疮评估 
 * @fileName: sores.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
    <div style="padding-bottom: 20px;">
        <div style="margin: 0 0 20px 0;">
            <el-form :inline="true" hide-required-asterisk status-icon>
                <el-row>
                    <el-col :span="4">
                        <el-form-item class="readonly" label="评估结果">
                            <el-input readonly v-model="form_data.res" required placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item class="default nolabel" label="占位" style="text-align: right;">
                            <el-button type="info" icon="el-icon-plus">评估结果确认书</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="title" style="font-size: 15px;margin: 20px 0;">评估明细</div>
            <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
                <el-table-column width="100" align="center" prop="name" label="评估内容"></el-table-column>
                <el-table-column width="100" align="center" prop="name" label="完成度"></el-table-column>
                <el-table-column align="left" prop="name" label="得分"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { } from '@/utils/validate'
    import { arrayGroupBy } from '@/utils/index'
    export default {
        name: 'sores',
        components: { Pagination },
        directives: { waves, },
        watch: {
            // form_data: {
            //     deep: true,
            //     handler: function (newval, oldva) {
            //         this.$emit("getData", {
            //             form_data: this.checkList_model,
            //             checkList_model: this.checkList_model
            //         })
            //     }
            // },
            // checkList_model: {
            //     deep: true,
            //     handler: function (newval, oldval) {
            //         this.$emit("getData", {
            //             form_data: this.checkList_model,
            //             checkList_model: this.checkList_model
            //         })
            //     }
            // }
        },

        data() {
            return {
                form_data: {
                    res: "",
                },
                table_loading: false,
                table_data: [{
                    name: "感知能力",
                    num: 10,
                    bz: "哈哈哈啊"
                }, {
                    name: "感知能力",
                    num: 5,
                    bz: "哈哈哈啊"
                }, {
                    name: "感知能力",
                    num: 0,
                    bz: "哈哈哈啊"
                }, {
                    name: "潮湿程度",
                    num: 10,
                    bz: "哈哈哈啊"
                }, {
                    name: "潮湿程度",
                    num: 5,
                    bz: "哈哈哈啊"
                }, {
                    name: "潮湿程度",
                    num: 10,
                    bz: "哈哈哈啊"
                }, {
                    name: "生活能力",
                    num: 10,
                    bz: "哈哈哈啊"
                }, {
                    name: "生活能力",
                    num: 5,
                    bz: "哈哈哈啊"
                }, {
                    name: "生活能力",
                    num: 0,
                    bz: "哈哈哈啊"
                }],
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
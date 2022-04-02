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
                        <el-form-item class="readonly" label="评分总和">
                            <el-input readonly v-model="form_data.sum" required placeholder="请输入评分总和"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <el-table border :span-method="objectSpanMethod" ref="data_table" :data="table_data"
                v-loading="table_loading" fit>
                <el-table-column width="200" align="center" prop="name" label="项目名称"></el-table-column>
                <el-table-column width="200" align="center" prop="num" label="分值"></el-table-column>
                <el-table-column width="200" align="center" label="评分">
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList_model[table_data[scope.$index].value_key]">
                            <el-checkbox>
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="bz" label="评分标准"></el-table-column>
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
                    sum: "",
                },
                checkList_model: {},
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
                table_data_obj: {}
            };
        },
        methods: {
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    let config = {
                        rowspan: row.isFirst ? this.table_data_obj[row.name].length : 0,
                        colspan: 1
                    }
                    return config;
                }
            },
            parseTableData() {
                let self = this
                self.table_data = self.table_data.map((item, index) => {
                    item.value_key = `${index}`
                    self.$set(self.checkList_model, item.value_key, false)
                    return item
                })
            },
        },
        mounted() {
            this.parseTableData();
            this.table_data_obj = arrayGroupBy(this.table_data, "name")
        },
    }
</script>
<style lang='scss' scoped>
</style>
<template>
    <div class="">
        <el-table class="spanTable" border :row-class-name="tableRowClassName" :span-method="objectSpanMethod" ref="data_table"
            :data="table_data" v-loading="loading" fit>
            <el-table-column width="200" v-for="(item, index) in columns" :key="index" align="center" :prop="item.field" :label="item.label"></el-table-column>
            <!-- <el-table-column width="200" align="center" prop="index" label="序号"></el-table-column>
            <el-table-column width="200" align="center" prop="time" label="时间周期"></el-table-column>
            <el-table-column width="200" align="center" prop="sfbz" label="收费标准"></el-table-column>
            <el-table-column width="200" align="center" prop="zk" label="折扣后"></el-table-column>
            <el-table-column align="center" prop="desc" label="收费说明"></el-table-column> -->
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <div>
                        <el-link :underline="false" type="primary">修改</el-link>
                        <el-link :underline="false" type="danger">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                table_data: [],
                table_columns: [],
            }
        },
        watch: {
            data: {
                deep: true,
                immediate: true,
                handler: function(newval) {
                    this.table_data = newval
                }
            },
            // columns: {
            //     deep: true,
            //     immediate: true,
            //     handler: function(newval) {
            //         this.table_columns = newval
            //     }
            // },
        },
        props: {
            columns: {
                type:Array,
                default: () => [],
            },
            loading: false,
            data: {
                type: Array,
                default: () => [],
            }
        },
        mounted() {
        },
        methods: {
            tableRowClassName({ row, rowIndex }) {
                if (isNaN(parseInt(row.index))) {
                    return 'warning-row';
                } else {
                    return ""
                }
            },
            parseTableData() {
                let temp = this.table_data.reduce((cur, pre) => {
                    pre.sfbz = `${pre.sfbz.toLocaleString()}/${pre.unit}`
                    pre.zk = `${pre.zk.toLocaleString()}/${pre.unit}`
                    if (cur[pre.type] == undefined) {
                        pre.index = "01"
                        cur[pre.type] = [pre]
                    } else {
                        let length = cur[pre.type].length
                        pre.index = length < 9 ? "0" + length : length
                        cur[pre.type] = [...cur[pre.type], ...[pre]]
                    }
                    return cur
                }, {})
                let table_data = []
                for (var i in temp) {
                    table_data = [...table_data, ...[{ "index": i }], ...temp[i]]
                }
                return table_data
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (isNaN(parseInt(row.index))) {
                    let config = {
                        rowspan: 1,
                        colspan: 5
                    }
                    return config;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .basic_info_box {
        margin-top: 20px;
        /* line-height: 50px; */
    }

    .table_basic /deep/ .el-table__body tr.el-table__row>td {
        background-color: transparent !important;
    }
</style>
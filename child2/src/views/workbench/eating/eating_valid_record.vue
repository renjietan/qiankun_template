<!-- 
 * @description: 验餐记录
 * @fileName: eating_valid_record.vue 
 * @author: 谭人杰 
 * @date: 2021-06-14 00:25:28
 * @后台人员:  
!-->
<template>

    <div class='container'>
        <div class="container_card">
            <el-row class="filter_date">
                <el-col :span="18">
                    <quick-date-picker-day @getData="getPickerData"></quick-date-picker-day>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary" plain>重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="container_card">
            <el-row style="line-height: 80px;margin-top: -30px;">
                <el-col :span="6">
                    <div class="title">膳食列表</div>
                </el-col>
                <!-- <el-col :span="18" style="text-align: right;">
                    <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加服务项目')">添加</el-button>
                </el-col> -->
            </el-row>
            <el-table border class="table_data_2" ref="data_table" :data="table_data" v-loading="table_loading" stripe
                highlight-current-row fit>
                <el-table-column prop="eatingTime" align="center" label="就餐时间" width="100"></el-table-column>
                <el-table-column align="left" label="菜单">
                    <template slot-scope="scope">
                        <div class="cell-template">
                            <ul>
                                <li v-for="item in scope.row.foods_list">
                                    <span>{{ item.foodName }}</span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="left" label="留样"></el-table-column> -->
                <el-table-column align="left" prop="foodHardness" label="主食软硬">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.foodHardness.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.foodHardness" :max="1">
                                <el-checkbox v-for="item in ry" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="taste" label="调味">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.taste.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.taste" :max="1">
                                <el-checkbox v-for="item in tw" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="appetite" label="分量">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.appetite.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.appetite" :max="1">
                                <el-checkbox v-for="item in fl" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="sideDish" label="配菜">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.sideDish.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.sideDish" :max="1">
                                <el-checkbox v-for="item in pcszzp" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="colour" label="色泽">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.colour.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.colour" :max="1">
                                <el-checkbox v-for="item in pcszzp" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="sabot" label="装盘">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">
                            {{ scope.row.sabot.toString() }}
                        </div>
                        <div v-else style="margin: 10px 0;">
                            <el-checkbox-group v-model="scope.row.sabot" :max="1">
                                <el-checkbox v-for="item in pcszzp" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="operatorName" label="验餐者"></el-table-column>
                <el-table-column align="left" prop="date" label="验餐时间"></el-table-column>
                <el-table-column align="left" prop="elderSuggest" label="建议/长者意见"></el-table-column>
                <el-table-column align="center" width="350" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-link v-if="!scope.row.isEdit" :underline="false" type="primary"
                                @click="handleEdit(scope)">编辑</el-link>
                            <el-link v-if="scope.row.isEdit" :underline="false" type="primary"
                                @click="handleSave(scope)">保存</el-link>
                            <el-link :underline="false" type="danger" @click="handleDel(scope.row)">删除</el-link>
                        </div>
                    </template>
                </el-table-column>

            </el-table>
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
    import QuickDatePickerDay from '@/components/Quick_DatePicker/day'
    import { parseTime } from '@/utils/index';
    import { valid_record } from '@/api/system/test'
    import { formatZero } from '@/filters'
    import { inspction_foodrecord, delete_eating_record, set_eating_record } from '@/api/pensionagency/eating/meal_inspection_record'
    import { foods_record_opt } from '@/utils/enum';
    import { } from '@/utils/validate'
    export default {
        name: 'eating_eating_valid_record',
        components: { Pagination, QuickDatePickerDay },
        directives: { waves, permission, elDragDialog, },
        data() {
            let { ry, tw, fl, pcszzp, } = foods_record_opt;
            return {
                ry,
                tw,
                fl,
                pcszzp,
                flt: {
                    date: new Date(),
                },
                table_data: [],
                table_loading: false,
                table_total: 0,
                dialog_cof: {
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                },
                test: []
            };
        },
        methods: {
            formatZero,
            parseTime,
            getPickerData(val) {
                this.flt.date = val
                this.init()
            },
            handleDel(data) {
                this.table_loading = true
                delete_eating_record({
                    id: data.id
                }).then((result) => {
                    this.$notify({
                        title: "成功",
                        type: "success",
                        message: "操作成功"
                    })
                    this.init()
                })
            },
            handleSave(row) {
                this.table_loading = true
                const item = { ...this.table_data[row.$index] }
                // d.isEdit = false
                item.foodHardness = item.foodHardness.toString()
                item.taste = item.taste.toString()
                item.appetite = item.appetite.toString()
                item.sideDish = item.sideDish.toString()
                item.colour = item.colour.toString()
                item.sabot = item.sabot.toString()
                set_eating_record(item).then(res => {
                    this.$notify({
                        title: "成功",
                        type: "success",
                        message: "操作成功",
                    })
                    this.init()
                })
                // this.$set(this.table_data, row.$index, d)
            },
            handleEdit(row) {
                const d = { ...this.table_data[row.$index] }
                d.isEdit = true
                this.$set(this.table_data, row.$index, d)
            },
            async init() {
                let params = { ...this.flt }
                params.date = parseTime(params.date, "{y}-{m}-{d}")
                this.table_data = []
                this.table_loading = true
                let res = []
                try {
                    res = await inspction_foodrecord(params)
                } catch (error) {
                    this.table_loading = false
                }
                res = (res ?? [])
                for (const item of res) {
                    if (item.foodType == "B") {
                        item.eatingTime = "早餐"
                        item.foods_list = item.breakfasts
                        delete item.breakfasts
                    } 
                    else if (item.foodType == "E") {
                        item.eatingTime = "点心"
                        item.foods_list = item.snack
                        delete item.snack
                    } 
                    else if (item.foodType == "L") {
                        item.eatingTime = "午餐"
                        item.foods_list = item.lunch
                        delete item.lunch
                    } 
                    else if (item.foodType == "A") {
                        item.eatingTime = "下午茶"
                        item.foods_list = item.afternoonTeas
                        delete item.afternoonTeas
                    } else if (item.foodType == "D") {
                        item.eatingTime = "晚餐"
                        item.foods_list = item.dinners
                        delete item.dinners
                    }
                    item.date = parseTime(new Date(item.date), "{y}-{m}-{d}")
                    item.foodHardness = [item.foodHardness ?? ""]
                    item.taste = [item.taste ?? ""]
                    item.appetite = [item.appetite ?? ""]
                    item.sideDish = [item.sideDish ?? ""]
                    item.colour = [item.colour ?? ""]
                    item.sabot = [item.sabot ?? ""]
                    item.isEdit = false;
                }
                this.table_data = res
                this.table_loading = false
            }
        },
        mounted() {
            this.init()
        },
    }
</script>
<style lang='scss' scoped>
    @import "../../../styles/variables.scss";

    .filter_date {
        .el-tag {
            height: 33px;
            line-height: 33px;
            margin-left: -110px;
            position: absolute;
            background: transparent;
            border: 0;
            color: rgb(96, 98, 102)
        }
    }

    .cell-picker {
        /deep/ .el-date-editor {
            width: 140px;
        }
    }
</style>
<!-- 
 * @description: 生日管理
 * @fileName: inLive_birthday_list.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 11:50:02
 * @后台人员:  
!-->
<template>
    <div class="container">
        <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
        <div class="container_card" style="padding-top:12px">
            <el-form :inline="true" ref="flt" :model="flt" hide-required-asterisk status-icon>
                <el-row>
                    <el-col :span="21">
                        <el-row>
                            <span style="display:inline-block;font-size: 14px;color:#333333;font-weight: 600">月份：</span>
                            <el-select v-model="flt.month" placeholder="请选择">
                                <el-option v-for="item in months" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-row>
                    </el-col>
                    <el-col :span="3" style="text-align: right">
                        <div style="display: inline-block; margin-left: 10px">
                            <el-button type="primary" @click="getList">查询</el-button>
                            <el-button @click="reset_flt">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="container_card">
            <el-table class="table_data" border ref="table_data" :data="table_data" v-loading="table_loading" stripe
                highlight-current-row fit>
                <el-table-column align="center" label="序号">
                    <template slot-scope="scope">
                        <span :style="{ color: $variables.baseColor }">{{formatZero(scope.$index + 1, 2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="avator" label="头像">
                    <template slot-scope="scope">
                        <el-image style="width: 40px; height: 40px;border-radius:50%" :src="scope.row.headUrl"
                            fit="fit"></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
                <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
                <el-table-column align="center" label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.sex == 0 ? "男" : "女" }}
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="年龄">
                    <template slot-scope="scope">
                        {{ scope.row.age }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="生日">
                    <template slot-scope="scope">
                        {{ parseBirthday(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="calendarTypeDesc" label="生日类型"></el-table-column>
                <el-table-column align="center" label="剩余天数">
                    <template slot-scope="scope">
                        <span :style="{ 'color': parseColor(scope.row.laveDaysDesc) }">
                            {{ scope.row.laveDaysDesc }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="160" fixed="right" label="操作" class="lastColumn">
                    <template slot-scope="scope">
                        <el-button class="margin-bottom" type="primary" @click.stop="handleNav(scope.row,'个人档案')" plain>
                            个人档案
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum"
                :limit.sync="flt.pageSize" @pagination="getList" />
        </div>

    </div>
</template>
<script>
    import Pagination from "@/components/Pagination";
    import waves from "@/directive/waves";
    import permission from "@/directive/permission";
    import elDragDialog from "@/directive/el-drag-dialog";
    import { valid_error_msg } from "@/utils/valid-error-msg";
    import { parseTime } from '@/utils';
    import { months } from '@/utils/enum';
    import { get_birthday_list } from "@/api/pensionagency/inLive"
    import { formatZero } from "@/filters";
    import solarLunar from "solarlunar-es";

    export default {
        name: "inLive_birthday_list",
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                formatZero,
                table_loading: false,
                table_total: 0,
                table_data: [],
                months,
                flt: {
                    pageNum: 1,
                    pageSize: 10,
                    month: undefined,
                },
            };
        },

        methods: {
            handleNav(data, type) {
                this.$router.push({
                    path: `/workbench/inLive/handle/form/case_file/${data.elderId}`,
                    query: {
                        info: data,
                        elderName: data.elderName
                    }
                });
            },
            parseColor(days) {
                if(days == 0) {
                    return "red"
                }
                if(days <= 31) {
                    return "orange"
                }
                return ""
            },
            // parseTime(scope.row.birthday, "{m}月{d}日")
            parseBirthday(data) {
                if(data.calendarTypeDesc == "公历") {
                    return parseTime(data.birthday, "{m}-{d}")
                } else {
                    let { birthday } = data
                    let g_birthday = parseTime(data.birthday, "{m}-{d}")
                    birthday = (birthday ?? "").split("-")
                    let d = solarLunar.solar2lunar(birthday[0],birthday[1],birthday[2])
                    let res = `（${d.monthCn}${d.dayCn}）`
                    return g_birthday + res
                }
            },
            reset_flt() {
                this.flt = {
                    pageNum: 1,
                    pageSize: 10,
                    month: undefined,
                }
                this.getList()
            },
            getList() {
                let self = this
                const params = { ...self.flt }
                self.$refs.flt.validate(isValid => {
                    if(isValid) {
                        params.yearMoth = `${params.month ?? ""}`
                        self.table_loading = true
                        get_birthday_list(params).then((res) => {
                            self.table_data = res.result
                            self.table_loading = false
                            self.table_total = res.totalCount
                            self.flt.pageNum = res.pageNum
                        })
                    }
                })
                
                
            }
        },
        mounted() {
            this.getList()
        },
    };
</script>
<style lang="scss" scoped>

</style>
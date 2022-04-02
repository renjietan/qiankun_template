<!-- 
 * @description: 日期框-周
 * @fileName: week.vue 
 * @author: 谭人杰 
 * @date: 2021-06-14 17:23:27
 * @后台人员:  
!-->
<template>
    <div style="display: inline-block;">
        <el-button type="primary" plain icon="el-icon-caret-left" @click="handlePrevWeek">上一周</el-button>
        <el-date-picker disabled :clearable="false" @change="handleWeekClick" v-model="dateTime" :unlink-panels="true"
            type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" plain @click="handleNextWeek">
            下一周
            <i class="el-icon-caret-right el-icon--right"></i>
        </el-button>
        <el-button v-if="isShow_info" type="primary" plain @click="getWeek">本周</el-button>
        <el-tag v-if="isShow_info" style="height: 32px;line-height: 32px;letter-spacing: 2px;" type="primary">{{ desc }}</el-tag>
    </div>
</template>

<script>
    import { Calendar } from "@/utils/index"

    export default {
        name: "QuickDatePicker_Week",
        props: {
            isShow_info: {
                default: true,
                required: false,
                type: Boolean
            },
            handler: {
                default: true,
                type: Boolean
            }
        },
        data() {
            return {
                dateTime: null,
                isChange: false,
                Calendar_obj: null,
                date_arr: [],
                isChange: false,
            };
        },
        mounted() {
            this.Calendar_obj = new Calendar()
            this.getWeek()
        },
        computed: {
            desc() {
                if (this.dateTime == null) return ""
                let year = this.dateTime[1].getFullYear()
                let month = this.dateTime[1].getMonth()
                let date = this.dateTime[1].getDate()
                let res = new Date(year, parseInt(month) - 1, date),
                    w = res.getDay(),
                    d = res.getDate();
                if (w == 0) {
                    w = 7;
                }
                return `${res.getFullYear()}年${month+1}月第${Math.ceil((d + 6 - w) / 7)}周食谱`
            },
        },
        watch: {
            date_arr: {
                deep: true,
                handler: function (newval, oldval) {
                    this.$emit("getData", newval)
                }
            },
            handler: function(n) {
                this.getWeek()
            }
        },
        methods: {
            getWeek() {
                let curDate = this.Calendar_obj.ThisWeek(new Date())
                let start_between = new Date(curDate[0].split("  ")[0])
                let end_between = new Date(curDate[curDate.length - 1].split("  ")[0])
                this.dateTime = [start_between, end_between]
                this.date_arr = [curDate]
            },
            handleWeekClick(val) {
                this.isChange = true
                this.dateTime = val
                const _val0 = new Date(val[0].valueOf())
                const _val1 = new Date(val[1].valueOf())
                let days = (_val1.getTime() - _val0.getTime()) / 1000 / 24 / 60 / 60
                let arr = [[]]
                arr[0].push(this.Calendar_obj.format(new Date(_val0.setDate(_val0.getDate()))))
                for (let i = 0; i < days; i++) {
                    if ((arr[arr.length] == undefined && arr[arr.length - 1].length == 7)) {
                        arr.push([])
                    }
                    arr[arr.length - 1].push(this.Calendar_obj.format(new Date(_val0.setDate(_val0.getDate() + 1))))
                }
                this.date_arr = arr
            },
            handlePrevWeek() {
                if (this.dateTime == null) {
                    let cur_date_arr = this.Calendar_obj.ThisWeek(new Date())
                    this.dateTime = [new Date(cur_date_arr[0].split("  ")[0]), new Date(cur_date_arr[cur_date_arr.length - 1].split("  ")[0])]
                    this.date_arr = [cur_date_arr]
                } else {
                    let curDate = this.Calendar_obj.ThisWeek(this.dateTime[0])
                    let dateTime = this.Calendar_obj.prev()
                    let start_between = new Date(dateTime[0].split("  ")[0])
                    let end_between = new Date(dateTime[dateTime.length - 1].split("  ")[0])
                    this.dateTime = [start_between, end_between]
                    this.date_arr = [dateTime]
                }
                this.isChange = false
            },
            handleNextWeek() {
                let dateTime = this.dateTime == null ? new Date() : this.dateTime[1]
                let cur_date_arr = this.Calendar_obj.ThisWeek(dateTime)
                if (this.isChange) {
                    cur_date_arr = this.Calendar_obj.next()
                    this.isChange = false
                }
                this.date_arr = [cur_date_arr]
                this.dateTime = [new Date(cur_date_arr[0].split("  ")[0]), new Date(cur_date_arr[cur_date_arr.length - 1].split("  ")[0])]
            },
        },
    }
</script>
<style scoped>
</style>
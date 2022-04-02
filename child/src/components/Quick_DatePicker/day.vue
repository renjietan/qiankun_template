<template>
    <div style="display: flex;">
        <el-button type="primary" plain icon="el-icon-caret-left" @click="handlePreDay">前一天</el-button>
        <el-date-picker :picker-options="pickerOptions" v-model="dateTime" type="date" placeholder="请选择">
        </el-date-picker>
        <el-button  type="primary" :disabled="disabled" plain @click="handleNextDay">
            后一天
            <i class="el-icon-caret-right el-icon--right"></i>
        </el-button>
        <el-tag v-if="isShow_tag && dateTime" style="height: 32px; line-height: 32px;">{{ dateTime | parseDateToWeek }}</el-tag>
    </div>
</template>

<script>
    import { Calendar } from "@/utils/index"

    export default {
        name: "QuickDatePickerDay",
        props: {
            pickerOptions: {
                type: Object,
                default: () => {
                    return {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    }
                }
            },
            isShow_tag: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dateTime: null,
                Calendar_obj: null
            };
        },
        mounted() {
            this.dateTime = new Date()
            this.Calendar_obj = new Calendar()
        },
        computed: {
            disabled() {
                return this.dateTime == null ? false : (this.dateTime.getTime() - new Date().getTime() + 24 * 60 * 60 * 1000 >= 0)
            },
        },
        watch: {
            dateTime: {
                deep: true,
                handler: function(newval, oldval) {
                    this.$emit("getData", newval)
                }
            }
        },
        methods: {
            handlePreDay() {
                if (this.dateTime == null) {
                    this.dateTime = new Date()
                }
                this.dateTime = new Date(this.dateTime.setDate(this.dateTime.getDate() - 1))
            },
            handleNextDay() {
                let curtime = this.Calendar_obj.format(new Date())
                if (this.dateTime == null) {
                    this.dateTime = new Date()
                    return
                }
                this.dateTime = new Date(this.dateTime.setDate(this.dateTime.getDate() + 1))
            },
        },
    }
</script>
<style scoped>
    /deep/ .el-button  {
        padding: 8px 15px;
    }
</style>
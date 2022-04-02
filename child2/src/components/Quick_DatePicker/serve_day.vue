<template>
    <div class="serve_box">
        <el-button type="warning" class=""  icon="el-icon-caret-left" @click="handlePreDay"></el-button>
        <el-date-picker :picker-options="pickerOptions" v-model="dateTime" type="date" placeholder="请选择" ></el-date-picker>
        <el-button  type="warning" :disabled="disabled" @click="handleNextDay">
            <i class="el-icon-caret-right"></i>
        </el-button>
    </div>
</template>

<script>
    import { Calendar } from "@/utils/index"

    export default {
        name: "QuickDatePickerServe",
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
        },
        data() {
            return {
                dateTime:new Date(),
                Calendar_obj: null
            };
        },
        mounted() {
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
<style lang='scss' scoped>
.serve_btn{
    display: flex;
    align-items: center;
}
</style>
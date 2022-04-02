<!-- 
 * @description: 
 * @fileName: server_item.vue 
 * @author: 谭人杰 
 * @date: 2021-06-23 02:39:30
 * @后台人员:  
!-->
<template>
    <div class="box-content-item">
        <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="洗护服务">
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-form-item class="filter" label="记录：" prop="isRecord">
                        <el-switch v-model="form_data.isRecord" @change="handleChange"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="filter" label="频率：" prop="number">
                        <el-select :disabled="isDisabled_number" v-model="form_data.number" clearable placeholder="请选择">
                            <el-option v-for="item in server_fre" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="filter" label="次数：" prop="number2">
                        <el-input :disabled="isDisabled_number2" v-enter-float clearable v-model.number="form_data.number2">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="filter select" label="时间：" prop="dateTime">
                        <el-select :disabled="isDisabled_dateTime"  clearable suffix-icon="el-icon-date"
                            v-model="form_data.dateTime" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="item in bt_getTime" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import { bt_getTime } from '@/utils/index';
    import { server_fre, } from '@/utils/enum';
    import enterFloat from '@/directive/enterFloat'


    export default {
        name: 'server_item',
        data() {
            return {
                server_fre,
                bt_getTime: bt_getTime(),
                rules: {
                    number: [{ validator: this.validNumber, message: "不可为空", trigger: "change" }],
                    number2: [{ validator: this.validNumber2, trigger: "change" }],
                    dateTime: [{ validator: this.validDateTime, trigger: "change" }],
                },
                form_data: {
                    isRecord: true,
                    number: "",
                    number2: "",
                    dateTime: []
                }
            };
        },
        directives: { enterFloat },

        computed: {
            isDisabled_number() {
                this.form_data.number = !this.form_data.isRecord  ? "" : this.form_data.number
                return !this.form_data.isRecord
            },
            isDisabled_number2() {
                let bool = this.form_data.number == "S" || this.form_data.number == "Z" || this.form_data.number == undefined || this.form_data.number == "" || !this.form_data.isRecord
                this.form_data.number2 = bool ? 0 : this.form_data.number2
                return bool
            },
            isDisabled_dateTime() {
                let bool_dateTime = this.form_data.number == "D"
                this.form_data.dateTime = bool_dateTime ? this.form_data.dateTime : []
                return !bool_dateTime
            },
        },
        watch: {
            info: {
                deep: true,
                handler: function (newval, oldval) {
                    this.form_data = newval ?? {
                        isRecord: true,
                        number: "",
                        number2: "",
                        dateTime: []
                    }
                },
                immediate: true
            }
        },
        props: {
            info: {
                type: Object,
                default: {}
            }
        },
        methods: {
            handleChange(bool) {
                if(!bool) {
                    this.$refs['form'].clearValidate();
                }
            },
            validNumber(rule, value, callback) {
                let bool = this.form_data.isRecord
                if(bool && value.length == 0) {
                    callback(new Error("请输入"))
                } else {
                    callback()
                }
            },
            validDateTime(rule, value, callback) {
                let bool = this.form_data.number == "D"
                if (bool && value.length == 0) {
                    callback(new Error("请输入"))
                } else if (bool && value.length != this.form_data.number2) {
                    callback(new Error(`应添加${this.form_data.number2}个时间节点`))
                } else {
                    callback()
                }
            },
            validNumber2(rule, value, callback) {
                let bool = this.form_data.number == "S" || this.form_data.number == "Z" || this.form_data.number == undefined || this.form_data.number == ""
                if(this.form_data.dateTime.length == value) {
                    this.$refs['form'].clearValidate(['dateTime']);
                } else {
                    this.$refs['form'].validateField(['dateTime']);
                }
                if (!bool && (value == 0 || value == "" || value == undefined)) {
                    callback(new Error("请输入"))
                } else {
                    callback()
                }
            },
        },
        mounted() {
            
        },
    }
</script>
<style lang='scss' scoped>
    .box-content-item {
        width: 100%;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    /deep/ .el-input {
        width: 120px;
    }

    /deep/ .el-form-item__label {
        width: auto !important;
    }

    /* /deep/ .el-form-item__content {
        width: auto !important;
    } */

    .select {
        width: 100%;

        /deep/ .el-form-item__content {
            width: calc(100% - 81px) !important;
        }

        /deep/ .el-input {
            width: 100% !important;
        }
    }
</style>
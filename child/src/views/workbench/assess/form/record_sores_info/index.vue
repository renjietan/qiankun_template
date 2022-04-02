<!-- 
 * @description: 评估/评估中心-查看记录-压疮评估-详情
 * @fileName: assess_form_record_sores_info.vue 
 * @author: 谭人杰 
 * @date: 2021-06-16 19:57:13
 * @后台人员:  
!-->
<template>
    <div class='container ' v-loading="form_loading">
        <Basicinfo></Basicinfo>
        <div class="container_card  ">
            <div class="title" style="margin-bottom: 20px;">
                评估详情
            </div>
            <el-form :inline="true" hide-required-asterisk status-icon>
                <el-row>
                    <el-col :span="4">
                        <el-form-item class="readonly" label="评估人">
                            <el-input readonly v-model="form_data.title" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-form-item class="default" label="评估时间">
                            <el-date-picker :clearable="false" v-model="form_data.datetime" type="date"
                                placeholder="请选择">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div class="crumbs" style="margin: 0 0 25px 0;">
                <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
                    <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">{{
                        item.name }}</span>
                    <span class="crumbs_sprit">
                        /
                    </span>
                </div>
            </div>
            <div style="margin: 30px 0 20px 0;">

            </div>
            <!--  防止后期 UI更改  -->
            <component :is="cur_tag.component" :key="cur_tag.component"></component>
        </div>

        
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import Sores from './components/sores';
    import SoresRes from './components/sores_res';
    import Basicinfo from '@/components/Basicinfo';
    export default {
        name: 'assess_form_record_sores_info',
        components: { Pagination, Basicinfo, Sores, SoresRes },
        directives: { waves, },
        data() {
            return {
                level: ["物业服务", "轻度失眠", "中度失眠", "重度失眠"],
                tags: [{
                    name: "压疮评估",
                    component: "Sores",
                }, {
                    name: "评估结果",
                    component: "SoresRes"
                }],
                cur_tag: {},
                form_data: {
                    title: "",
                    datetime: null
                },
                form_loading: false,
                options: [{
                    label: "男",
                    value: 1,
                }, {
                    label: "女",
                    value: 0,
                }],
            };
        },
        methods: {
            getData(val) {
            },
            handleSubmit() {
                let self = this;
                self.form_loading = true
                this.$refs["form"].validate((res, info) => {
                    if (res) {
                        self.form_loading = false
                        // 请求服务
                    }
                })
            },
            handle_switchModel(val) {
                this.cur_tag = val
            },

        },
        mounted() {

            this.cur_tag = this.tags[0]
        },
    }
</script>
<style lang='scss' scoped>

</style>
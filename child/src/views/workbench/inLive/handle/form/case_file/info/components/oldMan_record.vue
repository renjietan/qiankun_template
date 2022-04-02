<!-- 
 * @description: 长者日志
 * @fileName: oldMan_record.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
    <div>
        <div style="margin-bottom: 20px;">
            <el-button type="primary" icon="el-icon-plus" @click="handleDialog(null,'添加日志')">添加日志</el-button>
        </div>
        <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
            <el-table-column width="100" align="center" prop="index" label="序号">
                <template slot-scope="scope">
                    <div :style="{color: $variables.baseColor }">
                        {{ formatZero(scope.$index + 1, 2) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="日期"></el-table-column>
            <el-table-column align="center" prop="time" label="时间"></el-table-column>
            <el-table-column align="center" prop="picUrl" label="照片"></el-table-column>
            <el-table-column align="center" label="日志类型">
                <template slot-scope="scope">
                    <div>
                        {{ log_type_list.filter(item => item.value == scope.row.type)[0].label }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="content" label="日志内容"></el-table-column>
            <el-table-column align="center" prop="operator" label="记录人"></el-table-column>
            <el-table-column align="center" width="350" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-link :underline="false" type="primary" @click="handleDialog(scope.row,'修改日志')">修改</el-link>
                        <el-link :underline="false" type="danger" @click="handleDel(scope.row)">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
            @pagination="getList" />
        <el-dialog :rules="rules" v-el-drag-dialog class="el-dialog-2" :visible.sync='dialog_cof.visible'
            :title='dialog_cof.title' :destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
            <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item class="readonly" label="长者" prop="elderName">
                            <el-input readonly clearable v-model="form_data.elderName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>
                    <el-col :span="12">
                        <el-form-item class="must-fill" label="日期" prop="date">
                            <el-date-picker value-format="yyyy-MM-dd" v-model="form_data.date" type="date"
                                placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="must-fill" label="时间" prop="time">
                            <el-time-select :picker-options="{
                                start: '00:00',
                                step: '00:15',
                                end: '24:00'
                              }" v-model="form_data.time" placeholder="请选择"></el-time-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="must-fill" label="日志类型" prop="type">
                            <el-select v-model="form_data.type" clearable placeholder="请选择">
                                <el-option v-for="item in log_type_list" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col></el-col>
                    <el-col>
                        <el-form-item class="default" label="照片" prop="picUrl">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="form_data.picUrl" :src="form_data.picUrl" class="avatar">
                                <i style="height: 126px;width: 160px;line-height: 120px;" v-else
                                    class="el-icon-plus avatar-uploader-icon">
                                    <div class="uploader_desc">请上传</div>
                                </i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item class="default" label="日志内容" prop="content">
                            <el-input type="textarea" clearable v-model="form_data.content" placeholder="请输入">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_cof.visible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import { get_elderlog_list_byId, add_elderlog, set_or_del_elderlog } from '@/api/pensionagency/inLive/elder_log.js';
    import elDragDialog from '@/directive/el-drag-dialog'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { formatZero } from '@/filters';
    import { log_type_list } from '@/utils/enum';
    import { } from '@/utils/validate'
    export default {
        name: 'oldMan_record',
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                dialog_cof: {
                    visible: false,
                    title: '添加日志',
                    escape: false,
                    destroy: true,
                    modal: false
                },
                log_type_list,
                rules: {
                    date: [{ required: true, message: "不可为空", trigger: "change" }],
                    time: [{ required: true, message: "不可为空", trigger: "change" }],
                    type: [{ required: true, message: "不可为空", trigger: "change" }],
                },
                form_data: {
                    id: undefined,
                    elderName: "", //长者姓名
                    date: null, //日期
                    time: null, //时间
                    type: undefined, //日志类型
                    picUrl: "", //图片地址
                    content: "", //内容
                    elderId: undefined
                },
                table_data: [],
                table_loading: false,
                table_total: 0,
                flt: {
                    elderId: undefined,
                    pageNum: 1,
                    pageSize: 10,
                },
            };
        },
        methods: {
            formatZero,
            getList() {
                this.table_loading = true
                get_elderlog_list_byId(this.flt).then(res => {
                    this.table_loading = false
                    this.flt.pageNum = res?.pageNum ?? 0
                    this.table_total = res?.totalCount ?? 0
                    this.table_data = res?.result ?? []
                })
            },
            handleSubmit() {
                let self = this
                self.$refs.form.validate(valid => {
                    if (valid) {
                        if (self.dialog_cof.title == "添加日志") {
                            add_elderlog(self.form_data).then(res => {
                                self.$notify({
                                    title: "提示",
                                    type: "success",
                                    message: "操作成功"
                                })
                                self.dialog_cof.visible = false
                                self.getList()
                            })
                        } else {
                            set_or_del_elderlog({
                                ...this.form_data,
                                operateType: "M"
                            }).then(res => {
                                self.$notify({
                                    title: "提示",
                                    type: "success",
                                    message: "操作成功"
                                })
                                self.dialog_cof.visible = false
                                self.getList()
                            })
                        }
                    }
                })
            },
            handleDel(data) {
                let self = this
                this.$confirm(`删除, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        set_or_del_elderlog({
                                ...{
                                    id: data.id
                                },
                                operateType: "D"
                            }).then(res => {
                                self.$notify({
                                    title: "提示",
                                    type: "success",
                                    message: "操作成功"
                                })
                                self.dialog_cof.visible = false
                                self.getList()
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: `已取消`
                        });
                    });
            },
            handleAvatarSuccess() { },
            beforeAvatarUpload() { },
            handleDialog(data, type) {
                this.dialog_cof.title = type
                this.dialog_cof.visible = true
                if (this.dialog_cof.title == "修改日志") {
                    this.form_data = data
                    this.form_data.elderName = this.$route.query.elderName
                }
            }
        },
        mounted() {
            this.flt.elderId = this.$route.params.id
            this.form_data.elderId = this.$route.params.id
            this.form_data.elderName = this.$route.query.elderName
            this.getList()
        },
    }
</script>
<style lang='scss' scoped>
    /deep/ .el-textarea__inner {
        height: 100px;
    }
</style>
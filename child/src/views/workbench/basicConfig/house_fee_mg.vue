<!-- 
 * @description: 包房费管理
 * @fileName: house_fee_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 16:02:41
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title">
                <span>包房费管理</span>
                <el-button v-waves type="primary" icon="el-icon-plus" @click="handleDialog('添加包房费')">添加包房费</el-button>
            </div>
            <el-table ref="data_table" :data="table_data" v-loading="table_loading" stripe
                highlight-current-row fit>
                <el-table-column width="100" align="center" prop="name" label="序号">
                    <template slot-scope="scope">
                        <div :style="{'color': $variables.baseColor}">
                            {{ formatZero(scope.$index + 1, 2) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width=”100“ align="center" label="包房费">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.fee }} / 月
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="remark" label="说明"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="handleDialog('编辑包房费', scope.row)" :underline="false">编辑
                        </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
            <div style="display: flex; justify-content: flex-end;">
                <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber"
                    :limit.sync="flt.pageSize" @pagination="getList" />
            </div>
            <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->

            <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync='dialog_cof.visible'
                :title='dialog_cof.title' :destroy-on-close='dialog_cof.destroy'
                :close-on-click-modal='dialog_cof.modal'>
                <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
                    <el-row>
                        <el-col :span="13">
                            <el-form-item class="must-fill" label="包房费" prop="fee">
                                <el-input v-enter-float clearable v-model="form_data.fee"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item class="optional" label="说明" prop="remark">
                                <el-input type="textarea" clearable v-model="form_data.remark"></el-input>
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
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import elDragDialog from '@/directive/el-drag-dialog'
    import enterFloat from '@/directive/enterFloat'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { isFloat } from '@/utils/form-valid'
    import { formatZero } from '@/filters/index';
    import { isNumber_mustFill } from '@/utils/validate';
    import { create_fee, query_batch_fee, edit_fee, edit_del_batch_fee } from '@/api/pensionagency/basicConfig/basicConfig';
    import { fee_type, handleType } from '@/utils/enum';
    import { mapGetters } from 'vuex';
    export default {
        name: 'basicConfig_house_fee_mg',
        components: { Pagination },
        directives: { waves, elDragDialog, enterFloat },
        data() {
            return {
                table_data: [],
                table_loading: false,
                table_total: 0,
                flt: {
                    pageNumber: 1,
                    pageSize: 10,
                    type: fee_type["包房费"],
                },
                dialog_cof: {
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                },
                rules: {
                    fee: [{ validator: isNumber_mustFill, trigger: "blur" }, { required: true, message: "不可为空", trigger: "change" },],
                },
                form_data: {
                    id: null,
                    fee: 0,
                    remark: "",
                    type: fee_type["包房费"],
                },

            };
        },

        methods: {
            formatZero,
            reset() {
                this.form_data = {
                    fee: 0,
                    remark: "",
                    type: fee_type["包房费"],
                    id: null,
                }
            },
            handleSubmit() {
                let self = this
                self.$refs.form.validate(valid => {
                    if (valid) {
                        let params;
                        if (self.dialog_cof.title == "编辑包房费") {
                            params = { ...self.form_data, ...{ operateType: handleType["编辑"] } }
                            edit_del_batch_fee(params).then(res => {
                                self.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: "操作成功"
                                })
                                self.dialog_cof.visible = false
                                self.getList()
                            })
                        } else {
                            create_fee(self.form_data).then(res => {
                                self.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: "操作成功"
                                })
                                self.dialog_cof.visible = false
                                self.getList()
                            })
                        }
                    }
                })

            },
            handleDialog(title, row) {
                let self = this
                self.reset();
                self.dialog_cof.title = title
                self.dialog_cof.visible = true
                if (self.dialog_cof.title == "编辑包房费") {
                    self.form_data.fee = row.fee
                    self.form_data.remark = row.remark
                    self.form_data.id = row.id
                }
            },
            handleDel(item) {
                let id = item.id
                let params = {
                    id,
                    operateType: handleType["删除"]
                }
                this.$confirm('删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    edit_del_batch_fee(params).then(res => {
                        this.$notify({
                            type: 'success',
                            message: '删除成功!',
                            title: ""
                        });
                        this.getList();
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            async getList() {
                this.table_loading = true
                let data = await query_batch_fee(this.flt)
                this.table_data = data?.result
                this.table_total = data?.totalCount
                this.flt.pageNumber = data?.pageNumber
                this.flt.pageSize = data?.pageSize
                this.table_loading = false
            },
        },
        mounted() {
            this.getList()
        },
    }
</script>
<style lang='scss' scoped>
    /deep/ .el-textarea {
        textarea {
            height: 150px;
        }
    }
</style>
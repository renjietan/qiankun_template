<!-- 
 * @description: 床位管理
 * @fileName: bed_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 16:02:41
 * @后台人员:  
!-->
<template>
    <div class='container'>
        <div class="container_card">
            <div class="title">床位管理</div>
            <el-row :gutter="30">
                <el-col :span="6">
                    <div class="left-box">
                        <el-row class="left-box-title">
                            <el-col :span="12">
                                <div class="title" style="font-size: 14px;">楼宇</div>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-plus"
                                    @click="handleCreate('楼宇', '添加楼宇')">添加
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="infinite-list-wrapper" v-loading="building.loading"
                            style="height: calc(100% - 40px);overflow: auto;">
                            <ul style="padding: 0;">
                                <li v-for="item in building.data" @click="handleItem(item, '楼宇')" :key="item.id"
                                    style="list-style: none">
                                    <div
                                        :class="['left-box-item', item.id == building.check_data.id  ? 'left-box-item-active' : '' ]">
                                        <el-row>
                                            <el-col :span="18">
                                                <!-- {{ item.name }} --- {{ item.id }} -->
                                                {{ item.name }}
                                            </el-col>
                                            <el-col :span="6" style="text-align: right;">
                                                <i @click.stop="handleEdit(item,'楼宇', '编辑楼宇')"
                                                    class="el-icon-edit icon-primary" style="margin-right: 3ox;"></i>
                                                <i @click.stop="handleDel(item,'楼宇')"
                                                    class="el-icon-circle-close icon-close"></i>
                                            </el-col>
                                        </el-row>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" v-if="building.data.length > 0">
                    <div class="left-box" v-loading="building_level.loading">
                        <el-row class="left-box-title">
                            <el-col :span="12">
                                <div class="title" style="font-size: 14px;">楼层</div>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-plus"
                                    @click="handleCreate('楼层', '添加楼层')">添加
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="infinite-list-wrapper" style="height: calc(100% - 40px);overflow: auto;">
                            <ul style="padding: 0;">
                                <li v-for="item in building_level.data" @click="handleItem(item, '楼层')" :key="item.id"
                                    style="list-style: none">
                                    <div
                                        :class="['left-box-item', item.id == building_level.check_data.id ? 'left-box-item-active' : '' ]">
                                        <el-row>
                                            <el-col :span="18">
                                                <!-- {{ item.name }} --- {{ item.id }} -->
                                                {{ item.name }}
                                            </el-col>
                                            <el-col :span="6" style="text-align: right;">
                                                <i @click="handleEdit(item,'楼层', '编辑楼层')"
                                                    class="el-icon-edit icon-primary" style="margin-right: 3ox;"></i>
                                                <i @click.stop="handleDel(item,'楼层')"
                                                    class="el-icon-circle-close icon-close"></i>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" v-if="building_level.data.length > 0">
                    <div class="left-box" v-loading="building_house.loading">
                        <el-row class="left-box-title">
                            <el-col :span="12">
                                <div class="title" style="font-size: 14px;">房间</div>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-plus"
                                    @click="handleCreate('房间', '添加房间')">添加
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="infinite-list-wrapper" style="height: calc(100% - 40px);overflow: auto;">
                            <ul style="padding: 0;">
                                <li v-for="item in building_house.data" @click="handleItem(item, '房间')" :key="item.id"
                                    style="list-style: none">
                                    <div
                                        :class="['left-box-item', item.id == building_house.check_data.id ? 'left-box-item-active' : '' ]">
                                        <el-row>
                                            <el-col :span="18">
                                                <!-- {{ item.name }} --- {{ item.id }} -->
                                                {{ item.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span :style="{ color:item.id == building_house.check_data.id ? $variables.yellow :$variables.baseColor}">{{ item.side }}</span>
                                            </el-col>
                                            <el-col :span="6" style="text-align: right;">
                                                <i @click="handleEdit(item,'房间', '编辑房间')"
                                                    class="el-icon-edit icon-primary" style="margin-right: 3ox;"></i>
                                                <i @click.stop="handleDel(item,'房间')"
                                                    class="el-icon-circle-close icon-close"></i>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top: 20px;">
                                            <el-col :span="15">
                                                <el-row :gutter="2">
                                                    <el-col :span="1" v-for="child in parse_bed_number(item.roomType)"
                                                        :key="child">
                                                        <div
                                                            :style="{width: '100%', background:item.id == building_house.check_data.id ? $variables.yellow :$variables.baseColor, height: '20px', borderRadius: '3px',}">
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="9" style="text-align: right;color: silver;">
                                                <div>包房费：{{ item.fee ? item.fee  + "/ 月" : "暂无" }} 
                                                </div>
                                            </el-col>
                                        </el-row>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" v-if="building_house.data.length > 0">
                    <div class="left-box" v-loading="building_bed.loading">
                        <el-row class="left-box-title">
                            <el-col :span="12">
                                <div class="title" style="font-size: 14px;">床位</div>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                                <el-button style="transform: scale(0.9);" size="mini" type="primary" icon="el-icon-plus"
                                    @click="handleCreate('床位', '添加床位')">添加
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="infinite-list-wrapper" style="overflow:auto; height: calc(100% - 40px);">
                            <ul style="padding: 0">
                                <li v-for="item in building_bed.data" @click="handleItem(item, '床位')" :key="item.id"
                                    style="list-style: none">
                                    <div :class="['left-box-item', item.id == building_bed.check_data.id ? 'left-box-item-active' : '' ]"
                                        style="align-items:flex-start">
                                        <el-row>
                                            <el-col :span="18">
                                                <span>
                                                    <!-- {{ item.name }} --- {{ item.id }} -->
                                                    {{ item.name }}
                                                </span>
                                                <span v-if="item.isCloseWindow == 1"
                                                    style="color: #fff; background-color: #017CFF; padding: 3px; border-radius: 3px; font-size: 12px; font-weight: normal;">窗</span>
                                            </el-col>
                                            <el-col :span="6" style="text-align: right;">
                                                <i @click="handleEdit(item,'床位', '编辑床位')"
                                                    class="el-icon-edit icon-primary" style="margin-right: 3ox;"></i>
                                                <i @click.stop="handleDel(item,'床位')"
                                                    class="el-icon-circle-close icon-close"></i>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <div style="margin: 20px 0 0px 0;color: silver;">床位费：
                                                    {{ item.fee ? item.fee  + "/ 月" : "暂无" }}
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync='dialog_cof.visible'
            :title='dialog_cof.title' :destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
            <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
                <el-row>
                    <el-col :span="11" v-if="dialog_cof.type == '楼宇'">
                        <el-form-item class="must-fill" label="楼宇名称" prop="building_name">
                            <el-input clearable v-model="form_data.building_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-else>
                        <el-form-item class="readonly" label="楼宇名称" prop="building_name">
                            <el-input clearable readonly v-model="form_data.building_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '楼层'" :offset="1">
                        <el-form-item class="must-fill" label="楼层名称" prop="building_level_name">
                            <el-input clearable v-model="form_data.building_level_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type != '楼宇' && dialog_cof.type != '楼层'" :offset="1">
                        <el-form-item class="readonly" label="楼层名称" prop="building_level_name">
                            <el-input clearable readonly v-model="form_data.building_level_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '房间'">
                        <el-form-item class="must-fill" label="房间" prop="building_house_name">
                            <el-input clearable v-model="form_data.building_house_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '床位'" label="房间" prop="building_house_name">
                        <el-form-item class="readonly" label="房间" prop="building_house_name">
                            <el-input clearable readonly v-model="form_data.building_house_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1" v-if="dialog_cof.type == '房间'">
                        <el-form-item class="must-fill" label="朝向" prop="building_house_direction">
                            <el-select clearable v-model="form_data.building_house_direction" placeholder="请选择">
                                <el-option v-for="item in house_direction" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '房间'">
                        <el-form-item class="must-fill" label="房间类型" prop="house_bed_number">
                            <el-select clearable v-model="form_data.house_bed_number" placeholder="请选择">
                                <el-option v-for="item in house_bed_number" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1" v-if="dialog_cof.type == '房间'">
                        <el-form-item class="must-fill" label="包房费用" prop="house_pay_id">
                            <el-select clearable v-model="form_data.house_pay_id" placeholder="请选择">
                                <el-option v-for="item in options_house_fee" :key="item.value"
                                    :label="item.fee + ' / 月'" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1" v-if="dialog_cof.type == '床位'" label="房间">
                        <el-form-item class="readonly" label="朝向" prop="building_house_direction">
                            <el-select clearable v-model="form_data.building_house_direction" placeholder="请选择">
                                <el-option v-for="item in house_direction" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '床位'">
                        <el-form-item class="must-fill" label="床位名称" prop="building_bed_name">
                            <el-input clearable v-model="form_data.building_bed_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1" v-if="dialog_cof.type == '床位'">
                        <el-form-item class="must-fill" label="是否靠窗" prop="byWindow">
                            <el-select clearable v-model="form_data.byWindow" placeholder="请选择">
                                <el-option v-for="item in isTrue" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="dialog_cof.type == '床位'">
                        <el-form-item class="must-fill" label="床位费用" prop="bed_pay_id">
                            <el-select clearable v-model="form_data.bed_pay_id" placeholder="请选择">
                                <el-option v-for="item in options_bed_fee" :key="item.label" :label="item.fee + ' / 月'"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_cof.visible = false">取 消</el-button>
                <el-button type="primary"
                    @click="dialog_cof.title.indexOf('编辑') >= 0 ? handleSubmit_edit() : handleSubmit_create()">确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import elDragDialog from '@/directive/el-drag-dialog'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import { mapGetters } from 'vuex'
    import { parse_bed_number } from '@/filters';
    import { getList } from '@/api/system/test';
    import { create_bed, query_batch_bed, edit_del_bed, query_batch_fee } from '@/api/pensionagency/basicConfig/basicConfig';
    import { handleType, buliding_type, house_direction, house_bed_number, isTrue, fee_type } from '@/utils/enum';
    import { isNumber_mustFill } from '@/utils/validate';
    import { } from '@/utils/validate'
    export default {
        name: 'basicConfig_bed_mg',
        components: { Pagination },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                building: {
                    loading: false,
                    check_data: {},
                    data: []
                },
                building_level: {
                    loading: false,
                    check_data: {},
                    data: []
                },
                building_house: {
                    loading: false,
                    check_data: {},
                    data: []
                },
                building_bed: {
                    loading: false,
                    check_data: null,
                    data: []
                },
                options_house_fee: [],
                options_bed_fee: [],
                dialog_cof: {
                    type: "",
                    visible: false,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                },
                house_direction,
                house_bed_number,
                form_data: {
                    building_id: null, // 楼宇ID
                    building_name: "", //楼宇名称
                    building_level_id: null, //楼层ID
                    building_level_name: "", //楼层名称
                    building_house_id: null, //房间ID
                    building_house_name: "", //房间
                    building_house_direction: undefined, //朝向
                    building_bed_id: null,
                    building_bed_name: "", //床位名称
                    byWindow: undefined, //是否靠窗 
                    bed_pay_id: undefined, //床位费用
                    house_pay_id: undefined,//包房费用
                    house_bed_number: undefined //房间人数
                },
                rules: {
                    building_name: [{ required: true, message: "不可为空", trigger: "change" }],
                    building_level_name: [{ required: true, message: "不可为空", trigger: "change" }],
                    building_house_name: [{ required: true, message: "不可为空", trigger: "change" }],
                    building_house_direction: [{ required: true, message: "不可为空", trigger: "change" }],
                    building_bed_name: [{ required: true, message: "不可为空", trigger: "change" }],
                    byWindow: [{ validator: isNumber_mustFill, trigger: "blur" }, { required: true, message: "不可为空", trigger: "change" },],
                    bed_pay_id: [{ required: true, message: "不可为空", trigger: "change" },],
                    house_pay_id: [{ required: true, message: "不可为空", trigger: "change" },],
                    house_bed_number: [{ required: true, message: "不可为空", trigger: "change" },],
                },
                isTrue,
            };
        },
        methods: {
            parse_bed_number,
            handleDel(item, type) {
                let self = this
                let params = {
                    id: item.id,
                    operateType: handleType["删除"],
                    type: buliding_type[type],
                }
                this.$confirm(`删除, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    edit_del_bed(params).then(async res => {
                        self.$notify({
                            type: 'success',
                            message: '删除成功!',
                            title: ""
                        });
                        self.building_load(type)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消`
                    });
                });

            },
            handleCreate(type, title) {
                this.dialog_cof.type = type
                this.dialog_cof.title = `${title}`
                this.dialog_cof.visible = true
                this.reset()
                switch (type) {
                    case "楼层":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name
                        break;
                    case "房间":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name
                        this.form_data.building_level_id = this.building_level.check_data.id
                        this.building_level.check_data = this.building_level.data.filter(item => item.id  == this.building_level.check_data.id)[0]
                        this.form_data.building_level_name = this.building_level.check_data.name
                        break;
                    case "床位":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name
                        this.form_data.building_level_id = this.building_level.check_data.id
                        this.building_level.check_data = this.building_level.data.filter(item => item.id  == this.building_level.check_data.id)[0]
                        this.form_data.building_level_name = this.building_level.check_data.name
                        this.form_data.building_house_id = this.building_house.check_data.id
                        this.building_house.check_data = this.building_house.data.filter(item => item.id  == this.building_house.check_data.id)[0]
                        this.form_data.building_house_name = this.building_house.check_data.name
                        this.form_data.building_house_direction = this.building_house.check_data.side
                        break;
                    default:
                        break;
                }
            },
            reset() {
                this.form_data = {
                    building_id: null, // 楼宇ID
                    building_name: "", //楼宇名称
                    building_level_id: null, //楼层ID
                    building_level_name: "", //楼层名称
                    building_house_id: null, //房间ID
                    building_house_name: "", //房间
                    building_house_direction: undefined, //朝向
                    building_bed_name: "", //床位名称
                    byWindow: "", //是否靠窗
                    bed_pay_id: undefined, //床位费用
                    house_pay_id: undefined, //包房费用
                    house_bed_number: undefined,  //房间床位数
                }
            },
            handleEdit(item, type, title) {
                this.reset()
                this.dialog_cof.type = type
                this.dialog_cof.title = `${title}`
                this.dialog_cof.visible = true
                switch (type) {
                    case "楼宇":
                        this.form_data.building_id = item.id
                        this.form_data.building_name = item.name
                        break;
                    case "楼层":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name
                        this.form_data.building_level_id = item.id
                        this.form_data.building_level_name = item.name
                        break;
                    case "房间":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name
                        this.form_data.building_level_id = this.building_level.check_data.id
                        this.building_level.check_data = this.building_level.data.filter(item => item.id  == this.building_level.check_data.id)[0]
                        this.form_data.building_level_name = this.building_level.check_data.name
                        this.form_data.building_house_id = item.id
                        this.form_data.building_house_name = item.name
                        
                        this.form_data.building_house_direction = item.side
                        this.form_data.house_bed_number = item.roomType
                        this.form_data.house_pay_id = this.options_house_fee.filter(child => child.fee == item.fee)[0]?.id
                        break;
                    case "床位":
                        this.form_data.building_id = this.building.check_data.id
                        this.building.check_data = this.building.data.filter(item => item.id  == this.building.check_data.id)[0]
                        this.form_data.building_name = this.building.check_data.name

                        this.form_data.building_level_id = this.building_level.check_data.id
                        this.building_level.check_data = this.building_level.data.filter(item => item.id  == this.building_level.check_data.id)[0]
                        this.form_data.building_level_name = this.building_level.check_data.name
                        
                        this.form_data.building_house_id = this.building_house.check_data.id
                        this.building_house.check_data = this.building_house.data.filter(item => item.id  == this.building_house.check_data.id)[0]
                        this.form_data.building_house_name = this.building_house.check_data.name
                        this.form_data.building_house_direction = this.building_house.check_data.side

                        this.form_data.building_bed_name = item.name
                        this.form_data.building_bed_id = item.id
                        this.form_data.bed_pay_id = this.options_bed_fee.filter(child => child.fee == item.fee)[0]?.id
                        this.form_data.byWindow = item.isCloseWindow
                        break;
                    default:
                        break;
                }
            },
            handleSubmit_edit() {
                let self = this
                let params = {}
                self.$refs.form.validate(async valid => {
                    if (valid) {
                        switch (self.dialog_cof.type) {
                            case "楼宇":
                                params = {
                                    id: self.form_data.building_id,
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_name,
                                    operateType: handleType["编辑"],
                                }
                                edit_del_bed(params).then(async res => {
                                    self.building.loading = true
                                    let data = await this.getData({
                                        type: "楼宇"
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    data = data == null ? [] : data
                                    self.building.data = data
                                    self.dialog_cof.visible = false
                                    self.building.loading = false
                                })
                                break
                            case "楼层":
                                params = {
                                    id: self.form_data.building_level_id,
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_level_name,
                                    operateType: handleType["编辑"],
                                }
                                edit_del_bed(params).then(async res => {
                                    self.building_level.loading = true
                                    let data = await this.getData({
                                        type: "楼层",
                                        superId: self.form_data.building_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    data = data == null ? [] : data
                                    self.building_level.data = data
                                    self.dialog_cof.visible = false
                                    self.building_level.loading = false
                                })
                                break;
                            case "房间":
                                params = {
                                    id: self.form_data.building_house_id,
                                    name: self.form_data.building_house_name,
                                    type: buliding_type[self.dialog_cof.type],
                                    operateType: handleType["编辑"],
                                    side: self.form_data.building_house_direction,
                                    roomType: self.form_data.house_bed_number,
                                    feeId: self.form_data.house_pay_id,
                                }
                                edit_del_bed(params).then(async res => {
                                    self.building_house.loading = true
                                    let data = await this.getData({
                                        type: "房间",
                                        superId: self.form_data.building_level_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    data = data == null ? [] : data
                                    self.building_house.data = data
                                    self.dialog_cof.visible = false
                                    self.building_house.loading = false
                                    self.$forceUpdate()
                                })
                                break;
                            default:
                                params = {
                                    id: self.form_data.building_bed_id,
                                    name: self.form_data.building_bed_name,
                                    type: buliding_type[self.dialog_cof.type],
                                    operateType: handleType["编辑"],
                                    isCloseWindow: self.form_data.byWindow,
                                    feeId: self.form_data.bed_pay_id,
                                }
                                edit_del_bed(params).then(async res => {
                                    self.building_bed.loading = true
                                    let data = await this.getData({
                                        type: "床位",
                                        superId: self.form_data.building_house_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    self.building_bed.data = data ?? []
                                    self.dialog_cof.visible = false
                                    self.building_bed.loading = false
                                    self.$forceUpdate()
                                })
                                break;
                        }
                    }
                })
            },
            handleSubmit_create() {
                let self = this
                self.$refs.form.validate(async valid => {
                    let data = []
                    let params = {}
                    if (valid) {
                        switch (self.dialog_cof.type) {
                            case "楼宇":
                                params = {
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_name
                                }
                                create_bed(params).then(async (result) => {
                                    self.building.loading = true
                                    let data = await this.getData({
                                        type: "楼宇"
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    self.building.data = data
                                    self.building.check_data = data.length == 1 ? data[0] : self.building.check_data
                                    self.dialog_cof.visible = false
                                    self.building.loading = false
                                })
                                break;
                            case "楼层":
                                params = {
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_level_name,
                                    superId: self.form_data.building_id
                                }
                                create_bed(params).then(async (result) => {
                                    self.building_level.loading = true
                                    let data = await this.getData({
                                        type: "楼层",
                                        superId: self.form_data.building_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    self.building_level.data = data
                                    self.building_level.check_data = data.length == 1 ? data[0] : self.building_level.check_data;
                                    self.dialog_cof.visible = false
                                    self.building_level.loading = false
                                })
                                break;
                            case "房间":
                                params = {
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_house_name,
                                    superId: self.form_data.building_level_id,
                                    side: self.form_data.building_house_direction,
                                    roomType: self.form_data.house_bed_number,
                                    feeId: self.form_data.house_pay_id,
                                }
                                create_bed(params).then(async (result) => {
                                    self.building_house.loading = true
                                    let data = await this.getData({
                                        type: "房间",
                                        superId: self.form_data.building_level_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    data = data == null ? [] : data
                                    self.building_house.data = data
                                    self.building_house.check_data = data.length == 1 ? data[0] : self.building_house.check_data;
                                    self.dialog_cof.visible = false
                                    self.building_house.loading = false
                                })
                                break;
                            default:
                                params = {
                                    type: buliding_type[self.dialog_cof.type],
                                    name: self.form_data.building_bed_name,
                                    superId: self.form_data.building_house_id,
                                    feeId: self.form_data.bed_pay_id,
                                    isCloseWindow: self.form_data.byWindow,
                                }
                                create_bed(params).then(async (result) => {
                                    self.building_bed.loading = true
                                    let data = await this.getData({
                                        type: "床位",
                                        superId: self.form_data.building_house_id
                                    })
                                    self.$notify({
                                        type: 'success',
                                        message: '操作成功!',
                                        title: ""
                                    });
                                    data = data == null ? [] : data
                                    self.building_bed.data = data
                                    self.building_bed.check_data = data.length == 1 ? data[0] : self.building_bed.check_data;

                                    self.dialog_cof.visible = false
                                    self.building_bed.loading = false
                                })
                                break;
                        }
                    }
                })
            },
            handleItem(item, type) {
                switch (type) {
                    case "楼宇":
                        if (this.building.check_data.id == item.id) return
                        if (this.building_level.loading || this.building_house.loading || this.building_bed.loading) {
                            this.$message({
                                type: "warning",
                                message: "您的操作太频繁啦，请稍后再试"
                            })
                            return
                        }
                        this.building.check_data = item;
                        this.building_load("楼层")
                        break;
                    case "楼层":
                        if (this.building_level.check_data.id == item.id) return
                        if (this.building_house.loading || this.building_bed.loading) {
                            this.$message({
                                type: "warning",
                                message: "您的操作太频繁啦，请稍后再试"
                            })
                            return
                        }
                        this.building_level.check_data = item;
                        this.building_load("房间")
                        break;
                    case "房间":
                        if (this.building_house.check_data.id == item.id) return
                        if (this.building_bed.loading) {
                            this.$message({
                                type: "warning",
                                message: "您的操作太频繁啦，请稍后再试"
                            })
                            return
                        }
                        this.building_house.check_data = item;
                        this.building_load("床位")
                        break;
                    default:
                        if (this.building_bed.check_data.id == item.id) return
                        this.building_bed.check_data = item;
                        break;
                }
            },

            async building_load(type = "楼宇",) {
                let self = this
                switch (type) {
                    case "楼宇":
                        self.building.data = []
                        self.building_level.data = []
                        self.building_house.data = []
                        self.building_bed.data = []
                        self.building.data = await self.building_getData();
                        if (self.building.data.length == 0) return
                        self.building_level.data = await self.building_level_getData();
                        if (self.building_level.data.length == 0) return
                        self.building_house.data = await self.building_house_getData();
                        if (self.building_house.data.length == 0) return
                        self.building_bed.data = await self.building_bed_getData();
                        break;
                    case "楼层":
                        self.building_level.data = []
                        self.building_house.data = []
                        self.building_bed.data = []
                        self.building_level.data = await self.building_level_getData();
                        if (self.building_level.data.length == 0) return
                        self.building_house.data = await self.building_house_getData();
                        if (self.building_house.data.length == 0) return
                        self.building_bed.data = await self.building_bed_getData();
                        break;
                    case "房间":
                        self.building_house.data = []
                        self.building_bed.data = []
                        self.building_house.data = await self.building_house_getData();
                        if (self.building_house.data.length == 0) return
                        self.building_bed.data = await self.building_bed_getData();
                        break;
                    default:
                        self.building_bed.data = []
                        self.building_bed.data = await self.building_bed_getData();
                        break;
                }
                return true
            },
            async building_getData() {
                this.dialog_cof.visible = false
                this.building.loading = true
                this.building_level.loading = true
                this.building_house.loading = true
                this.building_bed.loading = true
                let data = await this.getData({
                    type: "楼宇"
                })

                data = data == null ? [] : data
                this.building.loading = false
                this.building.check_data = data.length > 0 ? data[0] : {}

                this.building_level.loading = false
                this.building_house.loading = false
                this.building_bed.loading = false
                return data
            },
            async building_level_getData() {
                this.dialog_cof.visible = false
                this.building_level.loading = true
                this.building_house.loading = true
                this.building_bed.loading = true
                let data = await this.getData({
                    type: "楼层",
                    superId: this.building.check_data.id
                })
                this.building_level.data = data == null ? [] : data
                this.building_level.loading = false
                this.building_house.loading = false
                this.building_bed.loading = false
                this.building_level.check_data = data.length > 0 ? data[0] : {}

                return data
            },
            async building_house_getData() {
                this.dialog_cof.visible = false
                this.building_house.loading = true
                this.building_bed.loading = true
                let data = await this.getData({
                    type: "房间",
                    superId: this.building_level.check_data.id
                })
                data = data == null ? [] : data
                this.building_house.loading = false
                this.building_bed.loading = false
                this.building_house.check_data = data.length > 0 ? data[0] : null
                return data
            },
            async building_bed_getData() {
                this.dialog_cof.visible = false
                this.building_bed.loading = true
                let data = await this.getData({
                    type: "床位",
                    superId: this.building_house.check_data.id
                })
                data = data == null ? [] : data
                this.building_bed.loading = false
                this.building_bed.check_data = data.length > 0 ? data[0] : null
                return data
            },
            async getData({ type, superId }) {
                let params = this.getParmas(type, superId)
                return await query_batch_bed(params).then(res => {
                    return res == null ? [] : res
                })
            },
            getParmas(type, superId) {
                let params = {}
                switch (type) {
                    case "楼宇":
                        params = {
                            type: "s",
                        }
                        break;
                    case "楼层":
                        params = {
                            type: "f",
                            superId,
                        }
                        break;
                    case "房间":
                        params = {
                            type: "r",
                            superId,
                        }
                        break;
                    case "床位":
                        params = {
                            type: "b",
                            superId,
                        }
                        break;
                }
                return params
            },

        },
        async mounted() {
            let res_house_fee = await query_batch_fee({
                type: fee_type["包房费"]
            })
            this.options_house_fee = res_house_fee.result ?? []

            let res_bed_fee = await query_batch_fee({
                type: fee_type["床位费"]
            })
            this.options_bed_fee = res_bed_fee.result ?? []
            this.building_load()

        },
    }
</script>
<style lang='scss' scoped>
    /* @import "../../../styles/variables.scss"; */
    
</style>
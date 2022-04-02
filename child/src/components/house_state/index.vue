<!-- 
 * @description: 房态图组件
 * @fileName: house_state.vue 
 * @author: 谭人杰 
 * @date: 2021-06-21 16:40:48
 * @后台人员:  
!-->
<template>
    <div>
        <el-row v-if="handleType == 'edit'">
            <el-col style="text-align: left;margin-bottom: 20px;">
                <el-button type="primary" plain @click="create_row">新增一排房间</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </el-col>
        </el-row>
        <div class="bed-state-box" v-for="(item,index) in data" style="margin-bottom: 10px;">
            <div class="box-row-state">
                <draggable ref="combody" filter=".state-item-none" :set-data="setData" :list="item" group="site"
                    animation="300" :move="onMove" :handle="handleType == 'edit' ? '.item-header': '.item-header2'">
                    <div v-for="(child, i) in item">
                        <div class="state-item state-item-none" v-if="child == undefined && handleType == 'edit'"
                            @click="handleDialog(index)" :key="index">
                            <div class="item-header">
                                <div class="state-item-close" @click.stop="handleDel_row(index)">
                                    <i class="el-icon-close"></i>
                                </div>
                            </div>
                            <i class="el-icon-plus"></i>
                        </div>
                        <div style="background: transparent;min-width: 142px"
                            class="state-item state-item-null item-header" v-if="child == '空床位'" :key="i">
                            <div class="item-header">
                                <div v-if="handleType == 'edit'" class="state-item-close"
                                    @click.stop="handleDel(index,i)">
                                    <i class="el-icon-close"></i>
                                </div>
                            </div>
                        </div>
                        <div v-if="child != undefined && child != '空床位'"
                            :style="{'minWidth': child.bedInfos.length >= 6 || child.bedInfos.length == 8 ? '270px' : '120pox'}"
                            class="state-item" :key="child.id">
                            <div>
                                <div class="item-header">
                                    {{ child.roomName }}
                                    <div v-if="handleType == 'edit'" class="state-item-close"
                                        @click.stop="handleDel(index,i)">
                                        <i class="el-icon-close"></i>
                                    </div>
                                </div>
                                <div class="item-content" slot="reference">
                                    <div v-if="handleType == 'info'" v-for="(item, index) in child.bedInfos"
                                        :key="`popover${item, index}`">
                                        <el-popover placement="right" v-if="item.elderInfo == undefined"
                                            popper-class="popover-box" width="200" trigger="hover">
                                            <div>
                                                <div class="popover-box-header">{{ `${child.roomName} - ${item.bedName}`
                                                    }}
                                                </div>
                                                <div class="popover-box-info">{{ child.roomType }}</div>
                                                <div class="popover-box-info">{{ child.side }}</div>
                                                <div class="popover-box-info">床位费：{{ item.bedFee }}/月</div>
                                                <div class="popover-box-info">包房费：{{ child.fee }}/月</div>
                                            </div>
                                            <div class="content-item" v-if="curSelected != item.bedId"
                                                @click="handleSelectBed(child,item)" slot="reference">
                                                <span class="content-item-label">空床</span>
                                                <div class="content-item-mark" v-if="item.isCloseWindow == '1'">
                                                    窗
                                                </div>
                                            </div>
                                            <div class="content-item older-item" v-else
                                                :style="{'border': selected == item.bedId ?  '2px solid #FF8B43 !important' : ''}"
                                                slot="reference" @click="handleSelectBed(child,item)">
                                                <el-avatar :size="22" :src="olderInfo.headUrl"></el-avatar>
                                                <span class="content-item-label">{{ olderInfo.elderName }}</span>
                                            </div>
                                        </el-popover>
                                        <el-popover placement="right" v-if="item.elderInfo != undefined"
                                            popper-class="popover-box" width="200" trigger="click">
                                            <div>
                                                <div class="popover-box-header">{{ item.elderInfo.elderName}}
                                                </div>
                                                <div class="popover-box-info">性别：{{ item.elderInfo.sex == 0 ? "男" : "女"
                                                    }}
                                                </div>
                                                <div class="popover-box-info">入住时间：{{ item.elderInfo.checkInDate ?
                                                    item.elderInfo.checkInDate : "空" }}</div>
                                                <div class="popover-box-info">状态：{{ item.elderInfo.type ?
                                                    item.elderInfo.type : "空" }}</div>
                                                <div class="popover-box-info">护理等级：{{ item.elderInfo.serviceLevel ?
                                                    item.elderInfo.serviceLevel : "空" }}</div>
                                            </div>
                                            <div class="content-item older-item"
                                                :style="{'border': selected == item.bedId ?  '2px solid #FF8B43 !important' : ''}"
                                                slot="reference">
                                                <el-avatar :size="22" :src="item.elderInfo.headUrl"></el-avatar>
                                                <span class="content-item-label">{{ item.elderInfo.elderName }}</span>
                                            </div>
                                        </el-popover>
                                    </div>

                                    <div v-if="handleType == 'edit'" v-for="(item, index) in child.bedInfos"
                                        :key="`popover${item, index}`">

                                        <div class="content-item">

                                            <span class="content-item-label">{{ item.name}}</span>
                                            <div class="content-item-mark" v-if="item.isCloseWindow == '1'">
                                                窗
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </draggable>
            </div>
        </div>
        <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync='dialog_cof.visible'
            :title='dialog_cof.title' :destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>
            <el-form :inline="true" ref="form" hide-required-asterisk status-icon>
                <el-row>
                    <el-col :span="11">
                        <el-form-item class="default" label="房间" prop="building_name">
                            <el-select clearable v-model="bed_id" placeholder="请选择">
                                <el-option v-for="item in options_house" :key="item.id" :label="item.roomName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_cof.visible = false">取 消</el-button>
                <el-button type="primary" @click="hanbleSubmit">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import elDragDialog from '@/directive/el-drag-dialog'
    import { get_house_bed, set_house_state } from '@/api/pensionagency/basicConfig/basicConfig';
    import { get_older_baseinfo } from "@/api/pensionagency/goLive/goLive";

    export default {
        name: 'house_state',
        components: { draggable },
        directives: {
            elDragDialog
        },
        props: {
            rowData: {
                required: true,
                type: Array,
            },
            handleType: {
                type: String,
                default: "edit" // edit代表可操作，info 代表不可操作，可操作状态下显示 删除/新增按钮  不可操作状态下 不显示 删除/新增按钮
            },
            levelId: {
                type: Number,
                default: -1
            },
            selected: {
                type: Number,
                default: undefined
            },
        },

        data() {
            return {
                step: undefined,
                data: [],
                curSelected: undefined,
                olderInfo: {},
                dialog_cof: {
                    visible: false,
                    title: '选择房间',
                    escape: false,
                    destroy: true,
                    modal: false,
                    rowIndex: 0,
                },
                bed_id: undefined,
                options_house: [],
                options_house_old: []
            }
        },
        watch: {
            rowData: {
                deep: true,
                handler: function (newval, oldval) {
                    this.data = newval.map(item => [undefined, ...item])
                },
                immediate: true
            },
            levelId: {
                deep: true,
                handler: function (newval, oldval) {
                    let self = this
                    get_house_bed({
                        floorId: this.levelId
                    }).then(res => {
                        self.options_house_old = res ?? []
                    })
                },
                immediate: true
            },
        },
        mounted() {
            this.step = this.$route.params.step
            this.get_cur_elderInfo()
        },

        methods: {
            get_cur_elderInfo() {
                let elderId = this.$route.query.id ?? this.$route.params.id
                if (!elderId) return
                get_older_baseinfo({
                    elderId,
                }).then(res => {
                    this.olderInfo = res;
                });
            },
            handleSelectBed(houseInfo, bedInfo) {
                // if (this.handleType == "info" && Number(this.step) > 1) return
                if (bedInfo.bedId == this.curSelected || houseInfo.isAllRoom == 1) {
                    houseInfo = {
                        isAllRoom: houseInfo.isAllRoom
                    }
                    bedInfo = {
                        bedName: "",
                        bedFee: "",
                        bedId: undefined,
                    }
                    this.$emit('sendBedInfo', { houseInfo, bedInfo })
                } else {
                    this.$emit('sendBedInfo', { houseInfo, bedInfo })
                }
                this.curSelected = bedInfo.bedId == this.curSelected || houseInfo.isAllRoom == 1 ? undefined : bedInfo.bedId

            },
            hanbleSubmit() {
                let self = this
                let data = this.bed_id == undefined ? "空床位" : this.options_house.filter(item => item.id == this.bed_id)[0]
                self.data[self.dialog_cof.rowIndex].push(data)
                this.$nextTick(() => {
                    let dom = self.$refs["combody"]
                    dom.forEach(item => {
                        item.$forceUpdate()
                    })
                })
                this.dialog_cof.visible = false
            },
            handleSave() {
                this.$emit("change", this.data)
            },

            create_row() {
                let self = this
                if (this.levelId == -1 || this.levelId == undefined) {
                    this.$message({
                        type: "warning",
                        message: "请先选择楼、层"
                    })
                    return
                }
                self.data = [...this.data, ...[[undefined]]]
                self.$nextTick(() => {
                    let dom = self.$refs["combody"]
                    dom.forEach(item => {
                        item.$forceUpdate()
                    })
                })
            },
            onMove(e) {
                if (e.draggedContext.futureIndex == 0) return false
                return true
            },
            handleDel(rowIndex, index) {
                let isMinus = false
                const data = this.data[rowIndex]
                let res = []

                for (let i = 0; i < data.length; i++) {
                    if (i != index) {
                        res.push(data[i])
                    }
                }

                this.$set(this.data, rowIndex, res)
            },
            handleDel_row(index) {
                let res = this.data.filter((item, i) => i != index)
                this.data = res
            },
            setData(dataTransfer) {
                dataTransfer.setData('Text', '')
            },
            handleDialog(index) {

                let self = this
                if (this.levelId == -1 || this.levelId == undefined) {
                    this.$message({
                        type: "warning",
                        message: "请先选择楼、层"
                    })
                    return
                }
                this.dialog_cof.loading = true
                let d = self.data.reduce((cur, pre) => {
                    cur = [...cur, ...pre]
                    return cur
                }, [])
                self.options_house = self.options_house_old.filter(item => {
                    return !d.some(child => child?.id == item.id)
                })

                self.bed_id = undefined
                self.dialog_cof.visible = true
                this.dialog_cof.rowIndex = index
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";

    @function height($n) {
        @return $n * 28+px
    }

    /deep/ .popover-box {
        border-radius: 50px;
        border: 1px solid red;

        &-header {
            border-bottom: 1px solid #eee;
            padding: 0 0 10px 0;
            margin-bottom: 10px;
        }

        &-info {
            font-size: 13px;
            color: silver;
            margin-top: 6px;
        }
    }

    .item {
        padding: 6px;
        background-color: #fdfdfd;
        border: solid 1px #eee;
        margin-bottom: 10px;
        cursor: move;
    }

    .item:hover {
        background-color: #f1f1f1;
        cursor: move;
    }

    .chosen {
        border: solid 2px #3089dc !important;
    }

    .bed-state-box {
        & .box-row-state {
            /* display: flex;
            flex-wrap: wrap; */
            width: 100%;
            border: 2px dashed #1FCDA0;
            padding: 10px;
            margin-bottom: 20px;
            &>div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
            }

            & .state-item-null {
                text-align: center;
                line-height: 200px;
                font-size: 20px;
                color: $baseColor;
                border: none !important;
                background: #fff;
                font-weight: bolder;
                cursor: pointer;
            }

            & .state-item-none {
                text-align: center;
                line-height: 200px;
                font-size: 20px;
                color: $baseColor;
                border: none !important;
                background: #fff;
                font-weight: bolder;
                cursor: pointer;
            }

            & .state-item {
                height: 225px;
                display: inline-block;
                min-width: 110px;
                box-sizing: border-box;
                border: 1px solid #FF8B43;
                border-radius: 5px;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
                margin: 0 10px 10px 0;
                background: #fff;

                & .item-header {
                    position: relative;
                    background: #FF8B43;
                    line-height: 28px;
                    color: white;
                    text-align: center;
                    margin: 0;
                    cursor: pointer;

                    & .state-item-close {
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        right: -10px;
                        top: -10px;
                        position: absolute;
                        background: red;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }

                & .item-content {
                    padding: 15px 0 15px 10px;
                    /* overflow-y: hidden; */
                    height: 215px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;

                    & .older-item {
                        border: 0 !important;
                        background: rgba(255, 153, 52, 0.4);
                        color: black !important;
                        justify-content: start !important;
                        /* &-img {
                            border: 1px solid white;
                            height: 22px;
                            width: 22px;
                            border-radius: 50%;
                        } */
                    }

                    & .content-item {
                        width: 120px;
                        border: 2px solid #1FCDA0;
                        padding: 5px 10px;
                        border-radius: 5px 5px 0 0;
                        color: #1FCDA0;
                        margin: 0 10px 7px 0;
                        font-size: 14px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        &-label {
                            flex: 1;
                            padding: 3px;
                            margin-left: 7px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        &-mark {
                            color: white;
                            padding: 3px;
                            background: #1FCDA0;
                            font-size: 10px;
                        }
                    }
                }
            }
        }

    }
</style>
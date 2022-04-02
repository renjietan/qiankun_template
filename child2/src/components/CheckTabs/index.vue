<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 谭人杰 
 * @date: 2021-08-05 15:30:11
 * @后台人员:  
!-->
<template>
    <div class='check-tabs'>
        <div class="check-tabs-box">
            <div class="check-tabs-box-item" @click="handleClick(item,index)" v-for="(item, index) in data" :key="index">
                <div :class="[ 'check-tabs-box-item-round-' + getClass(item, index)]">{{ index + 1 }}</div>
                <span :class="['check-tabs-box-item-label-' + getClass(item, index)]">{{ item.name }}</span>
                <i  :class="[index == data.length - 1 ? '' : 'el-icon-arrow-right', 'check-tabs-box-item-icon-' + getClass(item, index)]"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'checkTabs',
        props: {
            data: {
                default: () => [],
                type: Array,
            },
        },
        data() {
            return {

            };
        },
        methods: {
            handleClick(data,index) {
                if(data.curStep == 1 && data.curStep == index) {
                    return
                }
                if(parseInt(data.curStep) + 1 < index) {
                    return
                }
                this.$emit("change", index)
            },
            getClass(data, index) {
                // check-tabs-box-item-round-active
                if(index < data.curStep) {
                    return "active"  
                } else if (index == data.curStep + 1) {
                    return "next"
                } else {
                    return "disabled" 
                }
            }
        },
        mounted() {
        },
    }
</script>
<style lang='scss' scoped>
    $active: #3C6CFE;
    $next: #909399;
    $disabled: #DEE0E3;

    %round_style {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: white;
        line-height: 25px;
        text-align: center;
    }

    %flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    %label_style {
        padding: 0 18px;
        font-size: 18px;
        margin-top: 3px
    }
    %icon_style {
        padding: 0 18px 0 0;
        font-size: 18px;
        margin-top: 3px
    }




    .check-tabs {
        @extend %flex;
        width: 100%;
        background-color: #F8F9FA;
        padding: 0 0 20px 0;

        &-box {
            @extend %flex;
            flex-wrap: wrap;
            justify-content: start;
            &-item {
                @extend %flex;
                cursor: pointer;
                padding: 20px 0 0 0;
                &-round-active {
                    @extend %round_style;
                    background: $active;
                }

                &-round-next {
                    @extend %round_style;
                    background: $next;
                }

                &-round-disabled {
                    @extend %round_style;
                    background: $disabled;
                }

                &-label-active {
                    color: $active;
                    @extend %label_style;
                }

                &-label-next {
                    color: $next;
                    @extend %label_style;
                }

                &-label-disabled {
                    color: $disabled;
                    @extend %label_style;
                }
                &-icon-active {
                    color: $active;
                    @extend %icon_style;
                }

                &-icon-next {
                    color: $next;
                    @extend %icon_style;
                }

                &-icon-disabled {
                    color: $disabled;
                    @extend %icon_style;
                }
            }
        }
    }
</style>
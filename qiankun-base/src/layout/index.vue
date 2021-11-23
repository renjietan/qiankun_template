<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 谭人杰 
 * @date: 2021-11-17 11:39:55
 * @后台人员:  
!-->
<template>
    <div class="app-wrapper">
        <section id="Appmicro" />
        <section class="app-main">
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
        </section>
        <!--  -->
    </div>
</template>
<script>
    import startQiankun from 'tmvc-base'// 注入乾坤基座配置

    export default {
        name: 'layout',
        data() {
            return {
                dialog_cof: {
                    visible: true,
                    title: '新增',
                    escape: false,
                    destroy: true,
                    modal: false
                }
            };
        },
        methods: {
        },
        mounted() {

            startQiankun({
                sandbox: true,
                prefetch: true
            })

        },
    }
</script>
<style lang='scss' scoped>
</style>
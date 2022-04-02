<!-- 
 * @description: 入住申请 
 * @fileName: staff_insert_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
    <div>
        <div class="crumbs" style="margin: 0 0 25px 0">
            <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
                <span :class="[
                  'crumbs_font',
                  cur_tag.name == item.name ? 'crumbs_font_active' : '',
                ]">{{ item.name }}</span>
                <span class="crumbs_sprit"> / </span>
            </div>
        </div>
        <!--  防止后期 UI更改  -->
        <component ref="component" :is="cur_tag.component" :key="cur_tag.name"></component>
    </div>
</template>
<script>
    import Pagination from "@/components/Pagination";
    import waves from "@/directive/waves";
    import permission from "@/directive/permission";
    import elDragDialog from "@/directive/el-drag-dialog";
    import { valid_error_msg } from "@/utils/valid-error-msg";
    import { } from "@/utils/validate";
    import Basicinfo from '../../../../../../goLive/form/apply/components/basic_info.vue';
    import Hobby from "../../../../../../goLive/form/apply/components/hobby";
    import Linkman from "../../../../../../goLive/form/apply/components/link_man";
    import LivingStatus from "../../../../../../goLive/form/apply/components/living_status";
    import selectBed from "../../../../../../goLive/form/apply/components/selectBed";
    export default {
        name: "inlive_basicInfo",
        components: {
            Pagination,
            Basicinfo,
            LivingStatus,
            Hobby,
            Linkman,
            selectBed,
        },
        directives: { waves, permission, elDragDialog },
        data() {
            return {
                cur_tag: {},
                tags: [
                    {
                        name: "基本信息",
                        component: "Basicinfo",
                    },
                    {
                        name: "目前生活状况",
                        component: "LivingStatus",
                    },
                    {
                        name: "兴趣爱好",
                        component: "Hobby",
                    },
                    {
                        name: "联系人",
                        component: "Linkman",
                    },
                    {
                        name: "选择床位",
                        component: "selectBed",
                    },
                ],
            };
        },
        watch: {
            "$route.params": {
                deep: true,
                handler: function (n, o) {
                    let { id } = n
                    let tags1 = [{
                        name: "基本信息",
                        component: "Basicinfo",
                    }]
                    let tags2 = [{
                        name: "基本信息",
                        component: "Basicinfo",
                    },
                    {
                        name: "目前生活状况",
                        component: "LivingStatus",
                    },
                    {
                        name: "兴趣爱好",
                        component: "Hobby",
                    },
                    {
                        name: "联系人",
                        component: "Linkman",
                    },
                    {
                        name: "选择床位",
                        component: "selectBed",
                    }]
                    this.tags = isNaN(Number(id)) ? tags1 : tags2
                },
                immediate: true
            }
        },
        methods: {
            handle_switchModel(val) {
                this.cur_tag = val;
            },

        },
        mounted() {
            this.cur_tag = this.tags[0];
        },
    };
</script>
<style lang='scss' scoped>
</style>
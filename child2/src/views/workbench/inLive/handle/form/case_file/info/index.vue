<!-- 
 * @description: 
 * @fileName: info.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 19:52:13
 * @后台人员:  
!-->
<template>
    <div class=''>
        <div class="crumbs" style="margin: 0 0 25px 0;">
            <div v-if="tags.length > 1" v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
                <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">{{
                    item.name }}</span>
                <span class="crumbs_sprit">
                    /
                </span>
            </div>
        </div>
        <component ref="component" :isNeedPrinter="true" title="" :is="cur_tag.component" :key="cur_tag.name">
        </component>
    </div>
</template>
<script>
    import waves from '@/directive/waves'
    import permission from '@/directive/permission'
    import { valid_error_msg } from '@/utils/valid-error-msg'
    import BasicInfo from './components/inlive_basicInfo';
    import HealthEval from '../../../../../goLive/form/examination/components/health_eval.vue';
    import PayloadPlan from '../../../../../goLive/form/payment_plan/components/table_fee.vue';
    import Assessment from './components/CV_assessment';
    import ServerImp from './components/server_imp';
    import AddedServer from './components/added_server';
    import Document from './components/document';
    import ContractDocument from './components/contract_document';
    import Holiday from './components/holiday';
    import SpecialFoods from './components/special_foods';
    import OldManRecord from './components/oldMan_record';
    import NotGoodEvent from './components/not_good_event';
    import ServerProject from './components/server_project';
    import Conclusion from './components/conclusion';
    // conclusion
    import { } from '@/utils/validate'
    export default {
        name: 'info',
        components: {
            BasicInfo, 
            HealthEval, 
            PayloadPlan, 
            Assessment, 
            ServerImp, 
            AddedServer, 
            Document, 
            ContractDocument, 
            Holiday, 
            SpecialFoods,
            OldManRecord,
            NotGoodEvent,
            ServerProject,
            Conclusion
        },
        directives: { waves, permission },
        props: {
            tags: {
                type: Array,
                default: []
            }
        },
        watch: {
            tags: {
                deep: true,
                handler: function (newval, oldval) {
                    this.cur_tag = this.tags[0]
                }
            }
        },
        data() {
            return {
                cur_tag: {},
            };
        },
        methods: {
            handle_switchModel(val) {
                this.cur_tag = val
            },
        },
        mounted() {
            let self = this
            self.$nextTick(() => {
                self.cur_tag = this.tags[0]
            })
        },
    }
</script>
<style lang='scss' scoped>
    /* @import "../../../goLive/apple_form/components/basic_info.vue"; */
</style>
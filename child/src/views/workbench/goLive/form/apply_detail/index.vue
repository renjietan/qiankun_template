<!-- 
 * @description: 详细信息 
 * @fileName: staff_insert_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        详细信息-{{ $route.query.elderName }}
      </div>
      <check-tabs :data="tabs" @change="handleChange"></check-tabs>
      <!--  防止后期 UI更改  -->

      <component ref="component" :is="cur_tag.component" :key="cur_tag.id"></component>
    </div>
  </div>
</template>
<script>
  import CheckTabs from "@/components/CheckTabs";
  import Apply from "@/views/workbench/goLive/form/apply";
  import Examination from "@/views/workbench/goLive/form/examination";
  import AbilityAssess from "@/views/workbench/goLive/form/ability_assess";
  import CustomServers from "@/views/workbench/goLive/form/customServers";
  import PaymentPlan from "@/views/workbench/goLive/form/payment_plan";
  import Verify from "@/views/workbench/goLive/form/verify";
  import ContractSigning from "@/views/workbench/goLive/form/contract_signing";
  import CheckIn from "@/views/workbench/goLive/form/check_in";

  export default {
    name: "goLive_form_apply_detail",
    components: {
      CheckTabs,
      Apply, // 入住办理
      Examination, //入住体检
      AbilityAssess, //能力评估
      CustomServers, //定制服务
      PaymentPlan, //付款计划
      Verify, //入住审核
      ContractSigning, //签订合同
      CheckIn, //办理入住
    },
    data() {
      return {
        cur_tag: {
          name: 0,
          component: "Apply",
        },
        tabs: [
          {
            id: 0,
            name: "入住申请",
            curStep: 0, //当前办理到哪一步, 从0开始， 4代表 办理到了第五步
            component: "Apply",
          },
          {
            id: 1,
            name: "入住体检",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "Examination",
          },
          {
            id: 2,
            name: "能力评估",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "AbilityAssess",
          },
          {
            id: 3,
            name: "定制服务",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "CustomServers",
          },
          {
            id: 4,
            name: "付款计划",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "PaymentPlan",
          },
          {
            id: 5,
            name: "入住审核",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "Verify",
          },
          {
            id: 6,
            name: "签订合同",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "ContractSigning",
          },
          {
            id: 7,
            name: "办理入住",
            curStep: 0, //当前办理到哪一步，从0开始， 4代表 办理到了第五步
            component: "CheckIn",
          },
        ],
      };
    },
    methods: {
      handleChange(index) {
        this.cur_tag = this.tabs[index];
      },
    },
    mounted() {
      const { step } = this.$route.params;
      if (!isNaN(Number(step))) {
        if (step == '1') {
          this.tabs[0].curStep = -1;
          this.tabs[1].curStep = 1;
        } else {
          this.tabs = this.tabs.map((el, index) => {
            try {
              if (index + 1 < step) {
                el.curStep = parseInt(step) + 1;
                this.tabs[index + 1].curStep = index == this.tabs.length ? 0: index
              }
            } catch (error) {
              console.log(index);
            }
            return el;
          });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "当前信息不存在",
          type: "info",
        });
      }
    },
  };
</script>
<style lang='scss' scoped>
  .container {
    height: auto !important;
  }

  .progress {
    width: 100%;
    height: 104px;
    background-color: #f8f9fa;
  }

  /deep/ .el-step__title.is-wait {
    color: #303133;
  }
</style>
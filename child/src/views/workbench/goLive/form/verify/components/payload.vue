<!-- 
 * @description: 付款计划 
 * @fileName: services.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-04 16:48:03
 * @后台人员:  
!-->
<template>
  <div class="container">
    <el-form :inline="true" :model="form_data" ref="form_services" hide-required-asterisk status-icon>
      <el-row style="height: 300px; background-color: #fafafa">
        <el-col :span="5">
          <el-form-item class="readonly" label="制定日期" prop="title">
            <el-date-picker readonly v-model="form_data.checkDate" type="date" placeholder></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item class="readonly" label="制定人" prop="title">
            <el-input readonly v-model="form_data.operator" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <div style="margin: 30px">
            <el-table border ref="data_table" :data="table_data" :header-cell-style="{'background-color':'#E5E8EC'}"
              fit>
              <el-table-column width="200" align="center" prop="planName" label="费用科目"></el-table-column>
              <el-table-column width="300" align="center" prop="cycle" label="时间周期"></el-table-column>
              <el-table-column width="200" align="center" prop="tollStandard" label="收费标准"></el-table-column>
              <el-table-column width="200" align="center" prop="afterDiscount" label="折扣后"></el-table-column>
              <el-table-column align="left" prop="rsv" label="收费说明"></el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import { arrayGroupBy } from "@/utils/index";
  import { get_pay_plan } from "@/api/pensionagency/goLive/goLive";
  export default {
    name: "payload",
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        table_data: [],
        form_data: {
          title: "",
          checked: [],
        },
        level: ["物业服务", "轻度失眠", "中度失眠", "重度失眠"],
        checkList_model: {},
        table_data_obj: {},
      };
    },
    methods: {
      handleSubmit(type) {
        let self = this;
        switch (type) {
          case "驳回审核":
            self.$confirm(`确定要${type}么?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              self.$notify({
                title: "成功",
                message: `${type}成功`,
                type: "success"
              });
            });
            break;
          case "审核通过":

            self.$notify({
              title: "成功",
              message: `${type}`,
              type: "success"
            });
            self.$router.go(-1)
            break;
          default:
            break;
        }
      },
      parseTableData() {
        let self = this;
        self.table_data = self.table_data.map((item, index) => {
          item.value_key = `checkList${index}`;
          self.$set(self.checkList_model, item.value_key, false);
          return item;
        });
      },
    },
    mounted() {
      let { id } = this.$route.params
      let self = this
      get_pay_plan({
        elderId: id
      }).then(res => {
        self.table_data = res.planList
        self.form_data.checkDate=res.checkDate
        self.form_data.operator=res.operator
        this.parseTableData();
        this.table_data_obj = arrayGroupBy(this.table_data, "name");
      })
    },
  };
</script>
<style lang='scss' scoped>
</style>
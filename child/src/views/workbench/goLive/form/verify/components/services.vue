<!-- 
 * @description: 服务项目 
 * @fileName: services.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-04 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true" ref="form_services" hide-required-asterisk status-icon>
      <el-row style="height:250px; background-color: #fafafa; padding:0 20px;">
        <el-col :span="4">
          <el-form-item class="readonly" label="制定日期">
            <el-date-picker readonly v-model="form_data.set_date" type="date" placeholder></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="制定人">
            <el-input readonly v-model="form_data.set_person" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="服务等级">
            <el-input readonly v-model="form_data.service_level" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="服务套餐">
            <el-input readonly v-model="form_data.service_menu" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="24">
             <div >
            <el-table border ref="data_table" :data="table_data" :show-header="false" >
              <el-table-column prop="typeName" width="120" align="center">
              </el-table-column>
              <el-table-column align="left">
                <template slot-scope="scope">
                  <div>
                    <el-tag :key="item.projectName" style="margin-right: 20px;" v-for="item in scope.row.data">{{
                      item.projectName }}</el-tag>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          </el-col>
          
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import { get_service_project } from '@/api/pensionagency/goLive/goLive';
  import { arrayGroupBy } from "@/utils/index"
  export default {
    name: "services",
    directives: { waves },
    data() {
      return {
        table_data: [],
        form_data: {
          set_date: "",
          set_person: "",
          service_level: "",
          service_menu: "",
        },
      };
    },
    methods: {

    },
    mounted() {
      
      let { id } = this.$route.params
      let self = this
      get_service_project({
        elderId: id
      }).then(res => {
        this.form_data.set_date = res.checkDate ?? ""
        this.form_data.set_person = res.operator ?? ""
        this.form_data.service_level = res.levelName ?? ""
        this.form_data.service_menu = res.cimboName ?? ""
        let table_data = arrayGroupBy(res.projectBaseInfoVos ?? [], "typeName")
        let r = []
        for (let i in table_data) {

          let obj = {
            typeName: i,
            data: table_data[i]
          }
          r.push(obj)
        }
        this.table_data = r
      })
    },
  };
</script>
<style lang='scss' scoped>
  /deep/.el-table__body-wrapper .el-table__row td {
    border-right: 1px solid #dfe6ec !important;
  }
</style>
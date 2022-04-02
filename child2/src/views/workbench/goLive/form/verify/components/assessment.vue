<!-- 
 * @description:评估状况 
 * @fileName: assessment.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-04 17:42:52
 * @后台人员:  
!-->
<template>
  <div>
    <el-form>
      <el-row style="height: 250px; background-color: #fafafa; padding: 0 20px;">
        <el-col :span="4">
          <el-form-item class="readonly" label="评估日期" prop="title">
            <el-date-picker readonly v-model="form_data.assess_date" type="date" placeholder></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="评估人" prop="title">
            <el-input readonly v-model="form_data.assess_person" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item class="readonly" label="评估等级" prop="title">
            <el-input readonly v-model="form_data.assess_level" required placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <div style="margin: 120px 0 0 30px">
            <el-table border ref="data_table" :data="table_data" :show-header="false"
              style="min-width: 600px; width: 600px;" >
              <el-table-column prop="column0" width="120" align="center"></el-table-column>
              <el-table-column  align="left" prop="column1"></el-table-column>
              <el-table-column  align="left" prop="column2"></el-table-column>
              <el-table-column  align="left" prop="column3"></el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-row>
    </el-form>

  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import { get_assess_info } from '@/api/pensionagency/goLive/goLive';
  import { arrayGroupBy } from "@/utils/index"

  export default {
    name: "assessment",
    directives: { waves },
    data() {
      return {
        table_data: [],
        form_data: {
          assess_date: "",
          assess_person: "",
          assess_level: "",
        },
      };
    },
    methods: {
    },
    mounted() {
      let { id } = this.$route.params
      let self = this
      get_assess_info({ elderId: id }).then(res => {
        self.form_data.assess_date = res.checkDate ?? ""
        self.form_data.assess_person = res.operator ?? ""
        self.form_data.assess_level = res.levelDesc ?? ""
        let table_data = arrayGroupBy(res.projectAssessResult ?? [], "typeName")
        let row1 = {}
        let row2 = {}
        let count = 0
        for(let i in table_data) {
          row1[`column${count}`] = i
          row2[`column${count}`] = table_data[i][0]?.levelDesc ?? ""
          count++
        }
        this.table_data = [row1,row2]
      })
    }
  };
</script>
<style lang='scss' scoped>
  /deep/.el-table__body-wrapper .el-table__row td {
    border-right: 1px solid #dfe6ec !important;
  }
</style>
<!-- 
 * @description: 合同一览
 * @fileName: contract_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 12:00:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row style="margin-top:10px">
          <el-col :span="5">
            <el-form-item label="姓名：">
              <el-input clearable v-model="flt.elderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="床位：">
              <el-input clearable v-model="flt.bedName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right;">
            <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
            <el-button @click="handleScreen(flt, '重置')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px;">
        <div>合同列表</div>
        <div>
          <el-button icon="el-icon-upload2" type="success">数据导出</el-button>
        </div>
      </div>
      <el-table
        class="table_data"
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index + 1, 2) }}</div>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" prop="name" label="头像">
          <template slot-scope="scope">
            <el-image style="width:40px; height: 40px;border-radius:50%" :src="scope.row.headUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
          <template slot-scope="scope">{{scope.row.sex=="0"?"男":"女"}}</template>
        </el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="startDate" label="合同生效日"></el-table-column>
        <el-table-column align="center" prop="endDate" label="合同到期日"></el-table-column>
        <el-table-column align="center" prop="expiredDays" label="过期天数">
          <template slot-scope="scope">
            <span v-if="scope.row.colourFlag==2" style="color:#FE3D65">{{scope.row.expiredDays}}</span>
            <span v-if="scope.row.colourFlag==1" style="color:#ff7a00">{{scope.row.expiredDays}}</span>
            <span v-if="scope.row.colourFlag==0">{{scope.row.expiredDays}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="300" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDialog('合同履历', scope.row)" :underline="false">合同履历</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="warning" :underline="false" @click="handleNav(scope.row)">续签合同</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
      />
      <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
import { get_contract_list } from "@/api/pensionagency/inLive/contract";
export default {
  name: "inLive_contract_list",
  components: { Pagination },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        elderName: "",
        bedName: undefined,
        pageNum: 1,
        pageSize: 10
      },
      status_options: []
    };
  },
  methods: {
    formatZero,
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          self.flt = {
            elderName: "",
            bedName: undefined,
            pageNum: 1,
            pageSize: 10
          };
          self.getList();
          break;
      }
    },
    handleNav(data) {
      this.$router.push({
        path: `/workbench/workbench/inLive/contract/renew/${data.elderId}`,
        query: {
          id: data.id
        }
      });
    },
    handleDialog(type, data) {
      this.$router.push({
        path: `/workbench/workbench/inLive/handle/form/case_file/${data.elderId}`,
        query: { navid: 8 }
      });
    },
    getList() {
      this.table_loading = true;
      get_contract_list({ ...this.flt }).then(res => {
        this.table_data = res.result;
        this.table_total = res.totalCount;
      });
      this.table_loading = false;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
</style>
<!-- 
 * @description: 合同履历
 * @fileName: contract_document.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button disabled type="primary" icon="el-icon-plus" @click="addContract('','添加')">添加合同</el-button>
      <el-button type="warning" icon="el-icon-printer" disabled>打印续签协议</el-button>
    </div>
    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="100" align="center" prop="index" label="序号">
        <template slot-scope="scope">
          <div :style="{color: $variables.baseColor }">{{ formatZero(scope.$index + 1, 2) }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fileNum" label="档案号"></el-table-column>
      <el-table-column align="center" prop="beforeEndDate" label="上次合同截至日期"></el-table-column>
      <el-table-column align="center" prop="contractStartDate" label="本次合同开始日期"></el-table-column>
      <el-table-column align="center" prop="contractEndDate" label="本次合同截至日期"></el-table-column>
      <el-table-column align="center" prop="" label="合同年限"></el-table-column>
      <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
      <!-- <el-table-column align="center" prop="isAllRoom" label="是否包房">
        <template></template>
      </el-table-column>
      <el-table-column align="center" prop="levelName" label="服务等级"></el-table-column>
      <el-table-column align="center" prop="cimboName" label="服务套餐"></el-table-column> -->
      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="addContract(scope.row,'修改')">修改合同日期</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="table_total > 0"
      :total="table_total"
      :page.sync="flt.pageNum"
      :limit.sync="flt.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
import { get_contract_detail ,get_elder_contract} from "@/api/pensionagency/inLive/contract";
export default {
  name: "contract_document",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_data: [],
      table_loading: false,
      table_total: 0,
      flt: {
        pageNum: 1,
        pageSize: 10,
        elderId: null
      }
    };
  },
  methods: {
    formatZero,
    addContract(data, type) {
      console.log(data);
      switch (type) {
        case "添加":
          this.$router.push("/workbench/workbench/inLive/contract/renew/43");
          break;
        case "修改":
          this.$router.push({path:`/workbench/workbench/inLive/contract/renew/${data.elderId}`,query:{id:data.id}});
          break;
      }
    },

    getList() {
      let self =this
      self.table_loading = true;
      get_elder_contract({ ...this.flt }).then(res => {
        self.table_data = res.result
        self.table_total=res.totalCount
        console.log(self.table_data);

      });
      self.table_loading = false;

    }
  },
  mounted() {
    const { id } = this.$route.params
    this.flt.elderId=id
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
</style>
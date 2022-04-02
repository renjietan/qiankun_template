<!-- 
 * @description: 
 * @fileName: transfer_other.vue 
 * @author: 王文涛 
 * @date: 2021-11-16 14:44:51
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class>
      <basic-info-table></basic-info-table>
    </div>
    <div class="container_card">
      <el-form :inline="true" label-position="top" ref="form" :model="flt">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="6">
                <el-form-item label="转出长者">
                  <el-input
                    v-model="$route.query.elderName"
                    style="width: 270px"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="转入长者"
                  prop="outName"
                  :rules="{
                    required: true,
                    message: '请选择转入账户',
                    trigger: 'change',
                  }"
                >
                  <el-autocomplete
                    v-model="flt.outName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <span style="font-weight: bold">转出老人账户明细</span>
            <el-table
              style="margin-top: 12px"
              class="table_data"
              border
              ref="table_data"
              :data="table_data_one"
              v-loading="table_loading"
              highlight-current-row
              fit
            >
              <el-table-column align="left" width="80" label="序号">
                <template slot-scope="scope">
                  <span :style="{ color: $variables.baseColor }" class="num">
                    {{ formatZero(scope.$index + 1, 2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="账户" prop="name">
              </el-table-column>
              <el-table-column align="center" prop="money" label="余额(元)">
              </el-table-column>
              <el-table-column align="center" prop="bedName" label="状态">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="margin-top: 40px">
          <el-col :span="24">
            <span style="font-weight: bold">转出详情</span>
            <span style="color: red">*</span>
            <el-table
              style="margin-top: 12px"
              class="table_data"
              border
              ref="table_data"
              :data="flt.transferDetails"
              v-loading="table_loading"
              highlight-current-row
              fit
            >
              <el-table-column align="left" width="80" label="序号">
                <template slot-scope="scope">
                  <span :style="{ color: $variables.baseColor }" class="num">
                    {{ formatZero(scope.$index + 1, 2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="转出账户">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.outAccount">
                    <el-option
                      v-for="item in options_status"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="bedName" label="转入账户">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.inAccount">
                    <el-option
                      v-for="item in options_status"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="bedName" label="转入金额">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amt"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    @change="getValue(scope.$index, $event)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <i
                    class="el-icon-delete"
                    style="color: red"
                    @click="handleAction(scope.$index, '删除')"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="margin: 12px 0">
          <el-button
            type="primary"
            @click="handleAction('', '新增')"
            plain
            icon="el-icon-plus"
            >添加一条</el-button
          >
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" style="width: 100%">
              <el-input
                v-model="flt.transferDesc"
                type="textarea"
                :rows="4"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">确认转帐</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import BasicInfoTable from "@/components/Basicinfo/table";
import { formatZero, parsetNumber } from "@/filters";
import {} from "@/utils/validate";
import { get_elder_all } from "@/api/pensionagency/inLive/index";
import { elderId_trans_other } from "@/api/pensionagency/fsm/elder_account_info";
export default {
  name: "transfer_other",
  components: { Pagination, BasicInfoTable },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {
        outName: undefined,
        inElderId: undefined,
        outElderId: undefined,
        transferDesc: undefined,
        transferDetails: [],
      },
      table_total: 1,
      table_loading: false,
      table_data_one: [],
      options_status: [],
    };
  },
  methods: {
    formatZero,
    parsetNumber,
    initData() {
      this.flt.outElderId = this.$route.query.id;
      this.table_data_one = this.$route.query.info
        ? JSON.parse(this.$route.query.info)
        : [];
      this.flt.transferDetails = [
        { amt: 0, inAccount: undefined, outAccount: undefined },
      ];
      this.options_status = this.table_data_one.map((el) => {
        return {
          desc: el.name,
          type: el.type,
        };
      });
      this.getOlder();
    },
    getValue(i, e) {
      this.flt.transferDetails[i].amt = this.parsetNumber(e);
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "收退费":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "收退费";
          break;
        case "新增":
          self.flt.transferDetails = [
            ...self.flt.transferDetails,
            { amt: 0, inAccount: undefined, outAccount: undefined },
          ];
          break;
        case "删除":
          if (data !== 0) {
            self.$confirm("提示", "是否删除此条记录？").then((res) => {
              self.flt.transferDetails.splice(data, 1);
            });
          } else {
            self.$notify({
              title: "警告",
              message: "至少保留一条",
              type: "warning",
            });
          }
          break;
        default:
          break;
      }
    },
    getOlder() {
      get_elder_all().then((res) => {
        this.restaurants = res
          .map((el) => {
            el.value = el.elderName;
            return el;
          })
          .filter((el) => {
            return el.elderName != this.$route.query.elderName;
          });
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 300 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.elderName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelect(item) {
      this.flt.inElderId = item.elderId;
    },
    handleSubmit() {
      this.$refs["form"].validate((isvaild) => {
        if (isvaild) {
          elderId_trans_other({
            ...this.flt,
         
          }).then((res) => {
            this.$notify({
              type: "success",
              message: "转账成功!",
              title: "成功",
            });
           this.$router.go(-1);
          });
        }
      });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang='scss' scoped>
.num {
  display: inline-block;
  height: 42px;
  line-height: 42px;
}
</style>
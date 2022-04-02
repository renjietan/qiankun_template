<!-- 
 * @description:服务记录一览
 * @fileName: care_for_record.vue 
 * @author: 王文涛 
 * @date: 2021-09-06 16:34:22
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div style="display: flex; justify-content: space-between;">
        <div style="flex: 1;display: flex; align-items: center;">
          <quick-date-picker-day @getData="handleGetDate" :isShow_tag="false"></quick-date-picker-day>
          <el-input
            style="width: 200px;margin-left: 15px;"
            clearable
            v-model="flt.nameOrBed"
            placeholder="姓名/床位"
          ></el-input>
          <el-select style="margin-left: 15px;" clearable v-model="flt.lvId" placeholder="服务等级">
            <el-option
              v-for="item in service_options"
              :key="item.id"
              :label="item.levelName"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- 
        <el-select clearable v-model="bed_id" placeholder="服务等级">
          <el-option v-for="item in options_house" :key="item.id" :label="item.roomName" :value="item.id">
          </el-option>
        </el-select>
        <el-select clearable v-model="bed_id" placeholder="状态">
          <el-option v-for="item in options_house" :key="item.id" :label="item.roomName" :value="item.id">
          </el-option>
        </el-select>
        <el-select clearable v-model="bed_id" placeholder="服务类型">
          <el-option v-for="item in options_house" :key="item.id" :label="item.roomName" :value="item.id">
          </el-option>
          </el-select>-->
        </div>
        <div>
          <el-button type="primary" @click="init">查询</el-button>
          <el-button @click="reset_flt">重置</el-button>
        </div>
      </div>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>服务记录一览</span>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
        :cell-style="{ padding: '3.5px' }"
      >
        <el-table-column fixed align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">{{formatZero(scope.$index + 1, 2)}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="name" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.avator"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column fixed width="100" align="center" prop="elderName" label="姓名"></el-table-column>
        <el-table-column fixed width="120" align="center" prop="bedName" label="床位"></el-table-column>
        <el-table-column fixed width="120" align="center" prop="levelDesc" label="服务等级"></el-table-column>
        <el-table-column fixed align="center" prop="liveStatus" label="状态"></el-table-column>
        <template>
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            align="center"
            :prop="item.prop"
            :label="item.projectName"
          >
            <template slot-scope="scope">
              <div v-if="scope.row[`${item.prop}_isFinsh`] == 1">
                <i class="el-icon-circle-check" style="color: #40c397; font-size: 20px"></i>
              </div>
              <div v-else style="color: red;">{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </template>
        <!-- <el-table-column align="center" width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click.native="handleNav(scope.row, '详情')">详情</el-link>
            <el-link type="danger" @click="handleNav(scope.row, 'delete')" :underline="false">删除</el-link>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="init"
      />
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    ></el-dialog>
  </div>
</template>
<script>
import QuickDatePickerDay from "@/components/Quick_DatePicker/day";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import { table } from "@/utils/enum";
import { get_service_data_list } from "@/api/pensionagency/servers/serves";
import { query_batch_server, all_service_level } from "@/api/pensionagency/basicConfig/basicConfig";
import { parseTime } from "@/utils/index";
import {} from "@/utils/validate";
export default {
  components: { Pagination, QuickDatePickerDay },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table,
      flt: {
        nameOrBed: "",
        date: new Date(),
        pageNum: 1,
        pageSize: 10,
        lvId: undefined
      },
      service_options: [],
      table_data: [],
      table_total: 0,
      table_loading: false,
      columns: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  methods: {
    formatZero,
    async init() {
      let self = this;
      let params = { ...self.flt };
      params.date = parseTime(params.date, "{y}-{m}-{d}");
      self.table_loading = true;
      let service_options = await all_service_level();
      this.service_options = service_options ?? [];
      let columns = await query_batch_server({
        status: "N"
      });
      columns = columns?.result ?? [];
      self.columns = columns.map(item => {
        item.prop = `prop_${item.id}`;
        return item;
      });
      let res = await get_service_data_list(params);
      self.table_loading = false;
      self.flt.pageNum = res?.pageNum ?? 1;
      self.flt.pageSize = res?.pageSize ?? 10;
      self.table_total = res?.totalCount ?? 0;
      let table_data = res?.result ?? [];
      table_data = table_data.reduce((cur, pre) => {
        let obj = {
          bedName: pre.bedName,
          elderId: pre.elderId,
          elderName: pre.elderName,
          headUrl: pre.headUrl,
          levelDesc: pre.levelDesc,
          liveStatus: pre.liveStatus,
          lvId: pre.lvId
        };
        if (pre.records.length > 0) {
          pre.records.forEach(item => {
            let temp =
              self.columns.filter(c => c.id == item.projectId)[0] ?? {};
            let s = temp.time == null || temp.time == "";
            if (s) {
              obj[temp.prop] = item.data;
            } else {
              let len = temp.time.split(",").length;
              if (item.data < len) {
                obj[temp.prop] = `${item.data}/${len}`;
                obj[`${temp.prop}_isFinsh`] = 0;
              } else {
                obj[temp.prop] = `${item.data}/${len}`;
                obj[`${temp.prop}_isFinsh`] = 1;
              }
            }
          });
        }
        return [...cur, ...[obj]];
      }, []);
      this.table_data = table_data;
      console.log(table_data);
    },
    reset_flt() {
      this.flt = {
        nameOrBed: "",
        date: new Date(),
        pageNum: 1,
        pageSize: 10,
        lvId: undefined
      };
      this.init();
    },
    handleGetDate(v) {
      this.flt.date = v;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__fixed-header-wrapper th {
  padding: 3.5px 0;
}
</style>
<!-- 
 * @description:服务统计 
 * @fileName: care_for_imp.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-27 15:51:18
 * @后台人员:  
!-->
<template>
  <!-- <div class="container">
    <div class="no-data">
      <img :src="no_data" alt />
    </div>
  </div> -->
  <div class="container">
    <div class="container_card">
      <el-row :gutter="10">
        <el-col :span="3">
          <div
            :class="[
                      'content-item',
                      cur_crowd == 'elder' ? 'content-active' : '',
                    ]"
            @click="handleSwitch_people()"
          >
            <div class="content" style="margin-left: 12px">
              <p style="line-height: 0; font-size: 14px;font-weight:600;cursor: pointer">长者服务统计</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div
            :class="[
                      'content-item',
                      cur_crowd == 'workers' ? 'content-active' : '',
                    ]"
            @click="handleSwitch_people()"
          >
            <div class="content" style="margin-left: 12px">
              <p style="line-height: 0; font-size: 14px;font-weight:600;cursor: pointer">职工服务统计</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container_card">
      <div class="title">服务统计</div>
      <el-form :inline="true">
        <el-row style="margin-top:20px">
          <el-col v-if="this.cur_crowd=='workers'" :span="4">
            <el-form-item label="职位类型:">
              <el-select v-model="flt.type" style="height:34px" placeholder="职位类型">
                <el-option label="1" value="value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="日期选择:">
              <el-date-picker
                v-model="flt.dateTime"
                style="height:34px"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-button type="primary" plain @click="handleTime('今日')">今日</el-button>
            <el-button type="primary" plain @click="handleTime('本周')">本周</el-button>
            <el-button type="primary" plain @click="handleTime('本月')">本月</el-button>
            <el-button type="primary" plain @click="handleTime('今年')">今年</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div v-show="this.cur_crowd==='elder'">
        <el-table
          border
          class="table_data"
          ref="table_data"
          :data="table_data"
          v-loading="table_loading"
          stripe
          highlight-current-row
        >
          <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
          <el-table-column align="center" width="80" prop="headUrl" label="头像">
            <template slot-scope="scope">
              <el-image
                style="width: 40px; height: 40px; border-radius: 50%"
                :src="scope.row.headUrl"
                fit="fit"
                :preview-src-list="[]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="120"
            show-overflow-tooltip
            label="姓名"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="120"
            show-overflow-tooltip
            label="床位"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="120"
            show-overflow-tooltip
            label="服务等级"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="elderName"
            width="100"
            show-overflow-tooltip
            label="状态"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="300"
            show-overflow-tooltip
            label="计划内服务次数（完成/全部）"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="150"
            show-overflow-tooltip
            label="服务完成率"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="608"
            show-overflow-tooltip
            label="增值服务次数"
          ></el-table-column>
          <el-table-column align="left" width="80" label="操作">
            <template slot-scope="scope">
              <el-link
                :underline="false"
                type="primary"
                @click.native="handleClick(scope.row, '详情')"
              >详情</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="this.cur_crowd==='workers'">
        <el-table
          border
          class="table_data"
          ref="table_data_worker"
          :data="table_data_worker"
          v-loading="table_worker_loading"
          stripe
          highlight-current-row
        >
          <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>

          <el-table-column align="left" prop="type" width="120" show-overflow-tooltip label="职工姓名"></el-table-column>
          <el-table-column align="left" prop="type" width="120" show-overflow-tooltip label="职工类型"></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="120"
            show-overflow-tooltip
            label="所属区域"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="300"
            show-overflow-tooltip
            label="计划内服务次数（完成/全部）"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="180"
            show-overflow-tooltip
            label="服务完成率"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="180"
            show-overflow-tooltip
            label="增值服务次数"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="elderName"
            width="528"
            show-overflow-tooltip
            label="临时服务次数"
          ></el-table-column>
          <el-table-column align="left" width="130" label="操作">
            <template slot-scope="scope">
              <el-link
                :underline="false"
                type="primary"
                @click.native="handleClick(scope.row, '详情')"
              >详情</el-link>
              <el-link
                :underline="false"
                type="warning"
                @click.native="handleClick(scope.row, '添加服务')"
              >添加服务</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import QuickDatePickerShiftWeek from "@/components/Quick_DatePicker/shift_week";
import { get_schedule_list, update_schedule } from "@/api/pensionagency/servers/serves";
import {} from "@/utils/validate";
import { Calendar, deepClone } from "@/utils/index";

export default {
  name: "services_care_for_scheduling",
  components: { Pagination, QuickDatePickerShiftWeek },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      table_total: 0,
      flt: {
        dateTime: null,
        type: null,
        pageNum: 1
      },
      table_data: [
        {
          elderName: 2
        }
      ],
      table_data_worker: [
        {
          elderName: 1,
          type: 2
        }
      ],
      table_loading: false,
      table_worker_loading: false,
      cur_crowd: "elder", //当前区域
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  watch: {
    flt: {
      deep: true,
      handler: function(newval, oldval) {
        let self = this;
        self.getList();
      }
    }
  },
  methods: {
    //选择人群
    handleSwitch_people() {
      this.flt = {
        type: null,
        dateTime: null,
        pageNum: 1
      };
      if (this.cur_crowd == "elder") {
        this.cur_crowd = "workers";
      } else {
        this.cur_crowd = "elder";
      }
      // this.getList();
    },
    //获取表格数据
    getList() {},
    handleTime(type) {
      let self = this;
      let start_between = [];
      let end_between = [];
      switch (type) {
        case "今日":
          start_between = new Date();
          end_between = new Date();
          self.flt.dateTime = [start_between, end_between];
          break;
        case "本周":
          let curDate = this.Calendar_obj.ThisWeek(new Date());
          start_between = new Date(curDate[0].split("  ")[0]);
          end_between = new Date(curDate[curDate.length - 1].split("  ")[0]);
          self.flt.dateTime = [start_between, end_between];
          break;
        case "本月":
          let mouthDate = new Date();
          start_between = new Date(
            mouthDate.getFullYear(),
            mouthDate.getMonth(),
            1
          );
          end_between = new Date(
            mouthDate.getFullYear(),
            mouthDate.getMonth() + 1,
            0
          );
          self.flt.dateTime = [start_between, end_between];

          break;
        case "今年":
          start_between = new Date();
          start_between.setDate(1);
          start_between.setMonth(0);
          end_between = new Date();
          end_between.setFullYear(end_between.getFullYear() + 1);
          end_between.setDate(0);
          end_between.setMonth(-1);
          self.flt.dateTime = [start_between, end_between];

          break;

        default:
          break;
      }
    },
    handleClick(data, type) {
      let self = this;
      switch (type) {
        case "导出":
          break;
        case "打印":
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.Calendar_obj = new Calendar();
    // this.getList();
  }
};
</script>
<style lang='scss' scoped>
/deep/.el-input--small .el-input__inner {
  height: 34px;
  line-height: 34px;
}
.content-item {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}
.content-active {
  border: 1px solid #017cff;
  background: rgba(1, 124, 255, 0.09);
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
}
</style>
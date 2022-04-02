<!-- 
 * @description:统计分析 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-21 10:39:02
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="sum_title">长者状况统计</div>

    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="info_box">
            <div class="info_box_left">
              <div class="info_box_title">在住长者</div>
              <div class="info_box_sum">46</div>
              <div style="width:220px;height:1px;background-color:#E8E8E8;margin-top:14px"></div>
              <div class="info_box_bottom">
                <span style="color:#000000A6">
                  近期新增长
                  <span style="color:#000000D9">2</span>
                </span>
                <span style="color:#000000A6;margin-left:60px">
                  请假长者
                  <span style="color:#000000D9">2</span>
                </span>
              </div>
            </div>
            <div class="info_box_right">
              <inline-older></inline-older>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info_box">
            <div class="info_box_left">
              <div class="info_box_title">本月亲属拜访人次</div>
              <div class="info_box_sum">266</div>
              <div style="width:220px;height:1px;background-color:#E8E8E8;margin-top:14px"></div>
              <div class="info_box_bottom">
                <span style="color:#000000A6">
                  比上月增加
                  <span style="color:#000000D9">48%</span>
                </span>
              </div>
            </div>
            <div class="info_box_right">
              <monthly-visit></monthly-visit>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info_box">
            <div class="info_box_left">
              <div class="info_box_title">满意度</div>
              <div class="info_box_sum">88%</div>
              <div style="width:220px;height:1px;background-color:#E8E8E8;margin-top:14px"></div>
              <div class="info_box_bottom">
                <span style="color:#000000A6">
                  当月满意度调查人数
                  <span style="color:#000000D9">48</span>
                </span>
              </div>
            </div>
            <div class="info_box_right">
              <Satisfaction />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info_box">
            <div class="info_box_left">
              <div class="info_box_title">本月增值服务数量</div>
              <div class="info_box_sum">146</div>
              <div style="width:220px;height:1px;background-color:#E8E8E8;margin-top:14px"></div>
            </div>
            <div class="info_box_right">
              <add-services></add-services>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info_box2">
            <div class="info_box_left">
              <div class="info_box_title">性别占比</div>
            </div>
            <div class="info_box_right">
              <sex-ratio></sex-ratio>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info_box2">
            <div class="info_box_left">
              <div class="info_box_title">年龄分布</div>
            </div>
            <div class="info_box_right">
              <age-distribution></age-distribution>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info_box2">
            <div class="info_box_left">
              <div class="info_box_title">学历统计</div>
            </div>
            <div class="info_box_right">
              <education-statistics></education-statistics>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info_box3">
            <div class="info_box_top">
              <div class="info_box_title">兴趣爱好统计</div>
              <!-- <div class="filter">
                <el-select style="width: 100px" clearable v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div> -->
              <el-divider></el-divider>
            </div>
            <div class="info_box_bottom">
              <interest-statistics></interest-statistics>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info_box3">
            <div class="info_box_top">
              <div class="info_box_title">慢性病统计</div>
              <!-- <div class="filter">
                <el-select style="width: 100px" clearable v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div> -->
              <el-divider></el-divider>
            </div>
            <div class="info_box_bottom">
              <disease-statistics></disease-statistics>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info_box3">
            <div class="info_box_top">
              <div class="info_box_title">服务等级统计</div>
              <el-divider></el-divider>
            </div>
            <div class="info_box_bottom">
              <service-statistics></service-statistics>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info_box3" style="height:434px">
            <div class="info_box_top">
              <div class="info_box_title">费用类别统计</div>
              <div class="filter">
                <el-select style="width: 100px" clearable v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-divider></el-divider>
            </div>
            <div class="info_box_bottom">
              <expense-category></expense-category>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="info_box3" style="height:434px;width:1192px">
            <div class="info_box_top">
              <div class="info_box_title">月度费用统计</div>
              <div class="filter" style="left:90%">
                <el-select style="width: 100px" clearable v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-divider></el-divider>
            </div>
            <div class="info_box_bottom">
              <monthly-expense></monthly-expense>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
const typeOptions = [
  {
    value: "1",
    label: "本周"
  },
  {
    value: "2",
    label: "本月"
  }
];
import Pagination from "@/components/Pagination";
import InlineOlder from "./Echarts/inline_older";
import MonthlyVisit from "./Echarts/monthly_visit";
import Satisfaction from "./Echarts/satisfaction";
import AddServices from "./Echarts/add_services";
import SexRatio from "./Echarts/sex_ratio";
import AgeDistribution from "./Echarts/age_distribution";
import EducationStatistics from "./Echarts/education_statistics";
import InterestStatistics from "./Echarts/interest_statistics";
import DiseaseStatistics from "./Echarts/disease_statistics";
import ServiceStatistics from "./Echarts/Service_statistics";
import ExpenseCategory from "./Echarts/expense_category";
import MonthlyExpense from "./Echarts/monthly_expense";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  components: {
    Pagination,
    InlineOlder,
    MonthlyVisit,
    Satisfaction,
    AddServices,
    SexRatio,
    AgeDistribution,
    EducationStatistics,
    InterestStatistics,
    DiseaseStatistics,
    ServiceStatistics,
    ExpenseCategory,
    MonthlyExpense
  },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      typeOptions,
      value: "2"
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/.el-select .el-input .el-select__caret {
  color: #017cff;
  width: 12px;
  height: 32px;
  border-width: 20px;
}
/deep/.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 16px 0;
}
.info_box {
  position: relative;
  width: 435px;
  height: 158px;
  background-color: #fff;
  margin-top: 16px;
  padding-left: 24px;
  .info_box_left {
    .info_box_title {
      font-size: 14px;
      color: #222;
      font-weight: bold;
      padding-top: 20px;
    }
    .info_box_sum {
      font-size: 37px;
      padding-top: 16px;
      font-weight: bold;
    }
    .info_box_bottom {
      font-size: 14px;
      padding-top: 10px;
    }
  }
  .info_box_right {
    position: absolute;
    right: 2%;
    top: 0%;
  }
}
.info_box2 {
  position: relative;
  width: 588px;
  height: 158px;
  background-color: #fff;
  margin-top: 16px;
  padding-left: 24px;
  .info_box_left {
    .info_box_title {
      font-size: 14px;
      color: #222;
      font-weight: bold;
      padding-top: 20px;
    }
  }
  .info_box_right {
    position: absolute;
    right: 2%;
    top: 0%;
  }
}
.info_box3 {
  position: relative;
  width: 588px;
  height: 355px;
  background-color: #fff;
  margin-top: 16px;
  padding-top: 16px;
  .info_box_top {
    .info_box_title {
      color: #222222;
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
    }
    .info_box_title::before {
      content: ".";
      width: 4px;
      height: 16px;
      margin-right: 8px;
      color: #017cff;
      background-color: #017cff;
    }
  }
  .filter {
    position: absolute;
    top: 11px;
    left: 82%;
    /deep/ .el-select {
      background: transparent !important;

      .el-input {
        background: #ecf5ff !important;
        width: 80px;

        .el-input__inner {
          width: 80px;
          background: transparent !important;
          border: 1px solid #017cff;
          color: #017cff;
        }
      }
    }
  }
  .info_box_bottom {
    height: 300px;
  }
}
</style>
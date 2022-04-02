<!-- 
 * @description: 社会参与 
 * @fileName: social.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div style="padding-bottom: 20px;">
    <el-form :inline="true" hide-required-asterisk status-icon>
      <el-row>
        <el-col :span="4">
          <el-form-item class="readonly" label="评分总和">
            <el-input v-model="totalScore" :disabled="true" required placeholder="请输入评分总和"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="19" :offset="1">
          <el-form-item class="default" label="判断等级">
            <el-checkbox-group v-model="level_checked" :max="1">
              <el-checkbox
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      border
      :span-method="objectSpanMethod"
      ref="data_table"
      :data="table_data"
      v-loading="table_loading"
      fit
    >
      <el-table-column width="150" align="center" prop="projectName" label="项目名称"></el-table-column>
      <el-table-column width="100" align="center" prop="point" label="分值"></el-table-column>
      <el-table-column width="100" align="center" label="评分">
        <template slot-scope="scope">
          <el-checkbox
            @change="handleChange(scope)"
            :dsiabled="checkList_model[scope.row.projectName][scope.row.keys].isDisabled"
            v-model="checkList_model[scope.row.projectName][scope.row.keys].isChecked"
            :disabled="scope.row.disabled"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="left" prop="grade" label="评分标准"></el-table-column>
    </el-table>
    <div class="footer">
      <el-button
        :disabled="step >= 7 ? 'disabled' : false"
        type="primary"
        v-waves
        @click="handleSubmit"
      >保存</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  get_ability_assess_config,
  manager_assess_score,
  get_assessinfo_by_type
} from "@/api/pensionagency/goLive/goLive";
import {} from "@/utils/validate";
import { arrayGroupBy } from "@/utils/index";
export default {
  name: "social",
  components: { Pagination },
  directives: { waves },
  watch: {
    form_data: {
      deep: true,
      handler: function(newval, oldva) {
        this.$emit("getData", {
          form_data: this.form_data,
          checkList_model: this.checkList_model
        });
      }
    },
    checkList_model: {
      deep: true,
      handler: function(newval, oldval) {
        this.$emit("getData", {
          form_data: this.form_data,
          checkList_model: this.checkList_model
        });
      }
    }
  },

  data() {
    return {
      type: "SC",
      assessType: "AB",
      step: undefined,
      form_data: {
        title: "",
        checked: []
      },
      level: [
        {
          value: "0",
          label: "能力完好"
        },
        {
          value: "1",
          label: "轻度失能"
        },
        {
          value: "2",
          label: "中度失能"
        },
        {
          value: "3",
          label: "重度失能"
        }
      ],
      checkList_model: {},
      table_loading: false,
      table_data: [],
      table_data_obj: {}
    };
  },
  computed: {
    level_checked() {
      if (this.totalScore < 3) {
        return [this.level[0].label];
      } else if (this.totalScore < 8) {
        return [this.level[1].label];
      } else if (this.totalScore < 14) {
        return [this.level[2].label];
      } else {
        return [this.level[3].label];
      }
    },
    totalScore() {
      let flt_arr = Object.values(this.checkList_model)
        .flat()
        .filter(item => item.isChecked)
        .reduce((cur, pre) => {
          return cur + pre.point;
        }, 0);
      return flt_arr;
    }
  },
  methods: {
    getSocialConfig() {
      let self = this;
      get_ability_assess_config({
        type: self.type,
        assessType: self.assessType
      }).then(res => {
        self.table_data_obj = self.arrayGroupBy(res, "projectName");
        self.table_data = Object.values(self.table_data_obj).reduce(
          (cur, pre) => {
            cur = [...cur, ...pre];
            return cur;
          },
          []
        );
        self.getAssessinfoByType();
      });
    },
    getAssessinfoByType() {
      get_assessinfo_by_type({
        elderId: this.$route.query.id ?? this.$route.params.id,
        type: this.type,
        assessType: self.assessType
      }).then(res => {
        let id_list = (res?.ids ?? []).map(Number);
        Object.values(this.checkList_model)
          .flat()
          .map(item => {
            if (id_list.includes(item.id)) {
              item.isChecked = true;
            }
            return item;
          });
      });
    },
    handleChange(scope) {
      let { projectName, keys } = scope.row;
      this.checkList_model[projectName] = this.checkList_model[projectName].map(
        (item, index) => {
          if (index != keys) {
            item.isChecked = false;
          }
          return item;
        }
      );
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let config = {
          rowspan: row.isFirst
            ? this.table_data_obj[row.projectName].length
            : 0,
          colspan: 1
        };
        return config;
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    arrayGroupBy(arr, key) {
      let self = this;
      if (!Array.isArray(arr)) return;
      let newlist = arr.reduce((cur, pre, curIndex) => {
        if (cur[pre[key]] == undefined) {
          pre.keys = 0;
          cur[pre[key]] = [pre];
          self.$set(self.checkList_model, pre[key], []);
          self.$set(self.checkList_model[pre[key]], 0, {});
          self.$set(self.checkList_model[pre[key]][0], "isChecked", false);
          self.$set(self.checkList_model[pre[key]][0], "isDisabled", false);
          self.$set(self.checkList_model[pre[key]][0], "point", pre.point);
          self.$set(self.checkList_model[pre[key]][0], "id", pre.id);
        } else {
          pre.keys = self.checkList_model[pre[key]].length;
          cur[pre[key]] = [...cur[pre[key]], ...[pre]].sort(
            (a, b) => b.point - a.point
          );
          self.$set(
            self.checkList_model[pre[key]],
            self.checkList_model[pre[key]].length,
            {}
          );
          self.$set(
            self.checkList_model[pre[key]][
              self.checkList_model[pre[key]].length - 1
            ],
            "isChecked",
            false
          );
          self.$set(
            self.checkList_model[pre[key]][
              self.checkList_model[pre[key]].length - 1
            ],
            "isDisabled",
            false
          );
          self.$set(
            self.checkList_model[pre[key]][
              self.checkList_model[pre[key]].length - 1
            ],
            "point",
            pre.point
          );
          self.$set(
            self.checkList_model[pre[key]][
              self.checkList_model[pre[key]].length - 1
            ],
            "id",
            pre.id
          );
        }
        for (var i of cur[pre[key]]) {
          delete i.isFirst;
        }
        cur[pre[key]][0].isFirst = true;
        return cur;
      }, {});
      return newlist;
    },
    handleSubmit() {
      let self = this;
      let arr_checked_length = Object.values(this.checkList_model)
        .flat()
        .filter(item => item.isChecked).length;
      let arr_checked_all = Object.keys(this.table_data_obj).length;
      let ids = Object.values(this.checkList_model)
        .flat()
        .filter(item => item.isChecked)
        .map(item => {
          return item.id;
        });
      if (arr_checked_length != arr_checked_all) {
        self.$notify({
          type: "warning",
          message: "请勾选所有项",
          title: "警告"
        });
        return;
      }
      let params = {
        assessLevel: self.level.filter(
          item => item.label == self.level_checked[0]
        )[0]?.value,
        elderId: self.$route.query.id,
        score: self.totalScore,
        type: self.type,
        assessType: self.assessType,
        ids: ids
      };

      manager_assess_score(params).then(res => {
        self.$notify({
          type: "success",
          message: "操作成功",
          title: "成功"
        });
      });
    }
  },
  mounted() {
    const { step } = this.$route.params;
    this.step = step;
    this.getSocialConfig();
  }
};
</script>
<style lang='scss' scoped>
</style>
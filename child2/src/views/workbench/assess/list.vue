<!-- 
 * @description: 评估中心
 * @fileName: assess_list.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 14:36:42
 * @后台人员:  
!-->
<template>
  <div class="container" style="padding-bottom:0">
    <!--         <div class="no-data">
                  <img :src="no_data" alt="">
    </div>-->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="container_card" >
          <el-form :inline="true">
            <el-row>
              <el-col :span="6">
                <el-form-item class="default1" label="姓名:">
                  <el-input v-model="flt.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="default1" label="床位:">
                  <el-input v-model="flt.bed" clearable placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="default" label="评估等级:">
                  <el-select v-model="flt.level" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="text-align: right;">
                <div>
                  <el-button type="primary" @click="handleScreen(flt, '查询')">查询</el-button>
                  <el-button @click="handleScreen(flt, '重置')">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <el-table
            v-el-height-adaptive-table="{bottomOffset: 190}"
            :row-class-name="tableRowClassName"
            @row-click="handleClick_row"
            class="table_data"
            height="630px"
            ref="data_table"
            :data="table_data"
            v-loading="table_loading"
            stripe
            highlight-current-row
            fit
          >
            <el-table-column align="center" label="序号" width="60">
              <template slot-scope="scope">
                <span>{{ formatZero(scope.$index+1,2) }}</span>
              </template>
            </el-table-column>
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
            <el-table-column align="center" prop="name" show-overflow-tooltip label="姓名"></el-table-column>
            <el-table-column
              align="center"
              prop="name"
              show-overflow-tooltip
              label="床位"
              width="110"
            ></el-table-column>
            <el-table-column align="center"  prop="name" label="性别"></el-table-column>
            <el-table-column align="center" prop="name" label="年龄"></el-table-column>
            <el-table-column align="center" width="130" prop="name" show-overflow-tooltip label="能力评估等级"></el-table-column>
            <el-table-column align="center" width="130" prop="name" show-overflow-tooltip label="能力评估日期"></el-table-column>
            <el-table-column align="center" prop="name" label="是否到期"></el-table-column>
          </el-table>
          <pagination
            v-show="table_total > 0"
            :total="table_total"
            :page.sync="flt.pageNumber"
            :limit.sync="flt.pageSize"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="container_card" style="padding: 20px 0;">
          <div
            :style="{boxSizing: 'border-box', borderLeft: `4px solid ${$variables.baseColor}`, paddingLeft: '20px'}"
          >
            <el-row>
              <el-col :span="16" style="display: flex; align-items: center">
                <el-avatar :size="70" :src="circleUrl"></el-avatar>
                <div style="margin-left: 20px;">
                  <div style="font-weight: bold;line-height: 30px;">王修习</div>
                  <div style="line-height: 30px;">
                    <el-tag style="margin-right: 20px;" type="warning">轻度失眠</el-tag>
                    <el-tag type="primary">男&nbsp;&nbsp;&nbsp;84岁&nbsp;&nbsp;&nbsp;#321-1床</el-tag>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
                style="height: 70px;display: flex; align-items: center; justify-content: flex-end; padding-right: 20px"
              >
                <el-button icon="el-icon-tickets" type="warning" @click="handleAction('评估')">评估</el-button>
                <el-button
                  icon="el-icon-tickets"
                  type="primary"
                  @click="handleAction('服务等级调整')"
                >服务等级调整</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="container_card" style="padding:10px 12px 10px 10px">
          <el-table
            v-el-height-adaptive-table="{bottomOffset: 100}"
            class="table_data1"
            height="662.5px"
            ref="data_table"
            :data="table_data"
            v-loading="table_loading"
            stripe
            highlight-current-row
            fit
          >
            <el-table-column align="center" width="50" label="序号">
              <template slot-scope="scope">
                <span>{{ formatZero(scope.$index+1,2) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="name" label="评估类型"></el-table-column>
            <el-table-column align="left" width="80" prop="name" label="评估次数"></el-table-column>
            <el-table-column align="left" prop="name" width="110" label="上次评估日期"></el-table-column>
            <el-table-column align="left" prop="name" width="110" label="上次评估等级"></el-table-column>
            <el-table-column align="left" prop="name" width="110" label="下次评估日期"></el-table-column>
            <el-table-column align="left" prop="name" label="是否到期"></el-table-column>
            <el-table-column align="left" width="246" label="操作">
              <template slot-scope="scope">
                <div>
                  <el-link type="primary" @click="handleNav(scope.row,'记录')" :underline="false">评估履历</el-link>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="$router.push('/workbench/workbench/assess/sores_record_list')"
                  >评估</el-link>
                  <el-link type="warning" :underline="false">修改下次评估时间</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
      width="600px"
      style="text-align:center;font-size:20px;color:#333333"
    >
      <div class="warpper">
        <el-row>
          <div class="warpper_item" @click="handleClick('能力评估')">能力评估</div>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('压疮评估')">压疮评估</div>
          </el-col>
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('跌倒评估')">跌倒评估</div>
          </el-col>
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('MMSE评估')">MMSE评估</div>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('吞咽评估')">吞咽评估</div>
          </el-col>
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('肌力等级评估')">肌力等级评估</div>
          </el-col>
          <el-col :span="8">
            <div class="warpper_children" @click="handleClick('营养评估')">营养评估</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import elHeightAdaptiveTable from "@/directive/el-table";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import {} from "@/utils/validate";
export default {
  name: "assess_list",
  components: { Pagination },
  directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
  data() {
    return {
      circleUrl: "",
      flt: {
        pageNumber: 1,
        pageSize: 10,
        name: "",
        bed: "",
        level: undefined
      },
      curRowIndex: null,
      table_data: [
        {
          id: 1,
          name: '能力评估'
        },
        {
          id: 2,
          name: 2
        }
      ],
      table_loading: false,
      table_total: 40,
      options: [],
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
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.flt.pageNum = 1;
          self.getList();
          break;
        case "重置":
          self.flt = {
            name: "",
            bed: "",
            level: undefined,
            pageNum: 1,
            pageSize: 10
          };
          self.getList();
          break;
      }
    },
    handleAction(type) {
      const self = this;
      switch (type) {
        case "评估":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "选择评估类型";

          break;
        case "服务等级调整":
          break;

        default:
          break;
      }
    },
    handleClick(type) {
      let self = this;
      switch (type) {
        case "能力评估":
          self.dialog_cof.visible = false;
          self.$router.push({ name: "assess_form_record_info" });
          break;
        case "压疮评估":
          self.dialog_cof.visible = false;
          break;
        case "跌倒评估":
          self.dialog_cof.visible = false;
          break;
        case "MMSE评估":
          self.dialog_cof.visible = false;
          break;
        case "吞咽评估":
          self.dialog_cof.visible = false;
          break;
        case "肌力等级评估":
          self.dialog_cof.visible = false;
          break;
        case "营养评估":
          self.dialog_cof.visible = false;
          break;
        default:
          break;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      return rowIndex == this.curRowIndex ? "table_row_active" : "";
    },
    handleNav(data, type) {
      switch (type) {
        case "记录":
          this.$router.push({
            path: "/workbench/workbench/assess/record_list"
          });
          break;
      }
    },
    handleClick_row(row, column, event) {
      this.curRowIndex = this.table_data.findIndex(item => item.id == row.id);
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
@import "../../../styles/variables.scss";
/deep/.el-link {
    margin-right: 5px;
}
.default1 {
  width: 100%;

  /deep/.el-form-item__label {
    width: 44px;
    text-align: left;
    line-height: 35px;
  }

  /deep/.el-form-item__content {
    width: 138px;

    & > div {
      width: 100%;
    }
  }
}
.default {
  /deep/.el-form-item__label {
    width: 72px;
    text-align: left;
    line-height: 35px;
  }

  /deep/.el-form-item__content {
    width: 136px;

    & > div {
      width: 100%;
    }
  }
}
.table_row_active {
  /deep/ & > td {
    border-bottom: 1px solid $baseColor;
    border-top: 1px solid $baseColor;
    color: $baseColor;

    &:last-child {
      border-right: 1px solid $baseColor;
    }

    &:first-child {
      border-left: 1px solid $baseColor;
    }
  }
}

.warpper {
  color: #66738b;
  font-size: 17px;
  line-height: 86px;
  text-align: center;
  margin: 0 auto;

  .warpper_item {
    width: 544px;
    height: 86px;
    background-color: #f0f7fe;
    border: 1px solid #d3dbec;
    border-radius: 5px;
    cursor: pointer;
  }

  .warpper_children {
    width: 160px;
    height: 86px;
    background-color: #f0f7fe;
    border: 1px solid #d3dbec;
    border-radius: 5px;
    margin-top: 40px;
    cursor: pointer;
  }
}
</style>
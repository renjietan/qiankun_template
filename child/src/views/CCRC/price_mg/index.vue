<!-- 
 * @description:价格管理 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-22 14:59:45
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <div class="btn-box">
        <el-button
          :type="index == active_index ? 'primary' : 'default'"
          v-for="(item, index) in button_group"
          @click="handleChange(index)"
          :key="index"
        >{{item.text}}</el-button>
      </div>
      <div class="btn_content" v-if="this.active_index ==1">
        <el-form :inline="true">
          <el-row>
            <el-col :span="21">
              <el-row>
                <el-col :span="8">
                  <el-form-item class="filter" label="项目：">
                    <el-select v-model="pageable.projectId" placeholder="请选择">
                      <el-option
                        v-for="item in project_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="filter" label="房间：">
                    <el-input clearable v-model="pageable.houseName" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3" style="text-align: right">
              <div style="display: inline-block; margin-left: 10px">
                <el-button type="primary" @click="housePriceInquiry">查询</el-button>
                <el-button @click="reset_flt">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div v-if="this.active_index ==1">
          <div class="chooseItem">
            <span style="margin-left:23px;color:#000000D9">
              已选中
              <span style="color:#017CFF;padding-right:3px">{{chooseSum}}</span>项
            </span>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" type="primary">审核</el-link>
            <el-link
              style="float:right;padding-right:10px;z-index:999"
              :underline="false"
              type="primary"
              @click="handleClick()"
            >清空</el-link>
          </div>
          <el-table
            border
            ref="data_table"
            :data="table_data"
            v-loading="table_loading"
            fit
            @select="handleSelectionChange"
            @select-all="handleSelectionAll"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column width="100" align="center" prop="name" label="序号">
              <template slot-scope="scope">
                <div :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="房间" align="center" prop="elderName"></el-table-column>
            <el-table-column label="计价方式" align="left" prop="bedName"></el-table-column>
            <el-table-column label="退房日期" align="left" prop="disease"></el-table-column>
            <el-table-column label="建筑面积" align="left" prop="fixedFood"></el-table-column>
            <el-table-column label="套内面积" align="left" prop="breakfast"></el-table-column>
            <el-table-column label="底价建筑单价" align="left" prop="lunch"></el-table-column>
            <el-table-column label="底价套内单价" align="left" prop="dinner"></el-table-column>
            <el-table-column label="底价总价" align="left" prop="startTime"></el-table-column>
          </el-table>
          <pagination
            v-show="table_total > 0"
            :total="table_total"
            :page.sync="flt.pageNum"
            :limit.sync="flt.pageSize"
          />
        </div>-->
        <div v-if="this.active_index ==1">
          <div class="title" style="margin-bottom:20px">价格列表</div>
          <el-table
            border
            ref="data_table"
            :data="table_data"
            v-loading="table_loading"
            fit
            @select="handleSelectionChange"
            @select-all="handleSelectionAll"
          >
            <el-table-column width="80" align="center" prop="name" label="序号">
              <template slot-scope="scope">
                <div>{{ formatZero(scope.$index+1, 2) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="房间" align="left" prop="name"></el-table-column>
            <el-table-column label="销售状态" align="left" prop="status"></el-table-column>
            <el-table-column label="底价总价" align="left" prop="totalPrice"></el-table-column>
            <el-table-column width="160" label="底价建筑单价" align="left" prop="unitPrice"></el-table-column>
          </el-table>
          <pagination
            style="text-align:right"
            v-show="table_total > 0"
            :total="table_total"
            :page.sync="pageable.pageNum"
            :limit.sync="pageable.pageSize"
            @pagination="housePriceInquiry"
          />
        </div>
      </div>
      <div v-if="this.active_index !=1" class="crumbs" style="margin: 0 0 18px 0;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{
            item.name }}
          </span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>

      <!--  防止后期 UI更改  -->
      <component v-if="this.active_index !=1" :is="cur_tag.component" :key="cur_tag.component"></component>
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
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { formatZero } from "@/filters";
import { house_price_inquiry } from "@/api/CCRC/price";
import { get_project_list } from "@/api/CCRC/project";
import Pending from "./components/Pending";
import Executed from "./components/executed";
import Reviewed from "./components/reviewed";
import ToReviewed from "./components/toReviewed";
import CostPrice from "./components/costPrice";
import StandardPrice from "./components/standardPrice";
import {} from "@/utils/validate";
export default {
  components: {
    Pagination,
    Pending,
    Executed,
    Reviewed,
    ToReviewed,
    CostPrice,
    StandardPrice
  },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      chooseSum: 0,
      table_total: 0,
      table_data: [],
      table_loading: false,
      pageable: {
        pageNum: 1,
        pageSize: 10,
        houseName: "",
        projectId: ""
      },
      button_group: [
        {
          text: "定价/调价"
        },
        // {
        //   text: "退房价格审核"
        // },
        // {
        //   text: "面积变更价格审核"
        // },
        {
          text: "价格查询"
        }
      ],
      tags: [
        {
          name: "全部价格方案",
          component: "Pending"
        }
        // {
        //   name: "已执行",
        //   component: "Executed"
        // }
      ],
      cur_tag: {},
      project_list: [], //项目列表
      active_index: 0,
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
    handleChange(index) {
      this.active_index = index;
      switch (this.active_index) {
        case 0:
          this.tags = [
            {
              name: "全部价格方案",
              component: "Pending"
            }
            // {
            //   name: "已执行",
            //   component: "Executed"
            // }
          ];
          this.cur_tag = this.tags[0];
          break;
        // case 1:
        //   break;
        // case 2:
        //   this.tags = [
        //     {
        //       name: "待审核",
        //       component: "ToReviewed"
        //     },
        //     {
        //       name: "已审核",
        //       component: "Reviewed"
        //     }
        //   ];
        //   this.cur_tag = this.tags[0];
        //   break;
        // case 1:
        //   this.tags = [
        //     {
        //       name: "标准价",
        //       component: "StandardPrice"
        //     },
        //     {
        //       name: "低价",
        //       component: "CostPrice"
        //     }
        //   ];
        //   this.cur_tag = this.tags[0];
        //   break;

        default:
          break;
      }
    },
    //价格方案下房源
    housePriceInquiry() {
      this.table_loading = true;
      house_price_inquiry({ ...this.pageable }).then(res => {
        this.table_data = res.data;
        this.table_total = res.totalElements;
        this.table_loading = false;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    reset_flt() {
      (this.pageable = {
        page: 1,
        size: 10,
        houseName: "",
        projectId: ""
      }),
        this.housePriceInquiry();
    },
    //表格选中
    handleSelectionChange(val, cur) {
      var del_list = { ...this.del_list };
      if (del_list[cur.id]) {
        delete del_list[cur.id];
      } else {
        del_list[cur.id] = cur;
      }
      this.del_list = del_list;
      this.chooseSum = Object.keys(this.del_list).length;
    },
    handleSelectionAll(selection) {
      if (selection.length == 0) {
        this.table_data.forEach(item => {
          delete this.del_list[item.id];
        });
      } else {
        selection.forEach(item => {
          this.del_list[item.id] = item;
        });
      }
      this.chooseSum = selection.length;
    },
    handleClick() {
      this.$refs.data_table.clearSelection();
      this.chooseSum = 0;
    },
    handle_switchModel(val) {
      this.cur_tag = val;
    }
  },
  mounted() {
    this.cur_tag = this.tags[0];
    this.housePriceInquiry();
    this.getProjectList();
  }
};
</script>
<style lang='scss' scoped>
.chooseItem {
  width: 100%;
  height: 40px;
  border: 1px solid #017cff;
  background-color: #e8f3ff;
  margin-bottom: 16px;
  line-height: 40px;
}
.crumbs {
  border-bottom: 1px solid #e9e9e9;
}
.btn_content {
  margin-top: 24px;
  border-top: 1px solid #e8e8e8;
  padding-top: 24px;
}
</style>
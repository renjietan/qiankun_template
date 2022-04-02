<!-- 
 * @description: 
 * @fileName: controlChart.vue 
 * @author: 王文涛 
 * @date: 2021-11-02 15:22:22
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true" style="margin-top: 24px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="filter" label="项目：">
              <el-select v-model="flt.name" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="select-box">
        <div class="select-left">
          <div class="left">
            <el-select
              v-model="flt.name"
              placeholder="请选择"
              placeholder-style="color:#017cff"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="taps"
            v-for="(item, index) in taps"
            :key="index"
            @click="change(index)"
          >
            <div :class="index !== active ? 'taps_item' : 'taps_active'">
              {{ item.title }}
              <div class="normal-line"></div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="select-left">
          <button class="normal-button" @click="handleAction('', '批量调整')">
            批量调整
          </button>
        </div>
      </div>

      <sale-adjument @popDraw="popDraw" :data="floorData" @checkMethod="checkMethod"/>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
import saleAdjument from "@/components/saleAdjument/index.vue";
export default {
  components: { Pagination, saleAdjument },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {},
      active: 0,
      taps: [
        {
          title: "1栋",
        },
        {
          title: "3栋",
        },
        {
          title: "4栋",
        },
        {
          title: "6栋",
        },
      ],
      floorData: [
        {
          istop: 1,
          rowName: [
            {
              label: "",
              isChecked: false,
              show: true,
              floorlabel: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              floorlabel: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              infoData: null,
              floorlabel: [
                { name: "01", isChecked: false },
                { name: "02", isChecked: false },
                { name: "03", isChecked: false },
                { name: "04", isChecked: false },
                { name: "05", isChecked: false },
                { name: "06", isChecked: false },
              ],
            },
          ],
        },
        {
          istop: 1,
          rowName: [
            {
              label: "18",
              isChecked: false,
              show: true,
              floorlabel: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              floorlabel: null,
              toward: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              floorlabel: null,
              toward: null,
              infoData: [
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "reserved",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "small_order",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "subscribe",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "sale_wait",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "small_order",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "subscribe",
                },
              ],
            },
          ],
        },
        {
          istop: 1,
          rowName: [
            {
              label: "16",
              isChecked: false,
              show: true,
              floorlabel: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              floorlabel: null,
              toward: null,
              infoData: null,
            },
            {
              label: "",
              show: false,
              isChecked: false,
              floorlabel: null,
              toward: null,
              infoData: [
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "reserved",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "small_order",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "subscribe",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "sale_wait",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "small_order",
                },
                {
                  name: "1601",
                  toward: "",
                  landscape: "",
                  status: "subscribe",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleAction() {},
    change(index) {
      this.active = index;
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.select-left {
  display: flex;
  align-items: center;
  .left {
    width: 178px;
    /deep/ .el-select .el-input__inner {
      background: rgba(1, 124, 255, 0.09);
      border: 1px solid #017cff;
      color: #017cff;
    }
    display: flex;
    /deep/ .el-icon-arrow-up:before {
      color: #017cff;
    }
  }
  .taps {
    width: 118px;
    display: flex;
    align-items: center;
    .taps_item {
      width: 118px;
      text-align: center;
      font-size: 14px;
    }
    .taps_active {
      width: 118px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      color: #017cff;
      border-bottom: 1px solid #017cff;
      .normal-line {
        width: 68px;
        height: 2px;
        background: #017cff;
        margin: -6px auto;
      }
    }

    .line {
      width: 1px;
      height: 11px;
      background: #d8d8d8;
    }
  }
}
</style>
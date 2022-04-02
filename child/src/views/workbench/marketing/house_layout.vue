<!-- 
 * @description:床态图展示 
 * @fileName: house_layout.vue 
 * @author: 姜纬杰 
 * @date: 2021-09-08 13:50:35
 * @后台人员:  
!-->
<template>
  <!-- <div class="container">
    <div class="no-data">
      <img :src="no_data" alt />
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    ></el-dialog>
  </div> -->
  <div class="container">
    <div class="container_card">
      <div class="title">床态图展示</div>
      <el-form style="margin: 20px 0;" :inline="true">
        <el-row :getter="40">
          <el-col :span="4">
            <el-form-item label="楼:">
              <el-select
                @change="handleChange_building"
                clearable
                v-model="flt.building"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in building_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="层：">
              <el-select
                @change="handleChange_level"
                clearable
                v-model="flt.level"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in level_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="户型">
              <el-select v-model="house_bed" placeholder="请选择">
                <el-option
                  v-for="item in house_bed_number"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="朝向">
              <el-select v-model="house" placeholder="请选择">
                <el-option
                  v-for="item in house_direction"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-loading="table_loading" style="background: #F0F6FB;padding: 20px;overflow: scroll;">
        <house-state :levelId="flt.level" :rowData="table_data" @change="handleChange"></house-state>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  query_batch_bed,
  get_house_state,
  set_house_state
} from "@/api/pensionagency/basicConfig/basicConfig";
import HouseState from "@/components/house_state";
import { buliding_type, house_direction, house_bed_number } from "@/utils/enum";

import { arrayGroupBy } from "@/utils/index";
import { mapGetters } from "vuex";
export default {
  name: "marketing_house_layout",
  components: { Pagination, HouseState },
  directives: { waves, permission, elDragDialog },
  computed: {
    ...mapGetters(["orgInfo","userInfo"])
  },
  data() {
    return {
       dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      house_bed: "",
      house: "",
      house_bed_number,
      house_direction,
      flt: {
        building: undefined,
        level: undefined
      },

      building_list: [],
      level_list: [],
      table_loading: false,
      table_data: []
    };
  },
  methods: {
    async handleChange_building(val) {
      this.level_list = await this.getData({ type: "楼层", superId: val });
      this.flt.level = undefined;
      this.table_data = [];
    },
    async handleChange_level(val) {
      this.table_loading = true;
      let self = this;
      get_house_state({ floorId: val }).then(res => {
        let arr = res ?? [];
        res = res.sort((a, b) => a.xzhou - b.xzhou);
        let table_data = arrayGroupBy(res ?? [], "yzhou");
        let key = 0;
        for (let i in table_data) {
          key = parseInt(i) + 1;
          table_data[i] = table_data[i].reduce((cur, pre) => {
            let num = pre.xzhou - (cur?.xzhou ?? 0) - 1;
            let a = Array.from({ length: num }, () => "空床位");
            cur = [...cur, ...a, ...[pre]];
            return cur;
          }, []);
        }

        table_data.length = key;
        table_data = Array.from(table_data, item => {
          return item ?? ["空床位"];
        });

        table_data = Object.values(table_data);
        self.table_data = table_data;
        self.table_loading = false;
      });
    },
    handleChange(data) {
      let self = this;
      let params = data.reduce((cur, pre, curindex) => {
        let arr = [];
        pre.forEach((item, index) => {
          if (item != undefined && item != "空床位") {
            let temp = {};
            temp.roomId = item.id;
            temp.xzhou = index;
            temp.yzhou = curindex;
            arr.push(temp);
          }
          return item;
        });
        cur = [...cur, ...arr];
        return cur;
      }, []);
      set_house_state({
        floorId: this.flt.level,
        siteList: params
      }).then(res => {
        self.$notify({
          type: "success",
          message: "保存成功!",
          title: ""
        });
      });
    },
    async getData({ type, superId }) {
      let params =
        type == "楼宇"
          ? {
              type: "s",
              centerId: this.orgInfo.id??this.userInfo.centerId
            }
          : {
              type: "f",
              superId,
              centerId: this.orgInfo.id??this.userInfo.centerId
            };
      return await query_batch_bed(params).then(res => {
        return res ?? [];
      });
    },
    async getList() {
      let data = await this.getData({
        type: "楼宇"
      });
      data = data ?? [];
      this.building_list = data;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
</style>
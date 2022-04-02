<!-- 
 * @description: 
 * @fileName: project.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-12 15:43:40
 * @后台人员:  
!-->
<template>
  <div class="box" style="height:700px;overflow-y: scroll;">
    <div class="content" >
      <div class="content-item" v-for="(item, index) in data_list" :key="index">
        <div class="title child-title">{{ index | classification }}项目</div>
        <el-row :gutter="40">
          <el-col :span="8" v-for="(child,index) in item" :key="index">
            <div class="row-item">
              <div class="row-item-header">
                <el-checkbox @change="handleChange(child.id)">{{child.projectName}}</el-checkbox>
                <span>实施记录</span>
              </div>
              <div style="margin-left:16px">
                <el-row style="margin-top:20px">
                  <el-col :span="11">
                    <div style="display:flex">
                      <span style="width:50px;color:#000000;font-size:14px;line-height:34px">频率</span>
                      <el-select
                        clearable
                        v-model="child.noteType"
                        :disabled="true"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in server_fre"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <div style="display:flex">
                      <span style="width:38px;color:#000000;font-size:14px;line-height:34px">次数</span>
                      <el-input
                        v-model="child.frequency"
                        :disabled="true"
                        placeholder="请输入"
                        style="width:122px;"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="24">
                    <div>
                      <span style="width:38px;color:#000000;font-size:14px">时间</span>
                      <el-select
                        :disabled="true"
                        clearable
                        suffix-icon="el-icon-date"
                        v-model="child.time"
                        multiple
                        style="width:280px;"
                        collapse-tags
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in bt_getTime"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    ></el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { server_fre, isTrue, server_status } from "@/utils/enum";
import {
  query_batch_server,
  add_level_projec,
  query_by_lv_id
} from "@/api/pensionagency/basicConfig/basicConfig";

import { valid_error_msg } from "@/utils/valid-error-msg";
import { bt_getTime, arrayGroupBy } from "@/utils/index";

export default {
  components: { Pagination },
  props: {
    service_list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      id_list: {},
      checked: false,
      cur_dep: 0,
      server_fre,
      bt_getTime: bt_getTime(),
      value1: "",
      flt: {
        pageNumber: 1,
        pageSize: 10
      },
      server_type_options: [],
      data_list: [],
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      }
    };
  },
  filters: {
    classification(type) {
      let classificationName = "";
      switch (type) {
        case "CM":
          classificationName = "公共";
          break;
        case "LF":
          classificationName = "生活";
          break;
        case "ME":
          classificationName = "膳食";
          break;
        case "MD":
          classificationName = "医疗";
          break;
        case "RE":
          classificationName = "康复";
          break;
        case "MI":
          classificationName = "心理";
          break;
        case "RC":
          classificationName = "娱乐";
          break;
      }
      return classificationName;
    }
  },
  methods: {
    handleChange(id) {
      if (this.id_list[id]) {
        delete this.id_list[id];
      } else {
        this.id_list[id] = id;
      }
      // console.log(Object.keys(this.id_list));
    },
    async getList() {
      let params = {
        pageNum: this.flt.pageNumber,
        pageSize: this.flt.pageSize
      };
      let data = await query_batch_server(params);
      this.data_list = arrayGroupBy(data?.result, "projectType");
    },
  },

  mounted() {
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
.left-box-item {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
  cursor: pointer;
}
.left-box-item-active {
  border: 1px solid #017cff;
  background: rgba(1, 124, 255, 0.09);
}
.box {
  margin-top: 20px;
  height: 800px;
  border: 1px solid #d9d9d9;
  margin-top: 20px;

  .sub-title {
    padding: 10px 20px 0 20px;
    line-height: 45px;
    font-size: 14px;
    background: #fafafa;
  }

  .child-title {
    font-size: 14px;
    line-height: 35px;
  }

  .content {
    margin: 20px;

    .content-item {
      .row-item {
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        margin-bottom: 15px;
        padding: 15px;

        .row-item-header {
          display: flex;
          color: #ff8b43;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
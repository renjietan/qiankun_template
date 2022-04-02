<!-- 
 * @description:付款方式 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-22 14:41:42
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="8">
                <el-form-item class="filter" label="项目：">
                  <el-select v-model="flt.processIn" clearable placeholder="请选择">
                    <el-option
                      v-for="item in project_list"
                      :key="item.id"
                      :label="item.label"
                      :value="item.step"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="filter" label="方案名称：">
                  <el-input clearable v-model="flt.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="crumbs" style="margin: 0 0 18px 0;">
        <div v-for="(item, index) in tags" @click="handle_switchModel(item)" :key="index">
          <span :class="['crumbs_font', cur_tag.name == item.name ? 'crumbs_font_active' : '']">
            {{
            item.name }}
          </span>
          <span class="crumbs_sprit">/</span>
        </div>
      </div>

      <!--  防止后期 UI更改  -->
      <component :is="cur_tag.component" :key="cur_tag.component"></component>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import Effective from "./components/effective";
import Invalid from "./components/invalid";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  components: { Pagination, Effective, Invalid },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      project_list: [],
      flt: {},
      tags: [
        {
          name: "生效的",
          component: "Effective"
        },
        {
          name: "失效的",
          component: "Invalid"
        }
      ],
      cur_tag: {},
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
    };
  },
  methods: {
    handle_switchModel(val) {
      this.cur_tag = val;
    }
  },
  mounted() {
    this.cur_tag = this.tags[0];
  }
};
</script>
<style lang='scss' scoped>
.crumbs {
  border-bottom: 1px solid #e9e9e9;
}
</style>
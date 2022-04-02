<!-- 
 * @description: 项目服务列表
 * @fileName: index.vue 
 * @author: 王文涛 
 * @date: 2021-09-07 11:05:44
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item class="filter" label="服务名称:">
                  <el-input clearable v-model="flt.projectName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>服务项目列表</span>
      </div>

      <div class="crumbs" style="margin: 0 0 25px 0" v-if="project_type_list.length > 1">
        <div v-for="(item, index) in project_type_list" @click="handleSelect(index)" :key="index">
          <span :class="[
              'crumbs_font',
              index == flt.cur_tag ? 'crumbs_font_active' : '',
            ]">{{ item }}服务</span>
          <span class="crumbs_sprit">/ </span>
        </div>
      </div>
      <div style="margin-top: 10px">
        <server-all :data="project_list"></server-all>
      </div>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { } from "@/utils/validate";
  import serverAll from "./components/serverAll";

  // import { query_batch_server, query_server_type } from "@/api/basicConfig";
  import { get_project_all } from "@/api/pensionagency/servers/serves";
  export default {
    name: "server",
    components: {
      Pagination,
      serverAll,
    },

    directives: { waves, permission, elDragDialog },
    data() {
      return {
        data_arr: [],
        project_list: [],
        project_type_list: [],
        flt: {
          projectName: "",
          cur_tag: 0,
        },
        dialog_cof: {
          visible: true,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
      };
    },
    watch: {

    },
    methods: {
      handleSelect(index) {
        this.flt.cur_tag = index;
        this.project_list = this.data_arr[index].filter(item => item.fromName.indexOf(this.flt.projectName) >= 0)
      },
      reset() {
        this.flt.projectName = "";
        this.flt.cur_tag = 0;
        this.project_list = this.data_arr[this.flt.cur_tag]
      },
      handleSearch() {
        this.project_list = this.data_arr[this.flt.cur_tag].filter(item => item.fromName.indexOf(this.flt.projectName) >= 0)
      },
      async init() {
        let self = this
        let res = await get_project_all(this.flt)
        let data_obj = res?.reduce((cur, pre) => {
          if (!cur[pre.typeDesc]) {
            cur[pre.typeDesc] = []
          }
          cur[pre.typeDesc].push(pre)
          return cur
        }, {}) ?? {}
        let project_type_list = Object.keys(data_obj)
        let temp = ["全部"]
        this.project_type_list = [...temp, ...project_type_list]
        let data_arr = Object.values(data_obj)
        data_arr.unshift(data_arr.flat())
        this.data_arr = data_arr
        this.project_list = this.data_arr[this.flt.cur_tag]
      }

    },
    mounted() {
      this.init()
    },
  };
</script>
<style lang='scss' scoped>
</style>
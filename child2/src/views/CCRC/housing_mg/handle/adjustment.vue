<!-- 
 * @description: 房源调整
 * @fileName: adjustment.vue 
 * @author: 王文涛 
 * @date: 2021-10-26 16:01:40
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row :gutter="10">
        <el-col :span="16">
          <Floor @popDraw="popDraw" :data="floorData" />
        </el-col>
        <el-col :span="8" style="text-align: right">
          <div style="display: inline-block; margin-left: 10px">
            <el-button type="primary" plain @click="getList"
              >批量操作</el-button
            >
            <el-button type="primary" plain @click="getList"
              >合并拆分</el-button
            >
            <el-button type="primary" plain @click="getList"
              >房间操作</el-button
            >

            <el-button type="primary" @click="reset_flt">删除</el-button>
          </div>
        </el-col>
      </el-row>
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
import Floor from "@/components/Floor/index.vue";

export default {
  components: { Pagination, Floor },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      floorData: [
        {
          istop: 1,
          rowName: [
            {
              label: "楼层",
            },
            {
              label: "",
              unit: [{ num: "01"}, { num: "02"}],
            },
            {
              label: "",
               unit: [{ num: "01"}, { num: "02"},{ num: "03"}],
            },
          ],
        },
        {
          istop: 0,
          rowName: [
            {
              label: "18",
            },
            {
              label: "",

              unit: [{ num: "1801", status: "sale_wait" }, ""],
            },
            {
              unit: [{num:"1801",status:'reserved'}, {num:"1801",status:'small_order'}, {num:"1801",status:'subscribe'}],
            },
          ],
        },
        {
          istop: 0,
          rowName: [
            {
              label: "17",
            },
            {
             unit: [{ num: "1701", status: "sale_wait" }, ""],
            },
            {
              unit: [{num:"1701",status:'reserved'}, {num:"1702",status:'small_order'}, {num:"1703",status:'subscribe'}],
            },
          ],
        },
        {
          istop: 0,
          rowName: [
            {
              label: "16",
            },
            {
             unit: [{ num: "1601", status: "pin_control" }, ""],
            },
            {
             unit: [{num:"1601",status:'pin_control'}, {num:"1602",status:'small_order'}, {num:"1603",status:'subscribe'}],
            },
          ],
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
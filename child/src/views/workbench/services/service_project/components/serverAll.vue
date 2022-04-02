<!-- 
 * @description: 
 * @fileName: server_all.vue 
 * @author: 王文涛 
 * @date: 2021-09-08 14:34:33
 * @后台人员:  
!-->
<template>
  <el-row :span="10" :gutter="15" style="padding: 10px">
    <div v-for="(item, index) in data" :key="index" @click="jumpToPage(index)">
      <el-col :span="2">
        <div class="content-item" :keys="'1'">
          <div>{{item.fromName}}</div>
        </div>
      </el-col>
    </div>
  </el-row>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  export default {
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        dialog_cof: {
          visible: true,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
      };
    },
    methods: {
      jumpToPage(index) {
        let cur_data = this.data[index]
        let { path } = cur_data
        path = path.split("/:")[0]
        let ids = cur_data.refProjectIds ?? []
        this.$router.push({
          path: `${path}/${ids.toString()}`,
        });
      },
    },
    mounted() { },
  };
</script>
<style lang='scss' scoped>
  .content-item {
    height: 46px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin-bottom: 16px;
    font-size: 15px;
    color: #017CFF;
    background: rgba(1, 124, 255, 0.09);
    border: 1px solid #017CFF;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: #017CFF;
    }

    &>div {
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      line-height: 46px;
    }

    &:active {
      color: #fff;
      background: #017CFF;
    }


  }
</style>
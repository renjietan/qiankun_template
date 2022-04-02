<!-- 
 * @description: 房间详情
 * @fileName: detail.vue 
 * @author: 王文涛 
 * @date: 2021-10-22 10:53:07
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row :gutter="4">
        <el-col :span="12">
          <el-col :span="4">
            <span>房间：</span>
          </el-col>
          <el-col :span="20">
            <span>清江山水-一期-东区别墅-01栋-02</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>销售状态：</span>
          </el-col>
          <el-col :span="20">
            <span>清江山水-一期-东区别墅-01栋-02</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>房间：</span>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="fromData.bedName"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>房间类型：</span>
          </el-col>
          <el-col :span="20">
            <span>面朝大海</span>
          </el-col>
        </el-col>
      </el-row>

      <el-row :gutter="4" style="margin-top: 20px">
        <el-col :span="12">
          <el-col :span="4">
            <span>预售建筑面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>预售套内面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>实测建筑面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>实测套内面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>建筑面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>套内面积：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>面积建筑单价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>面价套内单价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>面积标准总价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>补充协议建筑单价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>补充协议套内单价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>补充协议总价：</span>
          </el-col>
          <el-col :span="20">
            <span>123.4500 平米</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>销许编号：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="fromData.code"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>销许日期：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="fromData.date"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top: 35px">
        <el-col :span="12">
          <el-col :span="4">
            <span>景观：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="fromData.code"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            <span>朝向：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="fromData.code"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
      <el-button type="default" @click="handleSubmit">取 消</el-button>
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
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      fromData: {
        bedName: "",
        code: "",
        
      },
      options: [],
    };
  },
  name: "CCRC_handle_hourse_detail",
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  background: #fff;
}
</style>
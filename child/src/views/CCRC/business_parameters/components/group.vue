<!-- 
 * @description:集团级 
 * @fileName: group.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 19:40:53
 * @后台人员:  
!-->
<template>
  <div style="padding-bottom: 20px;">
    <el-form :inline="true">
      <el-row>
        <el-col :span="20">
          <el-form-item label="集团：" label-width="120">
            <el-select v-model="group" placeholder="请选择" style="width:300px;margin-left:-10px">
              <el-option
                v-for="item in group_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">
      <span>
        配置类参数：
        <span style="color:#000000D9">定价设置</span>
      </span>
      <div class="btn_group" style="text-align: right">
        <el-button type="primary">
          <span class="btn_pics">
            <img class="pic" src="~@/assets/images/CCRC/daochu.png" />导出到Excel
          </span>
        </el-button>
        <el-button type="primary">
          <span class="btn_pics">
            <img class="pic" src="~@/assets/images/CCRC/daochu.png" />从Excel导出
          </span>
        </el-button>
      </div>
    </div>
    <div class="parameter_content" style="padding-top:24px;color:#222;font-weight:400">
      <span>
        价格制定工作流审批：
        <el-radio v-model="radio" label="启用">启用</el-radio>
        <el-radio v-model="radio" label="不启用">不启用</el-radio>
      </span>
      <div style="margin-top:16px;color:#8A8A8A;margin-left:145px">启用后，价格方案必须经工作流程审批通过后才能执行。</div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "Group",
  components: {
    Pagination
  },
  directives: {
    waves
  },

  data() {
    return {
      group: "",
      group_list: [], //集团列表
      radio: "启用"
    };
  },
  computed: {},
  methods: {},

  mounted() {}
};
</script>
<style lang='scss' scoped>
.btn_pics {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2px;
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}

/deep/.el-form-item__label {
  color: #262626;
  line-height: 40px;
  font-weight: 400;
}
.title {
  letter-spacing: 1px;
  margin-top: 5px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
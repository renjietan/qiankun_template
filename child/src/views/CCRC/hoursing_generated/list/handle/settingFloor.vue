<!-- 
 * @description: 设置层数
 * @fileName: settingFloor.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 19:22:54
 * @后台人员:  
!-->
<template>
  <div style="margin-top: 24px">
    <el-form
      :inline="true"
      :model="datas"
      :rules="rules"
      ref="form"
      hide-required-asterisk
      status-icon
      class="demo-ruleForm"
    >
      <el-row :gutter="2" style="margin-top: 24px">
        <el-row :gutter="40">
          <el-col :span="24">
            <el-form-item prop="elderName" label="楼栋名称:">
              <el-input v-model="datas.name" style="width:600px" placeholder="请输入" @change="getValue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item prop="elderName" label="楼栋层数:">
              <el-input v-model="datas.floor" placeholder="请输入" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p class="tip_text">设置楼层的数量，最大100层</p>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item prop="elderName" label="单元数量:">
              <el-input v-model="datas.unit" placeholder="请输入" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p class="tip_text">设置楼栋的单元（门栋）数量，最大20个</p>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')">上一步</el-button>
      <el-button type="primary" @click="submitForm('next')">下一步</el-button>

      <el-button class="btn" @click="submitForm('exit')">取消</el-button>
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
  props: {
    datas: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    datas: {
      handler(val, old) {
        if (!!val) {
          localStorage.setItem("floor", JSON.stringify(val));
        }
      },
      deep: true
    }
  },
  data() {
    return {
      rules: {
        floor: [{ required: true, message: "不可为空", trigger: "change" }],
        unit: [{ required: true, message: "不可为空", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(type) {
      var self = this;
      const actionType = {
        back: () => {
          self.backup();
        },
        next: () => {
          self.nextsteap();
        },
        exit: () => {
          self.exit();
        }
      };
      return actionType[type]();
    },
    getValue(e){
      this.$emit('change',e);
    },
    // 返回上一步；
    backup() {
      this.$emit("backup", 1);
    },
    // 下一步
    nextsteap() {
      if (this.isNull()) {
        this.$emit("nextsteap", 3);
      } else {
        this.$notify({
          title: "警告",
          type: "info",
          message: "楼层数或单元不能为空"
        });
      }
    },
    exit() {
      this.$emit("closeTap", "");
    },
    isNull() {
      if (!!this.datas.floor && !!this.datas.unit) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>
<!-- 
 * @description: 设置户型
 * @fileName: settingNum.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 19:22:54
 * @后台人员:  
!-->
<template>
  <div style="margin-top: 24px">
    <div class="button-box" style="width:100%">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="handleCreat()"
        class="btn"
        style="margin-top: 3px"
      >新增户型</el-button>
    </div>
    <el-table :data="tableData" v-loading="table_loading" border style="width: 100%">
      <el-table-column prop="id" label="户型" width="180"></el-table-column>
      <el-table-column prop="name" label="房间类型"></el-table-column>
      <el-table-column prop="buildingArea" label="建筑面积"></el-table-column>
      <el-table-column prop="realArea" label="套内面积"></el-table-column>
      <el-table-column align="left" width="90" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="danger" @click.native="handleDel(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')" :disabled="true">上一步</el-button>
      <el-button type="primary" @click="submitForm('next')">下一步</el-button>
      <!-- <el-button
        :disabled="active_floor == steaps_hourse.length ? false : true"
        type="primary"
        @click="submitForm('submit')"
        class="btn"
        >提交</el-button
      >-->
      <el-button class="btn" @click="submitForm('exit')">取消</el-button>
    </div>
    <el-dialog
      class="el-dialog-2"
      center
      append-to-body
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        style="z-index:999"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="户型" class="optional" prop="id">
              <el-input v-model="form_data.id" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间类型" class="optional" prop="name">
              <el-input v-model="form_data.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="建筑面积 " class="optional" prop="buildingArea">
              <el-input v-model="form_data.buildingArea" maxlength="5" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="套内面积 " class="optional" prop="realArea">
              <el-input v-model="form_data.realArea" maxlength="5" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { isNumber_mustFill } from "@/utils/validate";
import {
  get_houses_type,
  delete_houses_type,
  add_houses_type
} from "@/api/CCRC/housing";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      rules: {
        id: [{ required: true, message: "不可为空", trigger: "change" }],
        name: [{ required: true, message: "不可为空", trigger: "change" }],
        buildingArea: [
          { required: true, validator: isNumber_mustFill, trigger: "change" }
        ],
        realArea: [
          { required: true, validator: isNumber_mustFill, trigger: "change" }
        ]
      },
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      form_data: {
        id: "", //户型
        name: "", //房间类型
        buildingArea: undefined, //建筑面积
        realArea: undefined //套内面积
      },
      tableData: [],
      table_loading: false
    };
  },
  methods: {
    getLists() {
      this.table_loading = true;
      get_houses_type().then(res => {
        this.table_loading = false;
        console.log(res);
        this.tableData = res.data ?? [];
      });
    },
    handleCreat() {
      let self = this;
      self.clear_form_data();
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "新增户型";
    },
    //新增户型
    handleSubmit() {
      let self = this;
      let params = {
        id: self.form_data.id,
        name: self.form_data.name,
        buildingArea: Number(self.form_data.buildingArea),
        realArea: Number(self.form_data.realArea)
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          add_houses_type(params).then(res => {
            self.$notify({
              type: "success",
              message: "新增成功",
              title: "成功"
            });
            self.getLists();
          });
          self.dialog_cof.visible = false;
        }
      });
    },
    //删除户型
    handleDel(data) {
      console.log(data);
      let self = this;
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = data.id;
          delete_houses_type(id).then(res => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: ""
            });
            self.getLists();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`
          });
        });
    },
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
      actionType[type]();
    },
    exit() {
      this.$emit("close_type", "");
    },
    // 返回上一步；
    backup() {
      this.$emit("backup_type", 1);
    },
    // 下一步
    nextsteap() {
      this.$emit("nextsteap_type", 2);
    },
    clear_form_data() {
      this.form_data = {
        id: "", //户型
        name: "", //房间类型
        buildingArea: undefined, //建筑面积
        realArea: undefined //套内面积
      };
    }
  },
  mounted() {
    this.getLists();
  }
};
</script>
<style lang='scss' scoped>
/deep/.el-dialog__body .optional {
  width: 100%;

  .el-form-item__label {
    width: 100%;
    text-align: left;
    line-height: 45px;

    &:after {
      display: inline-block;
      content: "*";
      text-indent: 5px;
      color: red;
    }
  }

  .el-form-item__content {
    width: 100%;

    & > div {
      width: 100%;
    }
  }
}
</style>
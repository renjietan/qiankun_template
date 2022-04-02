<!-- 
 * @description: 服务项目管理
 * @fileName: service_product_mg.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 15:55:21
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
    <div class="container_card">
      <el-form :inline="true">
        <el-row :getter="40">
          <el-col :span="20">
            <el-row>
              <el-col :span="6">
                <el-form-item label="服务名称:">
                  <el-input placeholder="请输入" v-model="flt.service_name" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务类型：">
                  <el-select clearable v-model="flt.service_type" placeholder="请选择">
                    <el-option v-for="item in server_type_options" :key="item.projectType" :label="item.desc"
                      :value="item.projectType">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务状态：">
                  <el-select clearable v-model="flt.service_status" placeholder="请选择">
                    <el-option v-for="item in server_status" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 过滤栏结束 @date:2021-05-26 18:13:33 @author: 谭人杰 !-->
    <div class="container_card">
      <el-row style="line-height: 80px; margin-top: -30px">
        <el-col :span="6">
          <div class="title">服务项目列表</div>
        </el-col>
        <el-col :span="18" style="text-align: right">
          <!-- <el-button type="primary" icon="el-icon-plus" @click="handleDialog('添加服务项目')">添加服务</el-button> -->
          <el-button type="success" icon="el-icon-upload2" disabled>数据导出</el-button>
        </el-col>
      </el-row>
      <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
        <el-table-column width="100" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{
                color: variables.baseColor,
              }">
              {{ formatZero(scope.$index + 1, 3) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" prop="picUrl" label="服务图片">
          <template slot-scope="scope">
            <el-image style="width: 50px; height: 50px;border-radius:50%" :src="scope.row.picUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" prop="projectName" label="服务名称"></el-table-column>
        <el-table-column width="100" align="center" label="服务类型">
          <template slot-scope="scope">
            <div>
              {{
              $$(
              server_type_options.filter(
              (item) => item.projectType == scope.row.projectType
              )[0],
              "desc"
              )
              }}
            </div>
          </template>
        </el-table-column>

        <el-table-column width="200" align="center" prop="fee" label="服务价格（元）"></el-table-column>
        <el-table-column width="100" align="center" prop="frequency" label="默认频次">
          <template slot-scope="scope">
            <div>
              {{ scope.row.frequency ? `${scope.row.frequency}次/` : ""
              }}{{
              $$(
              server_fre.filter((item) => item.value == scope.row.cycle)[0],
              "label"
              )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="服务状态">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.status == 'N'" :style="{ color: $variables.yellow }">
                使用
              </div>
              <div v-else style="color: red">停用</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="实施记录">
          <template slot-scope="scope">
            <div>
              {{ scope.row.isNeedRecord == 1 ? "是" : "否" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="rsv" label="说明"></el-table-column>
        <el-table-column width="200" align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-link type="primary" @click="handleDialog('编辑服务项目', scope)" :underline="false">编辑</el-link> -->
            <el-link type="danger" :underline="false" @click="handleDel(scope.row)">
              {{ scope.row.status == "N" ? "停用" : "使用" }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 @date:2021-05-26 18:14:55 @author: 谭人杰 !-->
      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNumber" :limit.sync="flt.pageSize"
        @pagination="getList" />
      <!-- 分页结束 @date:2021-05-26 18:15:02 @author: 谭人杰 !-->
    </div>

    <el-dialog class="el-dialog-2" center v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="11">
            <el-form-item class="must-fill" label="服务名称" prop="service_name">
              <el-input clearable v-model="form_data.service_name"></el-input>
            </el-form-item>
            <el-form-item class="must-fill" label="服务类型" prop="service_type">
              <el-select clearable v-model="form_data.service_type" placeholder="请选择">
                <el-option v-for="item in server_type_options" :key="item.projectType" :label="item.desc"
                  :value="item.projectType">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="default" label="服务图片" prop="service_name">
              <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="uploadImg">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">点击上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="must-fill" label="服务价格" prop="service_fee">
              <el-input clearable v-enter-float v-model="form_data.service_fee"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col></el-col> -->
          <el-col :span="5" :offset="2">
            <el-form-item class="must-fill" label="默认频次" prop="number">
              <el-select clearable v-model="form_data.number" placeholder="请选择">
                <el-option v-for="item in server_fre" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item class="optional nolabel" label="占位" prop="number2">
              <el-input :disabled="isDisabled_number2" v-enter-float clearable v-model.number="form_data.number2">
                <template slot="append">次</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="optional" label="时间" prop="dateTime">
              <el-select :disabled="isDisabled_dateTime" clearable suffix-icon="el-icon-date"
                v-model="form_data.dateTime" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in bt_getTime" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item class="must-fill" label="实测记录（服务时是否需要记录）" prop="isRecord">
              <el-checkbox-group :max="1" v-model="form_data.isRecord">
                <el-checkbox v-for="item in isTrue" :key="item.label" :label="item.label"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="must-fill" label="记录形式" prop="note_type">
              <el-select clearable v-model="form_data.note_type" placeholder="请选择">
                <el-option v-for="item in note_type_list" :key="item.label" :label="item.desc" :value="item.noteType">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="optional" label="说明" prop="remark">
              <el-input type="textarea" clearable v-model="form_data.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="
            dialog_cof.title == '编辑服务项目'
              ? handleSubmit_edit()
              : handleSubmit_create()
          ">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import enterFloat from "@/directive/enterFloat";
  import {
    create_server,
    edit_del_server,
    query_batch_server,
    query_server_type,
    query_project_type,
    query_note_type,
  } from "@/api/pensionagency/basicConfig/basicConfig";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import variables from "@/styles/variables.scss";
  import { formatZero } from "@/filters";
  import { server_fre, isTrue, server_status } from "@/utils/enum";
  import { bt_getTime } from "@/utils/index";
  import { handleType } from "@/utils/enum";
  import { mapGetters } from "vuex";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";

  export default {
    name: "basicConfig_service_product_mg",
    components: { Pagination },
    directives: { waves, permission, elDragDialog, enterFloat },
    data() {
      return {
        server_fre,
        isTrue,
        bt_getTime: bt_getTime(),
        table_data: [],
        table_loading: false,
        table_total: 0,
        variables,
        note_type_list: [],
        server_status,
        imageUrl: "",
        flt: {
          service_name: "",
          service_type: undefined,
          service_status: undefined,
          pageNumber: 1,
          pageSize: 10,
        },
        options: [
          {
            label: "1",
            value: "1",
          },
        ],
        server_type_options: [],
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
        rules: {
          service_name: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          service_type: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          service_fee: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          isRecord: [{ required: true, message: "不可为空", trigger: "change" }],
          number: [{ required: true, message: "不可为空", trigger: "change" }],
          number2: [{ validator: this.passNumber2, trigger: "blur" }],
          dateTime: [{ validator: this.passDateTime, trigger: "blur" }],
          note_type: [{ required: true, message: "不可为空", trigger: "change" }],
        },
        form_data: {
          id: undefined, //服务项目ID
          service_name: "", //服务名称
          picUrl: "",
          service_type: undefined, //服务类型
          service_fee: 0, //服务费用
          number: undefined, //频次
          number2: undefined, //几次
          isRecord: [], //是否需要记录
          note_type: undefined, //记录形式
          remark: "", //说明
          dateTime: [], //设置频次后的时间
        },
      };
    },
    computed: {
      isDisabled_number2() {
        let bool =
          this.form_data.number == "S" ||
          this.form_data.number == "Z" ||
          this.form_data.number == undefined ||
          this.form_data.number == "";
        this.form_data.number2 = bool ? undefined : this.form_data.number2;
        return bool;
      },
      isDisabled_dateTime() {
        let bool_dateTime = this.form_data.number == "D";
        this.form_data.dateTime = bool_dateTime ? this.form_data.dateTime : [];
        return !bool_dateTime;
      },
    },
    methods: {
      passDateTime(rule, value, callback) {
        let bool = this.form_data.number == "D";
        if (bool && value.length == 0) {
          callback(new Error("请输入"));
        } else if (bool && value.length != this.form_data.number2) {
          callback(new Error(`应添加${this.form_data.number2}个时间节点`));
        } else {
          callback();
        }
      },
      passNumber2(rule, value, callback) {
        let bool =
          this.form_data.number == "S" ||
          this.form_data.number == "Z" ||
          this.form_data.number == undefined ||
          this.form_data.number == "";
        if (!bool && (value == 0 || value == "" || value == undefined)) {
          callback(new Error("请输入"));
        } else {
          callback();
        }
      },
      formatZero,
      reset_flt() {
        this.flt = {
          service_name: "",
          service_type: undefined,
          service_status: undefined,
          pageNumber: 1,
          pageSize: 10,
        };
        this.getList();
      },
      reset() {
        this.form_data = {
          id: undefined,
          service_name: "",
          service_type: undefined,
          service_fee: 0,
          number: undefined,
          number2: undefined,
          isRecord: [],
          note_type: undefined,
          remark: "",
          dateTime: [],
        };
      },
      async getList() {
        this.table_loading = true;
        let params = {
          pageNum: this.flt.pageNumber,
          pageSize: this.flt.pageSize,
          projectType: this.flt.service_type,
          name: this.flt.service_name,
          status: this.flt.service_status,
        };
        let data = await query_batch_server(params);
        this.table_data = data?.result;
        this.table_total = data?.totalCount;
        this.flt.pageNumber = data?.pageNum;
        this.flt.pageSize = data?.pageSize;
        this.table_loading = false;
        this.dialog_cof.visible = false;
      },
      handleDialog(title, row) {
        let self = this;
        self.reset();
        self.dialog_cof.title = title;
        self.dialog_cof.visible = true;
        if (self.dialog_cof.title == "编辑服务项目") {
          let data = row.row;
          self.form_data = {
            id: data.id,
            service_name: data.projectName,
            service_type: data.projectType,
            service_fee: data.fee,
            number: data.cycle,
            number2: parseInt(data.frequency),
            isRecord: [data.isNeedRecord == 1 ? "是" : "否"],
            note_type: data.noteType,
            remark: data.rsv,
            dateTime: data.time.split(","),
          };
        }
      },
      handleSubmit_create() {
        let self = this;
        self.$refs.form.validate(async (valid) => {
          if (valid) {
            let params = {
              cycle: self.form_data.number,
              fee: parseFloat(self.form_data.service_fee),
              frequency: self.form_data.number2,
              isNeedRecord: self.form_data.isRecord.some((item) => item == "是")
                ? 1
                : 0,
              noteType: self.form_data.note_type,
              projectName: self.form_data.service_name,
              projectType: self.form_data.service_type,
              rsv: self.form_data.remark,
              time: self.form_data.dateTime.join(","),
            };
            create_server(params).then((res) => {
              self.$notify({
                type: "success",
                message: "操作成功",
                title: "成功",
              });
              self.getList();
              self.dialog_cof.visible = false;
            });
          }
        });
      },
      uploadImg(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", "server_project");
        upload_pic(formData).then((res) => {
          self.form_data.picUrl = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
        console.log(file.file);
      },
      handleSubmit_edit() {
        let self = this;
        self.$refs.form.validate(async (valid) => {
          if (valid) {
            let params = {
              id: self.form_data.id,
              cycle: self.form_data.number,
              picUrl: self.form_data.picUrl,
              fee: parseFloat(self.form_data.service_fee),
              frequency: self.form_data.number2,
              isNeedRecord: self.form_data.isRecord.some((item) => item == "是")
                ? 1
                : 0,
              noteType: self.form_data.note_type,
              projectName: self.form_data.service_name,
              projectType: self.form_data.service_type,
              rsv: self.form_data.remark,
              time: self.form_data.dateTime.join(","),
              operateType: handleType["编辑"],
            };
            edit_del_server(params).then((res) => {
              self.$notify({
                type: "success",
                message: "操作成功",
                title: "成功",
              });
              self.getList();
              self.dialog_cof.visible = false;
            });
          }
        });
      },
      handleDel(item) {
        let id = item.id;
        let params = {
          id,
          operateType:
            item.status == "N" ? handleType["停用"] : handleType["恢复"],
        };
        this.$confirm(
          `${item.status == "N" ? "停用" : "恢复"}, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            edit_del_server(params).then((res) => {
              this.$notify({
                type: "success",
                message: "操作成功!",
                title: "",
              });
              this.getList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      },
      // 获取服务类型
      getList_serverType() {
        query_server_type().then((res) => {
          this.server_type_options = res ? res : [];
        });
      },
      // 获取记录形式
      query_note_type() {
        query_note_type().then((res) => {
          this.note_type_list = res ? res : [];
        });
      },
    },
    mounted() {
      this.getList();
      this.getList_serverType();
      this.query_note_type();
    },
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-textarea {
    textarea {
      height: 150px;
    }
  }

  /deep/ .el-input-group__append {
    padding: 0 10px;
  }
</style>
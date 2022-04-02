<!-- 
 * @description:意向客户 
 * @fileName: index.vue 
 * @author: 姜纬杰 
 * @date: 2021-11-10 15:27:50
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
                <el-form-item class="filter" label="姓名：">
                  <el-input
                    clearable
                    v-model="pageable.targetCustomer"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="filter" label="手机号码：">
                  <el-input
                    clearable
                    v-model="pageable.phone"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(pageable, '查询')"
                >查询</el-button
              >
              <el-button @click="handleScreen(pageable, '重置')"
                >重置</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <el-row style="line-height: 80px; margin-top: -30px">
        <el-col :span="6">
          <div class="title">意向客户管理表</div>
        </el-col>
        <el-col :span="18" style="text-align: right">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleAction('新增')"
            >新增意向客户</el-button
          >
        </el-col>
      </el-row>
      <el-table
        border
        ref="data_table"
        :data="table_data"
        v-loading="table_loading"
        fit
      >
        <el-table-column width="80" align="center" prop="name" label="序号">
          <template slot-scope="scope">
            <div :style="{ color: $variables.baseColor }">
              {{ formatZero(scope.$index + 1, 2) }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="姓名" show-overflow-tooltip  align="left" prop="name"></el-table-column> -->
        <!-- <el-table-column label="线索主题" show-overflow-tooltip  align="left" prop="project"></el-table-column> -->
        <el-table-column label="来源" show-overflow-tooltip align="left">
          <template slot-scope="scope">
            {{ scope.row.source.name }}
          </template>
        </el-table-column>
        <el-table-column label="媒体大类" show-overflow-tooltip align="left">
          <template slot-scope="scope">
            {{ scope.row.media.name  }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="媒体子类" show-overflow-tooltip align="left" prop="subclass"></el-table-column> -->
        <el-table-column
          label="置业顾问"
          show-overflow-tooltip
          align="left"
          prop="propertyConsultant"
        ></el-table-column>
        <el-table-column
          label="目标客户"
          show-overflow-tooltip
          align="left"
          prop="targetCustomer"
        ></el-table-column>
        <el-table-column
          label="手机号码"
          show-overflow-tooltip
          align="left"
          prop="phone"
        ></el-table-column>
        <el-table-column
          label="备选电话"
          show-overflow-tooltip
          align="left"
          prop="alternativePhone"
        ></el-table-column>
        <!-- <el-table-column label="家庭电话" show-overflow-tooltip align="left" prop="homeTelephone"></el-table-column>
        <el-table-column label="公司电话" show-overflow-tooltip align="left" prop="companyTel"></el-table-column> -->
        <el-table-column
          label="地址"
          show-overflow-tooltip
          align="left"
          prop="address"
        ></el-table-column>
        <el-table-column
          label="所属行业"
          show-overflow-tooltip
          align="left"
          prop="industryInvolved"
        ></el-table-column>
        <!-- <el-table-column label="线索详情" show-overflow-tooltip align="left" prop="particulars"></el-table-column> -->
        <el-table-column align="left" label="操作" width="110">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="handleDialog(scope.row, '编辑')"
              >编辑</el-link
            >
            <el-link
              type="danger"
              :underline="false"
              @click="handleDel(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        style="text-align: right"
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="pageable.pageNum"
        :limit.sync="pageable.pageSize"
        @pagination="getClientsList"
      />
    </div>
    <el-dialog
      class="el-dialog-3"
      center
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
        label-position="top"
        style="min-height: 580px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="来源" class="must-fill" prop="source">
              <el-select v-model="form_data.source" placeholder="请选择">
                <el-option
                  v-for="item in source_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="媒体大类" class="must-fill" prop="media">
              <el-select v-model="form_data.media" placeholder="请选择">
                <el-option
                  v-for="item in media_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="媒体子类" class="must-fill" prop="subclass">
              <el-input v-model="form_data.subclass" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item
              label="置业顾问"
              class="must-fill"
              prop="propertyConsultant"
            >
              <el-input
                v-model="form_data.propertyConsultant"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="目标客户"
              class="must-fill"
              prop="targetCustomer"
            >
              <el-input
                v-model="form_data.targetCustomer"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="手机号码" class="must-fill" prop="phone">
              <el-input
                v-model="form_data.phone"
                maxlength="11"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="备选电话"
              class="default"
              prop="alternativePhone"
            >
              <el-input
                v-model="form_data.alternativePhone"
                maxlength="11"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="家庭电话" class="default">
              <el-input v-model="form_data.homeTelephone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司电话" class="default">
              <el-input v-model="form_data.companyTel" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="所属行业" class="default">
              <el-input
                v-model="form_data.industryInvolved"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="地址" class="default">
            <el-input
              v-model="form_data.address"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-form-item label="线索详情" class="default">
            <el-input v-model="form_data.particulars" placeholder="请输入"></el-input>
          </el-form-item>
        </el-row> -->
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
import { formatZero } from "@/filters";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { isPhone } from "@/utils/validate";
import {
  get_clients_list,
  add_clients,
  del_clients,
  modify_clients,
  get_one_clients,
} from "@/api/CCRC/intended";
import { get_media_list } from "@/api/CCRC/media";
import { get_source_list } from "@/api/CCRC/source";
export default {
  name: "intended_customer",
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      source_list: [], //来源列表
      media_list: [], //媒体列表
      table_total: 0,
      table_data: [],
      table_loading: false,
      pageable: {
        pageNum: 1,
        pageSize: 10,
        targetCustomer: "",
        phone: "",
      },
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      form_data: {
        id: null,
        // project: "", //线索主题
        source: "", //来源
        media: "", //媒体大类
        // subclass: undefined, //媒体子类
        propertyConsultant: "", //置业顾问
        targetCustomer: "", //目标客户
        phone: "", //手机号码
        alternativePhone: "", //备选电话
        // homeTelephone: "", //家庭电话
        // companyTel: "", //公司电话
        industryInvolved: "", //所属行业
        address: "", //地址
        // particulars: "" //线索详情
      },
      rules: {
        // project: [{ required: true, message: "不可为空", trigger: "change" }],
        source: [{ required: true, message: "不可为空", trigger: "change" }],
        media: [{ required: true, message: "不可为空", trigger: "change" }],
        subclass: [{ required: true, message: "不可为空", trigger: "change" }],
        propertyConsultant: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        targetCustomer: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        phone: [{ validator: isPhone, trigger: "change" }],
        // alternativePhone: [
        //   {  validator: isPhone, trigger: "change" }
        // ],
      },
    };
  },
  methods: {
    getClientsList() {
      get_clients_list({ ...this.pageable }).then((res) => {
        this.table_data = res.data.result ?? [];
        this.table_total = res.data.totalCount;
      });
    },
    getSourceList() {
      get_source_list().then((res) => {
        this.source_list = res.data ?? [];
      });
    },
    getMediaList() {
      get_media_list().then((res) => {
        this.media_list = res.data ?? [];
      });
    },
    formatZero,
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.pageable.page = 1;
          self.getClientsList();
          break;
        case "重置":
          self.pageable = {
            page: 1,
            size: 10,
            targetCustomer: "",
            phone: "",
          };
          self.getClientsList();
          break;
      }
    },
    handleSubmit() {
      let self = this;
      let params = {
        id: self.form_data.id,
        // project: self.form_data.project,
        sourceId: self.form_data.source,
        mediaId: self.form_data.media,
        // subclass: self.form_data.subclass,
        propertyConsultant: self.form_data.propertyConsultant,
        targetCustomer: self.form_data.targetCustomer,
        phone: self.form_data.phone,
        alternativePhone: self.form_data.alternativePhone,
        // homeTelephone: self.form_data.homeTelephone,
        // companyTel: self.form_data.companyTel,
        industryInvolved: self.form_data.industryInvolved,
        address: self.form_data.address,
        // particulars: self.form_data.particulars
      };
      self.$refs["form"].validate((vaild) => {
        if (vaild) {
          if (self.dialog_cof.title == "新增意向客户") {
            add_clients(params).then((res) => {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功",
              });
              self.getClientsList();
            });
            self.dialog_cof.visible = false;
          } else {
            let id = self.form_data.id;
            modify_clients(id, params).then((res) => {
              self.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功",
              });
              self.getClientsList();
            });
            self.dialog_cof.visible = false;
          }
        }
      });
    },
    handleDialog(data, type) {
      console.log(data);
      let self = this;
      self.dialog_cof.visible = true;
      self.dialog_cof.title = "编辑意向客户";
      self.form_data.id = data.id;
      // self.form_data.project = data.project;
      self.form_data.source = data.source.id;
      self.form_data.media = data.media.id;
      // self.form_data.subclass = data.subclass;
      self.form_data.propertyConsultant = data.propertyConsultant;
      self.form_data.targetCustomer = data.targetCustomer;
      self.form_data.phone = data.phone;
      self.form_data.alternativePhone = data.alternativePhone;
      // self.form_data.homeTelephone = data.homeTelephone;
      // self.form_data.companyTel = data.companyTel;
      self.form_data.industryInvolved = data.industryInvolved;
      self.form_data.address = data.address;
      // self.form_data.particulars = data.particulars;
    },
    handleAction(type) {
      let self = this;
      self.dialog_cof.title = "新增意向客户";
      self.dialog_cof.visible = true;
      self.clearFormData();
    },
    handleDel(data) {
      let self = this;
      this.$confirm(`删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = data.id;
          del_clients(id).then((res) => {
            self.$notify({
              type: "success",
              message: "删除成功!",
              title: "",
            });
            self.getClientsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消`,
          });
        });
    },
    clearFormData() {
      this.form_data = {
        id: null,
        // project: "", //线索主题
        source: "", //来源
        media: "", //媒体大类
        // subclass: undefined, //媒体子类
        propertyConsultant: "", //置业顾问
        targetCustomer: "", //目标客户
        phone: "", //手机号码
        alternativePhone: "", //备选电话
        // homeTelephone: "", //家庭电话
        // companyTel: "", //公司电话
        industryInvolved: "", //所属行业
        address: "", //地址
        // particulars: "" //线索详情
      };
    },
  },
  mounted() {
    this.getClientsList();
    this.getSourceList();
    this.getMediaList();
  },
};
</script>
<style lang='scss' scoped>
/deep/.el-form--label-top .el-form-item__label {
  color: #222;
  padding-bottom: 0;
}
/deep/.el-dialog__title {
  font-weight: 600;
}
</style>
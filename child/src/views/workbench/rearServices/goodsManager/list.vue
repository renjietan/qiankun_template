<!-- 
 * @description: 
 * @fileName: list.vue 
 * @author: 王文涛 
 * @date: 2022-02-21 15:50:27
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="6">
                <el-form-item label="物品名称">
                  <el-input
                    clearable
                    v-model="flt.name"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="rest_list">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>物品管理表</span>
        <div style="display: inline-block">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleNav('', '添加')"
            >添加物品</el-button
          >
        </div>
      </div>
      <el-table
        class="table_data"
        border
        ref="table_data"
        :data="table_data"
        v-loading="table_loading"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }" class="num">
              {{ formatZero(scope.$index + 1, 2) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="物品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px; border-radius: 50%"
              :src="scope.row.headUrl"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="articleName"
          label="物品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="warehouseName"
          label="所属仓库"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="spec"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="unit"
          label="单位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="warningAmount"
          label="库存量预警阈值"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="purchasePrice"
          label="采购单价"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="说明"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operatorName"
          label="管理员"
        ></el-table-column>
        <el-table-column align="center" width="240" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '编辑')"
              >详情</el-link
            >
            <el-link
              type="danger"
              @click="handleNav(scope.row, '删除')"
              :underline="false"
              >删除</el-link
            >

            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.current"
        :limit.sync="flt.size"
        @pagination="getList"
      />
    </div>
    <el-dialog
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
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-row>
              <el-form-item
                class="must-fill"
                label="物品名称"
                prop="articleName"
              >
                <el-input
                  maxlength="20"
                  clearable
                  v-model="form_data.articleName"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="must-fill"
                label="所属仓库"
                prop="warehouseId"
              >
                <el-select
                  v-model="form_data.warehouseId"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in warehouse_options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12" class="img">
            <el-col :span="10">
              <el-form-item class="readonly" label="物品图片" prop="code">
                <el-upload
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :http-request="beforeAvatarUpload"
                >
                  <img
                    v-if="form_data.rates_img"
                    :src="form_data.rates_img"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon upload_icon"
                  >
                    <div class="uploader_desc">上传图片</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <span class="tip">图片文件请控制 在10M以内</span>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item
              class="must-fill"
              label="物品类别"
              prop="articleTypeId"
            >
              <el-select
                v-model="form_data.articleTypeId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in good_type_options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="规格型号" prop="spec">
              <el-input clearable v-model="form_data.spec"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="单位" prop="unit">
              <el-input clearable v-model="form_data.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="must-fill"
              label="库存量预警阈值"
              prop="warningAmount"
            >
              <el-input clearable v-model="form_data.warningAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item
              class="optional"
              label="采购价格"
              prop="purchasePrice"
            >
              <el-input clearable v-model="form_data.purchasePrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="销售单价" prop="sellPrice">
              <el-input clearable v-model="form_data.sellPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col>
              <el-form-item class="optional" label="说明">
                <el-input
                  type="textarea"
                  v-model="form_data.remark"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(dialog_cof.title)"
          >确 认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import {
  list,
  add,
  update,
  deletel,
} from "@/api/pensionagency/rearServices/goods";
import { all_warehouse } from "@/api/pensionagency/rearServices/warehouse";
import { all_goods_type } from "@/api/pensionagency/rearServices/goodsType";
import { formatZero } from "@/filters";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      flt: {
        name: undefined,
        current: 1,
        size: 10,
      },
      form_data: {
        id: undefined,
        articleName: undefined, //物品名称
        articleTypeId: undefined, //物品类型
        purchasePrice: undefined, //采购价格
        warehouseId: undefined, //所属仓库
        warningAmount: undefined, //库存量预警阈值
        unit: undefined, //单位
        spec: undefined, //规格型号
        sellPrice: undefined, //销售单价
        remark: undefined, //说明
      },
      warehouse_options: [],
      good_type_options: [],
      table_total: 0,
      table_loading: false,
      table_data: [],
      rules: {
        articleName: [
          { required: true, message: "物品名称不可为空", trigger: "change" }, //仓库名称
        ],
        articleTypeId: [
          { required: true, message: "物品类型不能为空", trigger: "blur" }, //物品类型
        ],
        purchasePrice: [
          { required: true, message: "采购价格不可为空", trigger: "change" }, //采购价格
        ],
        warehouseId: [
          { required: true, message: "所属仓库", trigger: "blur" }, //仓库名称
        ],
        spec: [
          { required: true, message: "采购价格不可为空", trigger: "change" }, //规格型号
        ],
        warningAmount: [
          {
            required: true,
            message: "库存量预警阈值不可为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    formatZero,
    // 获取数据
    getList() {
      this.table_loading = true;
      list(this.flt).then((res) => {
        this.table_data = res?.data.records ?? [];
        this.table_total = res?.data.total ?? 0;
        this.table_loading = false;
      });
    },
    //重置数据
    rest_list() {
      this.flt.name = undefined;
      this.flt.current = 1;
      this.flt.size = 10;
      this.getList();
    },
    getOptions() {
      Promise.all([all_warehouse(), all_goods_type()]).then((res) => {
        if (res && res.length > 0) {
          this.warehouse_options = res[0].data ?? [];
          this.good_type_options = res[1].data ?? [];
        }
      });
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    handleNav(data, type) {
      switch (type) {
        case "添加":
          this.reset_form;
          this.dialog_cof.title = type;
          this.dialog_cof.visible = true;
          break;
        case "编辑":
          this.form_data.id = data.id;
          this.form_data.articleName = data.articleName;
          this.form_data.articleTypeId = data.articleTypeId;
          this.form_data.purchasePrice = data.purchasePrice;
          this.form_data.warehouseId = data.warehouseId;
          this.form_data.warningAmount = data.warningAmount;
          this.form_data.unit = data.unit;
          this.form_data.spec = data.spec;
          this.form_data.sellPrice = data.sellPrice;
          this.form_data.remark = data.remark;
          this.dialog_cof.title = type;
          this.dialog_cof.visible = true;
          break;
        case "删除":
          this.$confirm(`删除, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            deletel(data.id).then((res) => {
              if (res.code === 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getList();
              }
            });
          });
          break;
      }
    },
    reset_form() {
      this.form_data.articleName = undefined;
      this.form_data.articleTypeId = undefined;
      this.form_data.purchasePrice = undefined;
      this.form_data.warehouseId = undefined;
      this.form_data.warningAmount = undefined;
      this.form_data.unit = undefined;
      this.form_data.spec = undefined;
      this.form_data.sellPrice = undefined;
      this.form_data.remark = undefined;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    handleSubmit(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          switch (type) {
            case "添加":
              add(this.form_data).then((res) => {
                if (res.code === 0) {
                  this.$message({
                    message: "提交成功",
                    type: "success",
                  });
                  this.reset_form();
                  this.getList();
                  this.dialog_cof.visible = false;
                }
              });
              break;
            case "编辑":
              update(this.form_data, this.form_data.id).then((res) => {
                if (res.code === 0) {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  this.dialog_cof.visible = false;
                  this.getList();
                  this.dialog_cof.visible;
                }
              });
              break;
          }
        }
      });
    },
  },
  mounted() {
    this.getList();
    this.getOptions();
  },
};
</script>
<style lang='scss' scoped>
.btn_pic {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.5px;
  }
}
.tip {
  color: #999;
  position: absolute;
  bottom: 18%;
  left: 38%;
}
.img {
  position: relative;
}
</style>
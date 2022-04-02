<!-- 
 * @description: 
 * @fileName: inventory_mg.vue 
 * @author: 王文涛 
 * @date: 2022-02-22 14:42:13
 * @后台人员:  
!-->
<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item, index) in inventory_type" :key="index">
        <div
          :class="[
            `container_card ${
              index == active ? 'container_card2' : 'container_card1'
            }`,
          ]"
          :style="`background:${getStyle(index)}`"
          @click="handleSwitch(index)"
        >
          <div class="img-icon">
            <svg-icon
              :icon-class="`icon_${index == active ? index + 6 : index + 1}`"
              class="icon"
            ></svg-icon>
          </div>
          <div class="text-block">
            <h4>{{ item.label }}</h4>
            <p>
              <span>{{ item.num }}</span
              >件物品
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <el-form-item label="物品名称：">
                <el-input
                  readonly
                  clearable
                  v-model="flt.warehouse"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="物品类型：">
                <el-input
                  readonly
                  clearable
                  v-model="flt.warehouse"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="库存量：">
                <el-input
                  readonly
                  clearable
                  v-model="flt.warehouse"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="handleScreen(flt, '查询')"
                >查询</el-button
              >
              <el-button @click="handleScreen(flt, '重置')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>库存管理-后勤物品仓库</span>
        <div style="display: inline-block">
          <div style="display: inline-block">
            <el-button
              type="primary"
              icon="el-icon-ruku"
              @click="handleAction('入库')"
              >入库</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-chuku"
              @click="handleAction('出库')"
              >出库</el-button
            >
            <el-button
              type="success"
              icon="el-icon-caigoudan"
              @click="handleAction('采购单')"
              >采购单</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-rukudan"
              @click="handleAction('出入库记录')"
              >出入库记录</el-button
            >
            <el-button
              type="success"
              icon="el-icon-upload2"
              @click="handleAction('导出')"
              >导出</el-button
            >
          </div>
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
            <span :style="{ color: $variables.baseColor }">
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
          prop="bedName"
          label="物品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="物品类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="单位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="均价"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="库存"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="库存预警值"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="库存量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="bedName"
          label="说明"
        ></el-table-column>

        <el-table-column align="center" width="240" label="操作">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="primary"
              @click.native="handleNav(scope.row, '盘点')"
              >盘点</el-link
            >
            <el-link
              type="primary"
              @click="handleNav(scope.row, '申请采购')"
              :underline="false"
              >申请采购</el-link
            >
            <el-link
              :underline="false"
              type="warning"
              @click.native="handleNav(scope.row, '入库')"
              >入库</el-link
            >
            <el-link
              type="warning"
              @click="handleNav(scope.row, '出库')"
              :underline="false"
              >出库</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="table_total > 0"
        :total="table_total"
        :page.sync="flt.pageNum"
        :limit.sync="flt.pageSize"
      />
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
      center
    >
      <!-- 盘点 -->
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        v-if="dialog_cof.title == '盘点'"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="default" label="物品名称" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="default" label="物品类别 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="所属仓库" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="default" label="规格型号 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="单位" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="must-fill" label="库存 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 申请采购 -->
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        v-if="dialog_cof.title == '申请采购'"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="default" label="物品名称" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="default" label="物品类别" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="所属仓库" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="采购单价" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="must-fill" label="采购数量 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="供应商" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="default" label="说明">
              <el-input
                type="textarea"
                v-model="form_data.rsv"
                clearable
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 入库 -->
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        v-if="dialog_cof.title == '入库'"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="default" label="物品名称" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="default" label="物品类别" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="入库人" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="所属仓库" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="optional" label="入库日期 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="采购单价" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="入库数量" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="供应商" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="联系人" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="联系人" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="地址" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="default" label="说明">
              <el-input
                type="textarea"
                v-model="form_data.rsv"
                clearable
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 出库 -->
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        v-if="dialog_cof.title == '出库'"
        hide-required-asterisk
        status-icon
        width="40%"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="default" label="物品名称" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="default" label="物品类别" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="入库人" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="所属仓库" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item class="optional" label="出库日期 " prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="must-fill" label="申领人" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="optional" label="出库数量" prop="code">
              <el-input readonly clearable v-model="form_data.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="default" label="说明">
              <el-input
                type="textarea"
                v-model="form_data.rsv"
                clearable
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit"
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
import { valid_error_msg } from "@/utils/valid-error-msg";
import { colorList } from "@/utils/enum";
import {} from "@/utils/validate";
import { formatZero } from "@/filters";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      active: 0,
      dialog_cof: {
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false,
      },
      colorList,
      table_loading: false,
      table_data: [],
      table_total: 1,
      inventory_type: [
        {
          label: "固定资产仓库",
          num: 200,
        },
        {
          label: "后勤物品仓库",
          num: 200,
        },
        {
          label: "长者用品仓库",
          num: 200,
        },
        {
          label: "餐饮用品仓库",
          num: 200,
        },
        {
          label: "餐饮用品仓库",
          num: 200,
        },
      ],
      flt: {},
      form_data: {},
      rules: {},
      form_loading: false,
    };
  },

  methods: {
    formatZero,
    getStyle(index) {
      return this.active == index ? this.colorList[this.active] : "";
    },
    handleSwitch(index) {
      this.active = index;
    },
    handleSubmit(){

    },
    handleNav(data, type) {
      switch (type) {
        case "盘点":
          break;
        case "申请采购":
          break;
      }
      this.dialog_cof.title = type;
      this.dialog_cof.visible = true;
    },
    handleAction(type) {
      switch (type) {
        case "出库":
          this.$router.push({
            path: "/workbench/workbench/workbench/rearServices/outbound_detail",
          });
          break;
        case "入库":
          this.$router.push({
            path: "/workbench/workbench/rearServices/putbound_detail",
          });
          break;
        case "采购单":
          this.$router.push({ path: "/workbench/workbench/workbench/rearServices/purchasing_mg" });
          break;
        case "出入库记录":
          this.$router.push({ path: "/workbench/workbench/workbench/rearServices/handle_record" });
          break;
      }
    },
  },
  mounted() {
    this.table_data = [{ name: 1 }];
  },
};
</script>
<style lang='scss' scoped>
.container_card1 {
  padding: 21px 24px;
  .img-icon {
    display: inline-block;
    .icon {
      font-size: 40px;
      text-align: center;
    }
  }
  .text-block {
    font-size: 16px;
    line-height: 9px;
    margin-left: 22px;
    p {
      span {
        font-size: 24px;
      }
      color: #017cff;
    }
    display: inline-block;
  }
}

.container_card2 {
  @extend .container_card1;
  .text-block {
    p {
      color: #fff;
    }
  }
  color: #fff;
}
</style>
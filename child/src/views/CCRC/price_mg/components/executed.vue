<!-- 
 * @description:已执行 
 * @fileName: executed.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 20:14:18
 * @后台人员:  
!-->
<template>
  <div>
    <el-row style="padding-bottom: 20px">
      <el-col>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <!-- <div class="title" v-if="title">{{ title }}</div> -->
          <div>
            <el-button type="success" @click="handleAction('','生成价格模版')">
              <span class="btn_pics">
                <img class="pic" src="~@/assets/images/CCRC/build.png" />生成价格模版
              </span>
            </el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAction('','新增价格方案')">新增价格方案</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <!-- <el-table-column width="150" align="left" label="序号">
        <template slot-scope="scope">
          <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="250" align="left" prop="planName" label="价格方案"></el-table-column>
      <el-table-column width="350" align="left" prop="planName" label="底均价对比"></el-table-column>
      <el-table-column width="350" align="left" prop="tollStandard" label="面均价对比"></el-table-column>
      <el-table-column width="200" align="left" prop="state" label="状态">
        <template slot-scope="scope">{{scope.row.state=="0"?"审批中":"已审批"}}</template>
      </el-table-column>
      <el-table-column width="200" align="left" prop="afterDiscount" label="制定信息"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="执行信息"></el-table-column>
      <el-table-column align="left" label="操作" width="110">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleAction(scope.row, '详情')">详情</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
        label-width="125px"
        label-position="left"
      >
        <div v-show="this.dialog_cof.title=='生成价格模版'">
          <el-row>
            <span style="font-size:14px;color:#262626;font-weight: 600">所属项目：清江山水-一期</span>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-form-item label="排序方式：" style="padding:0">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">楼层+号码</el-radio>
                <el-radio :label="1">号码+楼层</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="范围：">
              <el-radio-group v-model="Range" style="width:300px">
                <el-radio :label="0">代售</el-radio>
                <el-radio :label="1">全部</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="this.Range===0">
              <el-checkbox
                v-for="item in consignment_list"
                :label="item.name"
                :checked="true"
                :key="item.id"
              >{{item.name}}</el-checkbox>
              <el-divider></el-divider>
              <div style="display:flex;min-height:350px">
                <div
                  style="width:230px;height:32px;border: 1px solid #017CFF;line-height:32px;padding-left:12px;margin-right:10px"
                  v-for="child in consignment_list"
                  :key="child.name"
                >{{child.building}}</div>
              </div>
            </div>

            <div v-if="this.Range===1">
              <el-checkbox
                v-for="item in allhouse_list"
                :label="item.name"
                :checked="true"
                :key="item.id"
              >{{item.name}}</el-checkbox>
              <el-divider></el-divider>
              <div style="display:flex;min-height:350px">
                <div
                  style="width:230px;height:32px;border: 1px solid #017CFF;line-height:32px;padding-left:12px;margin-right:10px"
                  v-for="child in allhouse_list"
                  :key="child.name"
                >{{child.building}}</div>
              </div>
            </div>
          </el-row>
        </div>
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
import { formatZero } from "@/filters";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "Executed",
  components: {
    Pagination
  },
  directives: {
    waves,
    elDragDialog
  },

  data() {
    return {
      name: "",
      table_loading: false,
      table_data: [
        {
          planName: "1",
          state: "1"
        }
      ],
      radio: 0,
      Range: 0,
      consignment_list: [
        {
          id: 1,
          name: "东区住宅",
          building: "01栋"
        }
      ], //代售列表
      allhouse_list: [
        {
          id: 1,
          name: "东区住宅",
          building: "01栋"
        },

        {
          id: 2,
          name: "西区住宅",
          building: "02栋"
        }
      ], //全部列表
      group: "",
      radio: "启用",
      dialog_cof: {
        type: "",
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      form_data: {
        id: null,
        cimboName: "", //套餐名称
        levelName: "", //服务等级
        cimboFee: "", //套餐费用
        abilityLevel: undefined //能力评估等级
      },
      rules: {
        levelName: [{ required: true, message: "不可为空", trigger: "change" }],
        cimboName: [{ required: true, message: "不可为空", trigger: "change" }],
        abilityLevel: [
          { required: true, message: "不可为空", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    formatZero,
    handleDialog() {},
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "生成价格模版":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "生成价格模版";
          break;
        case "新增价格方案":
          self.$router.push({ name: "price_mg_add_price" });
          break;
        case "详情":
          self.$router.push({ path: "/CCRC/price_mg/price_detail" });
          break;
      }
    },
    handleSubmit() {}
  },

  mounted() {}
};
</script>
<style lang='scss' scoped>
.btn_pics {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.45px;
  }
}
.container_card {
  .text {
    color: #8a8a8a;
  }
  .required {
    /deep/.el-form-item__label {
      color: #222;

      font-weight: 400;

      &:after {
        display: inline-block;
        content: "*";
        text-indent: 5px;
        color: red;
      }
    }
  }
  .noRequired {
    /deep/.el-form-item__label {
      color: #222;
      font-weight: 400;
    }
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
.el-dialog-3 {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #222;

    font-weight: 400;
    line-height: 32px;
  }
}

</style>
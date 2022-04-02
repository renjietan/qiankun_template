<!-- 
 * @description:价格方案-详情 
 * @fileName: Pending.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 19:40:53
 * @后台人员:  
!-->
<template>
<div>
 <div class="container_card">
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        label-width="120px"
        label-position="left"
      >
        <el-row>
          <el-form-item label="计价方式：" class="required">
            <span style="color:#222">按建筑面积</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="价格标准：" class="required">
            <span style="color:#222">以建筑单价为准</span>
            
            <!-- <el-radio-group v-model="radio1" style="width:300px;color:#222">
              <el-radio :label="0">以标准总价为准</el-radio>
              <el-radio :label="1">以建筑单价为准</el-radio>
            </el-radio-group> -->
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="已售房间：" class="required">
            <span style="color:#222">不参与调价</span>

            <!-- <el-radio-group v-model="radio2" style="width:300px">
              <el-radio :label="0">参与调价</el-radio>
              <el-radio :label="1">不参与调价</el-radio>
            </el-radio-group> -->
            <div class="text">已售房间包含认购、签约，且导入价格后只会更新房间价格，不影响已售信息。</div>
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="调价说明：" class="noRequired">
             <span style="color:#222"></span>
            <!-- <el-input
              v-model="name"
              placeholder="请输入"
              type="textarea"
              style="width:1510px"
              :rows="4"
            ></el-input> -->
          </el-form-item>
        </el-row>
      </el-form>
        <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column width="80" align="left" type="index" label="序号"></el-table-column>
      <el-table-column  align="left" prop="planName" label="调价楼栋名称"></el-table-column>
      <el-table-column  align="left" prop="planName" label="套数"></el-table-column>
      <el-table-column  align="left" prop="tollStandard" label="调整前/后底价均价"></el-table-column>
      <el-table-column  align="left" prop="afterDiscount" label="调整前/后面价均价"></el-table-column>
      <el-table-column align="left" label="操作" width="110">
        <template slot-scope="scope">
          <div>
            <el-link :underline="false" type="primary" @click="handleAction(scope.row, '明细')">明细</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
      <div class="footer">
<!-- 
      <el-button type="primary" @click="handleSubmit">发起审批</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button> -->
      <el-button @click="$router.go(-1)">返 回</el-button>
      
    </div>
</div>

</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {} from "@/utils/validate";
export default {
  name: "BaseInfo",
  components: {
    Pagination
  },
  directives: {
    waves,
    elDragDialog
  },

  data() {
    return {
      name:"",
      table_loading: false,
      table_data: [
        {
          planName: "2"
        }
      ],
      radio: 0,
      Range: 0,
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
    handleDialog() {},
    handleAction(data,type) {
      let self = this;
      switch (type) {
        case "生成价格模版":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "生成价格模版";
          break;
        case "新增价格方案":
          self.$router.push({name:"price_mg_add_price"})
          break;
        case "编辑":
          self.$router.push({path:"/CCRC/price_mg/price_detail"})
          break;
      }
    },
    handleSubmit() {}
  },

  mounted() {}
};
</script>
<style lang='scss' scoped>
/deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid transparent !important;
    font-size: 14px;
    font-weight: bolder;
    color: black;
    padding: 15px 0;
  }
}

/deep/.el-table__body-wrapper .el-table__row {
  
  td {
    background: #e8f3ff;

    border-right: 1px solid transparent !important;
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}


.container_card {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #000000A6;

    font-weight: 400;
    line-height: 32px;
  }
}
.title {
  letter-spacing: 1px;
  margin-top: 5px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
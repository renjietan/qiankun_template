<!-- 
 * @description:意向客户登记 
 * @fileName: willing_client_signIn.vue  
 * @author: 姜纬杰 
 * @date: 2021-09-07 17:59:28
 * @后台人员:  
!-->
<template>
  <div class="container">
    <div class="title" style="margin-top: 10px;">
      <div>{{$route.query.isShow==0?'客户登记':'客户详情'}}</div>
    </div>
    <div>
      <el-form
        :inline="true"
        :model="form_data"
        :rules="rules"
        ref="form"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="createTime" class="optional" label="登记日期">
                  <el-date-picker
                    v-model="form_data.createTime"
                    type="date"
                    placeholder="请输入时间"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="customerName" class="must-fill" label="客户姓名">
                  <el-input v-model="form_data.customerName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="relationship" class="must-fill" label="与长者关系">
                  <el-select v-model="form_data.relationship" placeholder="请选择">
                    <el-option
                      v-for="item in relationship_list"
                      :key="item.type"
                      :label="item.desc"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="telephone" class="must-fill" label="联系电话">
                  <el-input v-model="form_data.telephone" placeholder="请输入联系电话" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="level" class="must-fill" label="客户级别">
                  <el-select v-model="form_data.level" clearable placeholder="请选择">
                    <el-option
                      v-for="item in Customer_level_list"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="salesperson" class="must-fill" label="责任销售">
                  <el-select v-model="form_data.salesperson" placeholder="请选择">
                    <el-option
                      v-for="item in salesmen_list"
                      :key="item.id"
                      :label="item.empNm"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="source" class="optional" label="客户来源">
                  <el-input v-model="form_data.source" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="elderName" class="optional" label="长者姓名">
                  <el-input v-model="form_data.elderName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="gender" class="optional" label="性别">
                  <el-checkbox-group v-model="form_data.gender" :max="1">
                    <el-checkbox label="男" border></el-checkbox>
                    <el-checkbox label="女" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="age" class="optional" label="年龄">
                  <el-input v-model="form_data.age" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="assessLevel" class="optional" label="评估等级">
                  <el-select v-model="form_data.assessLevel" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-button
              style="margin-top:43px;margin-left:10px"
              @click="handleNav()"
              type="primary"
            >去评估</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item prop="elderCondition" class="optional" label="长者情况">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form_data.elderCondition"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="hinderDesc" class="optional" label="阻碍点">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form_data.hinderDesc"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40"></el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            class
            border
            ref="table_data"
            :data="table_data"
            v-loading="table_loading"
            stripe
            highlight-current-row
            fit
          >
            <el-table-column align="center" label="序号" width="55">
              <template slot-scope="scope">
                <span :style="{ color: $variables.baseColor }">
                  {{
                  formatZero(scope.$index + 1, 2)
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="left" width="192" label="跟进状态">
              <template slot-scope="scope">
                <el-select
                  v-if="scope.row.checked"
                  ref="editInput"
                  v-model="scope.row.followStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in follow_status_list"
                    :key="item.type"
                    :label="item.desc"
                    :value="item.type"
                  ></el-option>
                </el-select>

                <span v-else>{{scope.row.statusDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" width="192" label="跟进时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-if="scope.row.checked"
                  placeholder="请选择"
                  v-model="scope.row.startDate"
                  ref="editInput"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span v-else>{{scope.row.startDate}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="跟进详细信息">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.checked"
                  placeholder="请选择"
                  v-model="scope.row.followDesc"
                  ref="editInput"
                ></el-input>
                <span v-else>{{scope.row.followDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" width="121" label="操作">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  type="primary"
                  @click.native="handleAction(scope.row, '编辑')"
                >编辑</el-link>
                <el-link type="danger" @click="handleAction(scope.row, '删除')" :underline="false">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            icon="el-icon-plus"
            style="width:100%;background-color:#e9f4ff;color:#017CFF"
            @click="add"
          >添加</el-button>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item prop="revisitTime" class="optional" label="预计回访日期">
                  <el-date-picker
                    v-model="form_data.revisitTime"
                    type="date"
                    placeholder="请输入时间"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="isRevisitRemind" class="optional" label="回访提醒">
                  <el-checkbox-group v-model="form_data.isRevisitRemind" :max="1">
                    <el-checkbox label="是" border></el-checkbox>
                    <el-checkbox label="否" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { valid_error_msg } from "@/utils/valid-error-msg";
import {
  isCert_code,
  isPhone,
  isOldman_name,
  isPostal_code,
  isPhone_maybeNull
} from "@/utils/validate";
import { handleType, uploadType } from "@/utils/enum";
import {
  add_customer,
  detail_customer,
  modify_customer,
  get_RelationshipEnum,
  get_salesmen,
  get_status_list,
  del_follow_status
} from "@/api/pensionagency/marketing/intendedCustomer";
import { Customer_level_list } from "@/utils/enum";
import { upload_pic } from "@/api/pensionagency/administrative/administrative";
import solarLunar from "solarlunar-es";
import { formatZero } from "@/filters";
export default {
  name: "basic_info",
  components: { Pagination },
  directives: { waves },
  props: {
    isNeedPrinter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      Customer_level_list,
      table_obj: {
        followStatus: "",
        startDate: "",
        followDesc: "",
        checked: true
      },
      formatZero,
      model: "",
      required: true,
      options: [],
      table_data: [],
      relationship_list: [], //关系列表
      salesmen_list: [], //销售列表
      follow_status_list: [], //跟进状态列表
      table_loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      rules: {
        // elderName: [{ required: true, message: "不可为空", trigger: "change" }],
        // sex: [{ required: true, message: "不可为空", trigger: "change" }],
        // phone: [
        //   {
        //     validator: isPhone,
        //     trigger: "change"
        //   }
        // ],
        // lunarBirthday: [
        //   {
        //     required: true,
        //     message: "不可为空",
        //     trigger: "change"
        //   }
        // ],
        // phone2: [
        //   {
        //     validator: isPhone_maybeNull,
        //     trigger: "change"
        //   }
        // ]
      },
      form_data: {
        id: null,
        age: null, //年龄
        assessLevel: undefined, //评估等级
        createTime: "", //登记时间
        gender: [], //性别
        customerName: "", //客户姓名
        elderCondition: "", //长者情况
        elderName: "", //长者姓名
        flowId: [], //跟进流程id
        hinderDesc: "", //阻碍点
        isRevisitRemind: [], //是否回访提醒
        level: "", //客户级别
        relationship: undefined, //与长者关系id
        revisitTime: "", //预计回访时间
        salesperson: undefined, //销售人员
        telephone: "", //联系电话
        source: "" //客户来源
      },
      options: []
    };
  },
  methods: {
    getDetial() {
      let self = this;
      if (self.$route.query.id != null) {
        detail_customer({ id: self.$route.query.id }).then(res => {
          res.gender = [res.gender == 1 ? "男" : "女"];
          res.isRevisitRemind = [res.isRevisitRemind == true ? "是" : "否"];
          self.form_data = res;
          self.table_data = res.marketingFollowUp;
        });
      }
    },
    getRelationshipEnum() {
      get_RelationshipEnum().then(res => {
        this.relationship_list = res;
      });
    },
    getSalesmen() {
      get_salesmen().then(res => {
        this.salesmen_list = res;
      });
    },
    getStatusList() {
      get_status_list().then(res => {
        this.follow_status_list = res;
      });
    },
    handleNav() {
      this.$router.push({
        path: "/workbench/workbench/goLive/form/ability_assess",
        query: {
          id: 1,
          isShow: false
        }
      });
    },
    //输入框失去焦点事件
    // inputBlur(scope) {
    //   scope.row.checked = false;
    // },
    add() {
      this.table_data.push(JSON.parse(JSON.stringify(this.table_obj)));
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "编辑":
          data.checked = true;
          break;
        case "删除":
          let params = {
            id: data.id
          };
          this.$confirm(`删除, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              del_follow_status(params).then(async res => {
                self.$notify({
                  type: "success",
                  message: "删除成功!",
                  title: ""
                });
                self.getDetial();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: `已取消`
              });
            });
          break;

        default:
          break;
      }
    },

    handleSubmit() {
      let self = this;
      let params = {};
      this.$refs["form"].validate(valid => {
        if (valid) {
          params = {
            marketingIntention: {
              age: self.form_data.age,
              gender: self.form_data.gender == "女" ? 2 : 1,
              assessLevel: self.form_data.assessLevel,
              createTime: self.form_data.createTime,
              customerName: self.form_data.customerName,
              elderCondition: self.form_data.elderCondition,
              id: self.form_data.id,
              elderName: self.form_data.elderName,
              // flowId: self.form_data.flowId,
              hinderDesc: self.form_data.hinderDesc,
              relationship: parseInt(self.form_data.relationship),
              salesperson: parseInt(self.form_data.salesperson),
              isRevisitRemind:
                self.form_data.isRevisitRemind == "否" ? false : true,
              level: self.form_data.level,
              revisitTime: self.form_data.revisitTime,
              telephone: self.form_data.telephone,
              source: self.form_data.source
            },
            marketingFollowUps: self.table_data
          };
          if (self.form_data.id == null) {
            add_customer(params).then(res => {
              if (res?.body == null) {
                self.$notify({
                  type: "success",
                  message: "新增成功",
                  title: "成功"
                });
                self.$router.go(-1);
              }
            });
          } else {
            modify_customer(params).then(res => {
              self.$notify({
                type: "success",
                message: "修改成功",
                title: "成功"
              });
              self.$router.go(-1);
            });
          }
        }
      });
    },
    reset() {
      this.form_data = {
        id: null,
        age: null, //年龄
        assessLevel: undefined, //评估等级
        createTime: "", //登记时间
        gender: [], //性别
        customerName: "", //客户姓名
        elderCondition: "", //长者情况
        elderName: "", //长者姓名
        flowId: [], //跟进流程id
        hinderDesc: "", //阻碍点
        isRevisitRemind: [], //是否回访提醒
        level: "", //客户级别
        relationship: undefined, //与长者关系id
        revisitTime: "", //预计回访时间
        salesperson: undefined, //销售人员
        telephone: "", //联系电话
        source: "" //客户来源
      };
    }
  },
  mounted() {
    this.getDetial();
    this.getRelationshipEnum();
    this.getSalesmen();
    this.getStatusList();
    const { id, step } = this.$route.params;
    this.form_data.operatorId = this.$store.getters.userInfo.empId;
    if (!isNaN(Number(id))) {
      this.form_data.id = id;
    }
  }
};
</script>
<style lang='scss' scoped>
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 171px;
}
/deep/.el-table__body tr.current-row > td {
  background-color: transparent !important;
}
.container {
  background-color: #fff;
}
/deep/.el-checkbox.is-bordered.el-checkbox--small {
  padding: 5px 105px 5px 10px;
  border-radius: 3px;
  height: 32px;
}
/deep/ .el-table__header-wrapper {
  th {
    background: #fafafa;
    border-right: 1px solid #dfe6ec !important;
    font-size: 15px;
    font-weight: bolder;
    color: black;
    padding: 15px 0;
  }
}
/deep/.el-table__body-wrapper .el-table__row {
  td {
    border-right: 1px solid #dfe6ec !important;
  }
}
</style>
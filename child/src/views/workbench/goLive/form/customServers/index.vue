<!-- 
 * @description: 
 * @fileName: customServers.vue 
* @author: 谭人杰 
 * @date: 2021-05-16 22:57:29
 * @后台人员:  
!-->
<template>
  <div class="container" v-loading="form_loading">
    <basicinfo></basicinfo>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">评估信息</div>
      <el-form :inline="true" hide-required-asterisk status-icon>
        <el-row>
          <el-col :span="4">
            <el-form-item class="readonly" label="评估等级" prop="abilityLevel">
              <el-input disabled v-model="form_data.abilityLevel" required placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="padding-left: 20px;">
            <el-form-item class="el-form-item-btnGroup default" label="占位" prop="title">
              <el-button type="primary" @click="handleNavDetail">查看详情</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">定制服务</div>
      <el-form ref="form" :model="form_data" :inline="true" hide-required-asterisk status-icon :rules="rules">
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="6">
                <el-form-item class="must-fill" label="服务等级" prop="levelId">
                  <el-select v-model="form_data.levelId" placeholder="请选择服务等级">
                    <el-option v-for="item in server_level_list" :key="item.id" :label="item.levelName"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item class="must-fill" label="服务套餐" prop="cimboName">
                  <el-input disabled v-model="form_data.cimboName" placeholder="请选择服务套餐"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item class="must-fill" label="套餐费用" prop="cimboFee">
                  <el-input disabled v-model="form_data.cimboFee" placeholder="请输入套餐费用"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="text-align: right" :span="8">
            <el-form-item style="text-align: right" class="el-form-item-btnGroup default" label="占位">
              <el-button v-waves type="success" disabled style="font-size:14px">护理等级确认书</el-button>
              <el-button v-waves type="warning" disabled style="font-size:14px">服务项目确认书</el-button>
              <el-button v-waves type="primary" disabled style="font-size:14px">一键打印</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table border :class="[table_body_hidden ? 'table_data' : '']" ref="data_table" :data="table_data"
        v-loading="table_loading" fit>
        <el-table-column width="100" align="center" prop="typeName" label="服务项目"></el-table-column>
        <el-table-column align="left">
          <template slot="header" slot-scope="scope">
            <div style="text-align: right">
              <el-button type="text" @click="table_body_hidden = !table_body_hidden">
                {{ table_body_hidden ? '展开' : '收起' }}
                <i :class="[table_body_hidden ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
              </el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <el-tag style="margin-left: 15px" v-for="(item, index) in scope.row.data" :key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button :disabled="step >= 7 ? 'disabled' : false" type="primary" @click="handleSubmit">提 交</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import Basicinfo from "@/components/Basicinfo";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import elHeightAdaptiveTable from "@/directive/el-table";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import variables from "@/styles/variables.scss";
  import {
    service_level_config,
    group,
    elder_service_level,
    by_elder_id,
    get_older_baseinfo,
    assess_level
  } from "@/api/pensionagency/goLive/goLive";

  import { } from "@/utils/validate";
  export default {
    name: "goLive_form_customServers",
    components: { Pagination, Basicinfo },
    directives: { waves, permission, elDragDialog, elHeightAdaptiveTable },
    data() {
      return {
        age: null,
        table_body_hidden: false,
        step: undefined,
        form_data: {
          operatorId: null, //操作者Id
          elderId: undefined,
          abilityLevel: "", //评估等级
          levelId: "", //服务等级
          cimboName: "", //服务套餐
          cimboFee: "" //服务费用
        },
        form_loading: false,
        server_level_list: [],

        rules: {
          levelId: [{ required: true, message: "不可为空", trigger: "blur" }],
          cimboName: [{ required: true, message: "不可为空", trigger: "change" }],
          cimboFee: [{ required: true, message: "不可为空", trigger: "change" }]
        },

        checkList_model: {},
        table_loading: false,
        table_data: []
      };
    },
    watch: {
      "form_data.levelId": function (n) {
        let self = this
        let temp = self.server_level_list.filter(item => item.id == self.form_data.levelId)
         
        self.form_data.cimboName = temp[0]?.cimboName
        self.form_data.cimboFee = temp[0]?.cimboFee
        
         self.parseTableData(self.form_data.levelId)
      },
    },
    methods: {
      handleNavDetail() {
        this.$router.push({
          name: "goLive_form_ability_assess",
          query: {
            id: this.form_data.elderId
          }
        });
      },
      handleSubmit() {
        const { elderId, levelId, operatorId } = this.form_data;
        let self = this;
        self.$refs.form.validate(valid => {
          if (valid) {
            elder_service_level({ elderId, levelId, operatorId }).then(res => {
              this.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
            });
            self.$router.push("/workbench/workbench/goLive/list");
          }
        });
      },
      process(newName) {
        for (var i of this.server_level_list) {
          if (newName == i.id)
            return { cimboName: i.cimboName, cimboFee: i.cimboFee };
        }
      },
      //获取评估信息---评估等级
      async get_custom_server_info() {
        let self = this;
        let res = await assess_level({
          elderId: this.form_data.elderId
        })
        self.form_data.abilityLevel = res?.levelDesc
        self.server_level_list = await service_level_config()
        let levelId = await by_elder_id({
          elderId: this.form_data.elderId
        })
      console.log(typeof(levelId));
        if (levelId) {
          let temp = self.server_level_list.filter(item => item.id == levelId)[0]
           self.form_data.levelId = typeof(levelId) =='number'?levelId:undefined
          self.form_data.cimboName = temp?.cimboName
          self.form_data.cimboFee = temp?.cimboFee
        } else {
          let t = self.server_level_list.filter(item => item.abilityLevel == res?.level)[0]
          
          self.form_data.levelId = t?.id
          self.form_data.cimboName = t?.cimboName
          self.form_data.cimboFee = t?.cimboFee
        }
      },
      parseTableData(lvId) {
        if (!!lvId) {
          group({ lvId }).then(res => {
            this.table_data = res.map((el, index) => {
              el.data =
                el.projectConfigs?.length > 0
                  ? el.projectConfigs.map(x => x.projectName)
                  : [];
              return el;
            });
          });
        }
      }
    },
    mounted() {
      const { id, step } = this.$route.params;
      this.step = step
      this.form_data.elderId = id;
      this.form_data.operatorId = this.$store.getters.userInfo.empId;
      
       this.get_custom_server_info();
  
      
    }
  };
</script>
<style lang='scss' scoped>
  .el-form-item-btnGroup {
    /deep/ .el-form-item__label {
      color: transparent;
    }
  }

  .table_data {
    /deep/ .el-table__body-wrapper {
      display: none;
    }
  }
</style>
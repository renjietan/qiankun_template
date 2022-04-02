<!-- 
 * @description: 服务项目
 * @fileName: server_project.vue 
 * @author: 谭人杰 
 * @date: 2021-06-23 00:24:18
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form :inline="false">
      <el-row :gutter="40">
        <el-col :span="4">
          <el-form-item class="readonly" label="服务等级">
            <el-select v-model="baseInfo.levelId" placeholder="请选择服务等级">
              <el-option v-for="item in server_level_list" :key="item.id" :label="item.levelName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="服务套餐">
            <el-input readonly v-model="baseInfo.cimboName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="box">
      <div class="title" style="
          line-height: 50px;
          background: rgba(0, 0, 0, 0.02);
          padding-left: 20px;
        ">
        服务项目
      </div>
      <div class="box-content" v-for="(value, key) in data" :key="key">
        <div class="box-content-title">{{ key }}</div>
        <el-row :gutter="30">
          <el-col :span="6" style="margin-bottom: 20px" v-for="(item, index) in value" :key="index">
            <server-item ref="item" :info="item"></server-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <el-button type="info" @click="handleSubmit">保存</el-button>
    </div>
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { arrayGroupBy } from "@/utils/index";
  import ServerItem from "@/components/server_item";
  import { by_elder_id, service_level_config, group } from "@/api/pensionagency/goLive/goLive";
  export default {
    name: "server_project",
    directives: { waves },
    components: { ServerItem },
    data() {
      return {
        baseInfo: {
          levelId: "",
          cimboName: "",
        },
        data: {},
        elderId: undefined,
        server_level_list: [],
      };
    },
    watch: {
      "baseInfo.levelId"(val) {
        if (!!val) {
          for (var i of this.server_level_list) {
            if (i.id === val) {
              this.baseInfo.cimboName = i.cimboName;
              this.getList(val);
            }
          }
        }
      },
    },
    methods: {
      getDetail() {
        const { elderId } = this;
        service_level_config().then((res) => {
          this.server_level_list = res || [];
          by_elder_id({ elderId }).then((res) => {
            this.baseInfo.levelId = res;
            for (var i of this.server_level_list) {
              if (i.id === res) {
                this.baseInfo.cimboName = i.cimboName;
                this.getList(this.baseInfo.levelId);
              }
            }
          });
        });
      },
      handleSubmit() {
        let items = this.$refs.item;
        let item_valid = [];
        let item_data = [];
        items.forEach((item, index) => {
          item.$refs.form.validate((valid) => {
            item_valid.push(valid);
          });
          item_data.push(item.form_data);
        });
        if (item_valid.every((item) => item)) {
          console.log(item_data);
        }
      },
      getList(lvId) {
        group({ lvId })
          .then()
          .then((res) => {
            let data = res.reduce((cur, pre) => {
              if (cur[pre.typeName] == undefined) {
                cur[pre.typeName] = []
              }
              let projectConfigs = pre.projectConfigs
              projectConfigs = projectConfigs.map(item => {
                item.dateTime = (item.time ?? "").split(",")
                item.number = item.cycle
                item.number2 = item.frequency
                item.isRecord = item.isNeedRecord == 1 ? true : false
                return item
              })
              cur[pre.typeName] = [...cur[pre.typeName],...projectConfigs]
              return cur
              
            }, {})
            this.data = data;
            console.log(data);
          });
      },
    },

    mounted() {
      const { id } = this.$route.params;
      this.elderId = id;
      // this.getServer_level();
      this.getDetail();
    },
    activated() {
      const { id } = this.$route.params;
      this.elderId = id;
      // this.getServer_level();
      this.getDetail();
    },
    deactivated() {
      const { id } = this.$route.params;
      this.elderId = id;
      // this.getServer_level();
      this.getDetail();
    },
  };
</script>
<style lang='scss' scoped>
  .box {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 100px;

    .box-content {
      padding: 0 20px;

      &-title {
        line-height: 45px;
      }
    }
  }
</style>
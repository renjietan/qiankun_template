<!-- 
 * @description: 服务等级调整申请
 * @fileName: ApplyServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 21:03:04
 * @后台人员:  
!-->
<template>
  <div class>
    <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
      <el-row :gutter="40">
        <el-col :span="4">
          <el-form-item class="readonly" label="能力评估等级（最新）">
            <el-input readonly v-model="form_data.ass_level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="readonly" label="评估日期" prop="ass_dateTime">
            <el-input readonly v-model="form_data.ass_dateTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col></el-col>
        <el-col :span="12">
          <div class="title apply-title border-ccc">调整前</div>
        </el-col>
        <el-col :span="12">
          <div class="title apply-title border-blue">调整后</div>
        </el-col>
        <el-col :span="12">
          <div class="box-left">
            <el-row :gutter="40">
              <el-col :span="9">
                <el-form-item class="readonly" label="服务等级" prop="beforeId">
                  <el-select disabled v-model="form_data.beforeId" clearable placeholder="请选择">
                    <el-option v-for="item in server_level_list" :key="item.id" :label="item.levelName"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item class="readonly" label="服务套餐" prop="old_server_package">
                  <el-input disabled v-model="form_data.old_server_package"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box-right">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item class="optional" label="服务等级">
                  <el-select v-model="form_data.afterId" clearable placeholder="请选择">
                    <el-option v-for="item in server_level_list" :key="item.id" :label="item.levelName"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="optional" label="服务套餐" prop="cimboName">
                  <el-input disabled v-model="form_data.cimboName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="optional" label="套餐费用">
                  <el-input clearable disabled v-model.number="form_data.cimboFee"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>

        <el-col :span="4">
          <el-form-item class="optional" label="预计生效日期" prop="expectDate">
            <el-date-picker v-model="form_data.expectDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="optional" label="调整原因" prop="chargeReason">
            <el-input v-model="form_data.chargeReason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item class="default" label="备注">
            <el-input clearable v-model.number="form_data.rsv"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="content">
      <el-row class="row" v-for="item in table_data" :key="item.key">
        <el-col :span="5">
          <div class="left">
            <div class="title">{{ item.typeName }}</div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="right">
            <div class="right-item">
              <el-tag style="margin-left: 15px" v-for="(item, index) in item.data" :key="index">{{ item }}</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-button type="primary" :disabled="cur_step < 2 ? false : 'disabled'"   @click="handSubmit">保存申请</el-button>
    </div>
  </div>
</template>
<script>
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import {
    assess_level,
    service_level_config,
    by_elder_id,
    group,
  } from "@/api/pensionagency/goLive/goLive";
  import { get_charge_process_byId_byType } from '@/api/pensionagency/inLive/server_level';
  import { charge_process, base_info } from "@/api/pensionagency/inLive/bed_just";

  export default {
    name: "ApplyServerLevel",
    components: {},
    directives: { waves, permission },
    data() {
      return {
        id: undefined,
        server_level_list: [],
        cur_step: 0,
        rules: {
          afterId: [
            {
              required: true,
              message: "请选择服务等级",
              trigger: "blur",
            },
          ],
          cimboName: [
            {
              required: true,
              message: "服务套餐不能为空",
              trigger: "blur",
            },
          ],
          cimboFee: [
            {
              required: true,
              message: "套餐费用不能为空",
              trigger: "blur",
            },
          ],
          expectDate: [
            {
              required: true,
              message: "请选择日期",
              trigger: "blur",
            },
          ],
          chargeReason: [
            {
              required: true,
              message: "调整原因不能为空",
              trigger: "blur",
            },
          ],
        },
        form_data: {
          ass_level: "", //能力评估等级（最新）
          ass_dateTime: "", //评估日期
          beforeId: "", //调整前 -- 服务等级
          old_server_package: "", // 调整前 -- 服务套餐
          afterId: undefined, // 调整后 服务等级
          cimboName: undefined, //调整后 服务套餐
          cimboFee: "", // 调整后 套餐费用
          expectDate: null, // 预计生效日期
          chargeReason: "", // 调整原因
          rsv: "", // 备注
          type: "S",
        },
        table_data: [],
      };
    },
    watch: {
      "form_data.beforeId"(newName) {
        if (!!newName) {
          let obj = this.process(newName);
          this.form_data.old_server_package = obj?.cimboFee ?? "";
          this.parseTableData(newName);
        }
      },
      "form_data.afterId"(newName) {
        let obj = this.process(newName);
        this.form_data.cimboFee = obj?.cimboFee ?? "";
        this.form_data.cimboName = obj?.cimboName ?? "";
        this.parseTableData(newName);
      },
    },
    methods: {
      async getDetail() {
        let self = this
        const { elderId } = this;
        var res = await service_level_config()
        self.server_level_list = res ?? []
        var res = await by_elder_id({ elderId })
        self.form_data.beforeId = res ?? undefined;
        self.form_data.old_server_package = self.server_level_list.filter(item => item.id == res)[0].cimboFee
        var res = await get_charge_process_byId_byType({
          elderId: this.elderId,
          type: self.form_data.type
        })
        if (res.id != null) {
          self.cur_step = res.processIn
          self.form_data.expectDate = new Date(res.expectDate)
          self.form_data.chargeReason = res.chargeReason
          self.form_data.rsv = res.rsv
          self.form_data.afterId = res.afterId
          self.form_data.processId = res.id
        }
      },
      process(newName) {
        if (!!newName) {
          for (var i of this.server_level_list) {
            if (newName == i.id)
              return { cimboFee: i.cimboFee, cimboName: i.cimboName };
          }
        } else {
          return null;
        }
      },
      getServer_level() {
        service_level_config().then((res) => {
          this.server_level_list = res || [];
        });
      },
      assess_level(params) {
        let self = this;
        assess_level(params).then((res) => {

          self.form_data.ass_level = res?.levelDesc ?? "";
          let dateTime = res?.checkDate ?? ""
          dateTime = `${dateTime.substring(0, 4)}-${dateTime.substring(4, 6)}-${dateTime.substring(6, 8)}`
          self.form_data.ass_dateTime = dateTime
        });
      },
      parseTableData(lvId) {
        if (!!lvId) {
          group({ lvId }).then((res) => {
            this.table_data = res.map((el, index) => {
              el.data =
                el.projectConfigs?.length > 0
                  ? el.projectConfigs.map((x) => x.projectName)
                  : [];
              return el;
            });
          });
        }
      },
      handSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            charge_process({ ...this.form_data, elderId: this.elderId }).then(
              (res) => {
                this.$message({
                  message: "调整成功",
                  type: "success",
                });
                this.cur_step = 2
              }
            );
          }
        });
      },
      getInfo() {
        const { id } = this;
        base_info({ id }).then(res => {
          if (res.id != null) {
            this.form_data.cimboFee = res.feeDesc;
            this.form_data.cimboName = res.other;
            this.form_data.afterId = res.afterId;
            this.form_data.expectDate = res.expectDate;
            this.form_data.chargeReason = res.chargeReason;
            this.form_data.rsv = res.rsv;
          }
        })
      },
    },
    mounted() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;
      if (!isNaN(Number(id))) {
        this.elderId = id;
        // 获取评估等级
        this.assess_level({
          elderId: this.elderId,
        });
        this.getDetail();
      }
      if (!isNaN(Number(record))) {
        this.id = record;
        this.getInfo();
      }
    },
    deactivated() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;
      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.assess_level({
          elderId: this.elderId,
        });
        this.getDetail();
      }
      if (!isNaN(Number(record))) {
        this.id = record;
        this.getInfo();
      }
    },
    activated() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;

      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.assess_level({
          elderId: this.elderId,
        });
        this.getDetail();
      }
      if (!isNaN(Number(record))) {
        this.id = record;
        this.getInfo();
      }
    },
  };
</script>
<style lang='scss' scoped>
  @import "../../../../../../../styles/variables.scss";
  $padding: 20px;

  .apply-title {
    font-size: 14px;
    padding: 10px 0;
    display: inline-block;
  }

  .border-blue {
    border-bottom: 5px solid $baseColor;
  }

  .border-ccc {
    border-bottom: 5px solid #ccc;
  }

  .box-left {
    padding: $padding;
    background: rgba(204, 204, 204, 0.08);
  }

  .box-right {
    padding: $padding;
    background: rgba(1, 124, 255, 0.09);
    border: 1px solid $baseColor;
    box-sizing: border-box;
  }

  .content {
    border: 1px solid #eee;

    .row {
      .title {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.7);
      }

      .left {
        padding: 20px;
        border-right: 1px solid #eee;
        display: flex;
        align-items: center;

        &:not(first-child) {
          border-top: 1px solid #eee;
        }
      }

      .right {
        padding: 20px;

        &:not(first-child) {
          border-top: 1px solid #eee;
        }
      }
    }
  }
</style>
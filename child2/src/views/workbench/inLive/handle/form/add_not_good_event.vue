<!-- 
 * @description: 
 * @fileName: add_not_good_event.vue 
 * @author: 谭人杰 
 * @date: 2021-06-23 21:12:17
 * @后台人员:  
!-->
<template>
  <div class="container">
    <BasicInfoTable></BasicInfoTable>
    <div class="container_card">
      <div class="title" style="margin-bottom: 30px">不良事件情况</div>
      <el-button type="info" icon="el-icon-plus">不良事件报告单</el-button>
      <el-form
        :rules="rules"
        style="margin-top: 20px"
        :inline="true"
        ref="form"
        :model="form_data"
      >
        <el-row :gutter="40">
          <!-- <el-col :span="4">
                        <el-form-item class="default" label="诊断" prop="diagnosticResult">
                            <el-input clearable v-model="form_data.diagnosticResult"></el-input>
                        </el-form-item>
                    </el-col> -->
          <el-col :span="4">
            <el-form-item
              class="readonly"
              label="第一联系人"
              prop="firstlinkMan"
            >
              <el-input
                clearable
                disabled
                v-model="form_data.firstlinkMan"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              class="readonly"
              label="联系方式"
              prop="linkman_phone"
            >
              <el-input
                clearable
                disabled
                v-model="form_data.linkman_phone"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" label="发生日期" prop="date">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form_data.date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" label="发生时间" prop="time">
              <el-time-select
                v-model="form_data.time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" label="发生场所" prop="place">
              <el-input clearable v-model="form_data.place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="must-fill" label="责任人" prop="responsible">
              <el-input clearable v-model="form_data.responsible"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              class="must-fill"
              label="第一发现人"
              prop="firstDiscoverer"
            >
              <el-input
                clearable
                v-model="form_data.firstDiscoverer"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="container_card">
      <div class="title" style="margin-bottom: 30px">不良事件类别</div>
      <div class="content">
        <el-row class="row">
          <el-col :span="5">
            <div class="left">
              <div class="title">1、跌倒/坠落事件</div>
              <el-checkbox-group
                @change="handleChange(1)"
                :max="1"
                v-model="form_event1.level"
              >
                <el-checkbox label="一级预警（无外伤）"></el-checkbox>
                <el-checkbox label="二级预警（轻微外伤）"></el-checkbox>
                <el-checkbox label="三级预警（骨折中重度外伤）"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="right">
              <div class="right-item">
                <div class="title">跌倒发生状态</div>
                <el-checkbox-group
                  @change="handleChange(1)"
                  :max="1"
                  v-model="form_event1.detail.fellStatus"
                >
                  <el-checkbox label="行走"></el-checkbox>
                  <el-checkbox label="如厕"></el-checkbox>
                  <el-checkbox label="淋浴"></el-checkbox>
                  <el-checkbox label="外出"></el-checkbox>
                  <el-checkbox label="移乘"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="right-item">
                <div class="title">跌倒发生地点</div>
                <el-checkbox-group
                  @change="handleChange(1)"
                  :max="1"
                  v-model="form_event1.detail.fellPlace"
                >
                  <el-checkbox label="走廊"></el-checkbox>
                  <el-checkbox label="卧室"></el-checkbox>
                  <el-checkbox label="卫生间"></el-checkbox>
                  <el-checkbox label="公告区域"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="right-item">
                <div class="title">跌倒时间</div>
                <el-checkbox-group
                  @change="handleChange(1)"
                  :max="1"
                  v-model="form_event1.detail.fellTime"
                >
                  <el-checkbox label="夜间"></el-checkbox>
                  <el-checkbox label="上午"></el-checkbox>
                  <el-checkbox label="中午"></el-checkbox>
                  <el-checkbox label="下午"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="right-item">
                <div class="title">陪护情况</div>
                <el-checkbox-group
                  @change="handleChange(1)"
                  :max="1"
                  v-model="form_event1.detail.escort"
                >
                  <el-checkbox label="无"></el-checkbox>
                  <el-checkbox label="有"></el-checkbox>
                  <el-checkbox label="家属"></el-checkbox>
                  <el-checkbox label="工作人员"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div
                class="right-item"
                style="border-top: 1px solid #eee; padding: 20px"
              >
                <div class="title">坠落</div>
                <el-checkbox-group
                  @change="handleChange(1)"
                  :max="1"
                  v-model="form_event1.detail.fellFrom"
                >
                  <el-checkbox label="从床上"></el-checkbox>
                  <el-checkbox label="从椅子上"></el-checkbox>
                  <el-checkbox label="从轮椅上"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="left borderTop">
              <div class="title">2、褥疮</div>
              <el-checkbox-group
                @change="handleChange(2)"
                :max="1"
                v-model="form_event2.level"
              >
                <el-checkbox label="一期（淤红红润期）"></el-checkbox>
                <el-checkbox label="二期（炎性浸润期）"></el-checkbox>
                <el-checkbox label="三期（破溃坏死期）"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="right borderTop">
              <div class="right-item">
                <div class="title">压疮来源</div>
                <el-checkbox-group
                  @change="handleChange(2)"
                  :max="1"
                  v-model="form_event2.detail.bedsoreFrom"
                >
                  <el-checkbox label="带入"></el-checkbox>
                  <el-checkbox label="院内"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="right-item">
                <div class="title">压疮部位</div>
                <el-input
                  @change="handleChange(2)"
                  v-model="form_event2.detail.bedsorePlace"
                  clearable
                >
                </el-input>
              </div>
              <div class="right-item">
                <div class="title">压疮大小</div>
                <el-input
                  @change="handleChange(2)"
                  v-model="form_event2.detail.bedsoreSize"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="left borderTop">
              <div class="title">3、用药事件</div>
              <el-checkbox-group
                @change="handleChange(3)"
                :max="1"
                v-model="form_event3.level"
              >
                <el-checkbox label="一级预警（无用药后反应）"></el-checkbox>
                <el-checkbox label="二级预警（轻度不适）"></el-checkbox>
                <el-checkbox label="三级预警（出现严重后果）"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="right borderTop">
              <div class="right-item">
                <div class="title">用药途径</div>
                <el-checkbox-group
                  @change="handleChange(3)"
                  :max="1"
                  v-model="form_event3.detail.medicationWay"
                >
                  <el-checkbox label="带入"></el-checkbox>
                  <el-checkbox label="院内"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="right-item">
                <div class="title">事件类别</div>
                <el-checkbox-group
                  @change="handleChange(3)"
                  :max="1"
                  v-model="form_event3.detail.medicationType"
                >
                  <el-checkbox label="错服药"></el-checkbox>
                  <el-checkbox label="漏服药"></el-checkbox>
                  <el-checkbox label="错服时间"></el-checkbox>
                  <el-checkbox label="其它"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="left borderTop">
              <div class="title">4、事故</div>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="right borderTop">
              <div class="right-item">
                <div class="right-item-item">
                  <div class="title" style="min-width: 230px">
                    提供治疗的医疗机构：
                  </div>
                  <el-input
                    v-model="form_data.medicalInstitutions"
                    clearable
                  ></el-input>
                </div>
                <div class="right-item-item">
                  <div class="title" style="width: auto">诊断结果：</div>
                  <el-input
                    v-model="form_data.diagnosticResult"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="right-item">
                <div
                  class="right-item-item"
                  style="align-items: flex-start; min-width: 150px"
                >
                  <div class="title" style="min-width: 230px">
                    情况描述后应急处置的概要：
                  </div>
                  <el-input
                    v-model="form_data.situationDesc"
                    type="textarea"
                    clearable
                  ></el-input>
                </div>
              </div>
            </div>
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
import BasicInfoTable from "@/components/Basicinfo/table";
import { deepClone } from "@/utils/index";
import {
  add_not_goods_event,
  get_not_goods_event_byid,
  set_or_del_event_byid,
  get_elder_linkman,
} from "@/api/pensionagency/inLive/not_goods_event";
export default {
  name: "inLive_handle_form_add_not_good_event",
  components: { BasicInfoTable },
  data() {
    return {
      rules: {
        date: [{ required: true, message: "不可为空", trigger: "change" }],
        time: [{ required: true, message: "不可为空", trigger: "change" }],
        place: [{ required: true, message: "不可为空", trigger: "change" }],
        responsible: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
        firstDiscoverer: [
          { required: true, message: "不可为空", trigger: "change" },
        ],
      },
      form_data: {
        date: null, //发生日期
        diagnosticResult: "", //诊断结果
        elderId: undefined, //老人ID
        eventLevel: undefined, // 事件级别
        eventType: undefined, //事件类型 BS:褥疮 FE:跌到 ME:用药
        firstDiscoverer: "", //第一发现人
        medicalInstitutions: "", //提供治疗的医疗机构
        place: "", //发生场所
        responsible: "", //	责任人
        situationDesc: "", //情况描述
        time: "", //时间
        firstlinkMan: "", //第一联系人,
        linkman_phone: "", //联系人电话
        id: undefined,
      },
      form_event1: {
        level: [], //跌倒坠落事件
        detail: {
          escort: [], //陪护情况
          fellFrom: [], //坠落
          fellPlace: [], //跌倒发生地点
          fellStatus: [], //跌倒发生状态,
          fellTime: [], //跌倒时间
        },
      },
      form_event2: {
        level: [], //褥疮
        detail: {
          bedsoreFrom: [], //压疮来源
          bedsorePlace: "", //压疮部位
          bedsoreSize: "", //压疮大小
        },
      },
      form_event3: {
        level: [], //用药事件
        detail: {
          medicationWay: [], //用药途径
          medicationType: [], //事件类别
        },
      },
    };
  },
  methods: {
    handleChange(type) {
      switch (type) {
        case 1:
          this.form_data.eventType = "FE";
          this.reset2();
          this.reset3();
          break;
        case 2:
          this.form_data.eventType = "BS";
          this.reset1();
          this.reset3();
          break;
        default:
          this.form_data.eventType = "ME";
          this.reset1();
          this.reset2();
          break;
      }
    },
    reset() {
      this.form_data = {
        date: null, //发生日期
        diagnosticResult: "", //诊断结果
        elderId: undefined, //老人ID
        eventLevel: undefined, // 事件级别
        eventType: undefined, //事件类型 BS:褥疮 FE:跌到 ME:用药
        firstDiscoverer: "", //第一发现人
        medicalInstitutions: "", //提供治疗的医疗机构
        place: "", //发生场所
        responsible: "", //	责任人
        situationDesc: "", //情况描述
        time: "", //时间
        firstlinkMan: "", //第一联系人,
        linkman_phone: "", //联系人电话
        id: undefined,
      };
    },
    reset1() {
      this.form_event1 = {
        level: [], //跌倒坠落事件
        detail: {
          escort: [], //陪护情况
          fellFrom: [], //坠落
          fellPlace: [], //跌倒发生地点
          fellStatus: [], //跌倒发生状态,
          fellTime: [], //跌倒时间
        },
      };
    },
    reset2() {
      this.form_event2 = {
        level: [], //痔疮
        detail: {
          bedsoreFrom: [], //压疮来源
          bedsorePlace: "", //压疮部位
          bedsoreSize: "", //压疮大小
        },
      };
    },
    reset3() {
      this.form_event3 = {
        level: [], //用药事件
        detail: {
          medicationWay: [], //用药途径
          medicationType: [], //事件类别
        },
      };
    },
    handleSubmit() {
      let self = this;
      let params = deepClone(this.form_data);
      let isValid;
      this.$refs.form.validate((valid) => {
        if (valid) {
          let { eventType } = params;
          switch (eventType) {
            case "FE":
              isValid = this.isValid(self.form_event1);
              if (!isValid) {
                self.$notify({
                  type: "warning",
                  title: "提示",
                  message: "（跌倒/坠落）事件信息不完整",
                });
                return;
              } else {
                params.eventLevel = self.form_event1.level.toString();
                params.fell = self.form_event1.detail;
                for (let i in params.fell) {
                  params.fell[i] = params.fell[i].toString();
                }
              }
              break;

            case "BS":
              isValid = this.isValid(this.form_event2);
              if (!isValid) {
                self.$notify({
                  type: "warning",
                  title: "提示",
                  message: "（压疮）事件信息不完整",
                });
                return;
              } else {
                params.eventLevel = self.form_event2.level.toString();
                params.bedsore = self.form_event2.detail;
                for (let i in params.bedsore) {
                  params.bedsore[i] = params.bedsore[i].toString();
                }
              }
              break;

            case "ME":
              isValid = this.isValid(this.form_event3);
              if (!isValid) {
                self.$notify({
                  type: "warning",
                  title: "提示",
                  message: "（用药）事件信息不完整",
                });
                return;
              } else {
                params.eventLevel = self.form_event3.level.toString();
                params.medication = self.form_event3.detail;
                for (let i in params.medication) {
                  params.medication[i] = params.medication[i].toString();
                }
              }
              break;

            case undefined:
              self.$notify({
                type: "warning",
                title: "提示",
                message: "请填写事件",
              });
              return;
          }
          if (params.id) {
            set_or_del_event_byid({ ...params, operateType: "M" }).then(
              (res) => {
                self.$notify({
                  title: "操作",
                  message: "操作成功",
                  type: "success",
                });
                self.$refs["form"].resetFields();
              }
            );
          } else {
            
            add_not_goods_event(params).then((result) => {
              console.log(result);
              self.$notify({
                title: "操作",
                message: "操作成功",
                type: "success",
              });
              
              self.$forceUpdate();
              self.$refs["form"].resetFields();
              self.reset();
              self.reset1();
              self.reset2();
              self.reset3();
            });
          }
        }
      });
    },
    isValid(data) {
      let { level, detail } = data;
      detail = Object.values(detail);
      if (level.length == 0) {
        return false;
      }
      if (detail.some((item) => item.toString() == "")) {
        return false;
      }
      return true;
    },
    get_elder_linkman() {
      let self = this;
      get_elder_linkman({
        elderId: this.form_data.elderId,
      }).then((res) => {
        self.$set(self.form_data, "firstlinkMan", res.name);
        self.$set(self.form_data, "linkman_phone", res.phone);
      });
    },
    getDetail() {
      get_not_goods_event_byid({
        id: this.form_data.id,
      }).then((res) => {
        this.form_data = res;
        this.get_elder_linkman();
        let { eventType } = res;
        switch (eventType) {
          case "FE":
            this.form_event1.level = [res.eventLevel];
            let { fell } = res;
            // for (let i in fell) {
            //     fell[i] = [fell[i]]
            // }
            this.form_event1.detail.escort = [fell.escort];
            this.form_event1.detail.fellFrom = [fell.fellFrom];
            this.form_event1.detail.fellPlace = [fell.fellPlace];
            this.form_event1.detail.fellStatus = [fell.fellStatus];
            this.form_event1.detail.fellTime = [fell.fellTime];
            break;
          case "BS":
            this.form_event2.level = [res.eventLevel];
            let { bedsore } = res;
            this.form_event2.detail.bedsoreFrom = [bedsore.bedsoreFrom];
            this.form_event2.detail.bedsorePlace = bedsore.bedsore;
            this.form_event2.detail.bedsoreSize = bedsore.bedsoreSize;

            break;
          case "ME":
            this.form_event3.level = [res.eventLevel];
            let { medication } = res;
            this.form_event3.detail.medicationWay = [medication.medicationWay];
            this.form_event3.detail.medicationType = [
              medication.medicationType,
            ];
            break;
          default:
            break;
        }
      });
    },
  },
  mounted() {
    this.form_data.elderId = parseInt(this.$route.params.id);
    this.form_data.id = this.$route.query.eventId;
    if (this.form_data.id) {
      this.getDetail();
    } else {
      this.get_elder_linkman();
    }
  },
  activated() {
    this.reset();
    this.reset1();
    this.reset2();
    this.reset3();
    this.form_data.elderId = parseInt(this.$route.params.id);
    this.form_data.id = this.$route.query.eventId;
    if (this.form_data.id) {
      this.getDetail();
    } else {
      this.get_elder_linkman();
    }
  },
};
</script>
<style lang='scss' scoped>
.borderTop {
  border-top: 1px solid #eee;
}

/deep/ .el-textarea__inner {
  height: 200px;
  width: calc(100% - 30px);
}

.content {
  border: 1px solid #eee;

  .row {
    min-height: 200px;

    .title {
      font-size: 15px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.7);
    }

    .left {
      padding: 30px;
      border-right: 1px solid #eee;

      .el-checkbox-group {
        display: flex;
        flex-direction: column;
        margin-top: 5px;

        label {
          margin-top: 20px;
        }
      }
    }

    .right {
      min-height: 200px;

      &-item {
        font-size: 15px;
        display: flex;
        margin-bottom: 30px;
        padding: 0 0 0 20px;
        align-items: center;

        &:first-of-type {
          padding-top: 30px;
        }

        .title {
          width: 130px;
        }

        &-item {
          flex: 1;
          display: flex;
          align-items: center;

          .el-input {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>
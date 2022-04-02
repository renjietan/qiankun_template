<!-- 
 * @description: 床位调整申请
 * @fileName: ApplyServerLevel.vue 
 * @author: 谭人杰 
 * @date: 2021-06-25 21:03:04
 * @后台人员:  
!-->
<template>
  <div class="">
    <el-form :inline="true" ref="form" :model="form_data" :rules="rules" hide-required-asterisk status-icon>
      <el-row :gutter="40" style="margin-bottom: 30px">
        <el-col :span="4">
          <el-form-item class="optional" label="预计办理日期" prop="expectDate">
            <el-date-picker v-model="form_data.expectDate" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item class="default" label="调整原因" prop="chargeReason">
            <el-input clearable v-model="form_data.chargeReason"></el-input>
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
                <el-form-item class="readonly" label="床位" prop="bedName">
                  <el-input readonly v-model="form_data.bedName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item class="readonly" label="是否包房">
                  <el-input readonly v-model="form_data.old_isPrivateRoom"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box-right">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item class="optional" label="床位" prop="afterName">
                  <el-input readonly v-model="form_data.afterName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="optional" label="是否包房">
                  <el-select v-model="form_data.isAllRoom" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="readonly" label="床位费">
                  <el-input readonly v-model.number="form_data.bunk_fee">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="24">
          <div class="title apply-title border-ccc">床态图筛选</div>
        </el-col>
        <el-col :span="4">
          <el-form-item class="default" label="楼:">
            <el-select @change="handleChange_building" clearable v-model="flt.building" placeholder="请选择">
              <el-option v-for="item in building_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="default" label="层:">
            <el-select @change="handleChange_level" clearable v-model="flt.level" placeholder="请选择">
              <el-option v-for="item in level_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="bunk_box">
      <house-state :levelId="flt.level" handleType="info" :isNeedAdd="false" :rowData="table_data"
        @sendBedInfo="getBedInfo"></house-state>
    </div>
    <div class="footer">
      <!-- :disabled="submit_disabled ? 'disabled' : false" -->
      <el-button type="primary" :disabled="cur_step < 2 ? false : 'disabled'" @click="handleSubmit">提交申请</el-button>
    </div>
  </div>
</template>
<script>
  import HouseState from "@/components/house_state";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import { isTrue } from "@/utils/enum";
  import { mapGetters } from "vuex";
  import { arrayGroupBy } from "@/utils/index";
  import { charge_process, base_info } from "@/api/pensionagency/inLive/bed_just";
  import { query_batch_bed, get_bed_desc, by_elder_id } from "@/api/pensionagency/basicConfig/basicConfig";
  import { get_charge_process_byId_byType } from '@/api/pensionagency/inLive/server_level';

  export default {
    name: "ApplyServerLevel",
    components: { HouseState },
    directives: { waves, permission },
    computed: {
      ...mapGetters(["orgInfo","userInfo"]),
    },
    data() {
      return {
        id: undefined,
        cur_step: 0,
        rules: {
          expectDate: [
            {
              required: true,
              message: "请选择日期",
              trigger: "blur",
            },
          ],
          afterName: [{ required: true, message: "不可为空", trigger: "change" }],
          isAllRoom: [
            {
              required: true,
              message: "不可为空",
              trigger: "change",
            },
          ],
        },
        isTrue,
        table_data: [],
        flt: {
          building: undefined,
          level: undefined,
        },
        building_list: [],
        level_list: [],
        form_data: {
          expectDate: null, // 预计办理日期
          chargeReason: "", //调整原因
          bedName: "", //调整前 选择床位
          beforeId: undefined,
          afterId: undefined,
          old_isPrivateRoom: undefined, //调整前 是否包房
          afterName: "", //调整后 选择床位
          isAllRoom: undefined, //调整后 是否包房
          bunk_fee: "", //床位费
          type: "B",
          processId: undefined,
        },
      };
    },
    methods: {
      async handleChange_building(val) {
        this.level_list = await this.getData({ type: "楼层", superId: val });
        this.flt.level = undefined;
        this.table_data = [];
      },
      async getData({ type, superId }) {
        let params =
          type == "楼宇"
            ? {
              type: "s",
              centerId: this.orgInfo.id??this.userInfo.centerId,
            }
            : {
              type: "f",
              superId,
              centerId: this.orgInfo.id??this.userInfo.centerId,
            };
        return await query_batch_bed(params).then((res) => {
          return res ?? [];
        });
      },
      async getList() {
        let data = await this.getData({
          type: "楼宇",
        });
        data = data ?? [];
        this.building_list = data;
      },
      async handleChange_level(val) {
        this.table_loading = true;
        let self = this;
        get_bed_desc({ floorId: val }).then((res) => {
          let arr = res ?? [];
          res = res.sort((a, b) => a.xzhou - b.xzhou);
          let table_data = arrayGroupBy(res ?? [], "yzhou");
          let key = 0;
          for (let i in table_data) {
            key = parseInt(i) + 1;
            table_data[i] = table_data[i].reduce((cur, pre) => {
              let num = pre.xzhou - (cur[cur.length - 1]?.xzhou ?? 0) - 1
              let a = Array.from({ length: num }, () => "空床位");
              cur = [...cur, ...a, ...[pre]];
              return cur;
            }, []);
          }

          table_data.length = key;
          table_data = Array.from(table_data, (item) => {
            return item ?? ["空床位"];
          });

          table_data = Object.values(table_data);
          self.table_data = table_data;
          self.table_loading = false;
        });
      },

      handleSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {

            charge_process({ ...this.form_data, elderId: this.elderId, isAllRoom: this.form_data.isAllRoom === '否' ? '0' : '1' }).then((res) => {
              this.$notify({
                title: "提示",
                message: "调整成功",
                type: "success",
              });
              this.cur_step = 2
            });
          }
        });
      },
      async getDetail() {
        let self = this
        let data = await self.getData({
          type: "楼宇",
        });
        // 获取长者调整前的信息
        let res = await by_elder_id({ elderId: self.elderId })
        self.building_list = data ?? [];
        if (res.bedId != null) {
          const { bedName, isAllRoom, bedId } = res;
          self.form_data.bedName = bedName;
          self.form_data.beforeId = bedId;
          self.form_data.old_isPrivateRoom = isAllRoom === "0" ? "否" : "是";
          self.flt.building = res.buildId
          self.level_list = await self.getData({ type: "楼层", superId: self.flt.building });
          self.flt.level = res.floorId
          self.handleChange_level(self.flt.level)
        }
        //根据长者id、调整类型查询调整记录
        let result = await get_charge_process_byId_byType({
          elderId: this.elderId,
          type: self.form_data.type
        })
        if (result?.id != null) {
          self.cur_step = result.processIn
          self.form_data.expectDate = new Date(result.expectDate)
          self.form_data.chargeReason = result.chargeReason
          self.form_data.afterId = result.afterId
          self.form_data.afterName = result.afterName
          self.form_data.isAllRoom = result.other
          self.form_data.bunk_fee = result.feeDesc
          self.form_data.processId = result.id
        }
      },
      getInfo(id) {
        let self = this
        base_info({ id }).then(res => {
          if (res.id) {
            self.cur_step = res.processIn
            self.form_data.bunk_fee = res.feeDesc;
            self.form_data.isAllRoom = res.other === "0" ? "否" : "是";
            self.form_data.chargeReason = res.chargeReason;
            self.form_data.afterName = res.afterName;
            self.form_data.expectDate = res.expectDate;
            self.form_data.chargeReason = res.chargeReason;
            self.form_data.rsv = res.rsv;
            self.form_data.processId = res.id
          }
        })
      },
      getBedInfo({ houseInfo, bedInfo }) {
        let self = this;
        if (houseInfo.isAllRoom == "1") {
          self.form_data.bedName = "";
          self.form_data.bedFee = "";
          self.form_data.bedId = undefined;
          self.form_data.isAllRoom = "0";
          self.$alert('此房间已被包房！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `已取消`
              });
            }
          });
        } else {
          self.form_data.afterName = bedInfo.bedName;
          self.form_data.afterId = bedInfo.bedId;
          self.form_data.bunk_fee = bedInfo.bedFee;
          self.form_data.isAllRoom = houseInfo.isAllRoom === "0" || houseInfo.isAllRoom ? "否" : "是";
        }
      },
    },
    mounted() {
      const { id } = this.$route.params;
      const { record } = this.$route.query;
      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.getDetail();
      }

      if (!isNaN(Number(record))) {
        this.id = record;
        this.getInfo(record);
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
</style>
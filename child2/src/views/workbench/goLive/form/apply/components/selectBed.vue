<!-- 
 * @description: 
 * @fileName: selectBed.vue 
 * @author: 胡洁 
 * @date: 2021-08-04 13:40:09
 * @后台人员:  
!-->
<template>
  <div class="container_box">
    <el-form ref="form" :model="first_form" :rules="rules" hide-required-asterisk>
      <el-row :gutter="70">
        <el-col :span="4">
          <el-form-item label="入住日期" class="must-fill" prop="planCheckDate">
            <el-date-picker v-model="first_form.planCheckDate" type="date" placeholder="请输入入住日期"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="must-fill" label="选择床位" prop="bedName">
            <el-input v-model="first_form.bedName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="must-fill" label="是否包房" prop="private_room">
            <el-select v-model="first_form.isAllRoom" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="床位费" class="optional">
            <el-input v-model="first_form.bedFee" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div v-loading="table_loading" style="background: #f0f6fb; padding: 0 20px 20px; overflow: scroll">
      <el-form style="margin: 20px 0" :inline="true">
        <el-row :getter="40">
          <el-col :span="4">
            <el-form-item label="楼:">
              <el-select @change="handleChange_building" clearable v-model="flt.building" placeholder="请选择">
                <el-option v-for="item in building_list" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="层：">
              <el-select @change="handleChange_level" clearable v-model="flt.level" placeholder="请选择">
                <el-option v-for="item in level_list" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item label="户型">
              <el-select v-model="house_bed" placeholder="请选择">
                <el-option v-for="item in house_bed_number" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="朝向">
              <el-select v-model="house" placeholder="请选择">
                <el-option v-for="item in house_direction" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <house-state :selected="first_form.bedId" :levelId="flt.level" handleType="info" :rowData="bed_data"
        @sendBedInfo="getBedInfo"></house-state>
    </div>

    <div class="footer">
      <el-button :disabled="step >= 7 ? 'disabled' : false" type="primary" @click="handleSubmit">提交申请</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { get_live_selectBed, update_bed_name, type, getApplyStatus } from "@/api/pensionagency/goLive/goLive";
  import { query_batch_bed, get_bed_desc, by_elder_id } from "@/api/pensionagency/basicConfig/basicConfig";
  import HouseState from "@/components/house_state";
  import { arrayGroupBy, deepClone } from "@/utils/index";
  import { mapGetters } from "vuex";
  import { buliding_type, house_direction, house_bed_number } from "@/utils/enum";
  import moment from "moment";

  export default {
    name: "basicConfig_bed_state_mg",
    components: { Pagination, HouseState },
    directives: { waves, permission, elDragDialog },
    computed: {
      ...mapGetters(["orgInfo","userInfo"])
    },
    data() {
      return {
        model: "",
        step: undefined,
        first_form: {
          bedId: undefined,
          planCheckDate: undefined, // 入住日期
          bedName: null, // 选择床位
          isAllRoom: null, //是否包房
          bedFee: "", // 床位费
          processId: undefined
        },
        rules: {
          bedName: [{ required: true, message: "床位不能为空", trigger: "change" }],
          isAllRoom: [
            { required: true, message: "内容不能为空", trigger: "change" },
          ],
          planCheckDate: [{ required: true, message: "入住日期不可为空", trigger: "blur" }]
        },
        flt: {
          building: undefined,
          level: undefined,
        },
        house_bed_number: house_bed_number,
        house_bed: "",
        house: "",
        building_list: [],
        level_list: [],
        house_direction: house_direction,
        table_loading: false,
        bed_data: [],
        // id_list: [],
      };
    },

    methods: {
      handleSubmit() {
        let self = this;
        self.$refs["form"].validate((vaild) => {
          if (vaild) {
            delete self.first_form.isCloseWindow
            delete self.first_form.isNull
            delete self.first_form.elderInfo
            update_bed_name({
              ...self.first_form,
              contractType: "CM",
              elderId: Number(self.elderId),
              step: 1,
              type: "P",
            }).then((res) => {
              if(!this.step) {
                this.$router.push("/workbench/workbench/goLive/list")
              }
              this.handleChange_level(this.flt.level)
              self.$notify({
                title: "提示",
                message: "上传成功",
                type: "success",
              });
            });
          }
        });
      },
      async handleChange_building(val) {
        this.level_list = await this.getData({ type: "楼层", superId: val });
        this.flt.level = undefined;
        this.bed_data = [];
      },
      async handleChange_level(val) {
        this.table_loading = true;
        let self = this;
        get_bed_desc({ floorId: val }).then((res) => {
          let arr = res ?? [];
          res = res.sort((a, b) => a.xzhou - b.xzhou);
          let bed_data = arrayGroupBy(res ?? [], "yzhou");
          let key = 0;
          for (let i in bed_data) {
            key = parseInt(i) + 1;
            bed_data[i] = bed_data[i].reduce((cur, pre) => {
              // let num = pre.xzhou - (cur?.xzhou ?? 0) - 1;
              let num = pre.xzhou - (cur[cur.length - 1]?.xzhou ?? 0) - 1
              let a = Array.from({ length: num }, () => "空床位");
              cur = [...cur, ...a, ...[pre]];
              return cur;
            }, []);
          }
          bed_data.length = key;
          bed_data = Array.from(bed_data, (item) => {
            return item ?? ["空床位"];
          });

          bed_data = Object.values(bed_data);
          self.bed_data = bed_data;
          self.table_loading = false;
        });
      },

      async getData({ type, superId }) {
        let params =
          type == "楼宇"
            ? {
              type: "s",
              centerId: this.orgInfo?.id??this.userInfo?.centerId,
            }
            : {
              type: "f",
              superId,
              centerId: this.orgInfo?.id??this.userInfo?.centerId,
            };
        return await query_batch_bed(params).then((res) => {
          return res ?? [];
        });
      },
      async getBuilding_list() {
        let data = await this.getData({
          type: "楼宇",
        });
        data = data ?? [];
        this.building_list = data;
      },
      getDetail() {
        by_elder_id({ elderId: this.elderId }).then(async res => {
          let self = this;
          this.first_form = res;
          this.first_form.bedFee = res.fee;
          let data = await this.getData({
            type: "楼宇",
          });
          data = data ?? [];
          this.building_list = data;
          if (res.buildId) {
            this.flt.building = res.buildId
            this.level_list = await this.getData({ type: "楼层", superId: res.buildId });
            this.flt.level = res.floorId
            this.handleChange_level(this.flt.level)
          }
        })
      },
      // getType() {
      //   type().then(res => {
      //     this.id_list = res;
      //   });
      // },
      getBedInfo({ houseInfo, bedInfo }) {
        let self = this
        if (houseInfo.isAllRoom == "1") {
          self.$alert('此房间已被包房！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `已取消`
              });
            }
          });
        }
        self.first_form.bedName = bedInfo.bedName;
        self.first_form.bedFee = bedInfo.bedFee;
        self.first_form.bedId = bedInfo.bedId;
        self.first_form.isAllRoom = "0";
      },
    },
    mounted() {
      const { id, step } = this.$route.params;
      this.step = step
      if (!isNaN(Number(id))) {
        this.elderId = id;
        this.getDetail();
        getApplyStatus({
          "elderId": id
        }).then(res => {
          this.first_form.processId = res.id
        })
        // this.getType();
      }
    }
  };
</script>
<style lang='scss' scoped>
</style>
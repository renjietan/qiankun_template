<!-- 
 * @description: 请假申请
 * @fileName: holiday_apply.vue 
 * @author: 谭人杰 
 * @date: 2021-06-24 21:20:49
 * @后台人员:  
!-->
<template>
  <div class="container">
    <basic-info-table :userInfo="$route.query.info"></basic-info-table>
    <!-- 请假申请 开始 @date:2021-06-24 23:17:10 @author: 谭人杰 !-->
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">请假申请</div>
      <el-form :disabled="type != 'add' && type != 'edit'" :inline="true" ref="form" :model="form_data" :rules="rules"
        hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="请假开始时间" prop="startTime">
              <el-date-picker v-model="form_data.startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add2" label="请假结束时间" prop="endTime">
              <el-date-picker v-model="form_data.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="床位费（请假当日）" prop="bedFee">
              <el-select v-model="form_data.bedFee" placeholder="请选择">
                <el-option label="退费" value="1"></el-option>
                <el-option label="不退费" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="护理费-套餐（请假当日）" prop="serviceFee">
              <el-select v-model="form_data.serviceFee" placeholder="请选择">
                <el-option label="退费" value="1"></el-option>
                <el-option label="不退费" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="营养搭配餐费（请假当日）" prop="cateringFee">
              <el-select v-model="form_data.cateringFee" placeholder="请选择">
                <el-option label="退费" value="1"></el-option>
                <el-option label="不退费" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="基础护理费（请假当日）" prop="baseFee">
              <el-select v-model="form_data.baseFee" placeholder="请选择">
                <el-option label="退费" value="1"></el-option>
                <el-option label="不退费" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="请假事由" prop="reason">
              <el-input clearable v-model="form_data.reason" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="家属陪同" prop="contactId">
              <el-select v-model="form_data.contactId" clearable placeholder="请选择">
                <el-option v-for="item in list_family" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add" label="联系电话" prop="contactPhone">
              <el-input v-enter-float clearable v-model="form_data.contactPhone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_add2" label="院内陪同" prop="empName">
              <el-input clearable v-model="form_data.empName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col>
          <div style="line-height: 45px">备注</div>
          <el-input v-model="form_data.rsv" placeholder="请输入" type="textarea" clearable></el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 请假申请 结束 @date:2021-06-24 23:17:23 @author: 谭人杰 !-->

    <!-- 销假申请 开始 @date:2021-06-24 23:17:10 @author: 谭人杰 !-->
    <div class="container_card" v-if="type != 'add' && type != 'edit'">
      <div class="title" style="margin-bottom: 20px">销假申请</div>
      <el-form :disabled="type == 'info'" :inline="true" ref="form2" :model="form_data2" :rules="rules_off"
        hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="实际返院日" prop="actualBackDate">
              <el-date-picker v-model="form_data2.actualBackDate" type="date" placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="销毁登记人" prop="name">
              <el-input clearable v-model="form_data2.name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="床位费（销假当日）" prop="bedFee">
              <el-select v-model="form_data2.bedFee" placeholder="请选择">
                <el-option label="退费" value="1"></el-option>
                <el-option label="不退费" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="护理费-套餐（销假当日）" prop="serviceFee">
              <el-select v-model="form_data2.serviceFee" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="营养搭配餐费（销假当日）" prop="cateringFee">
              <el-select v-model="form_data2.cateringFee" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :class="isReadonly_info" label="基础护理费（销假当日）" prop="baseFee">
              <el-select v-model="form_data2.baseFee" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :class="isReadonly_info2" label="备注" prop="rsv">
              <el-input v-model="form_data2.rsv" placeholder="请输入" type="textarea" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 销假申请 结束 @date:2021-06-24 23:17:23 @author: 谭人杰 !-->

    <!-- 费用详情 开始 @date:2021-06-24 23:17:10 @author: 谭人杰 !-->
    <div class="container_card" v-if="type == 'info'">
      <div class="title" style="margin-bottom: 20px">
        <span>
          费用详情
          <span :style="{
              color: $variables.baseColor,
              fontSize: '14px',
              marginLeft: '10px',
            }">查看详情</span>
        </span>
      </div>
      <el-table class="table_data" border :show-header="false" ref="data_table" :data="table_data"
        v-loading="table_loading" stripe highlight-current-row fit>
        <el-table-column width="100" align="center" prop="label" label="标题"></el-table-column>
        <el-table-column width="100" prop="fee" label="合计"></el-table-column>
      </el-table>
    </div>
    <!-- 费用详情 结束 @date:2021-06-24 23:17:10 @author: 谭人杰 !-->

    <div class="footer" v-if="type === 'edit' || type === 'add' || type === 'goBack'">
      <el-button type="primary" @click="handlerSubmit()">提交申请</el-button>
    </div>
    <el-dialog v-el-drag-dialog :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import BasicInfoTable from "@/components/Basicinfo/table";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { isTrue } from "@/utils/enum";
  import enterFloat from "@/directive/enterFloat";
  import { getdetail, updateHoliday, manager, goBack } from "@/api/pensionagency/inLive/hoiddy";
  import { isPhone } from "@/utils/validate";
  import { Message } from "element-ui";
  import { get_live_linkMan } from "@/api/pensionagency/goLive/goLive";
  import { mapGetters } from "vuex";
  import monent from 'moment';
  export default {
    name: "inLive_holiday_apply",
    components: { Pagination, BasicInfoTable },
    directives: { waves, permission, elDragDialog, enterFloat },
    data() {
      return {
        isTrue,
        rules: {
          startTime: [
            {
              required: true,
              message: "请选择日期",
              trigger: "change",
            },
          ],
          registrant: [
            { required: true, message: "请输入姓名", trigger: "change" },
            { max: 5, message: "长度在5个字符以内", trigger: "change" },
          ],
          bedFee: [{ required: true, message: "费用不能为空" }],
          serviceFee: [{ required: true, message: "费用不能为空" }],
          cateringFee: [{ required: true, message: "费用不能为空" }],
          baseFee: [{ required: true, message: "费用不能为空" }],
          reason: [
            { required: true, message: "请输入请假理由", trigger: "change" },
          ],
          contactId: [{ required: true, message: "请选择", trigger: "change" }],
          contactPhone: [
            {
              required: true,
              validator: isPhone,
              message: "手机格式错误",
              trigger: "change",
            },
          ],
        },
        type: null,
        list_family: [],
        // 请假
        form_data: {
          id: undefined,
          elderId: null,
          startTime: null, //请假开始时间
          endTime: null, //请假结束时间
          bedFee: undefined, //床位费
          serviceFee: undefined, // 护理费
          cateringFee: undefined, // 营养搭配餐费
          baseFee: undefined, //基础护理费
          reason: "", // 请假事由
          contactId: null, //家属陪同
          contactPhone: "", //联系电话
          empName: undefined, // 院内陪同
          rsv: "", //说明
        },
        form_data2: {
          leaveId: undefined,
          actualBackDate: null, // 实际返院日,
          baseFee: "", //基础护理费
          name: "", //销毁登记人
          bedFee: "", //床位费
          serviceFee: "", // 护理费
          cateringFee: "", // 营养搭配餐费
          rersvmark: "",
        },
        rules_off: {
          actualBackDate: [
            {
              required: true,
              message: "请选择日期",
              trigger: "blur",
            },
          ],
          baseFee: [{ required: true, message: "费用不能为空" }],
          bedFee: [{ required: true, message: "费用不能为空" }],
          serviceFee: [{ required: true, message: "费用不能为空" }],
          cateringFee: [{ required: true, message: "费用不能为空" }],
        },
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
        table_loading: false,
        table_data: [],
      };
    },
    watch: {
      "form_data.contactId"(val) {
        if (!!val) {
          for (let i of this.list_family) {
            if (val === i.id) {
              this.form_data.contactPhone = i.phone;
            }
          }
        }
      },
      "form_data.startTime"(val) {
        if (!!val) {
          // let date = monent().format("YYYY-MM-DD");
          // if (monent(val).isBefore(date)) {
          //   this.$notify({
          //     title: "提示",
          //     message: "开始时间不能超过当前日期",
          //     type: "error",
          //   });
          //   this.form_data.startTime = null;
          // }
          if (monent(this.form_data.endTime).isBefore(val)) {
            this.$notify({
              title: "提示",
              message: "开始时间不能超过结束日期",
              type: "error",
            });
            this.form_data.endTime = null;
          }
        }
      },
      "form_data.endTime"(val) {
        if (!!val || val !== null) {
          // let date = monent().format("YYYY-MM-DD");
          // if (monent(val).isBefore(date)) {
          //   this.$notify({
          //     title: "提示",
          //     message: "结束时间不能超过当前日期",
          //     type: "error",
          //   });
          //   this.form_data.endTime = null;
          // }
          if (monent(val).isBefore(this.form_data.startTime)) {
            this.$notify({
              title: "提示",
              message: "开始时间不能超过结束日期",
              type: "error",
            });
            this.form_data.endTime = null;
          }
        }
      },
    },
    computed: {
      ...mapGetters(["userInfo"]),
      isReadonly_add() {
        return this.type == "add" || this.type == "edit"
          ? ["must-fill"]
          : ["readonly"];
      },
      isReadonly_add2() {
        return this.type == "add" || this.type == "edit"
          ? ["default"]
          : ["readonly"];
      },
      isReadonly_info() {
        return this.type == "info" ? ["readonly"] : ["must-fill"];
      },
      isReadonly_info2() {
        return this.type == "info" ? ["readonly"] : ["default"];
      },
    },

    methods: {
      getdetail() {
        const { elderId } = this.form_data;
        get_live_linkMan({ elderId }).then((res) => {
          if (res?.length != 0) {
            this.list_family = res;
            this.list_family.push({ name: "其他", id: 0 });
          }
        });
      },
      getInfo() {
        const { id } = this.form_data;
        getdetail({ id }).then((res) => {
          if (res != null) {
            this.form_data = res;
          }
        });
      },
      restForm2() {
        this.form_data2 = {
          leaveId: undefined,
          actualBackDate: null, // 实际返院日,
          baseFee: "", //基础护理费
          name: "", //销毁登记人
          bedFee: "", //床位费
          serviceFee: "", // 护理费
          cateringFee: "", // 营养搭配餐费
          rersvmark: "",
        };
        this.$nextTick(() => {
          this.$refs["form2"].clearValidate();
        });
      },
      handlerSubmit() {
        const { elderId } = this.form_data;
        switch (this.type) {
          case "add":
            this.$refs["form"].validate((valid) => {
              if (valid) {
                updateHoliday({
                  ...this.form_data,
                  elderId: parseInt(elderId),
                }).then((res) => {
                  this.$notify({
                    title: "提示",
                    message: "申请成功",
                    type: "success",
                  });
                  this.$nextTick(() => {
                    this.$refs["form"].resetFields();
                  });
                  this.$router.go(-1);
                });
              }
            });
            break;
          case "edit":
            manager({
              ...this.form_data,
              elderId: parseInt(elderId),
              operateType: "M",
            }).then((res) => {
              this.$notify({
                title: "提示",
                message: "修改成功",
                type: "success",
              });
              this.$nextTick(() => {
                this.$refs["form"].resetFields();
              });
              this.$router.go(-1);
            });
            break;
          case "goBack":
            this.$refs["form2"].validate((valid) => {
              if (valid) {
                goBack(this.form_data2).then((res) => {
                  this.$notify({
                    title: "提示",
                    message: "销假成功",
                    type: "success",
                  });
                  this.restForm2();
                  this.$router.go(-1);
                });
              }
            });
            break;
        }
      },
    },
    mounted() {
      const { id } = this.$route.params;
      const { flag, record } = this.$route.query;
      this.form_data.elderId = id;
      this.type = flag;
      this.getdetail();
      if (
        this.type === "detail" ||
        this.type === "edit" ||
        this.type === "goBack"
      ) {
        this.form_data.id = record;
        this.form_data2.name = this.userInfo.empNm;
        this.form_data2.leaveId = Number(record);
        this.getInfo();
      } else if (this.type === "add") {
        this.form_data = {
          id: undefined,
          elderId: id,
          startTime: null, //请假开始时间
          endTime: null, //请假结束时间
          bedFee: undefined, //床位费
          serviceFee: undefined, // 护理费
          cateringFee: undefined, // 营养搭配餐费
          baseFee: undefined, //基础护理费
          reason: "", // 请假事由
          contactId: null, //家属陪同
          contactPhone: "", //联系电话
          empName: undefined, // 院内陪同
          rsv: "", //说明
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      }
    },
    activated() {
      const { id } = this.$route.params;
      const { flag, record } = this.$route.query;
      this.form_data.elderId = id;
      this.type = flag;
      this.getdetail();
      if (
        this.type === "detail" ||
        this.type === "edit" ||
        this.type === "goBack"
      ) {
        this.form_data = {
          id: undefined,
          elderId: id,
          startTime: null, //请假开始时间
          endTime: null, //请假结束时间
          bedFee: undefined, //床位费
          serviceFee: undefined, // 护理费
          cateringFee: undefined, // 营养搭配餐费
          baseFee: undefined, //基础护理费
          reason: "", // 请假事由
          contactId: null, //家属陪同
          contactPhone: "", //联系电话
          empName: undefined, // 院内陪同
          rsv: "", //说明
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
        this.form_data.id = record;
        this.form_data2.name = this.userInfo.empNm;
        this.form_data2.leaveId = Number(record);
        this.getInfo();
      } else if (this.type === "add") {

      } else if (this.type === "goBack") {
        this.form_data = {
          id: undefined,
          elderId: id,
          startTime: null, //请假开始时间
          endTime: null, //请假结束时间
          bedFee: undefined, //床位费
          serviceFee: undefined, // 护理费
          cateringFee: undefined, // 营养搭配餐费
          baseFee: undefined, //基础护理费
          reason: "", // 请假事由
          contactId: null, //家属陪同
          contactPhone: "", //联系电话
          empName: undefined, // 院内陪同
          rsv: "", //说明
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
        this.form_data2.name = this.userInfo.empNm;
      }
    },
  };
</script>
<style lang='scss' scoped>
  /deep/ .el-textarea__inner {
    height: 150px;
  }
</style>
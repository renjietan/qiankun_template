<!-- 
 * @description: 在住办理一览
 * @fileName: inLive_browse.vue 
 * @author: 谭人杰 
 * @date: 2021-05-31 11:50:02
 * @后台人员:  
!-->
<template>
  <div class="container">
    <!-- 过滤栏开始 @date:2021-05-26 18:13:18 @author: 谭人杰 !-->
    <div class="container_card">
      <el-form :inline="true">
        <el-row>
          <el-col :span="21">
            <el-row>
              <el-col :span="5">
                <el-form-item class="filter" label="姓名：">
                  <el-input placeholder="请输入" v-model="flt.elderName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item class="filter" label="床位：">
                  <el-input placeholder="请输入" v-model="flt.bedName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item class="filter" label="服务等级：">
                  <el-select clearable v-model="flt.levelId" placeholder="请选择">
                    <el-option v-for="item in server_level_options" :key="item.id" :label="item.levelName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item class="filter" label="状态：">
                  <el-select clearable v-model="flt.liveStatus" placeholder="请选择">
                    <el-option v-for="item in status_options" :key="item.type" :label="item.desc" :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <div style="display: inline-block; margin-left: 10px">
              <el-button type="primary" @click="getList">查询</el-button>
              <el-button @click="reset_flt">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container_card">
      <div class="title" style="margin-bottom: 20px">
        <span>在住列表</span>
        <div style="display: inline-block">
          <el-button type="primary" @click="$router.push('/workbench/basicConfig/bed_state_mg')">
            <span class="btn_pic">
              <img class="pic" src="~@/assets/images/AJFR/chuangwei.png" />床态图一览
            </span>
          </el-button>
          <el-button type="success" icon="el-icon-upload2" disabled>数据导出</el-button>
        </div>
      </div>
      <div class="action_box">
        <el-table class="table_data" style="margin-right: 160px;" border :span-method="arraySpanMethod" ref="table_data"
          @current-change="handleCurrentChange" :data="table_data" v-loading="table_loading" stripe
          highlight-current-row fit>
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span :style="{ color: $variables.baseColor }">{{
                formatZero(scope.$index + 1, 2)
                }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="avator" label="头像">
            <template slot-scope="scope">
              <el-image style="width: 40px; height: 40px; border-radius: 50%" :src="scope.row.headUrl" fit="fit">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="elderName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="bedName" label="床位"></el-table-column>
          <el-table-column align="center" label="性别">
            <template slot-scope="scope">
              {{ scope.row.sex == 0 ? "男" : "女" }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="age" label="年龄"></el-table-column>

          <el-table-column align="center" prop="levelName" label="服务等级"></el-table-column>
          <el-table-column align="center" prop="checkInDate" label="入住日期"></el-table-column>
          <el-table-column align="center" prop="contractTypeDesc" label="合同类型"></el-table-column>
          <el-table-column align="center" prop="fileNum" show-overflow-tooltip label="档案号"></el-table-column>
          <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
          <el-table-column align="center" prop="label" label="标签"></el-table-column>
          <!-- <el-table-column align="center" width="160" label="操作" class="lastColumn">
            <template slot-scope="scope">
              <div>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '个人档案')" plain>个人档案
                </el-button>
                <el-button
                  :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'B') ? false : 'disabled' "
                  type="primary" @click.stop="handleNav(scope.row, '床位调整')" plain>床位调整
                </el-button>
                <el-button
                  :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'S') ? false : 'disabled' "
                  type="primary" @click.stop="handleNav(scope.row, '服务等级调整')" plain>服务等级调整
                </el-button>
                <el-button
                  :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'P') ? false : 'disabled' "
                  type="primary" @click.stop="handleNav(scope.row, '付款计划调整')" plain>付款计划调整
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '请假申请')" plain>请假申请
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '添加长者日志')" plain>添加长者日志
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '添加不良事件')" plain>添加不良事件
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '特殊膳食登记')" plain>特殊膳食登记
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '设置标签')" plain>设置标签
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '添加增值服务')" plain>添加增值服务
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '续签合同')" plain>续签合同
                </el-button>
                <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
                  @click.stop="handleNav(scope.row, '申请退签')" plain>申请退签
                </el-button>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
        <div class="btn_group">
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '个人档案')" plain>个人档案
          </el-button>
          <el-button
            :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'B') ? false : 'disabled' "
            type="primary" @click.stop="handleNav(curtableItem_select, '床位调整')" plain>床位调整
          </el-button>
          <el-button
            :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'S') ? false : 'disabled' "
            type="primary" @click.stop="handleNav(curtableItem_select, '服务等级调整')" plain>服务等级调整
          </el-button>
          <el-button
            :disabled="curtableItem_select != null && (curtableItem_select.chargeType == null  || curtableItem_select.chargeType == 'P') ? false : 'disabled' "
            type="primary" @click.stop="handleNav(curtableItem_select, '付款计划调整')" plain>付款计划调整
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '请假申请')" plain>请假申请
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '添加长者日志')" plain>添加长者日志
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '添加不良事件')" plain>添加不良事件
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '特殊膳食登记')" plain>特殊膳食登记
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '设置标签')" plain>设置标签
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '添加增值服务')" plain>添加增值服务
          </el-button>
          <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '续签合同')" plain>续签合同
          </el-button>
          <!-- <el-button :disabled="curtableItem_select != null ? false : 'disabled'" type="primary"
            @click.stop="handleNav(curtableItem_select, '申请退签')" plain>申请退签
          </el-button> -->
        </div>
      </div>

      <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
        @pagination="getList" />
    </div>
    <!-- 过滤栏结束 @date:2021-05-26 18:13:33 @author: 谭人杰 !-->

    <!-- 添加长者日志 @date:2021-06-26 15:14:23 @author: 谭人杰 !-->
    <el-dialog v-el-drag-dialog class="el-dialog-2" :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form v-if="dialog_cof.title == '添加长者日志'" :inline="true" ref="form_oldman_log" :model="form_oldman_log"
        :rules="rules_log" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="elderName">
              <el-input readonly clearable v-model="form_oldman_log.elderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="日期" prop="date">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form_oldman_log.date" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="时间" prop="time">
              <el-time-select :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                }" v-model="form_oldman_log.time" placeholder="请选择"></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="日志类型" prop="type">
              <el-select v-model="form_oldman_log.type" clearable placeholder="请选择">
                <el-option v-for="item in log_type_list" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col>
            <el-form-item class="default" label="照片" prop="picUrl">
              <el-upload class="avatar-uploader" action
                :show-file-list="false" :http-request="UploadPic">
                <img v-if="form_oldman_log.picUrl" :src="form_oldman_log.picUrl" class="avatar" />
                <i style="height: 126px; width: 160px; line-height: 120px" v-else
                  class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">请上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="日志内容" prop="content">
              <el-input type="textarea" clearable v-model="form_oldman_log.content" placeholder="请输入">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="dialog_cof.title == '添加增值服务'" :inline="true" :rules="rules_addvalue" ref="form_addvalue"
        :model="form_addvalue" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="elderName">
              <el-input readonly v-model="form_addvalue.elderName" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务类型" prop="avType">
              <el-select v-model="form_addvalue.avType" clearable placeholder="请选择">
                <el-option v-for="item in server_type_options" :key="item.id" :label="item.avType" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务名称" prop="avId">
              <el-select v-model="form_addvalue.avId" clearable placeholder="请选择">
                <el-option v-for="item in server_name_options" :key="item.id" :label="item.avName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务发生日" prop="serviceDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form_addvalue.serviceDate" type="date"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="数量" prop="size">
              <el-input type="number" v-model="form_addvalue.size" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="单价">
              <el-input disabled v-model="form_addvalue.unitPrice" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="收费标准">
              <el-select disabled v-model="form_addvalue.rates" clearable placeholder="请选择">
                <el-option v-for="item in addvalue_fee_type_options" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="readonly" label="备注">
              <el-input type="textarea" v-model="form_addvalue.rsv" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="dialog_cof.title == '特殊膳食登记'" :inline="true" ref="form" :model="form_foods" hide-required-asterisk
        status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者姓名" prop="elderName">
              <el-input readonly clearable v-model="form_foods.elderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="疾病" prop="disease">
              <el-input clearable v-model="form_foods.disease"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="default" label="开始时间" prop="startTime">
              <el-date-picker v-model="form_foods.startTime" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="default" label="结束时间" prop="endTime">
              <el-date-picker v-model="form_foods.endTime" type="date" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="固定特殊膳食" prop="fixedFood">
              <el-input clearable v-model="form_foods.fixedFood"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊早餐饮食" prop="breakfast">
              <el-input clearable v-model="form_foods.breakfast"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊午餐饮食" prop="lunch">
              <el-input clearable v-model="form_foods.lunch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="default" label="特殊晚餐饮食" prop="dinner">
              <el-input clearable v-model="form_foods.dinner"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="dialog_cof.title == '设置标签'" :inline="true" ref="form_label" :model="form_label"
        hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="elderName">
              <el-input disabled clearable v-model="form_label.elderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="readonly" label="长者标签" prop="label">
              <el-input clearable v-model="form_label.label"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { formatZero, parseDate } from "@/filters";
  import {
    getServeLevel,
    getStatus,
    getinLeveList,
  } from "@/api/pensionagency/inLive/inLeve_temp";
  import { service_level_config } from "@/api/pensionagency/goLive/goLive";
  import { add_elderlog } from "@/api/pensionagency/inLive/elder_log.js";
  import { log_type_list ,uploadType} from "@/utils/enum";
  import { upload_pic } from "@/api/pensionagency/administrative/administrative";
  import { all_av_type, add_av_service, get_av_byType } from "@/api/pensionagency/basicConfig/basicConfig";
  import { setLabel } from "@/api/pensionagency/inLive";
  import {
    get_specali_foods_byId,
    updateSpecailInfo,
    addSpecailInfo,
  } from "@/api/pensionagency/inLive/specail";
  import { addValueInfo } from "@/api/pensionagency/inLive/addValue";
  import { disease_list, addvalue_fee_type } from "@/utils/enum";
  import { parseTime } from "@/utils";

  export default {
    name: "inLive_handle_list",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      const _this = this;
      return {
        table_loading: false,
        log_type_list,

        table_total: 50,
        table_data: [],
        server_name_options: [],
        server_type_options: [],
        server_level_options: [],
        status_options: [],
        addvalue_fee_type_options: addvalue_fee_type,
        curtableItem_select: null,
        disease_list,
        form_loading: false,
        rules_addvalue: {
          avType: [{ required: true, message: "不可为空", trigger: "change" }],
          avId: [{ required: true, message: "不可为空", trigger: "change" }],
          serviceDate: [
            { required: true, message: "不可为空", trigger: "change" },
          ],
          size: [{ required: true, message: "不可为空", trigger: "change" }],
        },
        rules_log: {
          date: [{ required: true, message: "不可为空", trigger: "change" }],
          time: [{ required: true, message: "不可为空", trigger: "change" }],
          type: [{ required: true, message: "不可为空", trigger: "change" }],
        },
        flt: {
          pageNum: 1,
          pageSize: 10,
          name: undefined,
          bed: undefined,
          server_level: undefined,
          status: undefined,
        },
        form_oldman_log: {
          id: undefined,
          elderName: "", //长者姓名
          date: null, //日期
          time: null, //时间
          type: undefined, //日志类型
          picUrl: "", //图片地址
          content: "", //内容
          elderId: undefined,
        },
        form_addvalue: {
          elderId: undefined, //老人ID
          elderName: "", //老人姓名
          avType: undefined, //增值服务类型
          avId: undefined, //增值服务名称
          serviceDate: null, //服务发生日期
          size: 0, //数量
          unitPrice: 0, //单价
          rates: undefined, //收费标准
          rsv: "", //备注
        },
        form_foods: {
          id: undefined, //长者ID
          elderName: "", //长者姓名
          disease: undefined, //疾病
          startTime: null, //开始时间
          endTime: null, //结束时间
          fixedFood: "", //固定膳食
          breakfast: "", //特殊早餐饮食
          lunch: "", //中餐饮食
          dinner: "", //晚餐饮食
        },
        form_label: {
          id: undefined,
          elderName: "", //长者姓名
          label: "", //标签
        },
        dialog_cof: {
          visible: false,
          title: "",
          escape: false,
          destroy: true,
          modal: false,
        },
      };
    },
    watch: {
      "form_addvalue.avType": function (n) {
        this.form_addvalue.unitPrice = 0;
        this.form_addvalue.rates = undefined;
        this.form_addvalue.avId = undefined;
        this.server_name_options = [];
        get_av_byType({
          typeId: n,
        }).then((res) => {
          this.server_name_options = res;
        });
      },
      "form_addvalue.avId": function (n) {
        let r = this.server_name_options.filter((item) => item.id == n)[0];
        this.form_addvalue.unitPrice = r?.unitPrice ?? 0;
        this.form_addvalue.rates = r?.feeType ?? undefined;
      },

    },
    methods: {
      formatZero,
      parseDate,
      handleNav(data, type) {
        this.form_loading = false;
        this.reset_form();
        if (this.curtableItem_select == null) {
          this.$message({
            type: "warning",
            message: "请先勾选",
          });
          return false;
        }
        switch (type) {
          case "设置标签":
            this.form_label.id = this.curtableItem_select.id;
            this.form_label.elderName = this.curtableItem_select.elderName;
            this.form_label.label = this.curtableItem_select.label;
            this.dialog_cof.title = "设置标签";
            this.dialog_cof.visible = true;
            break;
          case "个人档案":
            this.$router.push({
              path: `/workbench/workbench/inLive/handle/form/case_file/${this.curtableItem_select.elderId}`,
              query: {
                info: this.curtableItem_select,
                elderName: this.curtableItem_select.elderName,
              },
            });
            break;
          case "床位调整":
            this.$router.push({
              path: `/workbench/workbench/inLive/bunk_resize/form/apply/${this.curtableItem_select.elderId}`,
              query: { nav: 0 },
            });
            break;
          case "服务等级调整":
            this.$router.push({
              path: `/workbench/workbench/inLive/server_level_resize/form/apply/${this.curtableItem_select.elderId}`,
              query: { nav: 0 }
            });
            break;
          case "付款计划调整":

            this.$router.push(
              {
                path: `/workbench/workbench/inLive/payment_plan/info/${this.curtableItem_select.elderId}`,
                query: { nav: 0 }
              }
            );
            break;
          case "续签合同":
            this.$router.push({
              path: `/workbench/workbench/inLive/contract/renew/${this.curtableItem_select.elderId}`,
              query: {
                id: this.curtableItem_select.contractId,
                elderId: this.curtableItem_select.elderId,
              },
            });
            break;
          case "请假申请":
            const type = {
              I: {
                flag: "add",
                record: undefined,
              },
              F: {
                flag: "detail",
                record: this.curtableItem_select.levelId,
              },
              L: {
                flag: "detail",
                record: this.curtableItem_select.levelId,
              },
            };
            this.$router.push({
              path: `/workbench/workbench/inLive/holiday/apply/${this.curtableItem_select.elderId}`,
              query: type[data.liveStatus],
            });

            break;
          case "申请退签":
            this.$router.push(
              `/workbench/workbench/inLive/handle/form/apply_back/${this.curtableItem_select.elderId}`
            );
            break;
          case "添加增值服务":
            this.form_addvalue.elderId = this.curtableItem_select.elderId;
            this.form_addvalue.elderName = this.curtableItem_select.elderName;
            this.dialog_cof.visible = true;
            this.dialog_cof.title = "添加增值服务";
            break;
          case "特殊膳食登记":
            var self = this
            self.dialog_cof.visible = true;
            this.form_loading = true;
            self.dialog_cof.title = "特殊膳食登记";
            let { elderId } = this.curtableItem_select;
            get_specali_foods_byId({ elderId }).then((res) => {
              if (res != null) {
                self.form_foods = res
              }
              self.form_foods.elderName = self.curtableItem_select.elderName;
              self.form_loading = false;
            });
            break;
          case "添加不良事件":
            this.$router.push(
              `/workbench/workbench/inLive/handle/form/add_not_good_event/${this.curtableItem_select.elderId}`
            );
            break;
          case "添加长者日志":
            this.dialog_cof.visible = true;
            this.dialog_cof.title = '添加长者日志';
            this.form_oldman_log.elderId = this.curtableItem_select.elderId;
            this.form_oldman_log.elderName = this.curtableItem_select.elderName;
            break;
          default:
            break;
        }
      },
      handleCurrentChange(row, column, event) {
        this.curtableItem_select = row;
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 12) {
          if (rowIndex == 0) {
            return [this.flt.pageSize, 1];
          } else {
            return [0, 0];
          }
        }
        return [1, 1];
      },
      handleSubmit() {
        let self = this;
        if (self.dialog_cof.title == "特殊膳食登记") {
          let form_data = { ...self.form_foods };
          form_data.startTime = parseTime(form_data.startTime, "{y}-{m}-{d}");
          form_data.endTime = parseTime(form_data.startTime, "{y}-{m}-{d}");
          if (form_data.id) {
            updateSpecailInfo(form_data).then((res) => {
              self.$message({
                message: "编辑成功",
                type: "success",
              });
              self.dialog_cof.visible = false;
            });
          } else {
            let { elderId } = self.curtableItem_select
            addSpecailInfo({ ...form_data, elderId }).then(res => {
              self.$message({
                message: "编辑成功",
                type: "success",
              });
              self.dialog_cof.visible = false;
            })
          }

        } else if (self.dialog_cof.title == "添加长者日志") {
          self.$refs.form_oldman_log.validate((valid) => {
            if (valid) {
              add_elderlog(self.form_oldman_log).then((res) => {
                self.$notify({
                  title: "提示",
                  type: "success",
                  message: "操作成功",
                });
                self.dialog_cof.visible = false;
              });
            }
          });
        } else if (self.dialog_cof.title == "添加增值服务") {
          self.$refs.form_addvalue.validate((valid) => {
            if (valid) {
              let totalFee =
                self.form_addvalue.size * self.form_addvalue.unitPrice;
              addValueInfo({ ...self.form_addvalue, totalFee }).then((res) => {
                self.dialog_cof.visible = false;
                self.$notify({
                  title: "提示",
                  message: "操作成功",
                  type: "success",
                });
              });
            }
          });
        } else if (self.dialog_cof.title == "设置标签") {
          self.$refs.form_label.validate((valid) => {
            if (valid) {
              setLabel(self.form_label).then((res) => {
                self.dialog_cof.visible = false;
                self.getList();
                self.$notify({
                  title: "提示",
                  message: "操作成功",
                  type: "success",
                });
              });
            }
          });
        }
      },
       //上传图片
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["长者日志"]);
        upload_pic(formData).then((res) => {
          self.form_oldman_log.picUrl = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      // 获取查询多选框选项列表
      getOption() {
        Promise.all([service_level_config(), getStatus(), all_av_type()]).then(
          (res) => {
            this.server_level_options = res[0];
            this.status_options = res[1];
            this.server_type_options = res[2];
          }
        );
      },
      
      getList() {
        this.table_loading = true;
        this.curtableItem_select = null;
        getinLeveList(this.flt).then((res) => {
          this.table_data = res.result
          this.$refs.table_data.setCurrentRow(undefined);
          this.table_loading = false;
          this.table_total = res.totalCount;
        });
      },
      reset_flt() {
        this.flt = {
          pageNum: 1,
          pageSize: 10,
          elderName: "",
          bedName: undefined,
          levelId: undefined,
          liveStatus: undefined,
        };
        this.getList();
      },
      reset_form() {
        this.form_foods = {
          id: undefined, //长者ID
          elderName: "", //长者姓名
          disease: undefined, //疾病
          startTime: null, //开始时间
          endTime: null, //结束时间
          fixedFood: "", //固定膳食
          breakfast: "", //特殊早餐饮食
          lunch: "", //中餐饮食
          dinner: "", //晚餐饮食
        };
        this.form_oldman_log = {
          id: undefined,
          elderName: "", //长者姓名
          date: null, //日期
          time: null, //时间
          type: undefined, //日志类型
          picUrl: "", //图片地址
          content: "", //内容
          elderId: undefined,
        };
        this.form_addvalue = {
          elderId: undefined, //老人ID
          elderName: "", //老人姓名
          avType: undefined, //增值服务类型
          avId: undefined, //增值服务名称
          serviceDate: null, //服务发生日期
          size: 0, //数量
          unitPrice: 0, //单价
          rates: undefined, //收费标准
          rsv: "", //备注
        };
        this.form_label = {
          id: undefined,
          elderName: "", //长者姓名
          label: "", //标签
        };
      },
    },
    mounted() {
      this.getOption();
      this.getList();
    },
  };
</script>
<style lang="scss" scoped>
  @import "../../../../styles/variables.scss";

  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -1.2px;
  }

  .action_box {
    display: flex;
    justify-content: space-between;

    .btn_group {
      display: flex;
      flex-direction: column;
      position: fixed;
      align-items: center;
      right: 50px;
      padding: 15px;
      border: 1px solid $baseColor;

      /deep/ .el-button {
        margin-bottom: 16px;
        text-align: left;
        width: 100%;
        margin-left: 0
      }
    }
  }

  /* .btn_group {
    margin-left: -8px;

    .margin-bottom {
      width: 112px;
      height: 32px;
      margin-bottom: 15px;
      text-align: left;

      &:first-child {
        margin-left: 10px;
      }
    }
  } */

  .table_data /deep/ .el-table__body tr.current-row>td:nth-child(13) {
    background-color: white !important;
  }

  .table_data /deep/ .el-table__body tr>td:nth-child(13) {
    background-color: white !important;
    border-left: 1px solid #dfe6ec !important;
  }
</style>
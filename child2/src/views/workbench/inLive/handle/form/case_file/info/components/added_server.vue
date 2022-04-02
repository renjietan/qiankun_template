<!-- 
 * @description: 增值服务
 * @fileName: added_server.vue 
 * @author: 谭人杰 
 * @date: 2021-06-22 22:38:09
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true">
      <el-row>
        <el-col :span="4">
          <el-form-item label="日期：">
            <el-date-picker @change="getList()" type="date" value-format="yyyy-MM-dd" v-model="flt.serviceDate"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="text-align: right">
          <el-button type="primary" icon="el-icon-plus" @click="handleDialog('', '新增')">新增增值服务</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span :style="{ color: $variables.baseColor }">{{
            formatZero(scope.$index + 1, 2)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" prop="avServiceName" label="服务名称"></el-table-column>
      <el-table-column width="120" align="center" prop="avServiceTypeName" label="服务类型"></el-table-column>
      <el-table-column width="120" align="center" prop="serviceDate" label="服务发生日"></el-table-column>
      <el-table-column align="center" prop="unitPrice" label="单价"></el-table-column>
      <el-table-column align="center" prop="feeType" label="收费标准">
        <template slot-scope="scope">
          <div>
            {{ scope.row.feeType }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="size" label="数量"></el-table-column>
      <el-table-column align="center" prop="totalFee" label="合计"></el-table-column>
      <el-table-column align="center" prop="rsv" label="说明"></el-table-column>
      <el-table-column align="center" prop="payStatus" label="支付状态"></el-table-column>
      <el-table-column align="center" prop="operator" label="登记人"></el-table-column>
      <el-table-column width="120" align="center" prop="operateDateDesc" label="登记日"></el-table-column>
      <el-table-column align="center" width="200" fixed="right" label="操作" class="lastColumn">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDialog(scope.row, '编辑')">修改</el-link>
          <el-link type="danger" :underline="false" @click="handleDel(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-el-drag-dialog class="el-dialog-2" :visible.sync="dialog_cof.visible" :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy" :close-on-click-modal="dialog_cof.modal">
      <el-form :inline="true" :rules="rules" ref="form" :model="form_addvalue" hide-required-asterisk status-icon>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item class="readonly" label="长者" prop="elderName">
              <el-input readonly v-model="form_addvalue.elderName" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col></el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务类型" prop="avType">
              <el-select @change="handleChange_serverType" v-model="form_addvalue.avType" clearable placeholder="请选择">
                <el-option v-for="item in server_type_options" :key="item.id" :label="item.avType" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="must-fill" label="服务名称" prop="avId">
              <el-select @change="handleChange_serverName" v-model="form_addvalue.avId" clearable placeholder="请选择">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button v-loading="form_loading" type="primary" @click="handleSubmit">确 认</el-button>
      </div>
    </el-dialog>
    <pagination v-show="table_total > 0" :total="table_total" :page.sync="flt.pageNum" :limit.sync="flt.pageSize"
      @pagination="getList" />
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { formatZero } from "@/filters";
  import { all_av_type, add_av_service, get_av_byType } from '@/api/pensionagency/basicConfig/basicConfig';
  import { addvalue_fee_type } from '@/utils/enum';
  import { addValueInfo, get_addValue_list_byId, set_or_del_addValue } from '@/api/pensionagency/inLive/addValue';

  import { } from "@/utils/validate";
  export default {
    name: "added_server",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        table_data: [],
        table_loading: false,
        table_total: 0,
        flt: {
          pageNum: 1,
          pageSize: 10,
          serviceDate: null,
          elderId: undefined
        },
        addvalue_fee_type_options: addvalue_fee_type,
        server_name_options: [],
        server_type_options: [],
        form_addvalue: {
          id: undefined,
          elderId: undefined, //老人ID
          elderName: "", //老人姓名
          avType: undefined, //增值服务类型
          avId: undefined, //增值服务名称
          serviceDate: null, //服务发生日期
          size: 0, //数量
          unitPrice: 0,//单价
          rates: undefined, //收费标准
          rsv: "" //备注
        },
        form_loading: false,
        dialog_cof: {
          visible: false,
          title: "",
          escape: false,
          destroy: true,
          modal: false,
        },
        rules: {
          avType: [{ required: true, message: "不可为空", trigger: "change" }],
          avId: [{ required: true, message: "不可为空", trigger: "change" }],
          serviceDate: [{ required: true, message: "不可为空", trigger: "change" }],
          size: [{ required: true, message: "不可为空", trigger: "change" }],
        },
      };
    },

    methods: {
      formatZero,
      handleChange_serverName(n) {
        let r = this.server_name_options.filter(item => item.id == n)[0]
        this.form_addvalue.unitPrice = r?.unitPrice ?? 0
        this.form_addvalue.rates = r?.feeType ?? undefined
      },
      handleChange_serverType(n) {
        this.form_addvalue.unitPrice = 0
        this.form_addvalue.rates = undefined
        this.form_addvalue.avId = undefined
        this.server_name_options = []
        get_av_byType({
          typeId: n
        }).then(res => {
          this.server_name_options = res
        })
      },
      getList() {
        this.table_loading = true
        get_addValue_list_byId(this.flt).then(res => {
          this.flt.pageNum = res.pageNum
          this.flt.pageSize = res.pageSize
          this.table_total = res.totalCount
          this.table_data = res.result ?? []
          this.table_loading = false
        })
        // this.table_loading = true;
        // servesList(this.flt).then((res) => {
        //   this.table_data = res.list;
        //   this.table_total = res.total;
        //   this.table_loading = false;
        // });
      },
      handleDialog(data, type) {
        this.reset()
        this.dialog_cof.title = type
        this.dialog_cof.visible = true
        if (type == "编辑") {
          this.form_addvalue.avType = data.avServiceType
          this.form_addvalue.serviceDate = data.serviceDate
          this.form_addvalue.size = data.size
          this.form_addvalue.unitPrice = data.unitPrice
          this.form_addvalue.rates = data.feeType
          this.form_addvalue.rsv = data.rsv
          this.form_addvalue.id = data.id
          get_av_byType({
            typeId: this.form_addvalue.avType
          }).then(res => {
            this.server_name_options = res
            this.form_addvalue.avId = data.avServiceId
          })
        }
      },

      get_avType_list() {
        all_av_type().then(res => {
          this.server_type_options = res
        })
      },
      reset() {
        this.form_addvalue = {
          id: undefined,
          elderId: parseInt(this.$route.params.id), //老人ID
          elderName: this.$route.query.elderName, //老人姓名
          avType: undefined, //增值服务类型
          avId: undefined, //增值服务名称
          serviceDate: null, //服务发生日期
          size: 0, //数量
          unitPrice: 0,//单价
          rates: undefined, //收费标准
          rsv: "" //备注
        }
      },
      handleDel(data) {
        let self = this
        this.$confirm(`删除, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          set_or_del_addValue({ id: data.id, operateType: "D" }).then(res => {
            self.getList()
            self.dialog_cof.visible = false
            self.$notify({
              title: "提示",
              message: "操作成功",
              type: "success"
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: `已取消`
          });
        });
      },
      handleSubmit() {
        let self = this
        this.$refs.form.validate(valid => {
          let totalFee = self.form_addvalue.size * self.form_addvalue.unitPrice
          if (this.dialog_cof.title == "编辑") {
            set_or_del_addValue({ ...self.form_addvalue, totalFee }).then(res => {
              self.getList()
              self.dialog_cof.visible = false
              self.$notify({
                title: "提示",
                message: "操作成功",
                type: "success"
              })
            })
          } else {
            addValueInfo({ ...self.form_addvalue, totalFee }).then(res => {
              self.dialog_cof.visible = false
              self.getList()
              self.$notify({
                title: "提示",
                message: "操作成功",
                type: "success"
              })
            })
          }
        })
      }
    },
    mounted() {
      this.form_addvalue.elderId = parseInt(this.$route.params.id)
      this.form_addvalue.elderName = this.$route.query.elderName
      this.flt.elderId = parseInt(this.$route.params.id)
      this.getList();
      this.get_avType_list()
    },
  };
</script>
<style lang='scss' scoped>
</style>
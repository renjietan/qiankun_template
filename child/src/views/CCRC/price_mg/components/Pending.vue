<!-- 
 * @description:待处理 
 * @fileName: Pending.vue 
 * @author: 姜纬杰 
 * @date: 2021-10-21 19:40:53
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true">
      <el-row>
        <el-col :span="21">
          <el-row>
            <el-col :span="8">
              <el-form-item class="filter" label="方案名称：">
                <el-input clearable v-model="pageable.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="filter" label-width="100px" label="价格方案状态:">
                <el-select v-model="pageable.status" placeholder="请选择">
                  <el-option
                    v-for="item in price_status"
                    :key="item.type"
                    :label="item.desc"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" style="text-align: right">
          <div style="display: inline-block; margin-left: 10px">
            <el-button type="primary" @click="handleScreen(pageable,'查询')">查询</el-button>
            <el-button @click="handleScreen(pageable,'重置')">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="padding-bottom: 20px">
      <el-col>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <!-- <div class="title" v-if="title">{{ title }}</div> -->
          <div>
            <el-button type="success" @click="handleAction('','绑定楼栋价格')">
              <span class="btn_pics">
                <img class="pic" src="~@/assets/images/CCRC/build.png" />绑定楼栋价格
              </span>
            </el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAction('','新增价格方案')">新增价格方案</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-table border ref="data_table" :data="table_data" v-loading="table_loading" fit>
      <!-- <el-table-column width="150" align="left" label="序号">
        <template slot-scope="scope">
          <span :style="{'color': $variables.baseColor}">{{ formatZero(scope.$index+1, 2) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column width="250" show-overflow-tooltip align="left" prop="name" label="价格方案"></el-table-column>
      <el-table-column width="250" align="left" prop="unitPrice" label="均价"></el-table-column>
      <el-table-column align="left" prop="startDate" label="定制信息">
        <template slot-scope="scope">{{scope.row.startDate +'~' +scope.row.endDate}}</template>
      </el-table-column>
      <el-table-column align="left" prop="status" label="状态">
        <template slot-scope="scope">
          <span style="color:#1FCDA0" v-if="scope.row.status=='1'">启用</span>
          <span style="color:#FE3D65" v-if="scope.row.status=='2'">失效</span>
          <span style="color:#8A8A8A" v-if="scope.row.status=='3'">禁用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="200" align="left" prop="afterDiscount" label="指定信息"></el-table-column>
      <el-table-column width="277" align="left" prop="afterDiscount" label="审批信息"></el-table-column>-->
      <el-table-column align="left" label="操作" width="110">
        <template slot-scope="scope">
          <div>
            <!-- <el-link
              v-if="scope.row.state=='0'"
              :underline="false"
              type="warning"
              @click="handleAction(scope.row, '审批')"
            >审批</el-link>
            <el-link 
              v-else
              :underline="false"
              type="warning"
              @click="handleAction(scope.row, '执行')"
            >执行</el-link>-->
            <el-link :underline="false" type="primary" @click="handleAction(scope.row, '编辑')">编辑</el-link>
            <el-link
              type="danger"
              v-if="scope.row.status=='启用'"
              :underline="false"
              @click="handleForbidden(scope.row, '禁用')"
            >禁用</el-link>
            <el-link
              type="success"
              v-if="scope.row.status=='禁用'"
              :underline="false"
              @click="handleForbidden(scope.row, '启用')"
            >启用</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      style="text-align:right"
      v-show="table_total > 0"
      :total="table_total"
      :page.sync="pageable.pageNum"
      :limit.sync="pageable.pageSize"
      @pagination="getPriceList"
    />
    <el-dialog
      class="el-dialog-3"
      center
      v-el-drag-dialog
      :visible.sync="dialog_cof.visible"
      :title="dialog_cof.title"
      :destroy-on-close="dialog_cof.destroy"
      :close-on-click-modal="dialog_cof.modal"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form_data"
        :rules="rules"
        hide-required-asterisk
        status-icon
        label-position="left"
        label-width="120px"
      >
        <div v-if="this.dialog_cof.title=='绑定楼栋价格'">
          <el-row>
            <el-form-item class="filter" label="所属项目：">
              <el-select @change="changeProject" v-model="form_data.projectId" placeholder="请选择">
                <el-option
                  v-for="item in project_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="filter" label="选择楼栋：">
              <el-select v-model="form_data.buildingList" multiple placeholder="请选择">
                <el-option
                  v-for="item in building_list"
                  :key="item.num"
                  :label="item.name"
                  :value="item.num"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <div style="display:flex;min-height:350px">
              <div
                style="width:230px;height:32px;border: 1px solid #017CFF;line-height:32px;padding-left:12px;margin-right:10px"
                v-for="child in consignment_list"
                :key="child.name"
              >{{child.building}}</div>
            </div>-->
          </el-row>
          <el-row>
            <el-form-item class="filter" multiple label="选择价格方案：">
              <el-select v-model="form_data.priceId" placeholder="请选择">
                <el-option
                  v-for="item in price_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- <el-row>
            <el-form-item label="排序方式：" style="padding:0">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">楼层+号码</el-radio>
                <el-radio :label="1">号码+楼层</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="范围：">
              <el-radio-group v-model="Range" style="width:300px">
                <el-radio :label="0">代售</el-radio>
                <el-radio :label="1">全部</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="this.Range===0">
              <el-checkbox
                v-for="item in consignment_list"
                :label="item.name"
                :checked="true"
                :key="item.id"
              >{{item.name}}</el-checkbox>
              <el-divider></el-divider>
              <div style="display:flex;min-height:350px">
                <div
                  style="width:230px;height:32px;border: 1px solid #017CFF;line-height:32px;padding-left:12px;margin-right:10px"
                  v-for="child in consignment_list"
                  :key="child.name"
                >{{child.building}}</div>
              </div>
            </div>

            <div v-if="this.Range===1">
              <el-checkbox
                v-for="item in allhouse_list"
                :label="item.name"
                :checked="true"
                :key="item.id"
              >{{item.name}}</el-checkbox>
              <el-divider></el-divider>
              <div style="display:flex;min-height:350px">
                <div
                  style="width:230px;height:32px;border: 1px solid #017CFF;line-height:32px;padding-left:12px;margin-right:10px"
                  v-for="child in allhouse_list"
                  :key="child.name"
                >{{child.building}}</div>
              </div>
            </div>
          </el-row>-->
        </div>
        <!-- <div v-show="this.dialog_cof.title=='审批'">
          <el-row>
            <el-form-item label="所属项目：" style="padding:0" class="required">
              <el-radio-group v-model="radio" style="width:300px">
                <el-radio :label="0">通过</el-radio>
                <el-radio :label="1">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="审批后直接执行：">
              <el-radio-group v-model="Range" style="width:300px">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div
              style="margin-left:125px;margin-bottom:30px"
              class="text"
            >勾选是，则在审批通过后直接将价格传递到房间，不需要单独执行。</div>
          </el-row>
          <el-row :span="24" style="min-height:350px">
            <el-form-item label="审批意见：" class="required">
              <el-input
                v-model="name"
                placeholder="请输入"
                type="textarea"
                style="width:810px "
                :rows="6"
              ></el-input>
            </el-form-item>
          </el-row>
        </div>-->
        <div v-if="this.dialog_cof.title!='绑定楼栋价格'" style="min-height:500px">
          <el-row>
            <el-form-item class="default" label="价格方案" prop="name">
              <el-input v-model="form_data.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item class="default" label="底价建筑单价" prop="unitPrice">
                <el-input v-model="form_data.unitPrice" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.dialog_cof.title=='编辑价格方案'">
              <el-form-item class="default" label="状态">
                <el-select disabled v-model="form_data.status" placeholder="请选择">
                  <el-option
                    v-for="item in price_status"
                    :key="item.type"
                    :label="item.desc"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="default" label="指定日期">
                <el-date-picker
                  v-model="dateTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_cof.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog_cof.title== '绑定楼栋价格' ?handleSubmitPrice():handleSubmit()"
        >确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { formatZero } from "@/filters";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { get_project_list, get_all_buildings } from "@/api/CCRC/project";
import {} from "@/utils/validate";
import {
  get_price_list,
  add_price_programme,
  edit_price_programme,
  get_price_status,
  get_price_lists,
  binding_building_price,
  forbidden_price
} from "@/api/CCRC/price";
export default {
  name: "Pending",
  components: {
    Pagination
  },
  directives: {
    waves,
    elDragDialog
  },

  data() {
    return {
      dateTime: [],
      project_list: [], //项目列表
      building_list: [], //楼栋列表
      price_list: [], //价格方案列表
      id: null, //楼栋id
      price_status: [],
      table_total: 0,
      pageable: {
        pageNum: 1,
        pageSize: 10,
        // projectId: "",
        name: null,
        status: null
      },
      name: "",
      table_loading: false,
      table_data: [],
      radio: 0,
      Range: 0,
      consignment_list: [
        {
          id: 1,
          name: "东区住宅",
          building: "01栋"
        }
      ], //代售列表
      allhouse_list: [
        {
          id: 1,
          name: "东区住宅",
          building: "01栋"
        },

        {
          id: 2,
          name: "西区住宅",
          building: "02栋"
        }
      ], //全部列表
      group: "",
      radio: "启用",
      dialog_cof: {
        type: "",
        visible: false,
        title: "新增",
        escape: false,
        destroy: true,
        modal: false
      },
      form_data: {
        id: null,
        name: "", //方案名称
        unitPrice: "", //低价建筑单价
        status: null, //状态
        buildingList: [], //楼栋id
        projectId: null, //项目id
        priceId: "" //价格方案id
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "change" }],
        unitPrice: [{ required: true, message: "不可为空", trigger: "change" }]
      }
    };
  },
  computed: {},
  methods: {
    getPriceStatus() {
      get_price_status().then(res => {
        this.price_status = res.data;

      });
    },
    getPriceLists() {
      get_price_lists().then(res => {
        this.price_list = res.data;
      });
    },
    getPriceList() {
      get_price_list({ ...this.pageable }).then(res => {
        this.table_data = res.data.result.map(el=>{
          el.startDate = el.startDate ??'';
           el.endDate = el.endDate ?? '';
          return el;
        });
        this.table_total = res.data.totalCount;
      });
    },
    changeProject(val) {
      this.id = val;
      this.getAllBuildings();
    },
    getAllBuildings() {
      get_all_buildings(this.id).then(res => {
        this.building_list = res.data;
      });
    },
    getProjectList() {
      get_project_list().then(res => {
        this.project_list = res.data;
      });
    },
    formatZero,
    handleScreen(data, type) {
      const self = this;
      switch (type) {
        case "查询":
          self.pageable.pageNum = 1;
          self.getPriceList();
          break;
        case "重置":
          self.pageable = {
            pageNum: 1,
            pageSize: 10,
            name: null,
            status: null
          };
          self.getPriceList();
          break;
      }
    },
    handleForbidden(data, type) {
      let self = this;
      let id = data.id;
      let entity = "Price";
      switch (type) {
        case "禁用":
          this.$confirm(`禁用, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                status: 2
              };
              forbidden_price(entity, id, params).then(res => {
                self.$notify({
                  type: "success",
                  message: "禁用成功!",
                  title: ""
                });
                self.getPriceList();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: `已取消`
              });
            });
          break;
        case "启用":
          this.$confirm(`启用, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                status: 1
              };
              forbidden_price(entity, id, params).then(res => {
                self.$notify({
                  type: "success",
                  message: "启用成功!",
                  title: ""
                });
                self.getPriceList();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: `已取消`
              });
            });
          break;
      }
    },
    handleAction(data, type) {
      let self = this;
      switch (type) {
        case "绑定楼栋价格":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "绑定楼栋价格";
          self.getPriceLists();
          break;
        case "新增价格方案":
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "新增价格方案";
          self.clearFormData();
          // self.$router.push({ name: "price_mg_add_price" });
          break;
        case "详情":
          self.$router.push({
            path: "/price_mg/cost_price_detail",
            query: { id: data.id }
          });
          break;
        case "编辑":
          self.clearFormData();
          self.dialog_cof.visible = true;
          self.dialog_cof.title = "编辑价格方案";
          self.form_data.id = data.id;
          self.form_data.name = data.name;
          self.form_data.status = data.status.toString();
          self.form_data.unitPrice = data.unitPrice;
          self.dateTime[0] = data.startDate;
          self.dateTime[1] = data.endDate;
          break;
      }
    },
    handleSubmit() {
      let self = this;
      let params = {
        id: self.form_data.id,
        name: self.form_data.name,
        unitPrice: self.form_data.unitPrice,
        status:!!self.form_data.status?Number(self.form_data.status):null,
        startDate: self.dateTime[0],
        endDate: self.dateTime[1]
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          if (self.dialog_cof.title == "新增价格方案") {
            add_price_programme(params).then(res => {
              self.$notify({
                type: "success",
                message: "新增成功",
                title: "成功"
              });
              self.getPriceList();
            });
            self.dialog_cof.visible = false;
          } else {
            let id = self.form_data.id;
            edit_price_programme(id, params).then(res => {
              self.$notify({
                type: "success",
                message: "编辑成功",
                title: "成功"
              });
              self.getPriceList();
            });
            self.dialog_cof.visible = false;
          }
        }
      });
    },
    handleSubmitPrice() {
      let self = this;
      let params = {
        projectId: self.form_data.projectId,
        priceId: self.form_data.priceId,
        buildingList: self.form_data.buildingList
      };
      self.$refs["form"].validate(vaild => {
        if (vaild) {
          binding_building_price(params).then(res => {
            self.$notify({
              type: "success",
              message: "绑定楼栋价格成功",
              title: "成功"
            });
            self.getPriceList();
          });
          self.dialog_cof.visible = false;
        }
      });
    },
    clearFormData() {
      this.dateTime = [];
      this.form_data = {
        id: null,
        name: "", //方案名称
        unitPrice: "", //低价建筑单价
        status: "", //状态
        buildingList: [], //楼栋id
        projectId: null, //项目id
        priceId: "" //价格方案id
      };
    }
  },

  mounted() {
    this.getPriceList();
    this.getPriceStatus();
    this.getProjectList();
  }
};
</script>
<style lang='scss' scoped>
.btn_pics {
  .pic {
    line-height: 15px;
    margin-right: 6px;
    margin-bottom: -2.45px;
  }
}
.container_card {
  .text {
    color: #8a8a8a;
  }
  .required {
    /deep/.el-form-item__label {
      color: #222;

      font-weight: 400;

      &:after {
        display: inline-block;
        content: "*";
        text-indent: 5px;
        color: red;
      }
    }
  }
  .noRequired {
    /deep/.el-form-item__label {
      color: #222;
      font-weight: 400;
    }
  }
}
/deep/.el-radio {
  color: #222;
  font-weight: 500;
}
/deep/.el-button span {
  font-weight: normal;
}

/deep/.el-form-item__label {
  color: #262626;
  line-height: 32px;
  font-weight: 400;
}
.el-dialog-3 {
  .text {
    color: #8a8a8a;
  }
  /deep/.el-form-item__label {
    color: #222;

    font-weight: 400;
    line-height: 32px;
  }
}
</style>
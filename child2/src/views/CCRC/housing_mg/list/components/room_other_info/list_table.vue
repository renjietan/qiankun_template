<!-- 
 * @description: 
 * @fileName: list_table.vue 
 * @author: 王文涛 
 * @date: 2021-10-27 11:21:23
 * @后台人员:  
!-->
<template>
  <div>
    <el-divider></el-divider>
    <el-form :inline="true" style="margin-top: 24px">
      <el-row>
        <el-col :span="19">
          <el-row>
            <el-col :span="8">
              <el-form-item class="filter" label="项目：">
                <el-input
                  placeholder="请输入"
                  v-model="flt.elderName"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item class="filter" label="房间：">
                <el-input
                  placeholder="请输入"
                  v-model="flt.bedName"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" style="text-align: right">
          <div style="display: inline-block; margin-left: 10px">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="reset_flt">重置</el-button>
            <el-popover placement="top" width="360" v-model="visible">
             <el-row>
                <el-col :span="3" style="margin-top:6px">单元:</el-col>
                <el-col :span="6">
                   <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
               <el-row style="margin-top:6px">
                <el-col :span="3" style="margin-top:6px">楼层:</el-col>
                <el-col :span="6">
                   <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
               <el-row style="margin-top:6px">
                <el-col :span="3" style="margin-top:6px">号码:</el-col>
                <el-col :span="6">
                   <el-checkbox v-model="checked1" label="全部" border></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <el-input style="width:100%"></el-input>
                </el-col>
              </el-row>
              <el-link type="primary" slot="reference"
                ><i class="el-icon-arrow-up"></i>展开筛选</el-link
              >
            </el-popover>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-boxs" style="margin-bottom: 25px">
      <el-button
        type="success"
        icon="el-icon-download"
        @click="handleAction('', '导入')"
      >
        导入面积
      </el-button>
      <el-button
        type="success"
        icon="el-icon-upload2"
        @click="handleAction('', '导出')"
      >
        导出模板
      </el-button>
      <el-button type="primary" icon="el-icon-s-unfold" @click="handleAction('', '调整')"> 销控图调整 </el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span :style="{ color: $variables.baseColor }">{{
              formatZero(scope.$index + 1, 2)
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="房间" width="150">
        </el-table-column>
        <el-table-column label="房间"> </el-table-column>
        <el-table-column label="备案编号"> </el-table-column>
        <el-table-column label="公安编号"> </el-table-column>
        <el-table-column label="销许编号"> </el-table-column>
        <el-table-column label="销许日期"> </el-table-column>
        <el-table-column label="景观"> </el-table-column>
        <el-table-column label="朝向"> </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-el-drag-dialog
      center
      :visible.sync="outFile.dialog_cof.visible"
      :title="outFile.dialog_cof.title"
      :destroy-on-close="outFile.dialog_cof.destroy"
      :close-on-click-modal="outFile.dialog_cof.modal"
    >
      <el-form
        :inline="true"
        :model="form_data"
        :rules="rules"
        ref="form"
        hide-required-asterisk
        status-icon
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="elderName" label="选择导入文件:">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="UploadPic"
              >
                <img
                  v-if="form_data.empHeads"
                  :src="form_data.empHeads"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon">
                  <div class="uploader_desc">点击上传</div>
                </i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16"
          :offset="3"
            ><span style="color: #8a8a8a; font-size: 14px"
              >说明：当前导入方式为覆盖导入，将清除原有数据。</span
            ></el-col
          >
        </el-row>
      </el-form>
      <div class="foot">
        <el-divider></el-divider>

        <el-button type="primary" @click="submitForm('add')" class="btn"
          >确 定</el-button
        >

        <el-button class="btn" @click="outFile.dialog_cof.visible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      center
      :visible.sync="exportFile.dialog_cof.visible"
      :title="exportFile.dialog_cof.title"
      :destroy-on-close="exportFile.dialog_cof.destroy"
      :close-on-click-modal="exportFile.dialog_cof.modal"
    >
      <el-row :gutter="10" style="margin-bottom: 24px">
        <el-col :span="3">所属项目：</el-col>
        <el-col :span="21">颐瑞公司-南京颐养中心</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-top: 24px">
        <el-col :span="4">排序方式：</el-col>
        <el-checkbox-group
          v-model="checkedCities"
          max="1"
          @change="handleCheckedCitiesChange"
        >
          <el-col :span="4">
            <el-checkbox label="楼层+号码"></el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-checkbox label="号码+楼层"></el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <el-row style="margin-top: 24px; margin-bottom: 24px">
        <el-col :span="24">
          <el-checkbox label="无区分"></el-checkbox>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20" style="margin-top: 24px; margin-bottom: 60px">
        <el-col :span="6">
          <div class="gutter">01栋</div>
        </el-col>
        <el-col :span="6">
          <div class="gutter">02栋</div>
        </el-col>
        <el-col :span="6">
          <div class="gutter">03栋</div>
        </el-col>
        <el-col :span="6">
          <div class="gutter">04栋</div>
        </el-col>
        <el-col :span="6">
          <div class="gutter">05栋</div>
        </el-col>
        <el-col :span="6">
          <div class="gutter">06栋</div>
        </el-col>
      </el-row>
      <div class="foot">
        <el-divider></el-divider>

        <el-button type="primary" @click="submitForm('add')" class="btn"
          >确 定</el-button
        >

        <el-button class="btn" @click="exportFile.dialog_cof.visible = false"
          >取 消</el-button
        >
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
import {} from "@/utils/validate";
import { formatZero } from "@/filters";

export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  data() {
    return {
      flt: {},
      exportFile: {
        dialog_cof: {
          visible: false,
          title: "导出模版",
          escape: false,
          destroy: true,
          modal: false,
        },
      },
      outFile: {
        dialog_cof: {
          visible: false,
          title: "导入房间其他信息",
          escape: false,
          destroy: true,
          modal: false,
        },
      },
      checkedCities: [],
      form_data: {},
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    formatZero,
    handleAction(data, type) {
      switch (type) {
        case "导出":
          this.exportFile.dialog_cof.visible = true;
          break;
        case "导入":
          this.outFile.dialog_cof.visible = true;
          break;
        case "调整":
          this.$router.push('/CCRC/handle/control_chart')
          break;  
      }
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.gutter {
  height: 32px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  line-height: 32px;
  padding-left: 14px;
  margin-bottom: 10px;
}
</style>
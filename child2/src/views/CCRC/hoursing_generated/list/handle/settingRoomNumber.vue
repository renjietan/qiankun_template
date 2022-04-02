<!-- 
 * @description: 设置房间户型
 * @fileName: settingRoomNumber.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 19:22:54
 * @后台人员:  
!-->
<template>
  <div style="margin-top: 24px">
    <!-- <el-row :gutter="2">
      <el-col :span="6">
        <el-checkbox
          label="是（补足两位，如01、02)"
          v-model="isChecked"
        ></el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-checkbox label="否（按顺序生成，如01、02）"></el-checkbox>
      </el-col>
    </el-row>-->

    <el-table :data="tableData" border style="width: 100%; margin-top: 14px">
      <el-table-column prop="name" align="center" label="楼层名称" width="50"></el-table-column>
      <el-table-column prop width="95">
        <template slot="header">
          <div class="table_title">单元名称</div>
          <div class="table_title">号码</div>
          <div class="table_title">户型</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in unit" :key="index">
        <template slot="header" slot-scope="scope">
          <div class="table_title" >{{ item.name }}</div>
          <div class="title-small">
            <div
              class="item"
              :style="'width:'+100/item.house_number.length+'%'"
              v-for="(child, index) in item.house_number"
              :key="index"
            >{{ child >= 10 ?child: "0"+child }}</div>
            <!-- <div class="item" >{{numlegth[index]}}</div> -->
          </div>
          <div class="title-small-mormal">
            <div
              class="item"
              :style="'width:'+100/item.num+'%'"
              v-for="(child,index) in item.value"
              :key="index"
            >
              <el-select v-model="child.value" placeholder="" style="margin-top: -12px;">
                <el-option
                  v-for="item in house_type_list"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="title-small-mormal">
            <div
              class="item"
              :style="'width:'+100/item.num+'%'"
              v-for="(child,index) in item.value"
              :key="index"
            >
              <el-select
                :disabled="true"
                v-model="child.value"
                placeholder
                style="margin-top: -12px;"
              >
                <el-option
                  v-for="item in house_type_list"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')">上一步</el-button>
      <el-button type="primary" @click="submitForm('next')">下一步</el-button>
      <!-- <el-button
        :disabled="active_floor == steaps_hourse.length ? false : true"
        type="primary"
        @click="submitForm('submit')"
        class="btn"
        >提交</el-button
      >-->
      <el-button class="btn" @click="submitForm('exit')">取消</el-button>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import permission from "@/directive/permission";
import elDragDialog from "@/directive/el-drag-dialog";
import { valid_error_msg } from "@/utils/valid-error-msg";
import { get_houses_type } from "@/api/CCRC/housing";
import { get_house_num } from "@/api/CCRC/project";
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  props: {
    datas: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      unit: [],
      numOfUnit: [],
      numlegth: null,
      form_data: {},
      isChecked: true,
      value: "",
      tableData: [],
      house_type_list: []
    };
  },
  methods: {
    getHousesType() {
      get_houses_type().then(res => {
        this.house_type_list = res.data ?? [];
      });
    },
    submitForm(type) {
      var self = this;
      const actionType = {
        back: () => {
          self.backup();
        },
        next: () => {
          self.nextsteap();
        },
        exit: () => {
          self.exit();
        }
      };
      actionType[type]();
    },
    exit() {
      this.$emit("close_type", "");
    },
    // 返回上一步；
    backup() {
      this.$emit("backup_type", 1);
    },
    // 下一步
    nextsteap() {
      console.log(this.unit);
      let temp = [];
      this.unit.forEach((unit, unitIndex) => {
        temp[unitIndex] = unit.value.map(item => {
          return item;
        });
      });
      this.$emit("nextsteap_type", 3, temp);
    },
    getChange(e, i) {
      console.log(e);
      for (let i of this.numlegth) {
      }
    }
  },
  mounted() {
     
    
    this.getHousesType();
    this.unit = Array.from({ length: this.datas.units.length }, (m, n) => {
      return {
        name: this.datas.units[n],
        num: this.datas.numOfUnit[n],
        house_number:this.datas.numRangeOfUnit[n],
        value: Array.from({ length: this.datas.numOfUnit[n] }, (x, y) => {
          return {
            value: undefined
          };
        })
      };
    });
    this.tableData = this.datas.floors.reverse().map(el => {
      return {
        name: el
      };
    });
  }
};
</script>
<style lang='scss' scoped>
.table_title {
  // width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.title-small {
  // width: 268px;
  height: 40px;
  background: rgba(1, 124, 255, 0.09);
  // border-top: 1px solid #ccc;
  .item {
    text-align: center;
    line-height: 40px;
    color: #017cff;
    float: left;
  }
}
.title-small-mormal {
  @extend .title-small;
  background: none;

  .item {
    border-right: 1px solid #ccc;

    color: #000;
    .el-select {
      margin: 0 12px;
    }
  }
}

/deep/ .el-table th.is-leaf,
.el-table td {
  border: 1px solid #ccc;
  text-align: center;
  height: 42px;
}
/deep/ .el-table__body-wrapper .el-table__row td {
  border-bottom: 1px solid #ccc;
  &:nth-of-type(1) {
    border-left: none;
  }
  border-left: 1px solid #ccc;
}

/deep/ .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}
/deep/.el-table__header-wrapper th {
  padding: 0;
}

.el-table {
  /deep/ .el-table__body-wrapper .el-table__row td {
    padding: 0;
  }
}
</style>
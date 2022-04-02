<!-- 
 * @description: 设置房间号码
 * @fileName: settingNum.vue 
 * @author: 王文涛 
 * @date: 2021-10-25 19:22:54
 * @后台人员:  
!-->
<template>
  <div style="margin-top: 24px">
    <el-row :gutter="2">
      <el-col :span="4">房间号码生成规则：</el-col>
      <el-col :span="20">
        <el-select v-model="value" placeholder="请选择" style="margin-top: -12px">
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%;margin-top:20px">
      <el-table-column prop="name" align="center" label="楼层名称" width="80"></el-table-column>
      <el-table-column width="120">
        <template slot="header">
          <div class="table_title">单元名称</div>
          <div class="table_title">房号</div>
        </template>
      </el-table-column>
      <el-table-column prop="houseNumber" v-for="(item, index) in unit" :key="index">
        <template slot="header">
          <div class="table_title" :style="'width:'+100/item.num.length+'%'">{{ item.name }}</div>
          <div class="title-small">
            <div
              class="item"
              :style="'width:'+100/item.house_number.length+'%'"
              v-for="(child, index) in item.house_number"
              :key="index"
            >{{ child>= 10 ?child: "0"+child }}</div>
            <!-- <div class="item" >{{numlegth[index]}}</div> -->
          </div>
        </template>
        <template slot-scope="scope">
          <div class="title-small-mormal">
            <span
              class="item"
              :style="'width:'+100/item.house_number.length+'%'"
              v-for="(child,index) in item.house_number"
              :key="index"
            >{{scope.row.name}}{{child>=10?child:'0'+child}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot">
      <el-divider></el-divider>
      <el-button type="primary" @click="submitForm('back')">上一步</el-button>
      <el-button type="primary" :disabled="true" @click="submitForm('next')">下一步</el-button>
      <el-button type="primary" @click="submitForm('submithouse')" class="btn">提交</el-button>
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
import {} from "@/utils/validate";
export default {
  components: { Pagination },
  directives: { waves, permission, elDragDialog },
  props: {
    datas: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: [
        {
          id: 1,
          label: "楼层+房间"
        }
      ],
      name: [],
      unit: [],
      numOfUnit: [],
      numRangeOfUnit: [],
      numlegth: null,
      form_data: {},
      isChecked: true,
      value: 1,
      form_data: {},
      tableData: []
    };
  },
  methods: {
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
        },
        submithouse: () => {
          self.submithouse();
        }
      };
      actionType[type]();
    },
    exit() {
      this.$emit("close_type", "");
    },
    // 返回上一步；
    backup() {
      this.$emit("backup_type", 2);
    },
    // 下一步
    nextsteap() {
      this.$emit("nextsteap_type", 4);
    },
    submithouse() {
      let temp = [];
      this.numRangeOfUnit = this.datas.numRangeOfUnit.flat();
      this.datas.units.forEach((unit, unitIndex) => {
        this.datas.floors.forEach((floor, floorIndex) => {
          this.datas.numRangeOfUnit[unitIndex].flat().forEach((number, huoseIndex) => {
            temp.push({
                num: `${floor}0${number}`,
                type: this.type[unitIndex][huoseIndex].value,
                floor: floor,
                unit: unit
              });
          });
        });
      });
      this.$emit("submithouse", {
        temp: temp,
        num: this.datas.num
      });
    }
  },
  mounted() {
    console.log(this.datas);

    this.unit = Array.from({ length: this.datas.units.length }, (m, n) => {
      return {
        name: this.datas.units[n],
        num: this.datas.numOfUnit[n],
        house_number: this.datas.numRangeOfUnit[n]
        // value: Array.from({ length: this.datas.numRangeOfUnit[n] }, (x, y) => {
        //   return {};
        // })
      };
    });
    console.log(this.unit);
    this.tableData = this.datas.floors.reverse().map(el => {
      return {
        name: el
      };
    });
    this.tableData.forEach(el => {
      this.unit.forEach(x => {
        x.value.forEach((y, i) => {
          y.value = `0${i + 1}`;
        });
      });
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
</style>
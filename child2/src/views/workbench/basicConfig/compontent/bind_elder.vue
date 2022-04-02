<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="19">
        <el-col :span="6">
          <el-select
            clearable
            v-model="listQuery.levelId"
            placeholder="服务等级"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.levelName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            clearable
            v-model="listQuery.elderName"
            placeholder="长者姓名"
          ></el-input>
        </el-col>
      </el-col>
      <el-col :span="5">
        <div style="display: inline-block; margin-left: 10px">
          <el-button type="primary" @click="find()">查询</el-button>
          <el-button @click="rest_data">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <div class="elder_box1" v-infinite-scroll="load" style="overflow: auto">
        <div
          :class="v.flag ? 'active-elder-item' : 'elder-item'"
          v-for="(v, i) in elder_data"
          :key="i"
          @click="selected(v, i)"
        >
          <div class="avator">
            <img v-if="!!v.headUrl" :src="v.headUrl" alt="" srcset="" />
          </div>
          <p class="name">{{ v.elderName }}</p>
        </div>
      </div>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="bind" type="primary">确 认</el-button>
      <el-button @click="exit">取 消</el-button>
    </div>
  </div>
</template>
<script>
import {
  getServeLevel,
  getStatus,
  getinLeveList,
} from "@/api/pensionagency/inLive/inLeve_temp";
import { service_level_config } from "@/api/pensionagency/goLive/goLive";
import { bind_elder } from "@/api/pensionagency/basicConfig/basicConfig";
import { dispose } from "echarts/lib/echarts";
export default {
  props: {
    elder: {
      type: Array,
      default: [],
    },
    fuserId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 40,
        name: undefined,
      },
      total:0,
      loads: "resh",
      options: [],
      elder_data: [],
    };
  },
  methods: {
    getElder() {
      getinLeveList(this.listQuery).then((res) => {
        if (this.loads == "resh") {
          this.elder_data =
            res.result.map((el) => {
              el.flag = false;
              return el;
            }) ?? [];
        } else {
          this.elder_data = [...res.result, ...this.elder_data].map((el) => {
            el.flag = false;
            return el;
          });
        }
            this.total = res.totalCount;

        this.process();
      });
    },
    find(){
       this.loads = "resh";
       this.getElder();
    },
    load() {
      this.loads = "load";
      if(this.total >= this.pageSize){
          this.listQuery.pageNum++;
          this.getElder();
      }
    },

    process() {
      for (let i of this.elder_data) {
        i.disable = false;
        for (let j of this.elder) {
          if (i.elderName == j.elderName) {
            i.disable = true;
          }
        }
      }
      this.elder_data = this.elder_data.filter((el) => {
        return !el.disable;
      });
    },
    bind() {
      let arr = this.elder_data
        .filter((el) => {
          return el.flag;
        })
        .map((el) => el.elderId);
      bind_elder({
        fuserId: this.fuserId,
        elderIds: arr,
      }).then((res) => {
        this.$notify({
          title: "提示",
          message: "绑定成功",
          type: "success",
        });
        this.getElder();
        this.exit();
      });
    },
    selected(v, i) {
      v.flag = !v.flag;
    },

    exit() {
      this.$emit("exit");
    },
    rest_data() {
      this.loads = "resh";
      this.listQuery = {
        levelId:undefined,
        pageNum: 1,
        pageSize: 40,
        name: undefined,
      };
      this.getElder();
    },
    Level(){
      service_level_config().then(res=>{
        this.options = res?res:[];
      });
    }
  },
  mounted() {
    this.getElder();
    this.Level();
  },
};
</script>
<style lang="scss">
.elder_box1 {
  width: 859px;
  height: 400px;
  border: 1px solid #dedede;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  .elder-item {
    width: 120px;
    height: 150px;
    border: 1px solid #dedede;
    margin-left: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .avator {
      margin-top: 20px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .active-elder-item {
    @extend .elder-item;
    background: #d5e6fb;
  }
}
.dialog-footer {
  margin-top: 12px;
  text-align: center;
}
</style>
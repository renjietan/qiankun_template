<template>
  <div>
    <div class="elder_box1">
      <div
        v-for="(v, i) in elder"
        :key="i"
        :class="v.flag ? 'active-elder-item' : 'elder-item'"
         @click="selected(v, i)"
      >
        <div class="avator">
          <img v-if="!!v.headUrl" :src="v.headUrl" alt="" srcset="" />
        </div>
        <p class="name">
          {{ v.elderName }}
        </p>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
         <el-button @click="bind" type="primary">确 认</el-button>
      <el-button @click="exit">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { del_bind_elder } from "@/api/pensionagency/basicConfig/basicConfig";

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
      table_data: [],
    };
  },
  mounted() {
   this.elder = this.elder.map((el) => {
      el.flag = false;
      return el;
    });
  },
  methods: {
    selected(v, i) {
      v.flag = !v.flag;
      this.$forceUpdate();
    },
     bind() {
      let arr = this.elder
        .filter((el) => {
          return el.flag;
        })
        .map((el) => el.id);
      del_bind_elder({
        fuserId: this.fuserId,
        elderIds: arr,
      }).then((res) => {
        this.$notify({
          title: "提示",
          message: "解绑成功",
          type: "success",
        });
        this.exit();
      });
    },
    exit() {
      this.$emit("exit");
    },
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
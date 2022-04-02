<template>
  <div class="container_card">
    <div
      v-if="$route.query.isShow != 0"
      class="title"
      style="margin-bottom: 10px"
    >
      个人档案--{{ olderInfo.elderName || "" }}
    </div>
    <div class="basic_info_box">
      <el-avatar
        style="margin-right: 20px"
        shape="square"
        :size="80"
        :src="olderInfo.headUrl"
      ></el-avatar>
      <el-table
        class="table_basic"
        border
        :show-header="false"
        ref="table_data"
        :data="table_data"
        stripe
        highlight-current-row
        fit
      >
        <el-table-column
          align="left"
          prop="column1"
          label="第一列"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="column2"
          label="第二列"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="column3"
          label="第三列"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="column4"
          label="第四列"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="column5"
          label="第五列"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { simple_info } from "@/api/pensionagency/inLive/elder_log";

export default {
  name: "BasicInfoTable",
  data() {
    return {
      table_data: [],
      olderInfo: {},
      elderId: undefined,
      size: 160,
    };
  },

  watch: {
    olderInfo: {
      deep: true,
      handler: function (newval, oldval) {
        this.table_data = [
          {
            column1: `长者姓名：${this.olderInfo.elderName || ""}`,
            column2: `性别：${this.olderInfo.sex == "0" ? "男" : "女" || ""}`,
            column3: `年龄：${this.olderInfo.age}`,
            column4: `床位：${this.olderInfo.bedName || ""}`,
            column5: `证件类型：${
              this.olderInfo.papersType == "IC"
                ? "身份证"
                : this.olderInfo.papersType == "DC"
                ? "驾照"
                : this.olderInfo.papersType == "MC"
                ? "结婚证"
                : this.olderInfo.papersType == "PP"
                ? "护照"
                : this.olderInfo.papersType == "SC"
                ? "学生证"
                : "户口本"
            }`,
          },
          {
            column1: `证件号码：${this.olderInfo.papersCode || ""}`,
            column2: `入住日期：${this.olderInfo.checkInDate || ""}`,
            column3: `服务等级：${this.olderInfo.levelName || ""}`,
            column4: `档案号：${this.olderInfo.fileNum || ""}`,
          },
        ];
      },
      immediate: true,
    },
  },
  mounted() {
    const { id } = this.$route.params;

    this.elderId = id ?? this.$route.query.id;

    this.userInfo();
  },

 
  methods: {
    userInfo() {
      simple_info({
        elderId: this.elderId,
      }).then((res) => {
        this.olderInfo = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.basic_info_box {
  margin: 20px 0 20px 0;
  display: flex;
  align-items: center;
  /* line-height: 50px; */
}

.table_basic /deep/ .el-table__body tr.el-table__row > td {
  background-color: transparent !important;
}
</style>
<template>
  <div class="container_card" style="padding: 24px">
    <div class="title" style="margin-bottom: 10px;">长者基本信息</div>
    <div class="basic_info_box">
      <el-row :getter="20">
        <el-col :span="4">
          <span class="label">长者姓名:</span>
          <span class="fontcolor">{{ olderInfo.elderName }}</span>
        </el-col>
        <el-col :span="4">
          <span class="label">年龄:</span>
          <span class="fontcolor">{{ olderInfo.age }}</span>
        </el-col>
        <el-col :span="4">
          <span class="label">性别:</span>
          <span class="fontcolor">{{ olderInfo.sex=="1" ? "女" :"男" }}</span>
        </el-col>
        <el-col :span="4">
          <span class="label">证件类型:</span>
          <span class="fontcolor">{{ olderInfo.papersType | papersTypes}}</span>
        </el-col>
        <el-col :span="4">
          <span class="label">证件号码:</span>
          <span class="fontcolor">{{ olderInfo.papersCode }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { get_older_baseinfo } from "@/api/pensionagency/goLive/goLive";
  export default {
    data() {
      return {
        olderInfo: {}
      };
    },

    mounted() {
      this.userInfo()
    },
    filters: {
      papersTypes(type) {
        let papersTypeName = "";
        switch (type) {
          case "IC":
            papersTypeName = "身份证";
            break;
          case "DC":
            papersTypeName = "驾照";
            break;
          case "MC":
            papersTypeName = "结婚证";
            break;
          case "PP":
            papersTypeName = "护照";
            break;
          case "SC":
            papersTypeName = "学生证";
            break;
          case "AB":
            papersTypeName = "户口本";
            break;
        }
        return papersTypeName;
      }
    },
    methods: {
      userInfo() {
        get_older_baseinfo({
          elderId:  this.$route.query.id ?? this.$route.params.id
        }).then(res => {
          this.olderInfo = res;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .fontcolor {
    color: rgba(0, 0, 0, 0.5);
    margin-left: 12px;
  }

  .label {
    font-weight: bolder;
    font-size: 14px;
  }

  .basic_info_box {
    margin-top: 20px;
    /* line-height: 50px; */
  }
</style>
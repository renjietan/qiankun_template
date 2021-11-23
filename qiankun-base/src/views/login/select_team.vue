<!-- 
 * @description: 选择团队
 * @fileName: select_team.vue 
 * @author: 胡洁 
 * @date: 2021-07-23 09:36:03
 * @后台人员:  
!-->
<template>
  <div class="container_box">
    <div class="top">
      <div class="top-title">项目管理</div>
      <div class="top-content">
        <el-row class="top-content-row">
          <el-col :span="8" class="top-content-row-col">
            <el-card :class="['top-content-row-col-card', active_type == 0 ? ' active_card' : '']">
              <div class="top-content-row-col-card-body" @click="handleSwitch_orgType(0)">
                <img src="~@/assets/images/CCRC.png" alt />
                <p>CCRC</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" class="top-content-row-col">
            <el-card :class="['top-content-row-col-card', active_type == 1 ? ' active_card' : '']">
              <div class="top-content-row-col-card-body" @click="handleSwitch_orgType(1)">
                <img src="~@/assets/images/Pension_institutions.png" alt />
                <p>养老机构</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" class="top-content-row-col">
            <el-card :class="['top-content-row-col-card', active_type == 2 ? ' active_card' : '']">
              <div class="top-content-row-col-card-body" @click="handleSwitch_orgType(2)">
                <img src="~@/assets/images/home_care.png" alt />
                <p>居家照护</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="search">
      <el-input class="search-input" placeholder="搜索颐养中心" prefix-icon="el-icon-search"></el-input>
    </div>

    <div class="bottom">
      <el-row :gutter="40" class="bottom-row">
        <el-col v-for="(item, index) in orgs" :key="index" :span="4" class="bottom-row-col">
          <el-card class="bottom-row-col-card">
            <div class="bottom-row-col-card-content" @click="handleClick(item)">
              <img :src="item.img" />
              <div>{{ item.name }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import AppLink from "@/layout/components/Sidebar/Link";
  import { loadMicroApp } from 'qiankun'
  export default {
    name: "selectTeam",
    components: { AppLink },
    data() {
      return {
        active_type: 0,
        org_all: {
          ccrc_org: [
            {
              id: 1,
              name: "明源售楼中心",
              img: require("@/assets/images/home_care.png"),
              path: "/ccrc/marketing/"
            }
          ],
          yl_org: [
            {
              id: 1,
              name: "安居福仁颐养中心",
              img: require("@/assets/images/home_care.png"),
              path: "/ccrc/marketing/",
            }
          ],
          home_care_org: []
        }
      };
    },
    computed: {
      orgs() {
        return Object.values(this.org_all ?? [])[this.active_type];
      },
      routers() {
        return this.$routers
      }
    },
    mounted() { },
    watch: {},
    methods: {
      //  async getGerRouter() {
      //     const { accId } = await store.dispatch("user/getUserInfo");
      //     const accessRoutes = await store.dispatch(
      //           "permission/generateRoutes",
      //            accId
      //     );

      //   },
      handleClick(org) {
        let self = this;
        this.$store.dispatch("user/setOrgInfo", org).then(res => {
          self.$router.push(`${org.path}`);
          loadMicroApp({
            name: 'ccrc_marketing',
            entry: '//localhost:9527/ccrc/marketing/',
            container: '#ccrc_marketing',
          });
        });
      },
      handleSwitch_orgType(index) {
        this.active_type = index;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .container_box {
    width: 100%;
    height: 100%;
    background: #f7f7f7;
  }

  .active_card {
    background: $baseColor;
    color: $baseBg;
  }

  .top {
    width: 60%;
    text-align: center;
    margin: 0 auto;

    &-title {
      font-size: 32px;
      font-weight: 500;
      padding-top: 50px;
      color: rgba(0, 0, 0, 0.85);
    }

    &-content {
      margin: 0 auto;

      &-row {
        &-col {
          padding: 40px;

          &-card {
            margin: 0 auto;
            max-width: 230px;
            max-height: 230px;
            cursor: pointer;

            /deep/ .el-card__body {
              padding: 0;
            }

            &-body {
              padding: 20px;

              img {
                /* width: 60%; */
                width: 100px;
                height: 100px;
              }

              p {
                font-size: 22px;
                margin: 20px 0 10px 0;
              }
            }
          }
        }
      }
    }
  }

  .search {
    width: 60%;
    margin: 30px auto 50px auto;
    padding: 0 70px;

    &-input {
      position: relative;
      box-sizing: border-box;

      /deep/ input {
        height: 45px;
        line-height: 45px;
      }
    }
  }

  /deep/.el-input__inner {
    border-radius: 20px;
  }

  .bottom {
    width: 75%;
    margin: 0 auto;

    &-row {
      &-col {
        margin-bottom: 25px;

        &-card {
          cursor: pointer;

          /deep/ .el-card__body {
            padding: 15px;
          }

          &-content {
            display: flex;
            align-items: center;

            img {
              width: 35px;
              height: 35px;
            }

            div {
              flex: 1;
              margin-left: 15px;
              overflow: hidden;
            }
          }

          div {
            flex: 1;
            margin-left: 15px;
            /* white-space: nowrap; */
            /* overflow: hidden; */
          }
        }
      }
    }
  }
</style>
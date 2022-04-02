<template>
  <div class="dashboard-editor-container">
    <div class="dashboard-search">
      <router-search id="header-search" class="right-menu-item" />
    </div>
    <div class="dashboard_title">最近使用/我的应用</div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :md="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon class-name="search-icon" icon-class="tjyy"></svg-icon>
          </div>
          <div class="card-panel-description">添加应用</div>
        </div>
      </el-col>
    </el-row>
    <div class="dashboard_title" style="margin: 30px 0 10px 0">全部应用</div>
    <div class="crumbs" style="margin: 0 0 25px 0">
      <div @click="handle_switchModel('全部')">
        <span
          :class="['crumbs_font', filter == '全部' ? 'crumbs_font_active' : '']"
        >
          <svg-icon class="allServe" icon-class="allServe"></svg-icon
          >{{ "全部" }}
        </span>
        <span class="crumbs_sprit"></span>
      </div>
      <div
        v-for="(item, index) in tags"
        @click="handle_switchModel(item.meta.title)"
        v-if="!item.hidden"
        :key="index"
      >
        <span
          :class="[
            'crumbs_font',
            filter == item.meta.title ? 'crumbs_font_active' : '',
          ]"
        >
          <svg-icon
            class="navigation_icon"
            :icon-class="item.meta.icon"
          ></svg-icon>
          {{ item.meta.title }}
        </span>
        <span class="crumbs_sprit"></span>
      </div>
    </div>
    <el-row :gutter="40" class="panel-group">
      <transition
        name="sidebarLogoFade"
        v-for="(item, index) in panels"
        :key="item.path"
      >
        <el-col
          v-if="!item.hidden"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
          class="card-panel-col"
        >
          <!-- "/" + item.items.filter(item => item != "/").join("/") -->
          <app-link :to="resolvePath(item)">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon
                  class-name="search-icon"
                  :icon-class="item.meta.icon"
                ></svg-icon>
              </div>
              <div hidden-xs-only class="card-panel-description">
                {{ item.meta.title }}
              </div>
            </div>
          </app-link>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import RouterSearch from "@/components/RouterSearch";
import AppLink from "@/layout/components/Sidebar/Link";
import { findAllChldren } from "@/utils/index";
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";

export default {
  name: "workbenchIndex",
  components: {
    RouterSearch,
    AppLink,
  },
  data() {
    return {
      tags: [], // 路由集合
      filter: "全部",
      panels: [], // 单类路由
      variables,
      type:'',
    };
  },

  computed: {
    ...mapGetters(["permission_routes", "acctype"]),
  },
  watch: {
    permission_routes: {
      deep: true,
      handler: function (newval, oldval) {
        let self = this;
        let workbench_routes = []; //工作台的路由
        let tags = []; //标签
        let panels = []; //标签下的路由panel
        //筛选 工作台部分路由
        workbench_routes = newval.filter(
          (item) => item.redirect == self.$route.path
        );
        console.log(workbench_routes)
        tags =
          workbench_routes.length > 0
            ?  workbench_routes.length == 1
              ? workbench_routes[0].children.filter((item) => {
                  return (
                    "/" +
                      item.items.filter((child) => child != "/").join("/") !=
                    self.$route.path
                  );
                })
              : workbench_routes[1].children.filter((item) => {
                  return (
                    "/" +
                      item.items.filter((child) => child != "/").join("/") !=
                    self.$route.path
                  );
                })
            : [];
        self.tags = tags;
        panels = findAllChldren(workbench_routes);
        if (self.filter == "全部") {
          self.panels = panels;
        } else {
          let panels = self.tags.filter(
            (item) => item.meta.title == self.filter
          );
          self.panels = panels.length == 0 ? [] : panels[0].children;
        }
      },
      immediate: true,
    },
  },

  methods: {
    handle_switchModel(val) {
      let self = this;
      self.filter = val;
      if (val != "全部") {
        let panels = self.tags.filter((item) => item.meta.title == val);
        self.panels = panels.length == 0 ? [] : panels[0].children;
      } else {
        self.panels = findAllChldren(self.tags);
      }
    },
    resolvePath(item) {
      let path = "/" + item.items.filter((item) => item != "/").join("/");
      return item.redirect == undefined ? path : item.redirect;
    },
  },
};
</script>

<style lang="scss" scoped>
.crumbs {
  > div {
    cursor: pointer;
    display: inline-block;
    color: rgba(186, 186, 186, 1);

    &:last-child {
      .crumbs_sprit {
        display: none;
      }
    }

    .crumbs_sprit {
      display: inline-block;
      line-height: 40px;
      margin-right: 20px;
    }

    .crumbs_font {
      display: inline-block;
      line-height: 40px;
      margin-right: 20px;
      border: none;
      color: #000000;

      .navigation_icon {
        padding-top: 4px;
        color: #000;
      }
    }

    .crumbs_font_active {
      border: 1px solid #017cff;
      background-color: #017cff;
      color: #fff;
      padding: 0 15px;
      border-radius: 5px;

      .navigation_icon {
        fill: #fff;
      }
    }
  }
}

.allServe {
  padding-right: 7px;
  padding-top: 5px;
}
@import "~@/styles/variables.scss";

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.dashboard-editor-container {
  padding: 32px 150px;
  min-height: 860px;
  position: relative;
  background-color: #f7f7f7;

  .dashboard-search {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 0 50px 0;

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      background: white;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }

  .dashboard_title {
    color: #000000;
    font-size: 18px;
    letter-spacing: 3px;
    font-weight: bolder;
  }

  .panel-group {
    margin-top: 30px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 80px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      border-radius: 7px;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;

      .card-panel-icon-wrapper {
        margin: 0 17px 0 17px;
        transition: all 0.38s ease-out;
        border-radius: 2px;
        // background: rgba(47, 138, 237, 1);
        color: white;
        font-size: 12px;
        .search-icon {
          font-size: 28px;
        }
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        /* margin: 26px; */
        margin-left: 0px;
        color: #333333;
        font-size: 14px;
        font-weight: 600;
        /* white-space: nowrap; */
      }
    }
  }
}
</style>
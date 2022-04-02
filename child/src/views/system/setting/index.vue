<!-- 
 * @description: 
 * @fileName: index.vue 
 * @author: 谭人杰 
 * @date: 2021-05-17 19:46:32
 * @后台人员:  
!-->
<template>
  <div class="dashboard-editor-container">
    <div class="dashboard-search">
      <router-search id="header-search" class="right-menu-item" />
    </div>
    <div class="dashboard_title">最近使用/我的应用</div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon class-name="search-icon" icon-class="dashboard"></svg-icon>
          </div>
          <div class="card-panel-description">
            添加应用
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="dashboard_title" style="margin: 30px 0 10px 0;">全部应用</div>
    <div class="crumbs" style="margin: 0 0 25px 0;">
      <div @click="handle_switchModel('全部')">
        <span :class="['crumbs_font', filter == '全部' ? 'crumbs_font_active' : '']">全部</span>
        <span class="crumbs_sprit">/</span>
      </div>
      <div v-for="(item, index) in tags" @click="handle_switchModel(item.meta.title)" v-if="!item.hidden" :key="index">
        <span :class="['crumbs_font', filter == item.meta.title ? 'crumbs_font_active' : '']">{{
          item.meta.title }}</span>
        <span class="crumbs_sprit">
          /
        </span>
      </div>
    </div>
    <!-- <div class="crumbs">
      <span>
        <span @click="handle_switchModel('全部')"
          :style="{'margin-right': '15px','padding-bottom': '5px','border-bottom': filter == '全部' ? '3px solid ' + variables.baseColor : 0}">全部</span>
      </span>
      <span v-for="(item, index) in tags" @click="handle_switchModel(item.meta.title)" :key="index">/
        <span :style="{'border-bottom': filter == item.meta.title ? '3px solid ' + variables.baseColor : 0}">{{
          item.meta.title }}</span>
      </span>
    </div> -->
    <el-row :gutter="40" class="panel-group">
      <transition name="sidebarLogoFade" v-for="(item, index) in panels" :key="item.path">
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <app-link :to='item.items.filter(item => item != "/").join("/")'>
            <div class="card-panel" @click="handleClick(item.items)">
              <div class="card-panel-icon-wrapper">
                <svg-icon class-name="search-icon" icon-class="dashboard"></svg-icon>
              </div>
              <div class="card-panel-description">
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
  import RouterSearch from '@/components/RouterSearch'
  import AppLink from '@/layout/components/Sidebar/Link'
  import { findAllChldren } from '@/utils/index';
  import { mapGetters } from 'vuex';
  import variables from '@/styles/variables.scss'

  export default {
    name: 'workbench',
    components: {
      RouterSearch,
      AppLink
    },
    data() {
      return {
        tags: [], // 路由集合
        filter: "全部",
        panels: [], // 单类路由.
        variables,
      }
    },
    computed: {
      ...mapGetters(["permission_routes"])
    },
    mounted() {
    },
    watch: {
      "permission_routes": {
        deep: true,
        handler: function (newval, oldval) {
          let self = this
          let workbench_routes = [] //工作台的路由
          let tags = [] //标签
          let panels = [] //标签下的路由panel
          //筛选 工作台部分路由
          workbench_routes = newval.filter(item => item.redirect == self.$route.path)
          tags = workbench_routes.length > 0 ? workbench_routes[0].children.filter(item => item.items.filter(child => child != "/").join("/") != self.$route.path) : []

          self.tags = tags
          panels = self.findAllChldren(workbench_routes)

          if (self.filter == "全部") {
            self.panels = panels
          } else {
            let panels = self.tags.filter(item => item.meta.title == self.filter)
            self.panels = panels.length == 0 ? [] : panels[0].children
          }

        },
        immediate: true
      }
    },
    methods: {
      handleClick(val) {
      },
      findAllChldren(nodes, arrs = []) {
        let self = this

        let flat = function (nodes, arr = []) {
          if (!Array.isArray(nodes)) return
          nodes.forEach((n, i) => {
            if (!n.children && !n.hidden && n.items.filter(item => item != "/").join("/") != self.$route.path) {
              let { items } = n;
              arr.push(n)
            }
            n.children && flat(n.children, arr);
          })
          return arr
        }
        return flat(nodes, arrs)
      },
      handle_switchModel(val) {
        let self = this
        self.filter = val;
        if (val != "全部") {
          let panels = self.tags.filter(item => item.meta.title == val)
          self.panels = panels.length == 0 ? [] : panels[0].children
        } else {
          self.panels = findAllChldren(self.tags)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .dashboard-editor-container {
    padding: 32px 150px;
    position: relative;

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
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }
    }



    .dashboard_title {
      color: rgba(94, 95, 95, 0.6);
      font-size: 20px;
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
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
        display: flex;
        align-items: center;

        .card-panel-icon-wrapper {
          margin: 0 17px 0 24px;
          padding: 10px;
          transition: all 0.38s ease-out;
          border-radius: 2px;
          background: rgba(47, 138, 237, 1);
          color: white;
          font-size: 12px;
        }

        .card-panel-icon {
          float: left;
          font-size: 48px;
        }

        .card-panel-description {
          float: right;
          margin: 26px;
          margin-left: 0px;
          color: $baseColor;
          font-size: 17px;
        }
      }
    }
  }
</style>
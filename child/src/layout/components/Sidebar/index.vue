<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <avatar v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
      </el-menu> -->
      <sidebar-item :isActive="`${route.redirect}`.split('/')[1] == activeMenu[1]"
        v-for="(route, index) in routers" :key="route.path" :item="route" :base-path="route.path" />
      <el-menu :text-color="variables.menuText" :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg" :collapse="true" class="menu">
        <el-submenu index="1" class="submenu">
          <template slot="title">
            <i class="el-icon-more" style="font-size: 22px;"></i>
            <!-- <span slot="title">更多</span> -->
          </template>
          <el-menu-item class="popup-more" index="1-1" @click="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from "@/components/Avatar"
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import { mount } from '@vue/test-utils'

  export default {
    components: { SidebarItem, Avatar },
    data() {
      return {
        routers: [],
      }
    },
    mounted() {
     
      // this.permission_routes =  this.permission_routes.map(el=>{
      //   if(!el.title){
      //     el.hidden = true;
      //   }
      //   return el;
      // })
    },
    methods: {
      async logout() {
        await this.$store.dispatch('user/logout').then(() => {
          /**
           * @description 解决返回登陆页 再次登陆时 出现页面空白问题
           * @author 谭人杰
           * @date 2020-06-11 20:19:09
          */
          location.reload()
        })
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    },
    watch: {
      permission_routes: {
        deep: true,
        immediate:true,
        handler: function (newval, oldval) {
          this.routers = newval.map(el => {
            if (!el.title) {
              el.hidden = true;
            }
            return el;
          })
          console.log(this.routers)
        }
      }
    },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),

      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path.split("/")
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return false
      }
    }
  }
</script>

<style lang="scss">

  .el-menu--vertical {
    .el-menu {
      background: white !important;
      &-item {
        background: white !important;
        &:hover {
          background: white !important;
        }
      }
    }
  }

  .menu {
    margin-top: 10px;

    .el-submenu__title>span {
      width: 75px !important;
      line-height: 30px;
      overflow: visible !important;
      visibility: visible !important;
      display: inline-block !important;
      font-size: 12px !important;
      color: white !important;
    }

    .el-submenu__title {
      display: flex;
      flex-direction: column;
      height: 75px;
      align-items: center;
      justify-items: center;
    }

  }
</style>
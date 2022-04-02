<template>
  <div v-if="!item.hidden">
    <template>
      <!-- <el-menu-item :index="resolvePath(item.redirect ? item.redirect : item.path)" :class="{'submenu-title-noDropdown':!isNest}"> -->
      <div :class="{'submenu-title-noDropdown':!isNest}" :style= "{'color': isActive ? variables.menuActiveText: variables.menuText}">
        <app-link :to='resolvePath(item.path)' >
          <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        </app-link>
      </div>  
    </template>
  </div>
</template>

<script>
  import path from 'path'
  import { isExternal } from '@/utils/validate'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'
  import variables from '@/styles/variables.scss'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },

    data() {
      this.onlyOneChild = null;
      
      return {
        variables
      }
    },

    mounted() {
      
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            this.onlyOneChild = item
            return true
          }
        })
        if (showingChildren.length === 1) {
          return true
        }
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath+'/index')
      }
    }
  }
</script>
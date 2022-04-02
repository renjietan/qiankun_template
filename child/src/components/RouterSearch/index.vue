<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" />
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option
      remote placeholder="请输入地址或页面名称......" class="header-search-select" @change="change">
      <el-option style="width: 545px;" v-for="item in options" :key="item.path" :value="item"
        :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>

  import Fuse from 'fuse.js'
  import path from 'path'
  import { isExternal } from '@/utils/validate'

  export default {
    name: 'RouterSearch',
    data() {
      return {
        search: '',
        options: [],
        searchPool: [],
        show: false,
        fuse: undefined
      }
    },
    computed: {
      routes() {
        return this.$store.getters.permission_routes
      }
    },
    watch: {
      routes() {
        this.searchPool = this.generateRoutes(this.routes)
      },
      searchPool(list) {
        this.initFuse(list)
      },

    },
    mounted() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    methods: {
      change(val) {
        if(isExternal(val.path)) {
          window.open(val.path)
        } else {
          this.$router.push(val.path)          
        }
        this.search = ''
        this.options = []
      },
      initFuse(list) {
        this.fuse = new Fuse(list, {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [{
            name: 'title',
            weight: 0.7
          }, {
            name: 'path',
            weight: 0.3
          }]
        })
      },

      generateRoutes(routes, basePath = '/', prefixTitle = []) {
        let res = []
        for (const router of routes) {

          if (router.hidden) { continue }
          const data = {
            path: isExternal(router.path) ? router.path : path.resolve(basePath, router.path),
            title: [...prefixTitle]
          }

          if (router.meta && router.meta.title) {
            data.title = [...data.title, router.meta.title]

            if (router.redirect !== 'noRedirect') {
              res.push(data)
            }
          }

          if (router.children) {
            const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
            if (tempRoutes.length >= 1) {
              res = [...res, ...tempRoutes]
            }
          }
        }
        return res
      },
      querySearch(query) {
        if (query !== '') {
          this.options = this.fuse.search(query)
        } else {
          this.options = []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-search {
    font-size: 0 !important;
    width: 600px;
    background: red;
    display: flex;
    border-radius: 5px;

    .search-icon {
      cursor: pointer;
      font-size: 12px;
      vertical-align: middle;
      color: silver;
    }

    .header-search-select {

      font-size: 18px;
      margin-left: 20px;
      transition: width 0.2s;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      /deep/ .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        vertical-align: middle;
        width: 545px
      }
    }

    &.show {
      .header-search-select {
        width: 350px;
        margin-left: 10px;
      }
    }
  }
</style>
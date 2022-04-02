const steps = [
    {
      element: '#hamburger-container',
      popover: {
        title: '展开菜单栏',
        description: '打开或关闭菜单栏',
        position: 'bottom'
      }
    },
    {
      element: '#breadcrumb-container',
      popover: {
        title: '路径',
        description: '指示当前页面路径',
        position: 'bottom'
      }
    },
    {
      element: '#header-search',
      popover: {
        title: '页面搜索框',
        description: '页面搜索，快速导航',
        position: 'left'
      }
    },
    {
      element: '#screenfull',
      popover: {
        title: '全屏',
        description: '设置页面全屏',
        position: 'left'
      }
    },
    {
      element: '#size-select',
      popover: {
        title: '切换尺寸',
        description: '切换系统中按钮等组件的尺寸',
        position: 'left'
      }
    },
    {
      element: '#tags-view-container',
      popover: {
        title: '标签栏',
        description: '页面历史标签栏',
        position: 'bottom'
      },
      padding: 0
    }
  ]
  
  export default steps
  
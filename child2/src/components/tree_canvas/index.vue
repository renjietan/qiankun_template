<template>
  <div>
    <div style="width: 100%; height: 100%;" ref="tree_canvas"></div>
  </div>
</template>

<script>
  import TreeChart from 'd3-org-chart';
  export default {
    name: "tree_canvas",
    props: {
      data: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        chartReference: null
      };
    },

    watch: {
      data: {
        deep: true,
        // immediate: true,
        handler: function(newval,oldval){
          let self = this
          
          self.renderChart(newval);
        }, 
      }
    },
    created() {
      
    },

  methods: {
      renderChart(val) {
        let self = this
        if (!self.chartReference) {
          self.chartReference = new TreeChart();
        }
        self.chartReference
          .container(self.$refs.tree_canvas)
          .data(val)
          .svgWidth(500)
          .initialZoom(0.6)
          .onNodeClick(d => console.log(d + ' node clicked'))
          .render();
      }
    }
  }
</script>
<style scoped>
</style>
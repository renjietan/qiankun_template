<!-- 
 * @description:本月增值服务 
 * @fileName: add_services.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:04:34
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "AddServices",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "AddServices"
    },
    width: {
      type: String,
      default: "420px"
    },
    height: {
      type: String,
      default: "150px"
    },
    finPercent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    // finPercent: {
    //   handler(newName, oldName) {
    //     console.log(oldName);
    //     this.initChart();
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item"
        },
        color: ["#5655F7", "#4AA8FF"],
        legend: {
          show: true,
          orient: "horizontal",
          bottom: "6%",
          left: "3%",
          formatter: function(name) {
            let index = 0;
            let dataLabels = ["医疗服务：", "生活服务："];
            let dataValue = [1048, 735];
            dataLabels.forEach(function(value, i) {
              if (value == name) {
                index = i;
              }
            });
            let arr = ["{a|" + name + "}" + "{b|" + dataValue[index] + "}"];
            return arr.join("\n");
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                color: "#000000A6"
              },
              b: {
                fontSize: 14,
                color: "#000000D9",
                padding: [0, 0]
              }
            }
          },
          // icon: 'circle',
          padding: 5,
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 18,
          data: [
            {
              name: "医疗服务：",
              textStyle: {
                fontSize: 14,
                color: "#000000A6"
              }
            },
            {
              name: "生活服务：",
              textStyle: {
                fontSize: 14,
                color: "#000000A6"
              }
            }
          ]
        },
        series: [
          {
            name: "服务类型",
            type: "pie",
            radius: ["58%", "78%"],
            center: ["80%", "50%"],
            avoidLabelOverlap: false,
            hoverAnimation: false, //设置鼠标经过饼图不放大
            label: {
              show: false,
              position: "center"
            },
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 1
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: "医疗服务：" },
              { value: 735, name: "生活服务：" }
            ]
          }
        ]
      });
    }
  }
};
</script>

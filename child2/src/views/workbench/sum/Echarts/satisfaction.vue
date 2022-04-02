<!-- 
 * @description:满意度 
 * @fileName: satisfaction.vue 
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
  name: "Satisfaction",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "Satisfaction"
    },
    width: {
      type: String,
      default: "150px"
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
        title: [
        ],
        backgroundColor: "transparent",
        polar: {
          radius:" 130%",
          center: ["50%", "50%"]
        },
        angleAxis: {
          max: 100,
          show: false,
          startAngle:0
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true,
            barWidth: 15,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(254, 242, 229)"
            },
            data: [80],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#FAA546"
                  },
                  {
                    offset: 1,
                    color: "#FAA546"
                  }
                ])
              }
            }
          }
        ]
      });
    }
  }
};
</script>

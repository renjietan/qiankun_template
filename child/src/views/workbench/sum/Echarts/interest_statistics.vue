<!-- 
 * @description:兴趣爱好统计
 * @fileName: interest_statistics.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-24 16:04:09
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "InterestStatistics",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "InterestStatistics"
    },
    width: {
      type: String,
      default: "588px"
    },
    height: {
      type: String,
      default: "295px"
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
          trigger: "item",
          // axisPointer: {
          //   type: "shadow"
          // }
        },
        grid: {
          top: "5%",
          right: "3%",
          left: "5%",
          bottom: "16%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["看书", "读报", "绘画", "下棋", "唱歌", "其他"],
            axisLine: {
              lineStyle: {
                color: "#D9D9D9"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#000000A6",
              textStyle: {
                fontSize: 12
              }
            },
            axisTick: {
              show: true
            },

            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#000000A6"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,186,255,.6)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#E8E8E8",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [80, 80, 97, 53, 95, 26, 72],
            barWidth: "28px",

            itemStyle: {
              normal: {
                barBorderRadius: 30,

                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#017CFF" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#7DBCFF" // 100% 处的颜色
                    }
                  ],
                  false
                )
                // shadowColor: 'rgba(0,160,221,1)',
                // shadowBlur: 4,
              }
            }
            // label: {
            //     normal: {
            //         show: true,
            //         lineHeight: 30,
            //         formatter: '{c}',
            //         position: 'top',
            //         textStyle: {
            //             color: '#00D6F9',
            //             fontSize: 20
            //         }

            //     }
            // }
          }
        ]
      });
    }
  }
};
</script>

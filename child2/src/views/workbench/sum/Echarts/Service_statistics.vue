<!-- 
 * @description:服务等级统计 
 * @fileName: Service_statistics.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-24 16:09:34
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "ServiceStatistics",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "ServiceStatistics"
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
      var colorList = ["#5655F7", "#4AA8FF", "#1FCDA0", "#FAA546", "#FE4172"];
      var datas = [
        {
          value: 36,
          name: "介助1级："
        },
        {
          value: 54,
          name: "介助2级："
        },
        {
          value: 29,
          name: "介助3级："
        },
        {
          value: 25,
          name: "介助4级："
        },
        {
          value: 55,
          name: "介助5级："
        }
      ];
      let maxArr = new Array(datas.length).fill(100);

      this.chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter(params) {
            return params.value + "人";
          }
          // axisPointer: {
          //   type: "shadow"
          // }
        },
        grid: {
          top: "-2%",
          right: "5%",
          left: "-13%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true,
                margin: 30
              }
            },
            data: datas.map(item => item.name),
            axisLabel: {
              margin: 135,
              fontSize: 14,
              align: "left",
              color: "#333",
              rich: {
                a1: {
                  color: colorList[0],
                  backgroundColor: colorList[0],
                  width: 12,
                  height: 12,
                  align: "center",
                  borderRadius: 2
                },
                a2: {
                  color: colorList[1],
                  backgroundColor: colorList[1],
                  width: 12,
                  height: 12,
                  align: "center",
                  borderRadius: 2
                },
                a3: {
                  color: colorList[2],
                  backgroundColor: colorList[2],
                  width: 12,
                  height: 12,
                  align: "center",
                  borderRadius: 2
                },
                a4: {
                  color: colorList[3],
                  backgroundColor: colorList[3],
                  width: 12,
                  height: 12,
                  align: "center",
                  borderRadius: 2
                },
                a5: {
                  color: colorList[4],
                  backgroundColor: colorList[4],
                  width: 12,
                  height: 12,
                  align: "center",
                  borderRadius: 2
                }
              },
              formatter: function(params) {
                let index1=0;
                let dataLabels = [
                  "介助1级：",
                  "介助2级：",
                  "介助31级：",
                  "介助4级：",
                  "介助5级："
                ];
                let dataValue = [36, 54, 29, 25, 55];
                let index = datas.map(item => item.name).indexOf(params);
                index = index + 1;
                dataLabels.forEach(function(value, i) {
                  if (value == params) {
                    index1 = i;
                  }
                });
                return [
                  "{a" +index +"|" + index +"}" +"  " + params + dataValue[index1]+"人"].join("\n");
              }
            }
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            data: datas.map(item => item.value),
            axisLabel: {
              show: true,
              fontSize: 14,
              color: "#262626",
              formatter: "{value}%"
            }
          }
        ],
        series: [
          {
            z: 2,
            name: "value",
            type: "bar",
            barWidth: 10,
            zlevel: 1,
            //  data: datas.map(item => item.value),
            data: datas.map((item, i) => {
              let itemStyle = {
                color: colorList[i],
                barBorderRadius: 10
              };
              return {
                value: item.value,
                itemStyle: itemStyle
              };
            }),
            label: {
              show: false,
              position: "right",
              color: "#333333",
              fontSize: 14,
              offset: [10, 0]
            }
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 10,
            barGap: "-100%",
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: "#F1F4F7"
              }
            },
            data: maxArr
          }
        ]
      });
    }
  }
};
</script>
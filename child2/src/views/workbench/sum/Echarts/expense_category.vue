<!-- 
 * @description:费用类别统计 
 * @fileName: expense_category.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-24 19:27:28
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
import { sum } from "@/router/modules/workbench/sum";

export default {
  name: "ExpenseCategory",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "ExpenseCategory"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "434px"
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
        color: ["#5655F7", "#4AA8FF", "#1FCDA0", "#FAA546", "#FE4172"],
        legend: {
          show: true,
          orient: "vertical",
          top: "8%",
          right: "12.7%",
          formatter: function(name) {
            let index = 0;
            let dataLabels = [
              "护理费套餐一",
              "基础床位费",
              "护理费套餐二",
              "护理费套餐三",
              "护理费套餐四"
            ];
            let dataValue = [22024, 8024, 3024, 11024, 1024];
            let sum = 0;
            dataValue.forEach(function(val, i, dataValue) {
              sum += val;
            return sum;
            }, 0);
            dataLabels.forEach(function(value, i) {
              if (value == name) {
                index = i;
              }
            });
            let arr = ["{a|" + name  + "   "  +(dataValue[index]/sum*100).toFixed()+"%" + "}" + "\n{b|" + dataValue[index] + "}"];
            return arr.join("\n");
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                color: "#333333",
                padding:6
              },
              b: {
                fontSize: 14,
                color: "#8c8c8c",
                padding: [0, 6]
              }
            }
          },
          // icon: 'circle',
          padding: 5,
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 16,
          data: [
            {
              name: "护理费套餐一",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "基础床位费",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "护理费套餐二",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "护理费套餐三",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "护理费套餐四",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            }
          ]
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: ["34%", "54%"],
            center: ["30%", "40%"],
            roseType: "area",
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
              { value: 8024, name: "护理费套餐一" },
              { value: 7024, name: "基础床位费" },
              { value: 6024, name: "护理费套餐二" },
              { value: 5024, name: "护理费套餐三" },
              { value: 4024, name: "护理费套餐四" }
            ]
          }
        ]
      });
    }
  }
};
</script>

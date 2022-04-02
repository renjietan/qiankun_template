<!-- 
 * @description:学历统计 
 * @fileName: education_statistics.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-24 11:42:05
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "EducationStatistics",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "EducationStatistics"
    },
    width: {
      type: String,
      default: "588px"
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
        color: [
          "#5655F7",
          "#4AA8FF",
          "#1FCDA0",
          "#FAA546",
          "#FE4172",
          "#F7C739"
        ],
        legend: {
          show: true,
          orient: "vertical",
          top: "35%",
          left: "5.7%",
          formatter: function(name) {
            let index = 0;
            let dataLabels = [
              "硕士：",
              "本科：",
              "初中：",
              "高中：",
              "大专：",
              "其它："
            ];
            let dataValue = [5866, 4866, 4866, 4866, 5866, 4866, 4866];
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
                fontSize: 12,
                color: "#666666"
              },
              b: {
                fontSize: 12,
                color: "#666666",
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
              name: "硕士：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "本科：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "初中：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "高中：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "大专：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            },
            {
              name: "其它：",
              textStyle: {
                fontSize: 12,
                color: "#666666"
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
              { value: 5866, name: "硕士：" },
              { value: 4866, name: "本科：" },
              { value: 4866, name: "初中：" },
              { value: 4866, name: "高中：" },
              { value: 5866, name: "大专：" },
              { value: 4866, name: "其它：" }
            ]
          }
        ]
      });
    }
  }
};
</script>
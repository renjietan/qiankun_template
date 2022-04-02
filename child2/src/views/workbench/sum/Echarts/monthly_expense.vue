<!-- 
 * @description:月度费用统计 
 * @fileName: monthly_expense.vue 
 * @author: 姜纬杰 
 * @date: 2022-02-24 19:48:31
 * @后台人员:  
!-->
<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import moment from "moment";
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "MonthlyExpense",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "MonthlyExpense"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "434px"
    }
    // dateVal1: {
    //   type: String,
    //   default: ""
    // }
  },
  data() {
    return {
      listData: [],
      timeData: [],
      dataValue: [58, 36, 64, 29, 56, 45, 38, 56, 36, 60],
      chart: null
    };
  },
  mounted() {
    this.initChart();
    this.monthTime();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    const self = this;
    // self.dayTime();
    // console.log(self.timeData);
  },
  // watch: {
  //   dateVal1: {
  //     handler(newName, oldName) {
  //       // console.log(oldName);
  //       this.initChart();
  //     },
  //     deep: true
  //   },
  //   dataValue: {
  //     handler(newName, oldName) {
  //       // console.log(oldName);
  //       this.initChart();
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    monthTime() {
      console.log("子组件的month");
      const self = this;
      let list = {};
      for (let index = 0; index < 10; index++) {
        var _time = moment(new Date())
          .subtract(index, "months")
          .format("yyyy-MM");
        // list.unshift({
        //   time: moment(new Date())
        //     .subtract(index, "days")
        //     .format("MM-DD")
        // });
        list[_time] = {
          time: _time
        };
      }
      self.listData = list;
      self.timeData = Object.keys(self.listData);
      self.timeData.reverse();
      // console.log(self.timeData);
      self.initChart();
    },

    // console.log(self.dataValue);
    initChart() {
      const self = this;
      self.chart = echarts.init(document.getElementById(self.id));
      self.chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          transitionDuration: 0
        },
        grid: {
          top: "8%",
          left: "2%",
          right: "4%",
          bottom: "22%",
          containLabel: true
        },
        legend: {
          show: true,
          orient: "horizontal", // 布局方式，默认为水平布局，可选为：
          // 'horizontal' ¦ 'vertical'
          right: "43%", // 水平安放位置，默认为全图居中，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          top: "0%", // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          padding: 5, // 图例内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
          // 横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 16, // 图例图形宽度
          itemHeight: 8, // 图例图形高度
          data: [
            {
              name: "到账费用统计",
              textStyle: {
                fontSize: 12,
                color: "#666666"
              }
            }
          ]
          // textStyle: {
          //   color: "#FFFFFF" // 图例文字颜色
          // }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,

            name: "时间",
            nameTextStyle: {
              color: "#D9D9D9",
              fontFamily: "PingFang SC",
              fontSize: 12,
              padding: [40, 0, 0, 10]
            },
            axisLine: {
              show: true
            },
            // splitArea: {
            //   show: false,
            //   color: "#f00",
            //   lineStyle: {
            //     color: "#f00"
            //   }
            // },
            axisLabel: {
              interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
              margin: 15,
              show: true,
              textStyle: {
                color: "#000000A6",
                fontSize: 10
              }
            },

            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#D9D9D9"
                // opacity:0.2
              }
            },
            splitLine: {
              show: false
            },
            // data: self.timeData
            data: self.timeData
          }
        ],

        yAxis: [
          {
            name: "到账费用/万元",
            type: "value",
            nameTextStyle: {
              color: "#999999",
              fontFamily: "PingFang SC",
              fontSize: 12,
              padding: [0, 0, 0, 80]
            },
            type: "value",
            min: 0,
            // max: 4000,
            splitNumber: 5,
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000000A6",
                fontStyle: "normal",
                fontFamily: "PingFang SC",
                fontSize: 12
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#D9D9D9"
              }
            }
          }
        ],
        series: [
          {
            name: "到账费用统计",
            type: "line",
            smooth: true, //是否平滑
            // showAllSymbol: true,
            // // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#017CFF",
                lineStyle: {
                  color: "#017CFF",
                  shadowColor: "#017CFF",
                  shadowBlur: 1
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(224, 240, 250, .8)"
                    },
                    {
                      offset: 1,
                      color: "#FFFFFF"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(224, 240, 250, .8)",
                shadowBlur: 20
              }
            },
            // data: self.dataValue
            data: [58, 36, 64, 29, 56, 45, 38, 56, 36, 60]
          }
        ]
      });
    }
  }
};
</script>
<!-- 
 * @description:评估等级卡绑定 
 * @fileName: table_card.vue 
 * @author: 姜纬杰 
 * @date: 2021-08-20 11:42:22
 * @后台人员:  
!-->
<template>
  <div class="dsjdnjdfnj">
    <el-table
      border
      ref="data_card"
      :data="table_card"
      :span-method="objectSpanMethod"
      :header-cell-style="{background:'#fff',color:'#333333',fontSize:'14px',}"
      :cell-style="changeCellStyle"
      fit
    >
      <el-table-column width="50" align="center" type="index" label></el-table-column>
      <el-table-column width align="center" prop="type" label="能力等级"></el-table-column>

      <el-table-column width="110" align="center" prop="ac_num" label="日常生活活动"></el-table-column>
      <el-table-column align="center" prop="score" label="精神状态">
        <el-table-column width="57" align="center" prop="num1" label="0"></el-table-column>
        <el-table-column width="57" align="center" prop="num2" label="1"></el-table-column>
        <el-table-column width="57" align="center" prop="num3" label="2"></el-table-column>
        <el-table-column width="57" align="center" label="3">
          <template slot-scope="scope">
            <div>
              <i style="font-size: 24px;" v-if="scope.row.num4 == '&radic'" class="el-icon-check"></i>
              <span v-else>
                {{ scope.row.num4 }}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width align="center" prop="levelDesc" label="感知觉与沟通">
        <el-table-column width="57" align="center" prop="num5" label="0"></el-table-column>
        <el-table-column width="57" align="center" label="1">
          <template slot-scope="scope">
            <div>
              <i style="font-size: 24px;" v-if="scope.row.num6 == '&radic'" class="el-icon-check"></i>
              <span v-else>
                {{ scope.row.num6 }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="57" align="center" prop="num7" label="2"></el-table-column>
        <el-table-column width="57" align="center" prop="num8" label="3"></el-table-column>
      </el-table-column>
      <el-table-column width align="center" prop="levelDesc" label="社会参与">
        <el-table-column width="57" align="center" prop="num9" label="0"></el-table-column>
        <el-table-column width="57" align="center" prop="num10" label="1"></el-table-column>
        <el-table-column width="57" align="center" prop="num11" label="2"></el-table-column>
        <el-table-column width="57" align="center" label="3">
          <template slot-scope="scope">
            <div>
              <i style="font-size: 24px;" v-if="scope.row.num12 == '&radic'" class="el-icon-check"></i>
              <span v-else>
                {{ scope.row.num12 }}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "tableCard",
  data() {
    return {
      table_card: [
        {
          type: "能力完好",
          ac_num: 0,
          num1: "正",
          num5: "正",
          num8: "正",
          num9: "正"
        },
        {
          type: "能力完好",
          ac_num: 1
        },
        {
          type: "能力完好",
          ac_num: 2
        },
        {
          type: "能力完好",
          ac_num: 3
        },
        {
          type: "轻度失能",
          ac_num: 0,
          num2: "轻",
          num3: "轻",
          num4: "轻",
          num6: "轻",
          num7: "轻",
          num8: "轻",
          num11: "轻",
          num12: "轻"
        },
        {
          type: "轻度失能",
          ac_num: 1,
          num1: "轻",
          num2: "轻",
          num5: "轻",
          num6: "轻",
          num9: "轻",
          num10: "轻"
        },
        {
          type: "轻度失能",
          ac_num: 2
        },
        {
          type: "轻度失能",
          ac_num: 3
        },
        {
          type: "中度失能",
          ac_num: 0
        },
        {
          type: "中度失能",
          ac_num: 1,
          num3: "中",
          num4: "&radic",
          num6: "&radic",
          num7: "中",
          num8: "中",
          num11: "中",
          num12: "&radic"
        },
        {
          type: "中度失能",
          ac_num: 2,
          num1: "中",
          num2: "中",
          num3: "中",
          num5: "中",
          num6: "中",
          num7: "中",
          num9: "中",
          num10: "中",
          num11: "中"
        },
        {
          type: "中度失能",
          ac_num: 3
        },
        {
          type: "重度失能",
          ac_num: 0
        },
        {
          type: "重度失能",
          ac_num: 1
        },
        {
          type: "重度失能",
          ac_num: 2,
          num3: "重",
          num4: "重",
          num7: "重",
          num8: "重",
          num11: "重",
          num12: "重"
        },
        {
          type: "重度失能",
          ac_num: 3,
          num1: "重",
          num2: "重",
          num3: "重",
          num4: "重",
          num5: "重",
          num6: "重",
          num7: "重",
          num8: "重",
          num9: "重",
          num10: "重",
          num11: "重",
          num12: "重"
        }
      ]
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    changeCellStyle({ row, column, rowIndex, columnIndex }) {
      switch (rowIndex) {
        case 0:
          if (columnIndex === 2) {
            return { background: "#afd6ff", color: "#333" };
          }
          if (columnIndex === 3) {
            return { background: "#afd6ff", color: "#333" };
          }
          if (columnIndex === 7) {
            return { background: "#afd6ff", color: "#333" };
          }
          if (columnIndex === 10) {
            return { background: "#afd6ff", color: "#333" };
          }
          if (columnIndex === 11) {
            return { background: "#afd6ff", color: "#333" };
          }
          break;
        case 4:
          if (columnIndex === 2) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 4) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 5) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 6) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 8) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 9) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 10) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 13) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 14) {
            return { background: "#bef5e7", color: "#333" };
          }
          break;
        case 5:
          if (columnIndex === 2) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 3) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 4) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 7) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 8) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 11) {
            return { background: "#bef5e7", color: "#333" };
          }
          if (columnIndex === 12) {
            return { background: "#bef5e7", color: "#333" };
          }
          break;
        case 9:
          if (columnIndex === 2) {
            return { background: "#ffb1c2", color: "#333" };
          }
          if (columnIndex === 5) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 6) {
            return { background: "#ffb1c2", color: "#ec0031" };
          }
          if (columnIndex === 8) {
            return { background: "#ffb1c2", color: "#ec0031" };
          }
          if (columnIndex === 9) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 10) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 13) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 14) {
            return { background: "#ffb1c2", color: "#ec0031" };
          }
          break;
        case 10:
          if (columnIndex === 2) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 3) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 4) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 5) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 7) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 8) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 9) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 11) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 12) {
            return { background: "#fdf1b6", color: "#333" };
          }
          if (columnIndex === 13) {
            return { background: "#fdf1b6", color: "#333" };
          }
          break;
        case 14:
          if (columnIndex === 2) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 5) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 6) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 9) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 10) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 13) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 14) {
            return { background: "#ffd1b5", color: "#333" };
          }
          break;
        case 15:
          if (columnIndex === 2) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 3) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 4) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 5) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 6) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 7) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 8) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 9) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 10) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 11) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 12) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 13) {
            return { background: "#ffd1b5", color: "#333" };
          }
          if (columnIndex === 14) {
            return { background: "#ffd1b5", color: "#333" };
          }
          break;

        default:
          break;
      }
      if (column.label === "") {
        return "color: #017CFF"; // 修改的样式
      } else {
        return "color: #333333";
      }
    }
  },
  mounted() {
  }
};
</script>
<style lang='scss' scoped>

</style>
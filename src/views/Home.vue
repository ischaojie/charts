<template>
  <div id="home">
    <!-- 左半边 -->
    <zi-col span="6" id="left">
      <div id="left-center">
        <!-- 标题 -->
        <btitle></btitle>
        <div id="config">
          <zi-collapse v-model="value">
            <zi-collapse-item title="设置">
              <div>
                <div class="chart-config">
                  <span>图片名</span>
                  <zi-input suffix-label=".png" v-model="chartTitle"></zi-input>
                </div>
              </div>
            </zi-collapse-item>
            <zi-collapse-item title="图表配置">
              <div>
                <div class="chart-config">
                  <span>标题</span>
                  <zi-input v-model="chartTitle"></zi-input>
                </div>
                <div class="chart-config">
                  <span>Y轴</span>
                  <zi-input v-model="chartYName"></zi-input>
                </div>
                <div class="chart-config">
                  <span>X轴</span>
                  <zi-input v-model="chartXName"></zi-input>
                </div>
              </div>
            </zi-collapse-item>
            <zi-collapse-item title="数据源">
              <div id="datasource-switcher">
                <button
                  @click="tab=1"
                  :class="{active:tab===1}"
                  style="border-top-right-radius: 0;border-bottom-right-radius: 0;"
                >JSON</button>
                <button
                  @click="tab=2"
                  :class="{active:tab===2}"
                  style="border-top-left-radius: 0;border-bottom-left-radius: 0;"
                >Excel</button>
              </div>
              <div class="datasource" v-show="tab===2">
                <excel :iexcel-data.sync="excelData" :itable-head.sync="tableHead"></excel>
              </div>
              <div class="datasource" v-show="tab===1">
                <zi-textarea ref="json" v-model="tableDataJson" :rows="12"></zi-textarea>
              </div>
            </zi-collapse-item>
          </zi-collapse>
        </div>
      </div>
      <!-- 左边-footer -->
      <div id="left-footer">
        <div class="icon">
          <div class="icon-svg">
            <a href="https://weibo.com/zhuzhezhe" target="_blank">
              <icon-svg icon-class="weibo" />
            </a>weibo
          </div>
          <div class="icon-svg">
            <a href="https://www.notion.so/chaojie/df627ca2b36140b8b912eb75c84cee51?v=522a45aa21f44e0d938616e5eef8f249" target="_blank">
              <icon-svg icon-class="todo-line" />
            </a>todo
          </div>
          <div class="icon-svg">
            <a href="https://support.qq.com/product/147506" target="_blank">
              <icon-svg icon-class="fankuitianxie" />
            </a>feedback
          </div>
        </div>
        <div>beta v1.0.1</div>
        <div>
          I'm
          <zi-link href="https://blog.shiniao.fun/" more color>shiniao</zi-link>
        </div>
      </div>
    </zi-col>
    <!-- 右半边 -->
    <zi-col span="18" id="right">
      <!-- 图表类型 -->
      <div id="right-top">
        <zi-select v-model="selectedChartType" id="charts-type">
          <zi-option
            v-for="item in chartType"
            :value="item.value"
            :label="item.text"
            :key="item.value"
          />
        </zi-select>
        <a :href="chartImgUrl" :download="chartTitle">
          <zi-button @click="downloadChart">下载</zi-button>
        </a>
      </div>

      <!-- 图表 -->
      <zi-card id="charts"></zi-card>
      <div id="right-footer">
        <h4>有任何问题欢迎反馈！</h4>
        <zi-rate style></zi-rate>
      </div>
    </zi-col>
  </div>
</template>

<script>
// @ is an alias to /src
import Excel from "@/components/Excel";
import BaseTitle from "@/components/BaseTitle"

export default {
  name: "Home",
  components: {
    btitle: BaseTitle,
    excel: Excel
  },

  data: () => ({
    focusState: false,
    jsonErr: false, // json格式判断
    jsonErrText: "",

    tab: 1, // 切换数据源，默认为JSON数据源
    showTableEdit: false, // 默认table不编辑

    chart: "", //chart实例
    chartType: [
      // 图表类型选择
      { value: "line", text: "折线图" },
      { value: "bar", text: "柱状图" },
      { value: "pie", text: "饼图" }
    ], //图表类型
    chartImgUrl: "", // 图片下载
    tableData: [
      { product: "Matcha Latte", count: 823, score: 95.8 },
      { product: "Milk Tea", count: 235, score: 81.4 },
      { product: "Cheese Cocoa", count: 1042, score: 91.2 },
      { product: "Walnut Brownie", count: 988, score: 76.9 }
    ],
    // echarts option
    chart_option: {
      title: {
        text: "历年产品销量"
      },
      legend: {},
      tooltip: {},
      xAxis: {
        type: "category",
        name: "产品类型",
        nameLocation: "center",
        nameGap: 32
      },
      yAxis: { name: "销量/万吨", nameLocation: "center", nameGap: 32 },
      series: [{ type: "line" }, { type: "line" }, { type: "line" }]
    },
    value: ""
  }),
  methods: {
    // 数据源选择切换
    dataSourceSelectHandler() {},

    init() {
      // 初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("charts"));
      this.chart.clear();
      // 指定图表的配置项和数据
      this.chart_option.dataset = {
        source: this.tableData
      };
      this.chart.setOption(this.chart_option);
      // 自动缩放
      window.addEventListener("resize", this.chart.resize);
    },

    // 下载图表
    downloadChart() {
      this.chartImgUrl = this.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff"
      });
    },

    loseFocus(index, row) {
      row.isEdit = false;
    },
    // table编辑cell
    handleCurrTableChange(row) {
      row.isEdit = true;
    },
    /* utils功能 */
    object2Json(value) {
      if (!value) return "";
      if (value instanceof String) {
        return;
      }
      // 去除isEdit字段 & 转换为JSON & 格式化
      return JSON.stringify(
        JSON.parse(
          JSON.stringify(value, function(key, data) {
            if (key == "isEdit") {
              return undefined;
            } else {
              return data;
            }
          })
        ),
        null,
        4
      );
    }
  },

  mounted() {
    this.init();
  },
  computed: {
    // 源数据
    tableDataJson: {
      get: function() {
        return this.object2Json(this.tableData);
      },
      set: function(newVal) {
        try {
          this.tableData = JSON.parse(newVal);
        } catch (e) {
          console.info("json err: " + e);
        }

        // 更新chart_option
        this.chart.clear();
        this.chart_option.dataset.source = this.tableData;
        this.chart.setOption(this.chart_option);
      }
    },
    // 表头数据
    tableHead: function() {
      return Object.keys(this.tableData[0]);
    },
    excelData: {
      get: function() {
        return this.tableData;
      },
      set: function(newVal) {
        this.tableData = newVal;
        // 更新chart_option
        this.chart.clear();
        this.chart_option.dataset.source = this.tableData;
        this.chart.setOption(this.chart_option);
      }
    },
    // 图表标题
    chartTitle: {
      get: function() {
        return this.chart_option.title.text;
      },
      set: function(newVal) {
        this.chart_option.title.text = newVal;
        this.chart.setOption(this.chart_option);
      }
    },
    // y轴名称
    chartYName: {
      get: function() {
        return this.chart_option.yAxis.name;
      },
      set: function(newVal) {
        this.chart_option.yAxis.name = newVal;
        this.chart.setOption(this.chart_option);
      }
    },
    // x轴名称
    chartXName: {
      get: function() {
        return this.chart_option.xAxis.name;
      },
      set: function(newVal) {
        this.chart_option.xAxis.name = newVal;
        this.chart.setOption(this.chart_option);
      }
    },
    // 选择图表类型
    selectedChartType: {
      get: function() {
        console.info("charts type: " + this.chart_option.series);
        return this.chart_option.series[0].type;
      },
      set: function(newVal) {
        let series = new Array();
        for (let i = 0; i < this.tableHead.length - 1; i++) {
          series.push({ type: newVal });
        }
        console.info("charts series:" + series);
        this.chart.clear();
        this.chart_option.series = series;
        this.chart.setOption(this.chart_option);
      }
    }
  }
};
</script>

<style lang="less" scoped>
/* Home样式文件 */

/* ------------------------ */
.vhcenter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* basic style */

hr {
  border: 0;
  height: 1px;
  background: #eaeaea;
}

.active {
  background-color: #fafafa;
  color: #000;
  font-weight: bold;
  outline: none;
}

table {
  border: 1px solid #fafafa;
  td,
  th {
    border: 1px solid #fafafa;
    text-align: center;
  }
}

//

#home {
  // home

  #left {
    // 左边栏
    overflow: auto;
    border-right: 1px solid #eaeaea;
    padding-right: 24px;
    position: fixed;
    height: 100%;
    display: flex;
    flex-direction: column;
    #left-center {
      #title {
        display: flex;
        align-items: center;
        padding-bottom: 24px;
      }
      .chart-config {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        flex-wrap: wrap;
        padding: 6px 0;
      }
      #datasource-switcher {
        // display: flex;
        // align-items: center;
        button {
          background-color: #fff;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          width: 76px;
          height: 28px;
          margin: 12px 0;
          font-size: 12px;
        }
        button:hover {
          background-color: #fafafa;
        }
      }
      .datasource {
        table {
          th {
            width: 24px;
          }
        }
      }
    }
    #left-footer {
      // 左边栏底部
      background: #fafafa;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 48px 0;
      color: #333;
      // height: inherit;
      div {
        padding: 12px;
      }
      .icon {
        margin: 24px 0 0 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        .icon-svg {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        a {
          color: #333;
        }
      }
    }
  }
  #right {
    // 右边栏
    display: flex;
    flex-direction: column;
    float: right;
    padding-left: 36px;
    height: 100%;
    #charts {
      height: 520px;
      margin: 12px 0;
    }
    #right-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    #right-footer {
      flex: 1;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}

.header-wrapper {
}


</style>

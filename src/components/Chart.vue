<template>
  <div>
    <div class="chart-tools">
      <zi-select v-model="selectedChartType" id="charts-type">
        <zi-option
          v-for="item in chartType"
          :value="item.value"
          :label="item.text"
          :key="item.value"
        />
      </zi-select>
      <a :href="chartImgUrl" :download="bconfig.imgName.value+'.png'">
        <zi-button @click="downloadChart">下载</zi-button>
      </a>
    </div>
    <zi-card id="charts"></zi-card>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    source: Array, // chart option
    config: Object, // chart config
    bconfig: Object // base config
  },
  data() {
    return {
      // 图表类型
      chartType: [
        // 图表类型选择
        { value: "bar", text: "柱状图" },
        { value: "line", text: "折线图" },
        { value: "area", text: "面积图" },
        { value: "pie", text: "饼图" }
      ],

      selectedChartType: "bar", // // 选中的图表类型
      chartImgUrl: "", // 图片下载url

      chart: "", // echarts对象

      // echarts option
      chartOption: {
        textStyle: {
          fontFamily: "Microsoft YaHei"
          // fontSize: 18
        },
        title: {
          text: this.config["title"].value
        },
        legend: {},
        tooltip: {},

        dataset: {
          source: this.source
        },
        xAxis: {
          type: "category",
          name: this.config["xAxis"].value,
          nameLocation: "center",
          nameGap: 32
        },
        yAxis: {
          name: this.config["yAxis"].value,
          nameLocation: "center",
          nameGap: 32
        },
        series: this.mySeries(this.selectedChartType)
      }
    };
  },

  watch: {
    // watch chart data source
    source: {
      handler(newVal) {
        this.chartOption.dataset = {
          source: newVal
        };
        this.chart.clear();
        this.chart.setOption(this.chartOption);
      },
      deep: true
    },

    // watch chart config
    config: {
      handler(newVal) {
        this.chartOption = {
          title: {
            text: newVal.title.value
          },
          xAxis: {
            name: newVal.xAxis.value
          },
          yAxis: {
            name: newVal.yAxis.value
          }
        };
        this.chart.setOption(this.chartOption);
      },
      // immediate: true,
      deep: true
    },

    // watch 图表类型
    selectedChartType: {
      handler(newVal) {
        if (newVal === "pie") {
          this.chartOption.xAxis.show = false;
          this.chartOption.yAxis.show = false;
        } else {
          this.chartOption.xAxis.show = true;
          this.chartOption.yAxis.show = true;
        }

        if (newVal === "area") {
          this.chartOption.xAxis.boundaryGap = false;
        } else {
          this.chartOption.xAxis.boundaryGap = true;
        }

        this.chartOption.series = this.mySeries(newVal);
        this.chart.clear();
        this.chart.setOption(this.chartOption);
      }
    }
  },

  methods: {
    // initChart: 初始化图表
    initChart() {
      // init echarts
      this.chart = this.$echarts.init(document.getElementById("charts"));
      this.chart.clear();
      this.chartOption.series = this.mySeries(this.selectedChartType);

      this.chart.setOption(this.chartOption);

      // 自动缩放
      window.addEventListener("resize", this.chart.resize);
    },

    // series: 获取父组件选中的图表类型，转换为series数组
    mySeries(stype) {
      let series = new Array();
      for (let i = 0; i < this.source[0].length - 1; i++) {
        if (stype === "area") {
          series.push({ type: "line", stack: "all", areaStyle: {} });
        } else {
          series.push({ type: stype });
        }
      }
      return series;
    },

    // 下载图表
    downloadChart() {
      this.chartImgUrl = this.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff"
      });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="less" scoped>
.chart-tools {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#charts {
  height: 520px;
  margin: 12px 0;
}
</style>
<template>
  <div>
    <zi-card id="charts"></zi-card>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    source: Array, // chart option
    config: Object, // chart config
    type: String
  },
  data() {
    return {
      chart: "",
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
          dimensions: ["product", "2015", "2016", "2017"],
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
        series: this.series(this.type)
      }
    };
  },

  watch: {
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

    // chart config
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

    // 图表类型
    type: {
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
        this.chartOption.series = this.series(newVal);
        this.chart.clear();
        this.chart.setOption(this.chartOption);
      }
    }
  },

  methods: {
    // 初始化图表
    initChart() {
      // init echarts
      this.chart = this.$echarts.init(document.getElementById("charts"));
      this.chart.clear();

      this.chart.setOption(this.chartOption);
      // 自动缩放
      window.addEventListener("resize", this.chart.resize);
    },
    // series: 获取父组件选中的图表类型，转换为series数组
    series(type) {
      let series = new Array();
      for (let i = 0; i < this.source.length - 1; i++) {
        if (type === "area") {
          series.push({ type: "line", stack: "all", areaStyle: {} });
        } else {
          series.push({ type: type });
        }
      }
      return series;
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="less" scoped>
#charts {
  height: 520px;
  margin: 12px 0;
}
</style>
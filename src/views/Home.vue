<template>
  <div id="home">
    <!-- 左半边 -->
    <zi-col span="6" id="left">
      <div id="left-center">
        <div id="title">
          <img src="@/assets/logo.png" alt />
          <div>
            <span class="logo logo-blue">C</span>
            <span class="logo logo-red">h</span>
            <span class="logo logo-yellow">a</span>
            <span class="logo logo-blue">r</span>
            <span class="logo logo-green">t</span>
            <span class="logo logo-red">s</span>
          </div>
        </div>
        <div id="config">
          <zi-collapse v-model="value" style="clear:left">
            <zi-collapse-item title="设置">
              <div>
                <div class="chart-config">
                  <span>图片名</span>
                  <zi-input suffix-label=".png" v-model="chartImgName"></zi-input>
                </div>
              </div>
            </zi-collapse-item>
            <zi-collapse-item title="图表配置">
              <div>
                <div class="chart-config">
                  <span>标题</span>
                  <zi-input v-model="chart_option.title.text"></zi-input>
                </div>
                <div class="chart-config">
                  <span>Y轴</span>
                  <zi-input v-model="chart_option.yAxis.name"></zi-input>
                </div>
                <div class="chart-config">
                  <span>X轴</span>
                  <zi-input v-model="chart_option.xAxis.name"></zi-input>
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
                >表格</button>
              </div>
              <div class="datasource" v-show="tab===2">
                <zi-table>
                  <zi-table-column prop="name" label="X轴"></zi-table-column>
                  <zi-table-column prop="name" label="Y轴1"></zi-table-column>
                  <zi-table-column prop="name" label="Y轴2"></zi-table-column>
                </zi-table>
              </div>
              <div class="datasource" v-show="tab===1">
                <zi-textarea :value="JSON.stringify(tableData)" rows="10"></zi-textarea>
              </div>
            </zi-collapse-item>
          </zi-collapse>
        </div>
      </div>
      <!-- 左边-footer -->
      <div id="left-footer">
        <div id="icon">
          <a>
            <font-awesome-icon :icon="['fab', 'weibo']" size="2x" />
          </a>
        </div>
        <div>version 1.0.1</div>
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
        <zi-select v-model="chart_type" id="charts-type">
          <zi-option value="折线图" />
          <zi-option value="柱状图" />
        </zi-select>
        <a :href="chartImgUrl" :download="chartImgName">
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
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  data: () => ({
    tab: 1,

    chart: "", //chart实例
    chart_type: "折线图", //图表类型
    chartImgName: "图表",
    chartImgUrl: "", // 图片下载
    chart_option: {
      // echarts option
      title: {
        text: "sss"
      },
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ["product", "2015", "2016", "2017"],
        source: [
          { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
          { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
          { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
          {
            product: "Walnut Brownie",
            "2015": 72.4,
            "2016": 53.9,
            "2017": 39.1
          }
        ]
      },
      xAxis: {
        type: "category",
        name: "",
        nameLocation: "center",
        nameGap: 24
      },
      yAxis: { name: "", nameLocation: "center", nameGap: 24 },
      series: [{ type: "line" }, { type: "line" }, { type: "line" }]
    },
    value: "",
    tableData: [
      {
        name: "apple",
        usage: "eat",
        point: "red, I like it",
        taste: "sweet"
      },
      {
        name: "orange",
        usage: "eat",
        point: "orange, fire ",
        taste: "sour"
      },
      {
        name: "lemon",
        usage: "picture",
        point: "sour",
        taste: "sour"
      },
      {
        name: "pear",
        usage: "eat",
        point: "yellow, code",
        taste: "sweet"
      }
    ]
  }),
  watch: {
    chart_option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.initChart();
        }
      },
      deep: true
    }
  },

  methods: {
    // 数据源选择切换
    dataSourceSelectHandler() {},

    init() {
      // 初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("charts"));
      // 指定图表的配置项和数据
      this.chart.setOption(this.chart_option);
      // 自动缩放
      window.addEventListener("resize", this.chart.resize);
    },

    downloadChart() {
      this.chartImgUrl = this.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff"
      });
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
hr {
  border: 0;
  height: 1px;
  background: #eaeaea;
  // background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.active {
  background-color: #fafafa;
  color: #000;
  font-weight: bold;
  outline: none;
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
      // flex: 1;
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
        display: flex;
        align-items: center;
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
      .datasource{
        width: 100%;
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
      // height: inherit;
      div {
        padding: 12px;
      }
      #icon {
        margin: 24px 0 0 0;
        font-awesome-icon {
          padding: 12px;
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

// logo
img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}
.logo {
  font-size: 2em;
  font-weight: bolder;
}
.logo-blue {
  color: #4285f4;
}
.logo-red {
  color: #e84235;
}
.logo-yellow {
  color: #fabb06;
}
.logo-green {
  color: #34a853;
}
</style>

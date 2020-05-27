<template>
  <div class="home">
    <!-- 左半边 -->
    <zi-col span="6" class="left">
      <div class="left-center">
        <!-- 标题 -->
        <base-title></base-title>
        <!-- 设置 -->
        <div id="config">
          <zi-collapse v-model="collapseItem" accordion>
            <!-- 基本设置 -->
            <zi-collapse-item title="基本设置">
              <div v-for="(config, name) in baseConfig" :key="config.id">
                <base-config
                  :name="name"
                  :config="config"
                  type="1"
                  @changeConfig="changeConfig(arguments)"
                ></base-config>
              </div>
            </zi-collapse-item>
            <!-- 图表配置 -->
            <zi-collapse-item title="图表配置">
              <div v-for="(config, name) in chartConfig" :key="config.id">
                <base-config
                  :name="name"
                  :config="config"
                  type="2"
                  @changeConfig="changeConfig(arguments)"
                ></base-config>
              </div>
            </zi-collapse-item>
            <!-- 数据源 -->
            <zi-collapse-item title="数据源">
              <data-source :source="dataSource" @changeData="changeData"></data-source>
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
            <a
              href="https://www.notion.so/chaojie/df627ca2b36140b8b912eb75c84cee51?v=522a45aa21f44e0d938616e5eef8f249"
              target="_blank"
            >
              <icon-svg icon-class="todo-line" />
            </a>todo
          </div>
          <div class="icon-svg">
            <a href="https://support.qq.com/product/147506" target="_blank">
              <icon-svg icon-class="fankuitianxie" />
            </a>feedback
          </div>
        </div>
        <div>beta v1.0.0</div>
        <div>
          I'm
          <zi-link href="https://blog.shiniao.fun/" more color>shiniao</zi-link>
        </div>
      </div>
    </zi-col>
    <!-- 右半边 -->
    <zi-col span="18" id="right">
      <!-- 图表 -->
      <div class="chart">
        <chart :source="dataSource" :config="chartConfig" :bconfig="baseConfig"></chart>
      </div>
      <div class="right-footer">
        <p>有任何问题欢迎反馈！</p>
        <p>zhuzhezhe95@gmail.com</p>
      </div>
    </zi-col>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseTitle from "@/components/BaseTitle";
import BaseConfig from "@/components/BaseConfig";
import DataSource from "@/components/DataSource";
import Chart from "@/components/Chart";
import { DataSourceClear } from "@/utils";

export default {
  name: "Home",
  components: {
    "base-title": BaseTitle,
    "base-config": BaseConfig,
    "data-source": DataSource,
    chart: Chart
  },

  data: () => ({
    // 手风琴item
    collapseItem: "",
    // 基本设置
    baseConfig: { 
      imgName: { id: 1, name: "图片名", value: "产品销量" },
      imgColor: {id:2, name:"图片背景", value: "#fff"} },
    // 图表设置
    chartConfig: {
      title: { id: 1, name: "图表标题", value: "历年产品销量" },
      xAxis: { id: 2, name: "X轴", value: "产品" },
      yAxis: { id: 3, name: "Y轴", value: "销量/万吨" }
    },

    // 源数据
    dataSource: [
      ["product", "2015", "2016", "2017"],
      ["Matcha Latte", 43.3, 85.8, 93.7],
      ["Milk Tea", 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 86.4, 65.2, 82.5],
      ["Walnut Brownie", 72.4, 53.9, 39.1]
    ]
  }),

  watch: {
    dataSource: {
      handler(newVal) {
      this.dataSource = DataSourceClear(newVal);
      },
      immediate: true
    }
  },

  methods: {
    // 更新dataSource
    changeData(newData) {
      this.dataSource = DataSourceClear(newData);
      console.log(this.dataSource)
    },

    // update config
    changeConfig(params) {
      const newConfig = params[0];
      const name = params[1];
      const type = params[2];

      if (type === "2") {
        // chart config
        this.$set(this.chartConfig, name, newConfig);
      } else if (type === "1") {
        // base config
        this.$set(this.baseConfig, name, newConfig);
      }
    }
  },

  mounted() {
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

.home {
  // home

  .left {
    // 左边栏
    overflow: auto;
    border-right: 1px solid #eaeaea;
    padding-right: 24px;
    position: fixed;
    height: 100%;
    display: flex;
    flex-direction: column;

    #left-footer {
      // 左边栏底部
      // background: #fafafa;
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

    #right-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .right-footer {
      flex: 1;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>

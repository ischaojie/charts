<template>
  <div class="source">
    <button
      v-for="tab in tabs"
      v-bind:key="tab"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="currentTab = tab"
    >{{ tab }}</button>

    <div class="datasource" v-if="currentTab==='Excel'">
      excel
      <!-- <data-source-excel :iexcel-data.sync="source" :itable-head.sync="tableHead"></data-source-excel> -->
    </div>
    <div class="datasource" v-if="currentTab==='Json'">
      <data-source-json v-bind="$attrs" v-on="$listeners"></data-source-json>
    </div>
  </div>
</template>

<script>
// import DataSourceExcel from "@/components/DataSourceExcel";
import DataSourceJson from "@/components/DataSourceJson";

export default {
  name: "DataSource",
  components: {
    // "data-source-excel": DataSourceExcel,
    "data-source-json": DataSourceJson
  },
  props: {},
  data: function() {
    return {
      currentTab: "Json", // 当前数据源tab
      tabs: ["Json", "Excel"] // 数据源tab
    };
  },

  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.tab-button {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  width: 76px;
  height: 28px;
  margin: 12px 0;
  font-size: 12px;
}
.tab-button:hover {
  background: #fafafa;
}
.tab-button.active {
  background: #fafafa;
  outline: 0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
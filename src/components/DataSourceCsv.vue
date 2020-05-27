<template>
  <div class="csv">
    开发中。。。
    <!-- <zi-textarea :value="sourceCsv" @input="handleCsvInput" :rows="12"></zi-textarea>
    <zi-button class="button" size="small" @click="commit">提交</zi-button> -->
  </div>
</template>

<script>
import {DataSourceClear} from "@/utils";

export default {
  name: "dataSourceCsv",
  props: {
    source: Array
  },
  data() {
    return {
      // sourceCsv: this.arr2Csv(this.source)
    };
  },
  computed: {
    sourceCsv: {
      get() {
        return this.arr2Csv(this.source);
      },
      set() {
        // this.$emit("changeData", this.csv2Arr(newVal));
      }
    }
  },
  methods: {
    handleCsvInput(newVal) {
      // 每次新输入转换为array
      console.log(newVal)
      this.sourceCsv = this.csv2Arr(newVal);
    },
    // commit 提交csv更改
    commit() {
      console.log(this.sourceCsv)
      this.$emit("changeData", this.csv2Arr(this.sourceCsv));
    },
    // arr2Csv convert an array to csv string
    arr2Csv(arr, delimiter = ",") {
      arr = DataSourceClear(arr)
      return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join("\n");
    },
    // csv2Arr convert csv strings to array
    csv2Arr(csv, delimiter = ",") {
      return csv.split("\n").map(v => v.split(delimiter).map(x => x.slice(1,-1)));
    }
  }
};
</script>

<style lang="less" scoped>
</style>
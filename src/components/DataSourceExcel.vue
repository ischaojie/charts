<template>
  <div class="excel">
    <div id="spreadsheet" ref="spreadsheet"></div>
  </div>
</template>

<script>
import jexcel from "jexcel";
import jexcelStyle from "jexcel/dist/jexcel.css";
export default {
  name: "dataSourceExcel",
  props: {
    source: Array
  },
  data() {
    return {
      sourceExcel: this.source,
      // jexcel obj
      excel: null
    };
  },
  computed: {
    // jexcel options
    options: {
      get: function() {
        return {
          data: this.sourceExcel,
          // dimensions
          minDimensions: [6, 6],
          tableOverflow: true,
          onbeforechange: this.excelUpdate,
          onchange: this.excelUpdate,
          onafterchanges: this.excelUpdate
        };
      },
      set: function() {}
    }
  },
  methods: {
    test() {
      return jexcelStyle;
    },

    // arrNullDel 清除数组空元素
    arrNullDel(arr) {
      let len = arr.length;
      for (let i = len - 1; i >= 0; i--) {
        // 当下一个元素不再是空时，跳出循环
        if (arr[i] != "") {
          break;
        } else {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
    // getVaildData清除空数组
    getVaildData(arr) {
      let newArr = new Array();
      for (let i = 0; i < arr.length; i++) {
        newArr.push(this.arrNullDel(arr[i]));
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].length === 0) {
          newArr.splice(i, 1);
        }
      }
      return newArr;
    },

    // excelUpdate: 更新excel数据，emit到父组件
    excelUpdate() {
      this.$emit("changeData", this.getVaildData(this.excel.getData()));
    }
  },
  mounted() {
    this.excel = jexcel(this.$refs["spreadsheet"], this.options);
    Object.assign(this, this.excel);
  }
};
</script>

<style lang="less" scoped>
#spreadsheet {
  overflow: auto;
  .jexcel_container:focus {
    outline: 0;
  }
}
</style>
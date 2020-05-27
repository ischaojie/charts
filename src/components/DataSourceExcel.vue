<template>
  <div class="excel">
    <zi-note class="excel-tip" label="tips" type="success">可直接从Excel复制粘贴 / 可直接编辑表格</zi-note>
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

    // excelUpdate: 更新excel数据，emit到父组件
    excelUpdate() {
      this.$emit("changeData", this.excel.getData());
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

.excel{
  .excel-tip{
    margin-bottom: 12px;
  }
}
</style>
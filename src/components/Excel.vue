// TODO: excel导入后表头更新
<template>
  <div class="table">
    <input
      type="file"
      @change="importFile(this)"
      id="imFile"
      style="display: none"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <!-- TODO: 导入按钮居中 -->
    <zi-button class="button" @click="uploadFile">导入</zi-button>
    <!--错误信息提示-->
    <zi-dialog title="提示" v-model="errorDialog" size="tiny">
      <span>{{errorMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="errorDialog=false">确认</el-button>
      </span>
    </zi-dialog>
    <!--展示导入信息-->
    <zi-table :data="excelData" ref="table">
      <div v-for="column in tableHead" :key="column">
        <zi-table-column :prop="column" :label="column" width="64">
          <template slot-scope="scope">
            <!-- <input
              v-model="scope.row[column]"
              placeholder="请输入内容"
              v-show="scope.row.isEdit"
              style="width:48px;"
              @blur="loseFocus(scope.$index, scope.row)"
            />-->
            <span>{{ scope.row[column] }}</span>
          </template>
        </zi-table-column>
      </div>
    </zi-table>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require("xlsx");
export default {
  name: "Index",
  props: ["iexcelData", "itableHead"],
  data() {
    return {
      imFile: "", // 导入文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: "", // 错误信息内容
      excelData: this.iexcelData, // 表格数据
      tableHead: this.itableHead // 表头数据
    };
  },
  mounted() {
    this.imFile = document.getElementById("imFile");
    console.info("tablehead: " + this.tableHead);
  },
  computed: {},

  methods: {
    uploadFile: function() {
      // 点击导入按钮
      this.imFile.click();
    },
    importFile: function() {
      // 导入excel
      let obj = this.imFile;
      if (!obj.files) {
        return;
      }
      var f = obj.files[0];
      var reader = new FileReader();
      let $t = this;
      reader.onload = function(e) {
        var data = e.target.result;
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: "base64"
          });
        } else {
          $t.wb = XLSX.read(data, {
            type: "binary"
          });
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
        // 处理导入的数据
        $t.dealFile($t.analyzeData(json)); // analyzeData: 解析导入数据
      };
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    analyzeData: function(data) {
      // 此处可以解析导入数据
      return data;
    },
    dealFile: function(data) {
      // 处理导入的数据
      console.log(data);
      this.imFile.value = "";
      if (data.length <= 0) {
        this.errorDialog = true;
        this.errorMsg = "请导入正确信息";
      } else {
        let tableHead = Object.keys(data[0]);
        this.tableHead = tableHead;
        this.excelData = data;
        // 更新父组件tableData
        this.$emit("update:iexcelData", data);
        this.$emit("update:itableHead", tableHead);
      }
    },
    s2ab: function(s) {
      // 字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    },
    getCharCol: function(n) {
      // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = "";
      let m = 0;
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
    },
    fixdata: function(data) {
      // 文件流转BinaryString
      var o = "";
      var l = 0;
      var w = 10240;
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-table th > .cell {
  text-align: center;
}
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button{
  margin-bottom: 12px;
}
.zi-table{
  width: auto !important;
}
  

</style>

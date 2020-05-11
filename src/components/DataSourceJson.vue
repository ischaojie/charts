<template>
  <div>
    开发中。。。
    <!-- <zi-textarea :value="sourceJson" @input="handleJsonInput" :rows="14"></zi-textarea>
    <zi-button class="button" size="small" @click="format">格式化</zi-button>

    <zi-note type="error" v-show="jsonIsErr">{{ jsonErrInfo }}</zi-note> -->
  </div>
</template>

<script>
export default {
  name: "dataSourceJson",
  props: {
    source: Array
  },
  data() {
    return {
      sourceJson: this.obj2Json(this.source),
      jsonIsErr: false, // 是否显示错误提示
      jsonErrInfo: "" // 错误消息
    };
  },
  computed: {},
  methods: {
    // 处理json数据input
    handleJsonInput(newVal) {
      this.sourceJson = newVal;
    },

    // 格式化JSON文本&提交数据给父组件
    format() {
      let sourceJsonObj;
      try {
        sourceJsonObj = JSON.parse(this.sourceJson);
        this.jsonIsErr = false;
        this.sourceJson = JSON.stringify(sourceJsonObj, null, 4);
        console.log(JSON.parse(this.sourceJson));
        this.$emit("changeData", this.json2Arr(this.sourceJson));
      } catch (error) {
        this.jsonIsErr = true;
        this.jsonErrInfo = error;
      }
    },
    // arr2Json: 数组转为json对象
    arr2Json(arr) {
      let result = [];
      let keys = arr[0];
      for (let i = 0; i < arr.length; i++) {
        let obj = {};
        let vars = arr[i];
        for (let j = 0; j < vars.length; j++) {
          obj[keys[j]] = vars[j];
        }
        result.push(obj);
      }
      return result;
    },
    // json2Arr: json字符串转为array
    json2Arr(jsonstr) {
      let arr = [];

      let json = JSON.parse(jsonstr);
      let keys = Object.keys[json[0]];
      arr.push(keys);

      for (let i = 0; i < json.length; i++) {
        arr.push(Object.values(json[i]));
      }

      return arr;
    },

    // 将对象转换为json字符串
    obj2Json: function(value) {
      if (!value) return "";
      if (value instanceof String) {
        return;
      }
      // array to json
      value = this.arr2Json(value);
      // obj格式化为json字符串
      return JSON.stringify(
        JSON.parse(
          JSON.stringify(value, function(key, data) {
            return data;
          })
        ),
        null,
        4
      );
    }
  },
  mounted() {
    // this.sourceJson =
    // console.info(this.sourceJson)
  }
};
</script>

<style lang="less" scoped>
.button {
  margin: 12px 0;
}
</style>
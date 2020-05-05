<template>
  <div>
    <zi-textarea :value="sourceJson" @input="handleJsonInput" :rows="16"></zi-textarea>
    <zi-button class="button" size="small" @click="format">格式化</zi-button>

    <zi-note type="error" v-show="jsonIsErr">{{ jsonErrInfo }}</zi-note>
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
      this.$emit("changeData", JSON.parse(this.sourceJson));

      } catch (error) {
        this.jsonIsErr = true;
        this.jsonErrInfo = error;
      }
    },

    // 将对象转换为json字符串
    obj2Json: function(value) {
      if (!value) return "";
      if (value instanceof String) {
        return;
      }
      // 转换为JSON & 格式化
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
  },
};
</script>

<style lang="less" scoped>
.button {
  margin: 12px 0;
}
</style>
<template>
  <div class="config">
    <span>{{ myConfig.name }}</span>
    <zi-input :value="myConfig.value" @input="handleConfigInput"></zi-input>
  </div>
</template>

<script>
export default {
  name: "BaseConfig",
  props: {
    config: Object,
    name: String,
    type: String,
  },
  data() {
    return {
      myConfig: this.config
    };
  },
  methods: {
    handleConfigInput(newVal) {
      this.myConfig.value = newVal
      this.$emit("changeConfig", this.myConfig, this.name, this.type)
    }
  }
};
</script>

<style lang="less" scoped>
.config {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 6px 0;
}
</style>
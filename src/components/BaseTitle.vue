<template>
  <div class="title">
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
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  padding-bottom: 24px;
}

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
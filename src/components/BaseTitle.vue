<template>
  <div class="title">
    <img src="@/assets/logo.png" alt />
    <div class="title-text">
      <div class="title-logo">
        <span class="logo logo-red">C</span>
        <span class="logo logo-yellow">h</span>
        <span class="logo logo-blue">a</span>
        <span class="logo logo-blue">r</span>
        <span class="logo logo-blue">t</span>
        <span class="logo logo-red">s</span>
      </div>
      <div class="title-works"><a>works.shiniao.fun</a></div>
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
  padding: 12px 0 32px 0;
  .title-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-works {
      font-size: 1em;
      color: #888;
      a{
        color: #333;
      }
    }
    
  }
}

img {
  width: 78px;
  height: 78px;
  margin-right: 12px;
}

.logo {
  font-size: 2em;
  font-weight: bolder;
  letter-spacing: 4px;
}

.logo-blue {
  color: #0070f3;
}
.logo-red {
  color: #e00;
}
.logo-yellow {
  color: #f5a623;
}

</style>
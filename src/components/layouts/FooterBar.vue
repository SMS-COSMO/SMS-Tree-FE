<template>
  <footer class="footer">
    <span>Icon copyright ...</span>
    <a href="https://github.com/SMS-COSMO/SMS-Tree" class="link">代码仓库</a>
    <a class="link">反馈</a>
    <a class="link">加入 COSMO</a>
    <a class="link">API</a>
    <a class="link">......</a>
    <a class="link">......</a>
  </footer>
</template>

<style lang="scss">
@import "../../styles/color.scss";

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-right: auto;
  margin-left: auto;

  margin-top: 40px;
  padding-top: 20px;
  padding-bottom: 10px;

  border-top: 2px solid $light_border;
}

.link {
  color: $green;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.link:hover {
  border-bottom: 1px solid $green;
}
</style>
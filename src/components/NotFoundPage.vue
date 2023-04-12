<template>
  <div class="bg" />
  <el-card class="card">
    <h1 style="font-size: 80px; text-align: center; margin: 20px;">404</h1>
    <h1 style="font-size: 30px; text-align: center;">Page Not Found</h1>
  </el-card>
</template>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  filter: brightness(0.7) blur(1px);
}

.card {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30vh;
}
</style>

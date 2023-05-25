<template>
  <div id="nav">
    <el-menu id="menu" mode="horizontal" background-color="#146E3C" text-color="#FFFFFF" active-text-color="#FFFFFF"
      :router="true" :default-active="$route.path">
      <el-menu-item disabled class="logo">
        <img src="../../assets/logo.png" style="height: 30px;" />
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/list">论文列表</el-menu-item>
      <el-menu-item index="/group">小组作业</el-menu-item>
      <el-menu-item index="/test">Store Test</el-menu-item>
      <el-menu-item index="/login">Login Demo</el-menu-item>
      <el-menu-item index="/admin/home">Admin</el-menu-item>
      <el-sub-menu index="4" id="user">
        <template #title>User</template>
        <el-menu-item :index="`/user/`">Profile</el-menu-item>
        <el-menu-item index="2-2">登出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/color.scss";

.logo {
  opacity: 1 !important;
  cursor: default !important;
}

#nav {
  z-index: 10000;
  width: 100vw;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  background-color: $green;
}

#menu {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 10px;
  border: none;
}

#user {
  margin-left: auto;
  margin-right: 0;
}
</style>

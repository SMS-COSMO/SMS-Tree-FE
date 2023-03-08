<template>
  <div id="nav">
    <el-menu id="menu" mode="horizontal" background-color="#146E3C" text-color="#FFFFFF" active-text-color="#FFFFFF"
      :router="true" :default-active="$route.path">
      <el-menu-item index="/" @click="$router.push('/')">
        <img src="../../assets/logo.png" style="height: 30px;" />
      </el-menu-item>
      <el-menu-item index="/test">Test</el-menu-item>
      <el-sub-menu index="2">
        <template #title>SubMenu</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4" id="user">
        <template #title>User</template>
        <el-menu-item index="2-1">Profile</el-menu-item>
        <el-menu-item index="2-2">Logout</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/color.scss";

#nav {
  width: 100vw;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  background-color: $primary;
}

#menu {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border: none;
}

#user {
  margin-left: auto;
  margin-right: 0;
}
</style>

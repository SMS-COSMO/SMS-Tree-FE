
<template>
  <div id="nav">
    <el-menu id="menu" :ellipsis="false" mode="horizontal" background-color="#146E3C" text-color="#FFFFFF"
      active-text-color="#FFFFFF" :router="true" :default-active="$route.path">
      <el-menu-item disabled class="logo">
        <img src="../../assets/logo.png" style="height: 30px;" />
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/list">论文列表</el-menu-item>
      <el-menu-item index="/group">小组作业</el-menu-item>
      <el-menu-item v-if="userStore.role === 'admin' || userStore.role === 'teacher'"
        index="/admin/register">管理</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu v-if="userStore.loggedIn" index="4">
        <template #title>{{ userStore.username }}</template>
        <el-menu-item :index="`/user/1`">主页</el-menu-item>
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/login" v-else>登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from '../../stores/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = UserStore();

const logout = () => {
  userStore.logout();
  router.push('/');
  ElMessage({
    message: '登出成功！',
    type: 'success',
  });
};
</script>

<style lang="scss" scoped>
@import "~/styles/color.scss";

.logo {
  opacity: 1 !important;
  cursor: default !important;
}

#nav {
  user-select: none;
  z-index: 20;
  width: 100vw;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  background-color: $color-primary-0;
}

#menu {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 10px;
  border: none;
}

.flex-grow {
  flex-grow: 1;
}
</style>

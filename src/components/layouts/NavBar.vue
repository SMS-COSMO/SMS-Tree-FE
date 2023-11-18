
<template>
  <div class="top-nav">
    <el-menu class="menu mx-auto" :ellipsis="false" mode="horizontal" background-color="#146E3C" text-color="#FFFFFF"
      active-text-color="#FFFFFF" :router="true" :default-active="$route.path">
      <el-menu-item disabled class="logo">
        <img src="../../assets/logo.png" style="height: 30px;" />
      </el-menu-item>
      <template v-if="!isSmallScreen">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/list">论文列表</el-menu-item>
        <el-menu-item index="/group">小组作业</el-menu-item>
        <el-menu-item v-if="userStore.role === 'admin' || userStore.role === 'teacher'"
          index="/admin/home">管理</el-menu-item>
      </template>
      <div class="flex-grow" />
      <el-sub-menu v-if="userStore.loggedIn" index="4">
        <template #title>{{ userStore.username }}</template>
        <el-menu-item :index="`/user/${userStore.userId}`">主页</el-menu-item>
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/login" v-else>登录</el-menu-item>
    </el-menu>
  </div>

  <!-- Mobile Bottom Nav Bar -->
  <div v-if="isSmallScreen" class="bottom-nav">
    <el-row :gutter="5" class="px-2">
      <MobileNavButton label="首页" href="/">
        <template #icon>
          <House />
        </template>
      </MobileNavButton>
      <MobileNavButton label="论文列表" href="/list">
        <template #icon>
          <Tickets />
        </template>
      </MobileNavButton>
      <MobileNavButton label="小组作业" href="/group">
        <template #icon>
          <Reading />
        </template>
      </MobileNavButton>
      <MobileNavButton label="管理" href="/admin/home">
        <template #icon>
          <EditPen />
        </template>
      </MobileNavButton>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from '../../stores/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = UserStore();

const isSmallScreen = screen.width <= 700;

const logout = () => {
  userStore.logout();
  router.push('/');
  ElMessage({ message: '登出成功！', type: 'success', });
};
</script>

<style lang="scss" scoped>
@import "~/styles/color.scss";

.logo {
  opacity: 1 !important;
  cursor: default !important;
}

.top-nav {
  user-select: none;
  z-index: 20;
  width: 100vw;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  background-color: $color-primary-0;
}

.bottom-nav {
  user-select: none;
  z-index: 20;
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid $light-border;
  background-color: #FFFFFF;
}

.menu {
  max-width: 1300px;
  padding-right: 10px;
  border: none;
}

.flex-grow {
  flex-grow: 1;
}
</style>

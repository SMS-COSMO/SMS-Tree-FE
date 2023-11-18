<template>
  <div class="mb-22">
    <el-tabs v-if="isMine" :tab-position="isSmallScreen ? 'top' : 'left'">
      <el-tab-pane label="用户信息" class="desktop:ml-4">
        <UserProfile :userId="id"></UserProfile>
      </el-tab-pane>
      <el-tab-pane label="修改密码" class="desktop:ml-4">
        <ModifyPassword></ModifyPassword>
      </el-tab-pane>
    </el-tabs>
    <UserProfile v-else :userId="id"></UserProfile>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const isSmallScreen = screen.width <= 700;

const id = route.params.id.toString();
import { UserStore } from '../../stores/user';
const userStore = UserStore();

const isMine = userStore.userId === id;
</script>

<style lang="scss" scoped></style>
<template>
  <el-tabs v-if="isMine" tab-position="left" style="height: 500px;">
    <el-tab-pane label="用户信息">
      <UserProfile :userId="id"></UserProfile>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <ModifyPassword></ModifyPassword>
    </el-tab-pane>
  </el-tabs>
  <UserProfile v-else :userId="id"></UserProfile>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id.toString();
import { UserStore } from '../../stores/user';
const userStore = UserStore();

const isMine = userStore.userId === id;
</script>

<style lang="scss" scoped></style>
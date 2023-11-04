<template>
  <el-tabs tab-position="left" style="height: 500px;">
    <el-tab-pane label="用户信息">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header>
              学号
            </template>
            <el-skeleton :rows="0" :loading="contentLoading" animated>
              {{ info?.id }}
            </el-skeleton>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header>
              姓名
            </template>
            <el-skeleton :rows="0" :loading="contentLoading" animated>
              {{ info?.username }}
            </el-skeleton>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="mt-5">
        <template #header>
          参与的项目
        </template>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="信息修改">

    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isTRPCClientError, trpc } from '../../api/trpc';
import type { UserProfileOutput } from '../../api/trpc';
import { ElMessage } from 'element-plus';
const route = useRoute();

const id = route.params.id.toString();
const info = ref<UserProfileOutput>();

const contentLoading = ref(true);

onMounted(async () => {
  try {
    info.value = await trpc.user.profile.query({ id: id });
    contentLoading.value = false;
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
  }
});
</script>

<style lang="scss" scoped></style>
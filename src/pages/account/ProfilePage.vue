<template>
  <el-tabs tab-position="left" style="height: 500px;">
    <el-tab-pane label="用户信息">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header>
              学号
            </template>
            {{ info.id }}
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header>
              姓名
            </template>
            {{ info.username }}
          </el-card>
        </el-col>
      </el-row>
      <el-card class="mt20">
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
import { trpc } from '../../api/trpc';
import type { RouterOutput } from '../../api/trpc';
const route = useRoute();

const id = route.params.id.toString();
const info = ref<RouterOutput['user']['profile']>({
  id: '',
  username: '',
  role: 'student',
  createdAt: new Date(),
});

onMounted(async () => {
  info.value = await trpc.user.profile.query({ id: id });
});
</script>

<style lang="scss" scoped></style>
<template>
  <el-skeleton :rows="0" :loading="loading" animated style="width: 600px;">
    <span v-for="(name, index) of names" :key="index" class="mx-0.6">
      {{ name }}
    </span>
  </el-skeleton>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { trpc } from '../../api/trpc';
import { ref } from 'vue';

const props = defineProps<{
  groupId: string;
}>();

const loading = ref(true);

const names = computedAsync(
  async () => {
    const res = await Promise.all(
      (await trpc.group.content.query({ id: props.groupId })).members.map(async user => {
        return (await trpc.user.profile.query({ id: user })).username;
      })
    );
    loading.value = false;
    return res;
  },
  [],
);
</script>
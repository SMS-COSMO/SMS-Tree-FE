<template>
  <el-card class="bordered-card">
    <template #header>
      摘要
    </template>
    {{ id }}
  </el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const id = route.params.id
</script>
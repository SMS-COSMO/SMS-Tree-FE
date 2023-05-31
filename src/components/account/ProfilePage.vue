<template>
  <el-card class="bordered-card">
    {{ id }}
  </el-card>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id;
</script>
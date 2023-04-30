<template>
  <el-card class="bordered-card">
    <template #header>
      摘要
    </template>
    {{ id }}
  </el-card>

  <el-card class="bordered-card mt20" style="margin-bottom: 20px;">
    <WordView url="https://ztl-uwu.github.io/test.docx">
    </WordView>
  </el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const id = route.params.id
</script>

<style lang="scss">
.mt20 {
  margin-top: 20px;
}
</style>
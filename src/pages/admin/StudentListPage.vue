<template>
  <el-card>
    <el-table :data="listData">
      
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { trpc } from '../../api/trpc';

const listData = ref();

onMounted(() => {
  trpc.user.studentList.query().then(res => {
    console.log(res);
    listData.value = res;
  });
});
</script>
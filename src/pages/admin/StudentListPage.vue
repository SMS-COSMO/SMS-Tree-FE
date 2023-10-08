<template>
  <el-card>
    <el-table :data="listData" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column :width="150" show-overflow-tooltip prop="id" label="学号" />
      <el-table-column :width="100" show-overflow-tooltip prop="username" label="姓名" />
      <el-table-column :width="100" label="班级" />
      <el-table-column :width="400" show-overflow-tooltip label="课题" />
      <el-table-column label="操作">
        <template #default="">
          <el-button size="small">Edit</el-button>
          <el-button size="small" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';

const listData = ref<RouterOutput['user']['studentList']>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    listData.value = await trpc.user.studentList.query();
    loading.value = false;
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
  }
});
</script>
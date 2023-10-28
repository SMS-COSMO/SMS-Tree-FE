<template>
  <el-card>
    <el-table :data="listData" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column :width="150" show-overflow-tooltip prop="id" label="学号">
        <template #default="scope">
          <span @click="visitProfile(scope.row.id)" style="cursor: pointer !important;">
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :width="100" show-overflow-tooltip prop="username" label="姓名" />
      <el-table-column :width="100" label="班级" />
      <el-table-column :width="400" show-overflow-tooltip label="课题" />
      <el-table-column label="操作" align="right">
        <template #header>
          <el-input v-model="searchContent" placeholder="搜索学生" />
        </template>
        <template #default="">
          <el-button size="small">修改</el-button>
          <el-popconfirm title="确定要删除此用户吗？" confirm-button-text="是" cancel-button-text="否" width="220">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UserStudentListOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const listData = ref<UserStudentListOutput>([]);
const loading = ref(true);

const searchContent = ref('');

const router = useRouter();

const visitProfile = (id: string) => {
  router.push(`/user/${id}`);
};

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
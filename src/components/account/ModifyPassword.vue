<template>
  <el-card>
    <el-form class="mx-auto max-w-500px" label-position="top">
      <el-form-item>
        <div>
          <el-icon :size="15">
            <Key />
          </el-icon>
          原密码
        </div>
        <el-input type="password" v-model="form.oldPassword" show-password />
      </el-form-item>
      <el-form-item>
        <div>
          <el-icon :size="15">
            <Key />
          </el-icon>
          新密码
        </div>
        <el-input type="password" v-model="form.newPassword" show-password
          @keyup.enter="form.oldPassword && form.newPassword ? modify() : () => { }" />
      </el-form-item>
      <el-form-item class="m-0">
        <el-button color="#146E3C" :loading="buttonLoading" @click="modify">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { trpc, isTRPCClientError } from '../../api/trpc';
import { UserStore } from '../../stores/user';

const form = reactive({
  oldPassword: '',
  newPassword: '',
});

const buttonLoading = ref(false);
const modify = async () => {
  buttonLoading.value = true;
  if (form.oldPassword === form.newPassword) {
    ElMessage({
      message: '新密码不能与旧密码相同',
      type: 'error',
      showClose: true,
    });
    buttonLoading.value = false;
    return;
  }

  const userStore = UserStore();
  try {
    const res = await trpc.user.modifyPassword.mutate({ oldPassword: form.oldPassword, newPassword: form.newPassword });
    ElMessage({
      message: res.message,
      type: 'success',
      showClose: true,
    });
    userStore.passwordChange();
    buttonLoading.value = false;
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
    buttonLoading.value = false;
  }
};
</script>

<template>
  <div class="top-margin middle mx-auto">
    <el-alert title="第一次登录完毕后请修改密码！" show-icon type="warning" effect="dark" :closable="false" />
    <el-card class="mt-4">
      <template #header>
        登录
      </template>
      <el-form label-position="top">
        <el-form-item>
          <div>
            <el-icon :size="15">
              <User />
            </el-icon>
            学号
          </div>
          <el-input v-model="form.userId" />
        </el-form-item>
        <el-form-item>
          <div>
            <el-icon :size="15">
              <Key />
            </el-icon>
            密码
          </div>
          <el-input type="password" v-model="form.password" show-password
            @keyup.enter="form.userId && form.password ? login() : () => { }" />
        </el-form-item>
        <el-form-item class="m-0">
          <el-button class="submit-button ml-auto" color="#146E3C" :loading="buttonLoading" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { trpc, isTRPCClientError } from '../../api/trpc';
import { ElMessage } from 'element-plus';

import { UserStore } from '../../stores/user';
const userStore = UserStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const buttonLoading = ref(false);

const form = reactive({
  userId: '',
  password: ''
});

const login = async () => {
  buttonLoading.value = true;

  try {
    const res = await trpc.user.login.mutate({ id: form.userId, password: form.password });

    userStore.login({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      userId: res.userId,
      username: res.username,
      role: res.role,
    });

    buttonLoading.value = false;
    router.back();
    ElMessage({
      message: '登录成功',
      type: 'success',
      showClose: true,
    });
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    }

    buttonLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.el-alert--warning {
  z-index: 0;
  background-color: #F29A41;
}

.middle {
  max-width: 480px;
}

.top-margin {
  margin-top: 20vh;
}
</style>

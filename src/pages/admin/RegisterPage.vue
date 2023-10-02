<template>
  <el-card>
    <el-form label-position="top" class="register-form">
      <el-form-item>
        <div class="icon-label">
          <el-icon :size="15">
            <User />
          </el-icon>
          学号 / 用户名
        </div>
        <el-input v-model="form.userId" />
      </el-form-item>
      <el-form-item>
        <div>
          <el-icon :size="15">
            <User />
          </el-icon>
          姓名
        </div>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <div>
          <el-icon :size="15">
            <Key />
          </el-icon>
          密码
        </div>
        <el-input type="text" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <div>
          <el-icon :size="15">
            <Operation />
          </el-icon>
          用户权限
        </div>
        <el-select v-model="form.role" placeholder="请选择" style="width: 100%;">
          <el-option label="教师" value="teacher" />
          <el-option label="学生" value="student" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button class="submit-button" color="#146E3C" :loading="buttonLoading" @click="register()">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';

const form = reactive({
  userId: '',
  username: '',
  password: '',
  role: '',
});

const buttonLoading = ref(false);

const register = () => {
  buttonLoading.value = true;

  trpc.user.register.mutate({
    id: form.userId,
    username: form.username,
    password: form.password,
    role: form.role,
  })
    .then(() => {
      ElMessage({
        message: '创建成功',
        type: 'success',
        showClose: true,
      });

      buttonLoading.value = false;
    })
    .catch(err => {
      if (isTRPCClientError(err)) {
        ElMessage({
          message: err.message,
          type: 'error',
          showClose: true,
        });
      }

      buttonLoading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.register-form {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
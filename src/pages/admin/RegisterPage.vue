<template>
  <el-card>
    <el-form label-position="top" class="register-form" :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="userId">
        <div class="icon-label">
          <el-icon :size="15">
            <User />
          </el-icon>
          学号 / 用户名
        </div>
        <el-input v-model="form.userId" />
      </el-form-item>
      <el-form-item prop="username">
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
        <el-button class="submit-button" color="#146E3C" :loading="buttonLoading" @click="register(formRef)">
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
import type { FormInstance, FormRules } from 'element-plus';

interface Form {
  userId: string,
  username: string,
  password: string,
  role: 'admin' | 'student' | 'teacher',
}

const formRef = ref<FormInstance>();
const form = reactive<Form>({
  userId: '',
  username: '',
  password: '',
  role: 'student',
});

const rules = reactive<FormRules<Form>>({
  userId: [
    { required: true, message: '学号 / 用户名不能为空', trigger: 'blur' },
    { min: 4, max: 24, message: '学号 / 用户名长度应在 4~24 之间', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
    { min: 2, max: 15, message: '姓名长度应在 2~15 之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, message: '密码至少 8 位', trigger: 'blur' }
  ],
});

const buttonLoading = ref(false);

const register = async (submittedForm: FormInstance | undefined) => {
  if (!submittedForm) {
    return;
  }

  await submittedForm.validate(async valid => {
    if (valid) {
      buttonLoading.value = true;

      try {
        await trpc.user.register.mutate({
          id: form.userId,
          username: form.username,
          password: form.password,
          role: form.role,
        });

        ElMessage({ message: '创建成功', type: 'success', showClose: true });
        buttonLoading.value = false;
      } catch (err) {
        if (isTRPCClientError(err)) {
          if (err.data?.zodError) {
            err.data.zodError.forEach((e) => {
              ElMessage({ message: e.message, type: 'error', showClose: true });
            });
          } else {
            ElMessage({ message: err.message, type: 'error', showClose: true });
          }
        } else {
          ElMessage({ message: '未知错误', type: 'error', showClose: true });
        }

        buttonLoading.value = false;
      }
    }
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
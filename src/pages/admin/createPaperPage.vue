<template>
  <el-card>
    <el-form label-position="top" class="register-form" :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="title">
        <div class="icon-label">
          <el-icon :size="15">
            <Document />
          </el-icon>
          标题
        </div>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item prop="abstract">
        <div>
          <el-icon :size="15">
            <Document />
          </el-icon>
          摘要
        </div>
        <el-input v-model="form.abstract" :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" />
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
import type { RouterInput } from '../../api/trpc';
import type { FormInstance, FormRules } from 'element-plus';

type TCreatePaperInput = RouterInput['paper']['create'];

const formRef = ref<FormInstance>();
const form = reactive<TCreatePaperInput>({
  title: '',
  abstract: '',
  authorGroupId: '',
  keywords: [],
  S3FileId: '',
});

const rules = reactive<FormRules<TCreatePaperInput>>({
});

const buttonLoading = ref(false);

const register = async (submittedForm: FormInstance | undefined) => {
  if (!submittedForm) {
    return;
  }

  await submittedForm.validate(async valid => {
    if (valid) {
      buttonLoading.value = true;
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
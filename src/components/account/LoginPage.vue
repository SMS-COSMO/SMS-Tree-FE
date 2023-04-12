<template>
  <div class="bg" />
  <div class="top-margin middle">
    <el-alert title="第一次登录完毕后请修改密码！" show-icon type="warning" effect="dark" :closable="false" />
    <el-card style="margin-top: 15px">
      <template #header>
        登录
      </template>
      <el-form label-position="top">
        <el-form-item>
          <div class="icon-label">
            <el-icon :size="15">
              <User />
            </el-icon>
            用户名 / 学号
          </div>
          <el-input v-model="form.user_name" />
        </el-form-item>
        <el-form-item>
          <div class="icon-label">
            <el-icon :size="15">
              <Key />
            </el-icon>
            密码
          </div>
          <el-input type="password" v-model="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button class="submit-button" color="#146E3C" :loading="buttonLoading" @click="buttonLoading = true">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const buttonLoading = ref(false);

const form = reactive({
  user_name: '',
  password: ''
});
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
  filter: brightness(0.7) blur(1px);
}

.el-alert--warning {
  z-index: 0;
  background-color: #F29A41;
}

.middle {
  margin-left: auto;
  margin-right: auto;
  max-width: 480px;
}

.top-margin {
  margin-top: 20vh;
}

.submit-button {
  margin-left: auto;
  margin-right: 0;
}
</style>

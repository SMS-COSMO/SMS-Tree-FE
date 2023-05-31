<template>
  <h1 id="title">Title</h1>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="bordered-card">
        Info
        <el-divider />
        <el-button color="#146E3C" style="width: 100%;" plain @click="download_dialog = true;">
          下载
        </el-button>
        <el-dialog v-model="download_dialog" title="文件下载" class="download-dialog">
        </el-dialog>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="bordered-card">
        <template #header>
          摘要
        </template>
        {{ id }}
      </el-card>
    </el-col>
  </el-row>

  <el-card class="bordered-card mt20">
    <WordView url="https://ztl-uwu.github.io/test.docx" />
  </el-card>

  <el-card class="bordered-card mt20" style="margin-bottom: 20px;">
    <WordView type="pdf" url="https://ztl-uwu.github.io/test.pdf" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id;

const download_dialog = ref(false);
</script>

<style lang="scss">
@import "../../styles/color.scss";

.mt20 {
  margin-top: 20px;
}

#title {
  font-size: 45px;
}

.download-dialog {
  width: 30%;
}
</style>
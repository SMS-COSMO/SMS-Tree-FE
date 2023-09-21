<template>
  <el-backtop :right="100" :bottom="100" />

  <div class="title-holder">
    <h1 class="title">Title</h1>
    <el-space :size="20">
      <el-statistic :value="98500">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            分数
          </div>
        </template>
      </el-statistic>
      <el-divider direction="vertical" style="height: 40px;"></el-divider>
      <el-statistic :value="98500">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            下载次数
          </div>
        </template>
      </el-statistic>
    </el-space>
  </div>

  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <template #header>
          论文信息
        </template>
      </el-card>
      <el-card class="mt20">
        <el-button color="#146E3C" style="width: 100%;" plain @click="download_dialog = true;">
          下载
        </el-button>
        <el-dialog v-model="download_dialog" title="文件下载" class="download-dialog">
          <el-collapse>
            <el-collapse-item title="Placeholder">
              placeholder
            </el-collapse-item>
          </el-collapse>
        </el-dialog>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <template #header>
          摘要
        </template>
        {{ id }}
      </el-card>
    </el-col>
  </el-row>

  <el-card class=" mt20">
    <WordView url="https://ztl-uwu.github.io/test.docx" />
  </el-card>

  <el-card class=" mt20">
    <WordView type="pdf" url="https://ztl-uwu.github.io/test.pdf" />
  </el-card>

  <el-card class=" mt20" style="margin-bottom: 20px;">
    <template #header>
      教师评语
    </template>
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
@import "~/styles/color.scss";

.mt20 {
  margin-top: 20px;
}

.title {
  font-size: 45px;
  width: 100%;
}

.title-holder {
  display: flex;
}

.download-dialog {
  width: 30%;
}
</style>
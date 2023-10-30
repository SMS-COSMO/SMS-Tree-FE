<template>
  <el-backtop :right="100" :bottom="100" />

  <div class="title-holder">
    <h1 class="title">
      <el-skeleton animated :rows="0" :loading="contentLoading">
        <el-tag type="success" size="large" v-if="content?.isFeatured">
          <el-text style="color: var(--el-color-success);">
            <el-icon>
              <Star />
            </el-icon>
            优秀作业
          </el-text>
        </el-tag>
        {{ content?.title }}
      </el-skeleton>
    </h1>
    <el-skeleton animated :loading="contentLoading" :rows="2" style="width: 200px">
      <el-space :size="20">
        <el-statistic :value="content?.rate">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              分数
            </div>
          </template>
        </el-statistic>
        <el-divider direction="vertical" style="height: 40px;"></el-divider>
        <el-statistic :value="content?.downloadCount">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              下载次数
            </div>
          </template>
        </el-statistic>
      </el-space>
    </el-skeleton>
  </div>

  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <template #header>
          论文信息
        </template>
        <el-skeleton animated :rows="4" :loading="contentLoading">
          <el-divider content-position="left">发布时间</el-divider>
          {{ content?.createdAt.toLocaleDateString('zh-CN') }}
        </el-skeleton>
        <el-button color="#146E3C" class="w-full mt-5" plain @click="downloadDialog = true;" v-if="content?.canDownload">
          下载
        </el-button>
        <el-dialog v-model="downloadDialog" title="文件下载" class="download-dialog">
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
        <el-skeleton animated :rows="4" :loading="contentLoading">
          {{ content?.abstract }}
        </el-skeleton>

        <el-row>
          <el-skeleton class="mt-5" animated :rows="1" :loading="contentLoading">
            <div class="mt-5" v-if="content?.keywords.length">
              <el-text style="font-weight: bold">
                关键词：
              </el-text>
              <el-tag v-for="(keyword, index) in content?.keywords" :key="index" size="large" class="mx-1 clickable"
                type="info" effect="plain" @click="searchTag(keyword)">
                {{ keyword }}
              </el-tag>
            </div>
          </el-skeleton>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <el-card class="mt-5">
    <WordView url="https://ztl-uwu.github.io/test.docx" />
  </el-card>

  <el-card class="mt-5">
    <WordView type="pdf" url="https://ztl-uwu.github.io/test.pdf" />
  </el-card>

  <el-card class="mt-5 mb-5">
    <template #header>
      教师评语
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PaperContentOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();

const id = route.params.id.toString();

const downloadDialog = ref(false);
const contentLoading = ref(true);

const content = ref<PaperContentOutput>();

const searchTag = (keyword: string) => {
  router.push({ path: '/list', query: { search: keyword } });
};

onMounted(async () => {
  try {
    content.value = await trpc.paper.content.query({ id });
    contentLoading.value = false;
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~/styles/color.scss";

.title {
  font-size: 45px;
  width: 100%;
  padding-right: 4em;
}

.title-holder {
  display: flex;
}

.download-dialog {
  width: 30%;
}

.clickable {
  cursor: pointer;
}
</style>
<template>
  <el-backtop :right="isSmallScreen ? 30 : 100" :bottom="100" />

  <div class="title-holder mb-3">
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
    <el-skeleton v-if="!isSmallScreen" animated :loading="contentLoading" :rows="2" style="width: 200px">
      <el-space :size="20">
        <el-statistic :value="content?.rate">
          <template #title>
            分数
          </template>
        </el-statistic>
        <el-divider direction="vertical" style="height: 40px;"></el-divider>
        <el-statistic :value="content?.downloadCount">
          <template #title>
            下载次数
          </template>
        </el-statistic>
      </el-space>
    </el-skeleton>
  </div>

  <el-row :gutter="20">
    <el-col :span="isSmallScreen ? 24 : 6">
      <FoldableCard :canFold="isSmallScreen">
        <template #header>
          论文信息
        </template>
        <el-skeleton animated :rows="4" :loading="contentLoading">
          <el-descriptions title="" :column="1">
            <el-descriptions-item label="作者">
              <GroupMembers :groupId="content?.groupId" type="link" class="inline" />
            </el-descriptions-item>
            <el-descriptions-item label="发布时间">
              {{ content?.createdAt.toLocaleDateString('zh-CN') }}
            </el-descriptions-item>
            <el-descriptions-item label="关键词">
              <el-tag v-for="(keyword, index) in content?.keywords" :key="index" class="clickable m-0.75" type="info"
                effect="plain" @click="searchTag(keyword)">
                {{ keyword }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item v-if="isSmallScreen" label="分数">
              {{ content?.rate }}
            </el-descriptions-item>
            <el-descriptions-item v-if="isSmallScreen" label="下载次数">
              {{ content?.downloadCount }}
            </el-descriptions-item>
          </el-descriptions>
        </el-skeleton>
        <el-button color="#146E3C" class="mt-1 w-full" plain @click="downloadDialog = true;" v-if="content?.canDownload">
          下载
        </el-button>
        <el-dialog v-model="downloadDialog" title="文件下载" class="download-dialog">
          <el-collapse>
            <el-collapse-item title="Placeholder">
              placeholder
            </el-collapse-item>
          </el-collapse>
        </el-dialog>
      </FoldableCard>
    </el-col>
    <el-col :span="isSmallScreen ? 24 : 18" :class="isSmallScreen ? 'mt-4' : ''">
      <FoldableCard :canFold="isSmallScreen">
        <template #header>
          摘要
        </template>
        <el-skeleton animated :rows="4" :loading="contentLoading">
          <div class="abstract leading-normal">
            {{ content?.abstract }}
          </div>
        </el-skeleton>
      </FoldableCard>
    </el-col>
  </el-row>

  <el-card class="mt-5">
    <WordView url="https://ztl-uwu.github.io/test.docx" />
  </el-card>

  <el-card class="mt-5">
    <WordView type="pdf" url="https://ztl-uwu.github.io/test.pdf" />
  </el-card>

  <el-card class="desktop:mb-5 mb-22 mt-5">
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
const isSmallScreen = screen.width <= 700;

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
  width: 100%;

  @media only screen and (min-width: 700px) {
    padding-right: 4em;
    font-size: 45px;
  }

  font-size: 30px;
}

.title-holder {
  @media only screen and (min-width: 700px) {
    display: flex;
  }
}

.abstract {
  text-align: justify;
  font-size: 16px;
  padding: 5px;

  @media only screen and (max-width: 700px) {
    font-size: 15px;
    padding: 0;
  }
}

.download-dialog {
  width: 30%;
}

.clickable {
  cursor: pointer;
}
</style>

<style lang="scss">
.el-descriptions__label {
  font-weight: bold;
}
</style>
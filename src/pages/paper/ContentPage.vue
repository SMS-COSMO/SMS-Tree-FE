<template>
  <el-backtop :right="100" :bottom="100" />

  <div class="title-holder">
    <h1 class="title">{{ content.title }}</h1>
    <el-space :size="20">
      <el-statistic :value="content.rate">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            分数
          </div>
        </template>
      </el-statistic>
      <el-divider direction="vertical" style="height: 40px;"></el-divider>
      <el-statistic :value="content.downloadCount">
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
        <el-divider content-position="left">发布时间</el-divider>
        {{ content.createdAt.toLocaleDateString('zh-CN') }}
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
        {{ content.abstract }}
        <el-divider content-position="left">关键词</el-divider>
        <el-tag v-for="(keyword, index) in content.keywords" :key="index" size="large" class="mx-1 clickable" type="info"
          effect="plain" @click="searchTag(keyword)">
          {{ keyword }}
        </el-tag>
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();

const id = route.params.id.toString();

const download_dialog = ref(false);

const content = ref<RouterOutput['paper']['content']>({
  id: '',
  title: '',
  keywords: [],
  abstract: '',
  authorGroupId: '',
  status: 0,
  downloadCount: 0,
  rate: 0,
  createdAt: new Date(),
});

const searchTag = (keyword: string) => {
  router.push({ path: '/list', query: { search: keyword } });
};

onMounted(async () => {
  try {
    content.value = await trpc.paper.content.query({ id });
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
  }
});
</script>

<style lang="scss">
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

.mx-1 {
  margin: 0.25rem;
}

.clickable {
  cursor: pointer;
}
</style>
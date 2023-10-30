<template>
  <el-card class="card-container mb-2.5">
    <el-row style="gap: 6px">
      <el-tag type="success" disable-transitions v-if="paper?.isFeatured">
        <el-icon>
          <Star />
        </el-icon>
        优秀作业
      </el-tag>
      <el-tag disable-transitions v-if="paper?.canDownload">
        <el-icon>
          <Download />
        </el-icon>
        可下载
      </el-tag>
      <el-tag type="info" disable-transitions>{{ paper?.createdAt?.toLocaleDateString('zh-CN') }}</el-tag>
      <el-text type="info" size="small" v-if="paper?.canDownload">
        下载次数：{{ paper?.downloadCount }}
      </el-text>
    </el-row>
    <el-row class="mt-2" style="gap: 8px">
      <el-text class="title">{{ paper?.title }}</el-text>
      <el-text>Author{{ paper?.authorGroupId }}</el-text>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { PaperListOutputItem } from '../../api/trpc';

defineProps<{
  paper: PaperListOutputItem;
}>();
</script>

<style scoped lang="scss">
.title {
  font-weight: bold;
  font-size: 19px;
}

.card-container {
  cursor: pointer;
}

.card-container:hover {
  border-color: #D4D7DE !important;
  background-color: #F5F7FA !important;
}
</style>

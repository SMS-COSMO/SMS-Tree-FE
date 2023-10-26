<template>
  <el-card class="card-container">
    <el-row style="gap: 6px">
      <el-tag type="success" disable-transitions>
        <el-icon>
          <Star />
        </el-icon>
        优秀作业
      </el-tag>
      <el-tag disable-transitions>
        <el-icon>
          <Download />
        </el-icon>
        可下载
      </el-tag>
      <el-tag type="info" disable-transitions>{{ paper?.createdAt?.toLocaleDateString('zh-CN') }}</el-tag>
      <!-- v-if can download -->
      <el-text type="info" size="small">
        下载次数：{{ paper?.downloadCount }}
      </el-text>
    </el-row>
    <el-row class="mt-8">
      <el-text class="title">{{ paper?.title }}</el-text>
      <el-text class="ml-8">Author{{ paper?.authorGroupId }}</el-text>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  paper: {
    type: Object,
    require: true,
  },
});
</script>

<style scoped lang="scss">
.title {
  font-weight: bold;
  font-size: 19px;
}

.ml-8 {
  margin-left: 8px;
}

.mt-8 {
  margin-top: 8px;
}

.card-container {
  cursor: pointer;
  margin-bottom: 10px;
}

.card-container:hover {
  border-color: #D4D7DE !important;
  background-color: #F5F7FA !important;
}
</style>

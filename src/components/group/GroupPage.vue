<template>
  <el-row :gutter="20">
    <el-col :span="22">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="bordered-card">
            Info
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="bordered-card">
            Stats
          </el-card>
        </el-col>
      </el-row>

      <el-upload class="margin-top" drag multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件或 <em>点击这里上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            Place Holder
          </div>
        </template>
      </el-upload>

    </el-col>
    <el-col :span="2">
      <div style="height: 500px">
        <el-steps direction="vertical" :active="1">
          <el-step :icon="Upload" title="提交" />
          <el-step :icon="CircleCheck" title="查重" />
          <el-step :icon="Edit" title="批改" />
        </el-steps>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Edit, Upload, CircleCheck } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 20px;
}
</style>

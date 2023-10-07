<template>
  <el-tabs tab-position="left" style="height: 500px;">
    <el-tab-pane label="用户信息">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header>
              学号
            </template>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header>
              姓名
            </template>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="mt20">
        <template #header>
          参与的项目
        </template>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="信息修改">

    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id;
</script>

<style lang="scss" scoped></style>
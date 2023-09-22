<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-tabs tab-position="left" style="height: 500px; display: block;">
        <el-tab-pane label="用户信息">
          <div class="ml20">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-card>
                  <template #header>
                    姓名
                  </template>
                </el-card>
              </el-col>
              <el-col :span="14">
                <el-card>
                  <template #header>
                    学号
                  </template>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col>
                <el-card>
                  <template #header>
                    参与的项目
                  </template>
                  {{ id }}
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="信息修改">
          <div class="ml20">
            <el-card>
              
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id;


</script>

<style lang="scss" scoped>
</style>
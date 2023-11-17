<template>
  <el-space :size="20" direction="vertical" fill class="w-full">
    <div class="w-full">
      <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row :gutter="20">
      <el-col :span="isSmallScreen ? 24 : 7">
        <el-card>
          <template #header>
            快速搜索
          </template>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="quickSearchContent" @keyup.enter="quickSearch" clearable />
            </el-col>
            <el-col :span="8">
              <el-button class="w-full" color="#146E3C" plain @click="quickSearch">
                <el-icon :size="14">
                  <Search />
                </el-icon>
                搜索
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="isSmallScreen ? 24 : 17" class="mt-4 desktop:mt-0">
        <el-card>
          <template #header>
            作业进度
          </template>
        </el-card>
      </el-col>
    </el-row>
  </el-space>
  <FooterBar v-if="!isSmallScreen" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isSmallScreen = screen.width <= 700;

const quickSearchContent = ref('');
const router = useRouter();

const quickSearch = () => {
  router.push({ path: '/list', query: { search: quickSearchContent.value } });
};
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

//Place Holder Style
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 250px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<template>
  <el-checkbox v-model="modelValue.filter.onlyCanDownload" label="仅查看可下载" border @change="updateValue" />
  <el-checkbox v-model="modelValue.filter.onlyFeatured" label="仅查看优秀作业" class="mt-2" border @change="updateValue" />
  <el-checkbox v-model="modelValue.showAbstract" label="显示摘要" class="mt-2" border @change="updateValue" />

  <el-divider content-position="left">搜索范围</el-divider>
  <el-select v-model="modelValue.searchSelectValue" placeholder="搜索内容" multiple class="w-full" @change="updateValue">
    <el-option v-for="item in searchSelectOptions" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <el-date-picker class="mt-2" v-model="modelValue.filter.timeRange" type="daterange" unlink-panels range-separator="到"
    start-placeholder="最早" end-placeholder="最晚" :shortcuts="timePresets" @change="updateValue" />

  <el-divider content-position="left">排序</el-divider>
  <el-radio-group v-model="modelValue.sortOption" :size="isSmallScreen ? 'large' : ''">
    <el-radio-button label="default">默认</el-radio-button>
    <el-radio-button label="time">时间</el-radio-button>
    <el-radio-button label="rate">分数</el-radio-button>
    <el-radio-button label="downloadCount">下载次数</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSmallScreen = screen.width <= 700;

export type TSearchOption = {
  filter: {
    onlyCanDownload: boolean;
    onlyFeatured: boolean;
    timeRange: string;
  }
  searchSelectValue: string[];
  showAbstract: false;
  sortOption: 'default' | 'time' | 'rate' | 'downloadCount';
};

const props = defineProps<{
  modelValue: TSearchOption;
}>();
const emit = defineEmits(['update:modelValue']);

const modelValue = ref(props.modelValue);

const updateValue = () => {
  emit('update:modelValue', modelValue.value);
};

const timePresets = [
  {
    text: '这个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  }, {
    text: '今年',
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    },
  }, {
    text: '最近半年',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    },
  },
];

const searchSelectOptions = [
  {
    value: 'title',
    label: '标题',
  }, {
    value: 'keywords',
    label: '关键词',
  },
];
</script>
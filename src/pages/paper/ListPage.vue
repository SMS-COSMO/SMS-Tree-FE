<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <div class="left-box-inner">
          <el-checkbox v-model="filter.onlyCanDownload" label="仅查看可下载" border />
          <el-checkbox v-model="filter.onlyFeatured" label="仅查看优秀作业" class="mt-2" border />
          <el-divider content-position="left">
            搜索范围
          </el-divider>
          <el-select v-model="searchSelectValue" placeholder="搜索内容" multiple class="w-full">
            <el-option v-for="item in searchSelectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-input v-model="searchContent" placeholder="搜索论文" clearable class="mb-4" @change="updateUrl">
        <template #prepend>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>

      <div>
        <div v-if="loading" class="infinite-list-skeleton m-0 p-0">
          <el-card v-for="n in 10" :key="n" class="mb-2.5">
            <el-skeleton :rows="1" animated :loading="loading" />
          </el-card>
        </div>
        <div v-else>
          <TransitionGroup name="list" tag="ul" v-infinite-scroll="load" class="infinite-list list-full-screen m-0 p-0"
            infinite-scroll-immediate="false">
            <li v-for="(paper, index) in processedListData.slice(0, count)" :key="index">
              <div class="list-full-screen-center mx-auto">
                <el-row :gutter="20">
                  <el-col :span="6">
                  </el-col>
                  <el-col :span="18">
                    <paperCard :paper="paper" @click="open_paper(paper)" />
                  </el-col>
                </el-row>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PaperListOutput, PaperListOutputItem, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
import { useFuse } from '@vueuse/integrations/useFuse';

const router = useRouter();
const route = useRoute();

const count = ref(10);

const open_paper = (paper: PaperListOutputItem) => {
  router.push({
    path: `/paper/${paper.id}`,
  });
};

const searchContent = ref(route.query.search?.toString() ?? '');

const listData = ref<PaperListOutput>([]);
const loading = ref(true);

const filter = ref({
  onlyCanDownload: false,
  onlyFeatured: false,
});

const updateUrl = () => {
  router.replace({ query: { search: searchContent.value } });
};

const searchSelectOptions = [
  {
    value: 'title',
    label: '标题',
  }, {
    value: 'keywords',
    label: '关键词',
  },
];
const searchSelectValue = ref(['title', 'keywords']);
const fuseOptions = computed(() => {
  return {
    fuseOptions: {
      keys: searchSelectValue.value,
      shouldSort: true,
      threshold: 0.6,
      useExtendedSearch: true,
    },
    matchAllWhenSearchEmpty: true,
  };
});

const fuse = useFuse(searchContent, listData, fuseOptions);
const processedListData = computed(() => {
  return fuse.results.value.map(e => e.item)
    .filter(o => (!filter.value.onlyCanDownload || o.canDownload) && (!filter.value.onlyFeatured || o.isFeatured));
});

const load = () => {
  count.value += Math.min(5, processedListData.value.length - count.value);
};

onMounted(async () => {
  try {
    listData.value = await trpc.paper.list.query();
    loading.value = false;
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
.left-box-inner {
  position: relative;
  z-index: 10;
}

.infinite-list {
  height: calc(100vh - 95px - 65px);
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.list-full-screen {
  position: fixed;
  left: 0;
  width: 100vw;
}

.list-full-screen-center {
  max-width: 1300px;
}

.infinite-list-skeleton {
  height: calc(100vh - 95px - 65px - 50px);
  list-style: none;
  overflow: hidden;
}

.infinite-list::-webkit-scrollbar {
  display: none;
}

.list-enter-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>

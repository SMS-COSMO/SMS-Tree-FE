<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col v-if="!isSmallScreen" :span="isSmallScreen ? 24 : 6">
      <el-card>
        <div class="left-box-inner">
          <SearchOptions v-model="searchOptions" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="isSmallScreen ? 24 : 18">
      <el-input v-model="searchContent" placeholder="搜索论文" clearable class="mb-2.5" @change="updateUrl"
        :suffix-icon="isSmallScreen ? Search : ''">
        <template #prepend>
          <el-icon v-if="!isSmallScreen">
            <Search />
          </el-icon>
          <el-button v-else @click="showSearchOptions = !showSearchOptions">
            <el-icon>
              <ArrowDown v-if="!showSearchOptions" />
              <ArrowUp v-else />
            </el-icon>
          </el-button>
        </template>
      </el-input>
      <Transition name="mobile-search-option-transition">
        <el-card v-if="showSearchOptions" class="mb-2.5">
          <SearchOptions v-model="searchOptions" />
        </el-card>
      </Transition>
      <Transition name="mobile-search-result-transition">
        <div v-if="!showSearchOptions">
          <div v-if="loading" class="infinite-list-skeleton m-0 p-0">
            <el-card v-for="n in 10" :key="n" class="mb-2.5">
              <el-skeleton :rows="1" animated :loading="loading" />
            </el-card>
          </div>
          <div v-else>
            <TransitionGroup name="list" tag="ul" v-infinite-scroll="load" class="infinite-list list-full-screen m-0 p-0"
              infinite-scroll-immediate="false">
              <li v-for="(paper, index) in processedListData.slice(0, count)" :key="index">
                <div class="list-full-screen-center mx-auto px-5">
                  <el-row :gutter="20">
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="isSmallScreen ? 24 : 18">
                      <paperCard :paper="paper" @click="open_paper(paper)" :showAbstract="searchOptions.showAbstract" />
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li v-if="processedListData.length === 0" class="text-center">
                <div class="list-full-screen-center mx-auto px-5">
                  <el-row :gutter="20">
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="isSmallScreen ? 24 : 18">
                      <el-text type="info">
                        <el-icon>
                          <Remove />
                        </el-icon>
                        无结果，换个搜索条件试试？
                      </el-text>
                    </el-col>
                  </el-row>
                </div>
              </li>
            </TransitionGroup>
          </div>
        </div>
      </Transition>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PaperListOutput, PaperListOutputItem, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { useFuse } from '@vueuse/integrations/useFuse';

const isSmallScreen = screen.width <= 700;

const router = useRouter();
const route = useRoute();

const count = ref(10);

const open_paper = (paper: PaperListOutputItem) => {
  router.push({
    path: `/paper/${paper.id}`,
  });
};

const searchContent = ref(route.query.search?.toString() ?? '');
const showSearchOptions = ref(false);

const listData = ref<PaperListOutput>([]);
const loading = ref(true);

const searchOptions = reactive({
  filter: {
    onlyCanDownload: false,
    onlyFeatured: false,
    timeRange: '',
  },
  searchSelectValue: ['title', 'keywords'],
  showAbstract: false,
});

const updateUrl = () => {
  router.replace({ query: { search: searchContent.value } });
};

const fuseOptions = computed(() => {
  return {
    fuseOptions: {
      keys: searchOptions.searchSelectValue,
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
    .filter(o => {
      if (searchOptions.filter.onlyCanDownload && !o.canDownload)
        return false;
      if (searchOptions.filter.onlyFeatured && !o.isFeatured)
        return false;
      if (searchOptions.filter.timeRange &&
        (o.createdAt.getTime() < Date.parse(searchOptions.filter.timeRange[0]) ||
          o.createdAt.getTime() > Date.parse(searchOptions.filter.timeRange[1]))
      )
        return false;
      return true;
    });
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
  @media only screen and (max-width: 700px) {
    height: calc(100vh - 95px - 65px - 70px);
  }

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

.mobile-search-option-transition-enter-active,
.mobile-search-option-transition-leave-active {
  transition: all 0.3s ease;
}

.mobile-search-option-transition-enter-from,
.mobile-search-option-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.mobile-search-result-transition-enter-active {
  transition: all 0.8s cubic-bezier(.63, -0.27, .14, .53);
}

.mobile-search-result-transition-enter-from,
.mobile-search-result-transition-leave-to {
  opacity: 0;
}
</style>

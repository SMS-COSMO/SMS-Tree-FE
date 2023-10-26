<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>

      </el-card>
    </el-col>
    <el-col :span="18">
      <el-input v-model="searchContent" placeholder="搜索论文" clearable style="margin-bottom: 15px;">
        <template #prepend>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>

      <div>
        <div v-if="loading" class="infinite-list-skeleton">
          <el-card v-for="n in 10" :key="n" class="search-skeleton-card">
            <el-skeleton :rows="1" animated :loading="loading" />
          </el-card>
        </div>
        <div v-else>
          <TransitionGroup name="list" tag="ul" v-infinite-scroll="load" class="infinite-list list-full-screen"
            infinite-scroll-immediate="false">
            <li v-for="(paper, index) in processedListData.slice(0, count)" :key="index">
              <div class="list-full-screen-center">
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
import { RouterOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
import { useFuse, type UseFuseOptions } from '@vueuse/integrations/useFuse';
type TList = RouterOutput['paper']['list'];

const router = useRouter();
const route = useRoute();

const count = ref(10);

const open_paper = (paper: TList[0]) => {
  router.push({
    path: `/paper/${paper.id}`,
  });
};

const searchContent = ref(route.query.search?.toString() ?? '');

const listData = ref<TList>([]);
const loading = ref(true);

const fuseOptions: UseFuseOptions<TList[0]> = {
  fuseOptions: {
    keys: ['title', 'keywords'],
    shouldSort: true,
    threshold: 0.6,
    useExtendedSearch: true,
  },
  matchAllWhenSearchEmpty: true,
};

const fuse = useFuse(searchContent, listData, fuseOptions);
const processedListData = computed(() => {
  return fuse.results.value.map(e => e.item);
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
.infinite-list {
  height: calc(100vh - 95px - 65px - 50px);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.list-full-screen {
  position: fixed;
  left: 0;
  width: 100vw
}

.list-full-screen-center {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
}

.infinite-list-skeleton {
  height: calc(100vh - 95px - 65px - 50px);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
}

.infinite-list::-webkit-scrollbar {
  display: none;
}

.table {
  margin-top: 20px;
  cursor: pointer;
}

.pagination {
  padding: 20px 30px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;

  background-color: #FFFFFF;
  border-radius: 10px;
}

.pagination-holder {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  text-align: center;
}

.search-skeleton-card {
  margin-bottom: 10px;
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
}</style>

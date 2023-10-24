<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col :span="20">
      <el-input v-model="searchContent" placeholder="搜索论文" clearable />
    </el-col>
    <el-col :span="4">
      <el-button style="width: 100%;" color="#146E3C" plain>
        <el-icon :size="14">
          <Search />
        </el-icon>
        搜索
      </el-button>
    </el-col>
  </el-row>

  <el-table class="table" stripe :data="displayListData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    size="large" @row-click="open_paper" v-loading="loading">
    <el-table-column fixed prop="title" label="标题" />
    <el-table-column prop="keywords" label="标签" width="250">
      <template #default="scope">
        <el-tag v-for="(keyword, index) in scope.row.keywords.slice(0, 5)" :key="index" class="mx-1" effect="plain"
          type="info">
          {{ keyword.slice(0, 5) }}
          <el-tooltip v-if="keyword.length > 5" :content="keyword" placement="top">
            ...
          </el-tooltip>
        </el-tag>
        <el-tooltip placement="bottom" style="max-width: 200px;">
          <template #content>
            <span v-for="(keyword, index) in scope.row.keywords" :key="index">
              {{ keyword }}
              <br>
            </span>
          </template>
          <el-text v-if="scope.row.keywords.length > 5" type="info">
            ...
          </el-text>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="authorGroupId" label="作者" width="180" />
    <el-table-column prop="createdAt" label="发布时间" width="180">
      <template #default="scope">
        {{ scope.row.createdAt.toLocaleDateString() }}
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-holder">
    <el-pagination class="pagination" v-model:page-size="pageSize" v-model:current-page="currentPage"
      :page-sizes="[20, 50, 100, 200, 300, 400]" background layout="sizes, prev, pager, next, jumper, total"
      :total="displayListData.length" />
  </div>
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

const open_paper = (row: TList[0]) => {
  router.push({
    path: `/paper/${row.id}`,
  });
};

const processTag = (content: string) => {
  return content.length > 5 ? `${content.slice(0, 5)}...` : content;
};

const pageSize = ref(50);
const currentPage = ref(1);

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
const displayListData = computed(() => {
  return fuse.results.value.map(e => e.item);
});

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

.mx-1 {
  margin: 0.2rem;
}
</style>

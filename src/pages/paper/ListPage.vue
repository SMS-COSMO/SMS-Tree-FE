<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col :span="20">
      <el-input v-model="searchContent" />
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
    <el-table-column prop="keywords" label="标签" width="100" />
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
import { useRouter } from 'vue-router';
import { RouterOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';
import { useFuse, type UseFuseOptions } from '@vueuse/integrations/useFuse';
type TList = RouterOutput['paper']['list'];

const router = useRouter();

const open_paper = (row: TList[0]) => {
  router.push({
    path: `/paper/${row.id}`,
  });
};

const pageSize = ref(50);
const currentPage = ref(1);

const searchContent = ref('');

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
  return fuse.results.value.map(e => {
    return {
      id: e.item.id,
      title: e.item.title,
      keywords: e.item.keywords,
      abstract: e.item.abstract,
      authorGroupId: e.item.authorGroupId,
      status: e.item.status,
      rate: e.item.rate,
      createdAt: e.item.createdAt,
    };
  });
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
</style>

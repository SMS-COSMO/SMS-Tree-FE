<template>
  <el-backtop :right="100" :bottom="100" />

  <el-row :gutter="20">
    <el-col :span="20">
      <el-input v-model="search_content">
      </el-input>
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

  <el-table class="table" stripe :data="listData" size="large" @row-click="open_paper" v-loading="loading">
    <el-table-column fixed prop="title" label="标题" />
    <el-table-column prop="keywords" label="标签" width="100" />
    <el-table-column prop="authorGroupId" label="作者" width="180" />
    <el-table-column prop="createdAt" label="发布时间" sortable width="180">
      <template #default="scope">
        {{ processTime(scope.row.createdAt) }}
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-holder">
    <el-pagination class="pagination" v-model:current-page="current_page" v-model:page-size="page_size"
      :page-sizes="[50, 100, 200, 300, 400]" background layout="sizes, prev, pager, next, jumper, total"
      :total="total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterOutput, isTRPCClientError, trpc } from '../../api/trpc';
import { ElMessage } from 'element-plus';

const router = useRouter();

const current_page = ref(1);
const page_size = ref(50);

const total_page = 400;

const open_paper = (row: RouterOutput['paper']['list'][0]) => {
  router.push({
    path: `/paper/${row.id}`,
  });
};

const handleSizeChange = (value: number) => {
  console.log(value);
};

const handleCurrentChange = (value: number) => {
  console.log(value);
};

const processTime = (time: Date) => {
  return time.toLocaleDateString();
};

const search_content = ref('');

const listData = ref<RouterOutput['paper']['list']>([]);
const loading = ref(true);

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

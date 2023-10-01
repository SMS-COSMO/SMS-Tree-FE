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

  <el-table class="table" stripe :data="data" size="large" @row-click="open_paper">
    <el-table-column fixed prop="title" label="标题" />
    <el-table-column prop="author" label="作者" width="180" />
    <el-table-column prop="time" label="发布时间" sortable width="180" />
    <el-table-column prop="tag" label="标签" width="100" />
  </el-table>

  <div class="pagination-holder">
    <el-pagination class="pagination" v-model:current-page="current_page" v-model:page-size="page_size"
      :page-sizes="[50, 100, 200, 300, 400]" background layout="sizes, prev, pager, next, jumper, total"
      :total="total_page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const current_page = ref(1);
const page_size = ref(50);

const total_page = 400;

const open_paper = (row: any) => {
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

const search_content = ref('');

// test
const data = [
  {
    id: '1',
    title: 'Title1',
    author: 'author1, author2, author3, author4, author5',
    time: '2023-04-12'
  },
  {
    id: '3',
    title: 'title3',
    author: '',
    time: '2019-01-10'
  },
  {
    id: '2',
    title: 'title2',
    author: '',
    time: '2023-04-09'
  },
  {
    id: '4',
    title: 'title4',
    author: '',
    time: ''
  },
  {
    id: '5',
    title: 'title5',
    author: '',
    time: ''
  },
];
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

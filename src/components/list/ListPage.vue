<template>
  <el-row :gutter="20">
    <el-col :span="20">
      <el-input>
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

  <el-table class="table">
  </el-table>

  <div class="pagination-holder">
    <el-pagination class="pagination" v-model:current-page="currentPage4" v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]" background layout="sizes, prev, pager, next, jumper, total" :total="400"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<style lang="scss" scoped>
.table {
  margin-top: 20px;
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

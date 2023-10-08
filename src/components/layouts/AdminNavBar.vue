<template>
  <el-menu class="left-menu" background-color="#f3f5f7" active-text-color="#4d4d4d" :router="true">
    <el-menu-item index="/admin/register">
      <el-icon>
        <CirclePlus />
      </el-icon>
      <span>创建账户</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <el-icon>
        <document />
      </el-icon>
      <span>学生列表</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.left-menu {
  @include border-normal();
  user-select: none;
  border-radius: 10px;
  overflow: none;
  width: 250px;
}

.el-menu-item .is-active {
  background-color: #fff !important;
}
</style>
<template>
  <el-card>
    <template #header>
      用户信息
    </template>
    <el-skeleton :rows="5" :loading="contentLoading" animated>
      <el-descriptions :column="isSmallScreen ? 2 : 4" size="large" style="margin-bottom: -20px;">
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              姓名
            </div>
          </template>
          <span class="cell-item">
            {{ info?.username }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              学号
            </div>
          </template>
          <span class="cell-item">
            {{ info?.id }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <location />
              </el-icon>
              班级
            </div>
          </template>
          <span class="cell-item">
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <tickets />
              </el-icon>
              账号权限
            </div>
          </template>
          <el-tag size="small">{{ roleName[info?.role ?? 'student'] }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-skeleton>
  </el-card>
  <FoldableCard class="mt-5">
    <template #header>
      参与的论文
    </template>
    <el-skeleton :rows="10" :loading="paperLoading" animated>
      <div class="desktop:columns-2">
        <div v-for="(paper, index) in papers" :key="index">
          <paperCard :paper="paper" showAbstract />
        </div>
      </div>
      <div v-if="!papers.length">
        <el-empty :image-size="130" description="暂无论文" />
      </div>
    </el-skeleton>
  </FoldableCard>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PaperListOutput, isTRPCClientError, trpc } from '../../api/trpc';
import type { UserProfileOutput } from '../../api/trpc';
import { ElMessage } from 'element-plus';

const isSmallScreen = screen.width <= 700;

const props = defineProps<{
  userId: string;
}>();

const roleName = {
  'student': '学生',
  'teacher': '老师',
  'admin': '管理员',
};

const info = ref<UserProfileOutput>();
const papers = ref<PaperListOutput>([]);
const contentLoading = ref(true);
const paperLoading = ref(true);

onMounted(async () => {
  try {
    info.value = await trpc.user.profile.query({ id: props.userId });
    contentLoading.value = false;

    let paperIds: string[] = [];
    for (let group of info.value.groupIds)
      paperIds = paperIds.concat((await trpc.group.content.query({ id: group })).papers);
    for (let paper of paperIds)
      papers.value.push(await trpc.paper.content.query({ id: paper }));
    paperLoading.value = false;
  } catch (err) {
    if (isTRPCClientError(err)) {
      ElMessage({ message: err.message, type: 'error', showClose: true });
    } else {
      ElMessage({ message: '未知错误', type: 'error', showClose: true });
    }
  }
});
</script>

<style scoped lang="scss">
.cell-item {
  font-size: 16px !important;
}
</style>

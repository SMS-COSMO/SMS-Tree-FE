<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header>
          学号
        </template>
        <el-skeleton :rows="0" :loading="contentLoading" animated>
          {{ info?.id }}
        </el-skeleton>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          姓名
        </template>
        <el-skeleton :rows="0" :loading="contentLoading" animated>
          {{ info?.username }}
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
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

const props = defineProps<{
  userId: string;
}>();

const info = ref<UserProfileOutput>();
const papers = ref<PaperListOutput>([]);
const contentLoading = ref(true);
const paperLoading = ref(true);

onMounted(async () => {
  try {
    info.value = await trpc.user.profile.query({ id: props.userId });
    contentLoading.value = false;

    const paperIds: string[] = [];
    for (let group of info.value.groupIds)
      paperIds.push.apply(paperIds, (await trpc.group.content.query({ id: group })).papers);
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

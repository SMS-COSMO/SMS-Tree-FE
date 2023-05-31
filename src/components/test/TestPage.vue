<template>
  <div style="display: flex">
    <div style="width: 100%;">
      Local Storage Test
      <ElButton @click="test++; update_store();">
        cnt: {{ test }}
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import store from '../../store';
import { trpc } from '../../api/trpc';

let test = ref(0);
onBeforeMount(() => {
  test = ref(parseInt(store.state.test));
  if (test === undefined) {
    test = ref(0);
  }
});

const update_store = () => {
  store.commit('update', { test: test });
};
</script>

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
import { testStore } from '../../stores/test';
const store = testStore();

let test = ref(0);
onBeforeMount(() => {
  test = ref(parseInt(store.count));
  if (test === undefined) {
    test = ref(0);
  }
});

const update_store = () => {
  store.update(test.value.toString());
};
</script>

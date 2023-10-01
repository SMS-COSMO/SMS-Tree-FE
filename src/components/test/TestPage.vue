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
import { Store } from '../../stores';

let test = ref(0);
onBeforeMount(() => {
  test = ref(parseInt(Store.test.count));
  if (test === undefined) {
    test = ref(0);
  }
});

const update_store = () => {
  Store.test.update(test.value.toString());
};
</script>

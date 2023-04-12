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

<script lang="ts">
import { trpc } from "../../api/trpc"

export default {
  data() {
    return {
      test: 0
    };
  },
  methods: {
    update_store() {
      this.store.commit('update', { test: this.test });
    }
  },
  beforeMount() {
    this.test = this.store.state.test;
    if (this.test === undefined) {
      this.test = 0;
    }
  },
  mounted() {
  }
};
</script>

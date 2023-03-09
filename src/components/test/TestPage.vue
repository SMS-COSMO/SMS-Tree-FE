<template>
  <div style="display: flex">
    <div style="width: 100%;">
      test
      <ElButton @click="test++; update_store();">
        {{ test }}
      </ElButton>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      test: 0
    };
  },
  methods: {
    update_store () {
      this.store.commit('update', { test: this.test });
    }
  },
  beforeMount () {
    this.test = this.store.state.test;
    if (this.test === undefined) {
      this.test = 0;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}
</style>

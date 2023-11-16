<template>
  <NavBar />
  <div id="view" class="mx-auto px-5">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { trpc } from './api/trpc';
import { onBeforeMount } from 'vue';
import { UserStore } from './stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = UserStore();

onBeforeMount(async () => {
  try {
    await trpc.user.tokenValidity.query({ token: userStore.accessToken });
  } catch (err) {
    router.push('/login');
  }
});
</script>

<style lang="scss">
#view {
  max-width: 1300px;
  margin-top: 95px;
}
</style>

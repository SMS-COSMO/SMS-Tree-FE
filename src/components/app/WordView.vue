<template>
  <iframe :src="`https://view.officeapps.live.com/op/embed.aspx?src=${url}`" frameborder='0' class="iframe">
  </iframe>
</template>

<script lang="ts" setup>
defineProps({
  url: String
})
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: calc(100vh - 150px);
}
</style>
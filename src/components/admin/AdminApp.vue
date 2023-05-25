<template>
  <div id="container">
    <AdminNavBar></AdminNavBar>
    <div id="view">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  display: flex;
}

#view {
  margin: 0;
  width: 100%;
  padding-left: 25px;
}
</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import url("~@/assets/fonts/circular/style.css");
@import url("~@/assets/fonts/source-code-pro/style.css");
@import url("~@/assets/stylesheets/main.scss");
html,
body {
  height: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  font-family: "Circular", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
}

#app {
  height: 100%;
  overflow-x: hidden;
}
</style>

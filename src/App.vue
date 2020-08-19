<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
@import "~aos/dist/aos.css";
</style>

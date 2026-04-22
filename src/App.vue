<script setup>
import { ref } from 'vue'
import HomeView from './view/HomeView.vue';

const preloadHome = ref(false);

window.__PRELOAD_HOME__ = () => {
  preloadHome.value = true
}

window.__STOP_PRELOAD__ = () => {
  preloadHome.value = false
}

</script>

<template>
  <div class="app">
    <RouterView />

    <HomeView 
      v-if="preloadHome" 
      class="home-preload"
      data-preload
    />
  </div>
</template>

<style scoped>
.home-preload {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  margin: 8px;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>

    <RefreshDialog/>
  </div>
</template>

<script>
import RefreshDialog from './components/notifications/RefreshDialog.vue';

export default {
  name: 'app',
  
  components: {
    RefreshDialog,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

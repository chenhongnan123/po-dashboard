<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import "../src/assets/css/commen.css";
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home,
    // Home,
  }
}
</script>

<style>
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>

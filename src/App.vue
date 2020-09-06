<template>
  <div id="app">
    <fontmin/>
  </div>
</template>

<script>
import fontmin from './components/fontmin.vue';

export default {
  name: 'App',
  components: {
    fontmin,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

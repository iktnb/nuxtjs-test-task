<template>
  <div class="wrapper"><RowContentVue /></div>
</template>

<script>
import RowContentVue from '../components/RowContent.vue'
export default {
  name: 'IndexPage',
  components: { RowContentVue },
  async asyncData({ store }) {
    await store.dispatch('catalog/fetchTopAlbom')
    await store.dispatch('catalog/fetchNewAlboms')
    await store.dispatch('catalog/fetchTeasers')
    await store.dispatch('catalog/fetchSeriesList')
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1080px;
  margin: 0 auto;
}
</style>

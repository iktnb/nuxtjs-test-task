<template>
  <div class="column">
    <div class="row" v-for="(row, id) in content" :key="row.id">
      <template v-if="row.id <= 2">
        <h4 class="title">#{{ id + 1 }} {{ row.title }}</h4>

        <div class="content" :class="row.type">
          {{ row.content }}

          <div
            class="teaser-item"
            v-for="teaser in row.teasers"
            :key="teaser.id"
          >
            {{ teaser.id }}
            {{ teaser.title_bold }}
            {{ teaser.url }}
          </div>

          <div
            class="series-item"
            v-for="serie in row.series"
            :key="serie.currents"
          >
            {{ serie.id }}
            {{ serie.name }}
            {{ serie.lowest_price }}
            {{ serie.albums_count }}
          </div>
        </div>
      </template>
      <client-only v-else>
        <h4 class="title">#{{ id + 1 }} {{ row.title }}</h4>

        <div class="content" :class="row.type">
          {{ row.content }}

          <div
            class="teaser-item"
            v-for="teaser in row.teasers"
            :key="teaser.id"
          >
            {{ teaser.id }}
            {{ teaser.title_bold }}
            {{ teaser.url }}
          </div>

          <div
            class="series-item"
            v-for="serie in row.series"
            :key="serie.currents"
          >
            {{ serie.id }}
            {{ serie.name }}
            {{ serie.lowest_price }}
            {{ serie.albums_count }}
          </div>
        </div></client-only
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      seriesCounter: 0,
      teasersCounter: 0,
      contentCounter: 1,
    }
  },

  computed: {
    ...mapGetters({
      topAlbom: 'catalog/getTopAlbom',
      teasers: 'catalog/getTeasers',
      series: 'catalog/getSeriesList',
    }),

    newSeries() {
      return this.series.filter((e) => e.type === 'new')
    },

    noGenreSeries() {
      return this.series.filter((e) => e.type !== 'genre')
    },

    content() {
      const content = []

      if (this.topAlbom) {
        const data = {
          title: 'Top Albom',
          content: this.topAlbom.name,
          id: this.contentCounter,
        }
        content.push(data)
        this.contentCounter += 1
      }

      if (this.newSeries) {
        content.push(this.prepareSeries(this.newSeries[0]))
        this.contentCounter += 1
      }

      content.push(this.prepareTeasers(2))
      this.contentCounter += 1
      content.push(this.prepareSeries(this.series[2]))
      this.contentCounter += 1
      content.push(this.prepareTeasers(1))
      this.contentCounter += 1

      if (this.noGenreSeries) {
        content.push(this.prepareSeries(this.noGenreSeries[0]))
        this.contentCounter += 1
      }

      return content
    },
  },
  methods: {
    filterSeries(genre) {
      return
    },
    prepareSeries(serie) {
      const { current, type, id, slug, name, series } = serie

      const data = {
        title:
          'Series ' +
          `${current}-${type}-${id}-${slug} ${name} count(${series?.length})`,
        type: 'series',
        id: this.contentCounter,
        series: series,
      }

      if (!data.series.length) return

      return data
    },
    prepareTeasers(amount) {
      const start = this.teasersCounter
      this.teasersCounter += amount
      const data = {
        title: 'Teasers',
        id: this.contentCounter,
        teasers: this.teasers.slice(start, start + amount),
        type: 'teasers',
      }

      return data
    },
  },
}
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
}

.row {
  border: 1px solid gray;
  padding: 4px;
  margin-bottom: 16px;
}

.content {
  display: flex;
}

.teaser-item {
  width: 180px;
  height: 100px;
  margin: 0 4px;
  background-color: lightgray;
  text-align: center;
  display: flex;
  align-items: center;
}

.series-item {
  width: 130px;
  height: 180px;
  margin: 0 4px;
  background-color: lightgray;
  text-align: center;
  display: flex;
  align-items: center;
}
</style>

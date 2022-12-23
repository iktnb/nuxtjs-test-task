export const state = () => ({
  topAlbom: {},
  teasers: {},
  newAlboms: {},
  seriesList: [],
})

export const getters = {
  getTopAlbom(state) {
    return state.topAlbom.topAlbum
  },
  getNewAlboms(state) {
    return state.newAlboms
  },
  getTeasers(state) {
    return state.teasers.list
  },
  getSeriesList(state) {
    return state.seriesList
  },
}

export const mutations = {
  SET_TOP_ALBOM(state, data) {
    state.topAlbom = { ...data }
  },
  SET_NEW_ALBOMS(state, data) {
    state.newAlboms = data
  },
  SET_TEASERS(state, data) {
    state.teasers = data
  },
  ADD_SERIES(state, data) {
    state.seriesList.push(data)
  },
}

export const actions = {
  async fetchTopAlbom({ commit }) {
    try {
      const response = await this.$repositories.catalog.getTopAlbom()
      commit('SET_TOP_ALBOM', response.data)
    } catch (e) {
      console.log('getTopAlbom', e)
    }
  },
  async fetchNewAlboms({ commit }) {
    try {
      const response = await this.$repositories.catalog.getNewAlboms()
      commit('SET_NEW_ALBOMS', response.data)
    } catch (e) {
      console.log('getNewAlboms', e)
    }
  },
  async fetchTeasers({ commit }) {
    try {
      const response = await this.$repositories.catalog.getTeasers()
      commit('SET_TEASERS', response.data)
    } catch (e) {
      console.log('getTeasers', e)
    }
  },
  async fetchSeriesList({ commit }, payload) {
    try {
      let counter = 0
      let flag = true
      while (flag) {
        const response = await this.$repositories.catalog.getSeries(counter)
        if (response.data) {
          counter = parseInt(response.data.current) + 1
          commit('ADD_SERIES', response.data)
        } else {
          flag = false
        }
      }
    } catch (e) {}
  },
}

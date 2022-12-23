const resource = '/catalog'

export default ($axios) => ({
  getTopAlbom() {
    return $axios({
      method: 'GET',
      url: `${resource}/top/bd`,
    })
  },
  getNewAlboms() {
    return $axios({
      method: 'GET',
      url: `${resource}/new/bd`,
    })
  },
  getTeasers() {
    return $axios({
      method: 'GET',
      url: `${resource}/marketing/bd`,
    })
  },
  getSeries(params) {
    return $axios({
      method: 'GET',
      url: `${resource}/next/bd/${params}`,
    })
  },
})

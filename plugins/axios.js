export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = 'Bearer q1234567890'
  })
}

import CatalogRepository from '~/repositories/CatalogRepository'

export default ($axios) => ({
  catalog: CatalogRepository($axios),
})

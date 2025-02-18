import { Grid } from '@mui/material'

import SearchFilters from './SearchFilters'
import ProductList from './ProductsList'

export default function ExploreProducts() {
  return (
    <Grid container gap={5}>
      <Grid item xs={12}>
        <SearchFilters />
      </Grid>
      <Grid item xs={12}>
        <ProductList />
      </Grid>
    </Grid>
  )
}

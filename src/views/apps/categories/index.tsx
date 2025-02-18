import { Grid } from '@mui/material'

import CategoriesTopCards from './components/CategoriesTopCards'
import CategoriesDataTable from './components/CategoriesDataTable'
import { CategoryCxtProvider } from './context/CategoryCxt'

export default function CategoriesMainView() {
  return (
    <CategoryCxtProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CategoriesTopCards />
        </Grid>
        <Grid item xs={12}>
          <CategoriesDataTable />
        </Grid>
      </Grid>
    </CategoryCxtProvider>
  )
}

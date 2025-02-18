import { Grid, Stack } from '@mui/material'

import VendorsTopCards from './components/TopCards'
import VendorsListTable from './components/VendorsTable'
import { VendorsCxtProvider } from './context'

export default function VendorsMainView() {
  return (
    <VendorsCxtProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <VendorsTopCards />
        </Grid>
        <Grid item xs={12}>
          <VendorsListTable />
        </Grid>
      </Grid>
    </VendorsCxtProvider>
  )
}

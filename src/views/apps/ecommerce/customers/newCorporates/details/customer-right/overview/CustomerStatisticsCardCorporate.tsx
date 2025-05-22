import Grid from '@mui/material/Grid'

// Types Imports
import type { CardStatsCustomerStatsProps } from '@/types/pages/widgetTypes'
import type { Customer } from '@/types/apps/ecommerceTypes'
import CustomerStatsCorporate from './CustomerStatsCorporate'

// Component Imports
// import CustomerStats from '@components/card-statistics/CustomerStats'

const CustomerStatisticsCardCorporate = ({
  customerStatData,
  customerData
}: {
  customerStatData?: CardStatsCustomerStatsProps[]
  customerData: Customer
}) => {
  console.log(customerData, 'customerStatData')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CustomerStatsCorporate customerData={customerData} />
      </Grid>
    </Grid>
  )
}

export default CustomerStatisticsCardCorporate

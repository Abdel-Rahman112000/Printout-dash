import Grid from '@mui/material/Grid'

// Types Imports
import type { CardStatsCustomerStatsProps } from '@/types/pages/widgetTypes'
import CustomerStatsIndiviuals from './CustomerStatsIndiviuals'
import type { Customer } from '@/types/apps/ecommerceTypes'

// Component Imports
// import CustomerStats from '@components/card-statistics/CustomerStats'

const CustomerStatisticsCard = ({
  customerStatData,
  customerData
}: {
  customerStatData?: CardStatsCustomerStatsProps[]
  customerData: Customer[]
}) => {
  console.log(customerData, 'customerStatData')

  return (
    <Grid container spacing={6}>
      {/* {customerStatData?.map((item, index) => ( */}
      <Grid item xs={12} md={6}>
        <CustomerStatsIndiviuals customerData={customerData} />
      </Grid>
      {/* ))} */}
    </Grid>
  )
}

export default CustomerStatisticsCard

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { OrderType } from '@/types/apps/ecommerceTypes'

// Component Imports
import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailsCard from './OrderDetailsCard'
import ShippingActivity from './ShippingActivityCard'
import CustomerDetails from './CustomerDetailsCard'
import ShippingAddress from './ShippingAddressCard'
import { SubOrderCxtProvider } from './context'

const OrderDetails = () => {
  return (
    <SubOrderCxtProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <OrderDetailHeader />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <OrderDetailsCard />
            </Grid>
            <Grid item xs={12}>
              <ShippingActivity />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomerDetails />
            </Grid>
            <Grid item xs={12}>
              <ShippingAddress />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SubOrderCxtProvider>
  )
}

export default OrderDetails

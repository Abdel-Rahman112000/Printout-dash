'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import OrderCard from './components/OrderCard'
import { MainOrdersCxtProvider } from './context/MainOrdersCxt'
import MainOrderListTable from './components/MainOrderTable'

// Component Imports

const MainOrdersList = () => {
  return (
    <MainOrdersCxtProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <OrderCard />
        </Grid>
        <Grid item xs={12}>
          <MainOrderListTable />
        </Grid>
      </Grid>
    </MainOrdersCxtProvider>
  )
}

export default MainOrdersList

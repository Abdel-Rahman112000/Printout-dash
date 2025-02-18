'use client'

import * as React from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import ExploreProducts from '../explore-products'
import VendorProductsList from '../vendor-product'
import { VendorsProductsCxt } from '../../context'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function VendorProductsEntryPoint() {
  const [value, setValue] = React.useState(0)
  const { handleRefreshAssignedProducts, handleRefreshUnassignedProducts } = React.useContext(VendorsProductsCxt)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue == 0) handleRefreshAssignedProducts()
    else handleRefreshUnassignedProducts()

    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Vendor Products' {...a11yProps(0)} />
          <Tab label='Explore Products' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VendorProductsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExploreProducts />
      </CustomTabPanel>
    </Box>
  )
}

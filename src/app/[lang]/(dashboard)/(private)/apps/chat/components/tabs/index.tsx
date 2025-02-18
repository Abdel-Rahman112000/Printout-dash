'use client'

// Hooks
import { useContext, useState } from 'react'

// Mui
import { Box, Container, Tab, Tabs } from '@mui/material'

import { ChatContext } from '../../context'
import ChatEntryPointAdmins from '../entry-point-admins'
import ChatEntryPointDelivery from '../entry-point-delivery'

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

export default function ChatTabs() {
  const [value, setValue] = useState(0)
  const { handleStoryChatType } = useContext(ChatContext)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    handleStoryChatType(newValue == 1 ? 'AdminWithDelivery' : 'AdminWithClient')
  }

  return (
    <Container maxWidth='xl' sx={{ p: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Clients' {...a11yProps(0)} />
          <Tab label='Delivery Men' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ChatEntryPointAdmins />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChatEntryPointDelivery />
      </CustomTabPanel>
    </Container>
  )
}

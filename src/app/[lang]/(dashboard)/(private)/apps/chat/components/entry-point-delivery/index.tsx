'use client'
// MUI
import { useContext } from 'react'

import { Container, Grid } from '@mui/material'

import ChatsComponent from '../Chats'
import ChatBox from '../ChatBox'
import { ChatContext } from '../../context'

export default function ChatEntryPointDelivery() {
  // States
  const { deliveryMenList } = useContext(ChatContext)

  //   methods

  // return
  return (
    <Container maxWidth='xl' sx={{ p: 4 }}>
      <Grid container>
        <Grid item xs={4} className='hidden md:block'>
          <ChatsComponent chats={deliveryMenList} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ChatBox />
        </Grid>
      </Grid>
    </Container>
  )
}

import { Stack } from '@mui/material'

import ChatsHeader from './ChatsHeader'
import ChatsList from './ChatsList'
import type { DeliveryMan } from '@/types/api/common/DeliveryMan'

export default function ChatsComponent(props: PropsType) {
  return (
    <Stack height={'50rem'} sx={{ overflowY: 'auto' }}>
      <ChatsHeader />
      <ChatsList chats={props.chats} />
    </Stack>
  )
}

type PropsType = {
  chats: DeliveryMan[] | undefined
}

// MUI
import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Avatar, Badge, Box, Button, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'

// Icons
import VideocamIcon from '@mui/icons-material/Videocam'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { ChatContext } from '../../context'

export default function ChatBoxHeader() {
  const { chatType, userData, activeChat } = useContext(ChatContext)

  const router = useRouter()

  const useName = chatType == 'AdminWithDelivery' ? activeChat?.user_name : userData?.user_name

  return (
    <>
      <Stack
        p={3}
        spacing={4}
        direction={'row'}
        alignItems={'center'}
        borderRadius={'0px 8px 0 0'}
        border={'1px solid lightgray'}
        className='hidden md:block'
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Badge color='success' variant='dot'>
            <Avatar>{useName?.slice(0, 1) ?? 'A'}</Avatar>
          </Badge>
          <Button
            href='chat/custom-offer'
            color='success'
            sx={{
              my: 1,
              bgcolor: '#dcf6e8'
            }}
          >
            Make an offer
          </Button>
        </Box>
        {/* info */}
        <Stack flexGrow={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Typography variant='body1' fontSize={16}>
              {useName ?? ''}
            </Typography>
            <Typography variant='body2' fontSize={13}>
              {chatType == 'AdminWithDelivery' ? 'Chat with delivery man.' : 'chat with print out admins.'}
            </Typography>
          </Box>
          {/* actions */}
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <IconButton>
              <VideocamIcon />
            </IconButton>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
        {/* chats list */}
      </Stack>

      <MobileSelectChat />
    </>
  )
}

const MobileSelectChat = () => {
  // declare and define component state and variables
  const { activeChat, handleStoreActiveChat, clients, deliveryMenList, chatType } = useContext(ChatContext)
  const chatsList = chatType == 'AdminWithClient' ? clients : deliveryMenList
  const [defaultValue, setDefaultValue] = useState(chatsList?.[0]?.id)

  // handle side effects
  useEffect(() => {
    const chat = chatsList?.[0]

    if (chat) {
      setDefaultValue(chat.id)
      handleStoreActiveChat(chat)
    }
  }, [chatType])

  // Methods
  const handleChange = (id: number) => {
    const chat = chatsList?.find(ele => ele.id == id)

    if (chat) handleStoreActiveChat(chat)
  }

  return (
    <Select
      labelId='select-active-chat-label'
      id='select-active-chat'
      value={activeChat?.id}
      onChange={e => {
        handleChange(+e.target.value)
      }}
      fullWidth
      variant='standard'
      defaultValue={defaultValue}
      className='block md:hidden'
    >
      {chatsList?.map(man => (
        <MenuItem key={man.id} value={man.id}>
          <Stack
            p={3}
            spacing={4}
            direction={'row'}
            alignItems={'center'}
            borderRadius={'0px 8px 0 0'}
            border={'1px solid lightgray'}
          >
            <Badge color='success' variant='dot'>
              <Avatar>{man?.user_name?.slice(0, 1) ?? 'A'}</Avatar>
            </Badge>
            <Typography variant='body2'>{man?.user_name}</Typography>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  )
}

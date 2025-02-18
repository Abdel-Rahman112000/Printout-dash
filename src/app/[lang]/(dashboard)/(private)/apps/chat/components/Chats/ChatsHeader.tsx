// MUI
import { useContext } from 'react'

import { Avatar, Badge, InputAdornment, Stack, TextField } from '@mui/material'

// Icons
import SearchIcon from '@mui/icons-material/Search'

import { ChatContext } from '../../context'

export default function ChatsHeader() {
  const { userData } = useContext(ChatContext)
  const userName = userData?.user_name

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={4}
      border={'1px solid lightgray'}
      p={3}
      borderRadius={'8px 0px 0 0'}
    >
      <Badge color='success' variant='dot'>
        <Avatar>{userName?.slice(0, 1) ?? 'A'}</Avatar>
      </Badge>

      {/* search */}
      <TextField
        id='chats-search'
        placeholder='search..'
        variant='outlined'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}

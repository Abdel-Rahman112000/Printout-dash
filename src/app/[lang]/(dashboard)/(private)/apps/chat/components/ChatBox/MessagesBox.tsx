'use client'
// Packages
import type { SetStateAction } from 'react'
import { useContext, useEffect, useRef, useState } from 'react'

import Pusher from 'pusher-js'

// MUI
import { Box, Button, IconButton, Stack, styled, TextField, Typography } from '@mui/material'

// Icons
import SendIcon from '@mui/icons-material/Send'
import MicNoneIcon from '@mui/icons-material/MicNone'
import AttachmentIcon from '@mui/icons-material/Attachment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ClearIcon from '@mui/icons-material/Clear'

import axios from 'axios'

import { serialize } from 'object-to-formdata'

import { ChatContext } from '../../context'

import ChatMesaggesLoader from './Loader'
import type { MessageType } from '@/types/api/common/Chat/Message'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { Media } from '@/types/api/common/Media'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function MessagesBox() {
  // extract from context
  const { chatBoxMessages, realTimeMessages, handleStoreNewRTMessage, loadingChat, chatType, userData, activeChat } =
    useContext(ChatContext)

  // State and Vars
  const [userMsg, setUserMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File>()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const isClientAdminChannel = chatType === 'AdminWithClient'

  const emptyMessagesBox = chatType === 'AdminWithDelivery' && activeChat == undefined

  // handle side effects
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'eu'
    })

    const id = isClientAdminChannel ? 0 : activeChat?.global_id

    const channelName = `chat-channel_${activeChat?.global_id}-0`

    const channel = pusher.subscribe(channelName)

    channel.bind('new-message', (data: MessageType) => {
      handleStoreNewRTMessage(data)
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [activeChat])

  const handleSendUserMessage = async () => {
    setLoading(true)
    const headers = await getClientAuthHeaders()

    const url = isClientAdminChannel ? api`dashboard/messages/client/send` : api`dashboard/messages/delivery/send`

    const body = isClientAdminChannel
      ? serialize({
          message: userMsg,
          files: uploadedFile == undefined ? [] : [uploadedFile],
          receiver_id: activeChat?.id
        })
      : serialize({
          message: userMsg,
          files: uploadedFile == undefined ? [] : [uploadedFile],
          receiver_id: activeChat?.id
        })

    axios
      .post<{ data: MessageType }>(url, body, { headers })
      .then(res => {
        setUserMsg('')
        setUploadedFile(undefined)
        // handleStoreNewRTMessage(res?.data?.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false)
      })
  }

  // return component ui
  return (
    <Stack
      flexGrow={1}
      spacing={3}
      bgcolor={'#f3f2f5'}
      border={'1px solid lightgray'}
      borderRadius={'0px 0px 5px 0px'}
      height={'705px'}
      sx={{ overflowY: 'auto' }}
      position={'relative'}
    >
      {loadingChat ? (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
          <ChatMesaggesLoader />
        </Stack>
      ) : emptyMessagesBox ? (
        <></>
      ) : (
        <>
          <Box flexGrow={1} sx={{ overflowY: 'auto', pb: '2rem' }}>
            {/* messages */}
            {[...(chatBoxMessages ?? []), ...realTimeMessages]
              ?.filter(ele => ele?.message?.length > 0)
              .map(message => <UserMessage key={message.senderId} message={message} />)}
            {/* This is the ref to always scroll to */}
            <div ref={messagesEndRef} />
          </Box>

          {/* input message */}
          <Stack bottom={'0'} width={'100%'} position={'absolute'} alignItems={'center'} justifyContent={'center'}>
            {uploadedFile != undefined && (
              <UploadedFilePreview loading={loading} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
            )}
            <Stack
              direction={'row'}
              bgcolor={'#fff'}
              width={'100%'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <TextField
                size='small'
                placeholder='Type your messange here...'
                sx={{ width: '70%' }}
                value={userMsg}
                onChange={e => setUserMsg(e.target.value)}
                disabled={loading}
              />
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <IconButton>
                  <MicNoneIcon />
                </IconButton>
                <IconButton component='label' role={undefined} tabIndex={-1}>
                  <AttachmentIcon />
                  <VisuallyHiddenInput
                    type='file'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files) {
                        const file = event.target.files?.[0]

                        setUploadedFile(file)
                      }
                    }}
                    disabled={loading}
                  />
                </IconButton>
                <Button
                  disabled={loading}
                  onClick={handleSendUserMessage}
                  endIcon={<SendIcon sx={{ transform: 'skewY(-25deg)' }} />}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}

const UploadedFilePreview = ({
  loading,
  uploadedFile,
  setUploadedFile
}: {
  loading: boolean
  uploadedFile: File
  setUploadedFile: React.Dispatch<SetStateAction<File | undefined>>
}) => {
  // calc file size
  const sizeInKB = (uploadedFile.size / 1024).toFixed(2)
  // get file src
  const [imageSrc, setImageSrc] = useState('')

  if (uploadedFile && uploadedFile.type.startsWith('image/')) {
    const reader = new FileReader()

    reader.onload = () => {
      setImageSrc(reader.result as string)
    }

    reader.readAsDataURL(uploadedFile)
  }

  return (
    <Stack
      spacing={2}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        width: '100%',
        minHeight: '75px',
        background: '#d3d3d357',
        padding: '9px'
      }}
    >
      <Stack direction={'row'} spacing={3} alignItems={'center'}>
        {uploadedFile.type == 'image/png' && (
          <img
            src={imageSrc}
            height={60}
            width={40}
            style={{
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            alt='imageFile'
          />
        )}
        <Box>
          <Typography variant='body2'>{uploadedFile?.name}</Typography>
          <Typography variant='body2'>{sizeInKB} kb</Typography>
        </Box>
      </Stack>
      <IconButton
        disabled={loading}
        onClick={() => {
          setUploadedFile(undefined)
        }}
      >
        <ClearIcon />
      </IconButton>
    </Stack>
  )
}

const UserMessage = ({ message }: { message: MessageType }) => {
  const mediaArr = Array.isArray(message?.media)
    ? message?.media
    : Array.isArray(message?.docs?.media)
      ? message?.docs?.media
      : []

  return (
    <Stack
      width={'100%'}
      px={1}
      mt={1}
      mb={2}
      alignItems={message.sender_type !== 'App\\Models\\Client' ? 'end' : 'start'}
    >
      <Box
        p={1}
        width={'auto'}
        color={'#000'}
        bgcolor={message.sender_type !== 'App\\Models\\Client' ? '#20B9C9' : '#EEEEEE'}
        borderRadius={'15px'}
      >
        {Array.isArray(mediaArr) &&
          mediaArr?.map(item =>
            item.mime_type == 'image/png' ? (
              <ImageMessage key={item.id} url={item.original_url} />
            ) : (
              <DocsMessage file={item} key={item.id} message={message} />
            )
          )}
        <Typography variant='body2'>{message.message}</Typography>
      </Box>
    </Stack>
  )
}

const ImageMessage = ({ url }: { url: string }) => (
  <img
    src={url}
    height={190}
    width={120}
    style={{
      objectFit: 'cover',
      borderRadius: '8px',
      width: '160px',
      height: '220px'
    }}
    alt='imageFile'
  />
)

const DocsMessage = ({ message, file }: { message: MessageType; file: Media }) => (
  <Stack direction={'row'} spacing={1} bgcolor={message.sender_type == 'App\\Models\\Client' ? '#20B9C9' : '#EEEEEE'}>
    <AttachFileIcon />
    <Typography variant='body2' sx={{ textDecoration: 'underline' }}>
      {file.name}
    </Typography>
  </Stack>
)

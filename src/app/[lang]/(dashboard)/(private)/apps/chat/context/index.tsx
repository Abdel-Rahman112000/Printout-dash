'use client'

import type { ReactNode } from 'react'

import { createContext, useContext, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

import type { MessageType } from '@/types/api/common/Chat/Message'
import type { DeliveryMan } from '@/types/api/common/DeliveryMan'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { User } from '@/types/api/common/User'

export const ChatContext = createContext<ChatContextType>({
  loadingChat: false,
  chatBoxMessages: [],
  userData: undefined,
  realTimeMessages: [],
  chatType: 'AdminWithClient',
  deliveryMenList: undefined,
  clients: undefined,
  activeChat: undefined,
  handleStoryChatType: (type: ChatType) => {},
  handleStoreNewRTMessage: (msg: MessageType) => {},
  handleStoreActiveChat: (man: DeliveryMan | undefined) => {}
})

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const ChatContextProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children, userData, deliveryMenList, clients } = props
  const [chatType, setChatType] = useState<ChatType>('AdminWithClient')
  const [activeChat, setActiveChat] = useState<DeliveryMan>()
  const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([])

  // fetch chat messages
  const {
    data: chatBoxMessages,
    isLoading: loadingChat,
    refetch
  } = useQuery({
    queryKey: [`chat-messages`, activeChat, chatType],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()

      const url =
        chatType == 'AdminWithClient'
          ? api`dashboard/messages/client?client_id=${activeChat?.id}`
          : api`dashboard/messages/delivery?delivery_id=${activeChat?.id}`

      const response = await axios.get<{ data: MessageType[] }>(url, {
        headers
      })

      return response.data.data
    }
  })

  // TODO::declare and define helper methods
  function handleStoreNewRTMessage(msg: MessageType) {
    setRealTimeMessages(prev => [...prev, msg])
  }

  async function handleStartNewChat(id: number) {
    const headers = await getClientAuthHeaders()

    axios.get(api`dashboard/messages/start-chat/${id}`, { headers }).catch(() => {
      console.error('Error in start new chat')
    })
  }

  function handleStoreActiveChat(man: DeliveryMan | undefined) {
    if (man) handleStartNewChat(man?.chat?.id ?? 0)
    setRealTimeMessages([])
    refetch()
    setActiveChat(man)
  }

  function handleStoryChatType(type: ChatType) {
    // setRealTimeMessages([]);
    // refetch();
    // setActiveChat(undefined);
    setChatType(type)
  }

  // ** return component ui
  return (
    <ChatContext.Provider
      value={{
        chatType,
        userData,
        clients,
        loadingChat,
        activeChat,
        chatBoxMessages,
        deliveryMenList,
        realTimeMessages,
        handleStoryChatType,
        handleStoreNewRTMessage,
        handleStoreActiveChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

// -- declare and define helper types
type ChatType = 'AdminWithClient' | 'AdminWithDelivery'

type PropsType = {
  userData: User
  deliveryMenList: DeliveryMan[] | undefined
  clients: DeliveryMan[] | undefined
  children: ReactNode
}

type ChatContextType = {
  chatType: ChatType
  loadingChat: boolean
  userData: User | undefined
  realTimeMessages: MessageType[]
  chatBoxMessages: MessageType[] | undefined
  handleStoryChatType(type: ChatType): void
  deliveryMenList: DeliveryMan[] | undefined
  clients: DeliveryMan[] | undefined
  activeChat: DeliveryMan | undefined
  handleStoreNewRTMessage(msg: MessageType): void
  handleStoreActiveChat(man: DeliveryMan | undefined): void
}

//SettingCxt
'use client'

import type { ReactNode } from 'react'

import { createContext, useContext } from 'react'

import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { SettingItem } from '@/types/api/common/Seeting'

export const SettingsCxt = createContext<SettingsCxtType>({
  settingItems: undefined
})

export const useSettingsCxt = () => {
  return useContext(SettingsCxt)
}

export const SettingsCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props

  // fetch chat messages
  const {
    data: settingItems,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`setting-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()

      const response = await axios.get<{ data: SettingItem[] }>(api`dashboard/setting`, {
        headers
      })

      return response.data.data
    }
  })

  // TODO::declare and define helper methods

  // ** return component ui
  return <SettingsCxt.Provider value={{ settingItems }}>{children}</SettingsCxt.Provider>
}

type PropsType = {
  children: ReactNode
}

type SettingsCxtType = {
  settingItems: SettingItem[] | undefined
}

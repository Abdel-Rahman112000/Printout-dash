'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'

import { useParams } from 'next/navigation'

import { getSession } from 'next-auth/react'

import axios from 'axios'

import type { MainOrderType } from '@/types/api/common/MainOrder'
import useSingleMainOrderData from '../hooks/useSingleMainOrderData'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { User } from '@/types/api/common/User'

// types

// Hooks

export const SingleMainOrderCxt = createContext<SingleMainOrderCxtType>({
  deliveryMen: [],
  loadingMainOrderData: false,
  mainOrderData: undefined,
  isAdmin: undefined,
  refreshMainOrderData: () => {}
})

export const SingleMainOrderCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { mainOrderId } = useParams()
  const [deliveryMen, setDeliveryMen] = useState<User[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>()

  const {
    data: mainOrderData,
    isLoading: loadingMainOrderData,
    refetch: refreshMainOrderD
  } = useSingleMainOrderData(+mainOrderId)

  // ** handle side effects
  useEffect(() => {
    getDeliveryLookups()
    getSessionData()
  }, [])

  // ** declare and define component helper methods
  function refreshMainOrderData() {
    refreshMainOrderD()
  }

  async function getSessionData() {
    const session = await getSession()

    setIsAdmin(session?.user?.user_type == 'admin')
  }

  async function getDeliveryLookups() {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: User[] }>(api`dashboard/deliveries`, { headers })
      .then(response => {
        setDeliveryMen(response.data.data)
      })
      .catch(err => {})
  }

  // ** return component ui
  return (
    <SingleMainOrderCxt.Provider
      value={{ isAdmin, deliveryMen, loadingMainOrderData, mainOrderData, refreshMainOrderData }}
    >
      {children}
    </SingleMainOrderCxt.Provider>
  )
}

type SingleMainOrderCxtType = {
  loadingMainOrderData: boolean
  refreshMainOrderData(): void
  isAdmin: boolean | undefined
  deliveryMen: User[]
  mainOrderData: MainOrderType | undefined
}

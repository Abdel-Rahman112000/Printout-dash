'use client'

import { createContext, type ReactNode } from 'react'

import { useParams } from 'next/navigation'

import useSubOrderData from '../hooks/useSubOrdderData'
import type { Order } from '@/types/api/common/Order'

// types

// Hooks

export const SubOrderCxt = createContext<SubOrderCxtType>({
  orderDataLoading: false,
  orderData: undefined
})

export const SubOrderCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { id } = useParams()

  const { data: orderData, isLoading: orderDataLoading } = useSubOrderData(+id)

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <SubOrderCxt.Provider value={{ orderDataLoading, orderData }}>{children}</SubOrderCxt.Provider>
}

type SubOrderCxtType = {
  orderDataLoading: boolean
  orderData: Order | undefined
}

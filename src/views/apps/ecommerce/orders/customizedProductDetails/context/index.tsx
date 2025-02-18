'use client'

import type { ReactNode } from 'react'

import { createContext, useState } from 'react'

import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { getSession } from 'next-auth/react'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { OrderDetail } from '@/types/api/common/Order'

// types

// Hooks
// import packages

export const CustimizedProductCxt = createContext<CustimizedProductType>({
  orderData: undefined
})

export const CustimizedProductCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { productId } = useParams()

  const { data: orderData } = useQuery({
    queryKey: ['custoized-order-data'],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      //order-details
      const session = await getSession()
      const isAdmin = session?.user?.user_type == 'admin'
      const url = isAdmin ? `dashboard/order/details/${productId}` : `dashboard/vendor/order-details/${productId}`
      const response = await axios.get<{ data: OrderDetail }>(api`${url}`, { headers })

      return response?.data?.data
    }
  })

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <CustimizedProductCxt.Provider value={{ orderData }}>{children}</CustimizedProductCxt.Provider>
}

type CustimizedProductType = {
  orderData: OrderDetail | undefined
}

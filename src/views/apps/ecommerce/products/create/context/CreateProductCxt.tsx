'use client'

import type { ReactNode } from 'react'
import { createContext } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { getVendors } from '@/utils/api/vendors/get-vendors'
import type { User } from '@/types/api/common/User'

export const CreateProductCxt = createContext<CreateProductCxtType>({
  vendors: undefined,
  handleRefreshVendorsData: () => {}
})

export const CreateProductCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props

  const { data: vendors, refetch: refreshVendorsData } = useQuery({
    queryKey: [`vendors-data-list`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const response = await getVendors(headers)

      return response
    }
  })

  // TODO::declare and define helper methods
  function handleRefreshVendorsData() {
    refreshVendorsData()
  }

  // ** return component ui
  return <CreateProductCxt.Provider value={{ vendors, handleRefreshVendorsData }}>{children}</CreateProductCxt.Provider>
}

type PropsType = { children: ReactNode }
type CreateProductCxtType = {
  handleRefreshVendorsData(): void
  vendors: User[] | null | undefined
}

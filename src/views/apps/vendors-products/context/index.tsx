'use client'

import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { getVendorsUnAssignProducts } from '@/utils/api/vendors-products/get-vendors-unassign-products'
import type { Category, Product } from '@/types/api/common/Product'
import { getVendorsProductsLookups } from '@/utils/api/vendors-products/get-vendors-products-lookup'
import type { Brand } from '@/types/api/common/Brand'
import { getVendorsAssignProducts } from '@/utils/api/vendors-products/get-vendors-assign-products'

export const VendorsProductsCxt = createContext<VendorsProductsCxtType>({
  searchParams: undefined,
  unAssignedProducts: undefined,
  vendorsProductsLookups: undefined,
  unAssignProductsLoading: false,
  assignedProducts: undefined,
  assignProductsLoading: false,
  handleRefreshUnassignedProducts: () => {},
  handleRefreshAssignedProducts: () => {},
  handleStoreSearchParams: (params: SearchParamsType) => {}
})

export const VendorsProductsCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props
  const [searchParams, setSearchParams] = useState<SearchParamsType>()

  const {
    data: unAssignedProducts,
    refetch: refreshUnAssignedProducts,
    isLoading: unAssignProductsLoading
  } = useQuery({
    queryKey: [`vendors-explore-products-data-list`, searchParams],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()

      const response = await getVendorsUnAssignProducts(
        headers,
        searchParams?.brand_id,
        searchParams?.category_id,
        searchParams?.type_id
      )

      return response
    }
  })

  const {
    data: assignedProducts,
    refetch: refreshAssignedProducts,
    isLoading: assignProductsLoading
  } = useQuery({
    queryKey: [`vendors-assigned-products-data-list`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()

      const response = await getVendorsAssignProducts(headers)

      return response
    }
  })

  const { data: vendorsProductsLookups } = useQuery({
    queryKey: [`vendors-explore-products-lookups-data-list`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const response = await getVendorsProductsLookups(headers)

      return response
    }
  })

  // TODO::declare and define helper methods
  function handleRefreshUnassignedProducts() {
    refreshUnAssignedProducts()
  }

  function handleRefreshAssignedProducts() {
    refreshAssignedProducts()
  }

  function handleStoreSearchParams(params: SearchParamsType) {
    setSearchParams(params)
  }

  // ** return component ui
  return (
    <VendorsProductsCxt.Provider
      value={{
        searchParams,
        unAssignedProducts,
        unAssignProductsLoading,
        vendorsProductsLookups,
        handleStoreSearchParams,
        assignedProducts,
        assignProductsLoading,
        handleRefreshAssignedProducts,
        handleRefreshUnassignedProducts
      }}
    >
      {children}
    </VendorsProductsCxt.Provider>
  )
}

type SearchParamsType = { brand_id?: string; category_id?: string; type_id?: string }
type PropsType = { children: ReactNode }
type VendorsProductsCxtType = {
  handleRefreshUnassignedProducts(): void
  handleStoreSearchParams(params: SearchParamsType): void
  unAssignedProducts: Product[] | null | undefined
  searchParams: SearchParamsType | undefined
  unAssignProductsLoading: boolean
  assignProductsLoading: boolean
  assignedProducts: Product[] | null | undefined
  handleRefreshAssignedProducts(): void
  vendorsProductsLookups:
    | {
        brands: Brand[]
        categories: Category[]
        types: Category[]
      }
    | null
    | undefined
}

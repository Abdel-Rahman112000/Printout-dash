'use client'

import { createContext, type ReactNode } from 'react'

import useMainOrdersData from '../hooks/useMainOrdersData'
import type { MainOrderType } from '@/types/api/common/MainOrder'

// types

// Hooks

export const MainOrdersCxt = createContext<MainOrdersCxtType>({
  loadingMainOrders: false,
  mainOrderslist: undefined,
  refreshMainOrdersList: () => {}
})

export const MainOrdersCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { data: mainOrderslist, isLoading: loadingMainOrders, refetch: refreshMainOrdersData } = useMainOrdersData()

  // ** handle side effects

  // ** declare and define component helper methods
  function refreshMainOrdersList() {
    refreshMainOrdersData()
  }

  // ** return component ui
  return (
    <MainOrdersCxt.Provider value={{ loadingMainOrders, mainOrderslist, refreshMainOrdersList }}>
      {children}
    </MainOrdersCxt.Provider>
  )
}

type MainOrdersCxtType = {
  loadingMainOrders: boolean
  refreshMainOrdersList(): void
  mainOrderslist: MainOrderType[] | undefined
}

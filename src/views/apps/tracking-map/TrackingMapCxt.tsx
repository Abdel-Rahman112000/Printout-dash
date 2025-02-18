'use client'

import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import type { TrackingMapSearchParamsType, TrackkingUserType } from '@/utils/api/tracking-map/tarcking-map-data'
import { getTrackingMapData } from '@/utils/api/tracking-map/tarcking-map-data'
import { getOrders } from '@/utils/api/orders/getOrders'
import type { Order } from '@/types/api/common/Order'

export const TrackingMapCxt = createContext<TrackingMapCxtType>({
  trackedUsersList: [],
  trackingDataLoading: false,
  searchParams: {},
  mainOrdersData: [],
  handleSetSearchParams: (_params: TrackingMapSearchParamsType) => {}
})

export const TrackingMapCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props
  const urlSearchParams = useSearchParams()
  const delivery_id = urlSearchParams.get('delivery_id')

  const [searchParams, setSearchParams] = useState<TrackingMapSearchParamsType>({
    delivery_id: delivery_id === 'null' ? '-1' : (delivery_id ?? '-1')
  })

  const {
    data: trackedUserList,
    refetch,
    isLoading: trackingDataLoading
  } = useQuery({
    queryKey: [`tracking-map-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const response = await getTrackingMapData(headers)

      return response
    }
  })

  const { data: mainOrdersData } = useQuery({
    queryKey: [`main-orders-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const response = await getOrders(headers)

      return response
    }
  })

  // TODO::declare and define helper methods
  function handleSetSearchParams(_params: TrackingMapSearchParamsType) {
    setSearchParams(_params)
  }

  // ** return component ui
  return (
    <TrackingMapCxt.Provider
      value={{
        searchParams,
        mainOrdersData,
        trackingDataLoading,
        handleSetSearchParams,
        trackedUsersList: trackedUserList ?? []
      }}
    >
      {children}
    </TrackingMapCxt.Provider>
  )
}

type PropsType = { children: ReactNode }
type TrackingMapCxtType = {
  searchParams: TrackingMapSearchParamsType
  trackingDataLoading: boolean
  trackedUsersList: TrackkingUserType[]
  mainOrdersData: Order[] | null | undefined
  handleSetSearchParams(_params: TrackingMapSearchParamsType): void
}

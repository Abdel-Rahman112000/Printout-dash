import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { User } from '@/types/api/common/User'
import type { Order } from '@/types/api/common/Order'

export const getTrackingMapData = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{ data: TrackkingUserType[] }>(api`dashboard/tarcking-map`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}

export type TrackingMapSearchParamsType = {
  delivery_id?: string
  order_id?: string
  user_type?: string
}
export type TrackkingUserType = User & { user_type: string; latitude: string; longitude: string; orders: Order }

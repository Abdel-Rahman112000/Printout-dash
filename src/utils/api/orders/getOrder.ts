import axios from 'axios'

import { getSession } from 'next-auth/react'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetOrderRoot } from '@/types/api/requests/GetOrders'

export const getOrder = async (headers: AuthHeaders, orderId: unknown) => {
  try {
    const session = await getSession()
    const isAdmin = session?.user?.user_type == 'admin'
    const url = isAdmin ? `dashboard/order/main/${orderId}` : `dashboard/vendor/main-order/${orderId}`
    const res = await axios.get<GetOrderRoot>(api`${url}`, { headers })

    return res.data.data
  } catch (error) {
    return null
  }
}

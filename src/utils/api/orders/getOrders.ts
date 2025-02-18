import axios from 'axios'

import { getSession } from 'next-auth/react'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetOrdersRoot } from '@/types/api/requests/GetOrders'

export const getOrders = async (headers: AuthHeaders) => {
  try {
    const session = await getSession()
    const isAdmin = session?.user?.user_type == 'admin'
    const url = isAdmin ? `dashboard/order` : `dashboard/vendor/main-orders`
    const res = await axios.get<GetOrdersRoot>(api`${url}`, { headers })

    return res.data.data
  } catch (error) {
    return null
  }
}

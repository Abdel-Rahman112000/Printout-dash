import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getSession } from 'next-auth/react'

import { api } from '@/utils/api'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import type { Order } from '@/types/api/common/Order'

const fetchData = async (id: number) => {
  // headers
  const headers = await getServerAuthHeaders()
  // send request
  const session = await getSession()
  const isAdmin = session?.user?.user_type == 'admin'
  const url = isAdmin ? `dashboard/order/${id}` : `dashboard/vendor/order/${id}`
  const Response = await axios.get<ResponseType>(api`${url}`, { headers })

  return Response.data.data
}

export default function useSubOrderData(id: number) {
  return useQuery({
    queryKey: [`sub-order-data`, id],
    queryFn: () => fetchData(id)
  })
}

type ResponseType = {
  status: boolean
  message: string
  data: Order
}

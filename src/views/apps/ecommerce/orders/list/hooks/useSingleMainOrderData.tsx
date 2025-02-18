import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getSession } from 'next-auth/react'

import { api } from '@/utils/api'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import type { MainOrderType } from '@/types/api/common/MainOrder'

const fetchData = async (id: number) => {
  // headers
  const headers = await getServerAuthHeaders()
  // send request
  const session = await getSession()
  const isAdmin = session?.user?.user_type == 'admin'
  const url = isAdmin ? `dashboard/order/main/${id}` : `dashboard/vendor/main-order/${id}`
  const Response = await axios.get<ResponseType>(api`${url}`, { headers })

  return Response.data.data
}

export default function useSingleMainOrderData(id: number) {
  return useQuery({
    queryKey: [`single-main-order-data`, id],
    queryFn: () => fetchData(id)
  })
}

type ResponseType = {
  status: boolean
  message: string
  data: MainOrderType
}

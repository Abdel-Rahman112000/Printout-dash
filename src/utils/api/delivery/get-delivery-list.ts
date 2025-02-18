import axios from 'axios'

import type { AuthHeaders } from '@/types/AuthHeaders'
import type { DeliveryMan } from '@/types/api/common/DeliveryMan'
import { api } from '@/utils/api'

interface Root {
  status: boolean
  message: string
  data?: DeliveryMan[]
}

export const getDeliveryMenList = async (headers: AuthHeaders) => {
  const response = await axios.get<Root>(api`dashboard/messages/delivery/list`, {
    headers
  })

  return response.data?.data
}

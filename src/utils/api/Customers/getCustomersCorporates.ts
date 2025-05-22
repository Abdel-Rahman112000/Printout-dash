import axios from 'axios'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetClientsRoot } from '@/types/api/common/Clients'
import { getClientAuthHeaders } from '@/utils/headers/authClient'

export const getCustomersCorporates = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetClientsRoot>(api`dashboard/clients`, { headers })
    const filteredClients = res.data?.data.filter(client => client.type === 'company')

    return filteredClients
  } catch (error) {
    return null
  }
}

export const useClientsCorporates = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const authHeaders = await getClientAuthHeaders()

      return getCustomersCorporates(authHeaders)
    }
  })

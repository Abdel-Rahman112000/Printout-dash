import axios from 'axios'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetClientsRoot } from '@/types/api/common/Clients'
import { getClientAuthHeaders } from '@/utils/headers/authClient'

export const getClients = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetClientsRoot>(api`dashboard/clients`, { headers })
    const filteredClients = res.data?.data.filter(client => client.type === 'individual')

    return filteredClients
  } catch (error) {
    return null
  }
}

export const useClients = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const authHeaders = await getClientAuthHeaders()

      return getClients(authHeaders)
    }
  })

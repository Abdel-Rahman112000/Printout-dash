import { useMutation, useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetClientsRoot } from '@/types/api/common/Clients'
import type { FormValidateType } from '@/views/apps/ecommerce/customers/Individuals/list/AddCustomerDrawer'

export const updateClients = async ({
  id,
  headers,
  payload
}: {
  id: string | number
  headers: AuthHeaders
  payload: FormValidateType
}) => {
  try {
    const res = await axios.put<GetClientsRoot>(api`dashboard/clients/${id}`, payload, { headers })

    return res.data
  } catch (error) {
    return null
  }
}

export const useUpdateClient = () => {
  return useMutation({
    mutationFn: ({ id, headers, payload }: { id: string | number; headers: AuthHeaders; payload: FormValidateType }) =>
      updateClients({ id, headers, payload })
  })
}

export default useUpdateClient

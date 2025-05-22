import { useMutation, useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetClientsRoot } from '@/types/api/common/Clients'
import type { FormValidateType } from '@/views/apps/ecommerce/customers/Individuals/list/AddCustomerDrawer'

export const postNewClients = async ({ headers, payload }: { headers: AuthHeaders; payload: FormValidateType }) => {
  try {
    const res = await axios.post<GetClientsRoot>(api`dashboard/clients`, payload, { headers })

    return res
  } catch (error) {
    return null
  }
}

export const useCreateNewClient = () => {
  return useMutation({
    mutationFn: ({ headers, payload }: { headers: AuthHeaders; payload: FormValidateType }) =>
      postNewClients({ headers, payload })
  })
}

export default useCreateNewClient

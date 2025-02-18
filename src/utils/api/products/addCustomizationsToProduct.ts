import axios from 'axios'

import type { AuthHeaders } from '@/types/AuthHeaders'
import { api } from '@/utils/api'
import type { $CustomizationType } from '@/types/api/common/Product'

export const addCustomizationsToProduct = async (dto: addCustomizationsToProductDTO, headers: AuthHeaders) => {
  return await axios.post(api`dashboard/customization`, dto, { headers })
}

export interface addCustomizationsToProductDTO {
  customizations: DtoCustomizationType[]
}

export interface DtoCustomizationType {
  name: string
  product_id: number | string
  customizations_type: $CustomizationType
  choices: DtoChoiceType[]
}

export interface DtoChoiceType {
  name: string
  price?: number | string
  type?: string | string
}

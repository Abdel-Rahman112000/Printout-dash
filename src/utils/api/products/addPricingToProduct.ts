import axios from 'axios'

import type { AuthHeaders } from '@/types/AuthHeaders'
import { api } from '@/utils/api'

export const addPricingToProduct = async (dto: AddPricingToProductDto, headers: AuthHeaders) => {
  return await axios.post(api`dashboard/product-price`, dto, { headers })
}

export interface AddPricingToProductDto {
  product_id: number | string
  price: number | string
  conditions: Condition[]
}

export interface Condition {
  price: number | string
  condition: string
  condition_answer: number | string
}

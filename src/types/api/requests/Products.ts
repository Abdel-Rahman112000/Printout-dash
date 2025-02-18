import type { Product } from '../common/Product'

export interface GetProductsRoot {
  status: boolean
  message: string
  data: Product[]
}

export interface GetProductRoot {
  status: boolean
  message: string
  data: Product
}

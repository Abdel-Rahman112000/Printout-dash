import type { Category } from '../api/common/Category'
import type { Media } from '../api/common/Media'
import type { Product } from '../api/common/Product'
import type { Client } from '../api/common/User'

export interface AllOptionsType {
  clients: { data: Client[] }
  types: ProductType[]
  categories: { data: Category[] }
  products: { data: Product[] }
}

type ProductType = {
  created_at: string
  description: string
  id: number
  media: Media[]
  name: string
  pictures: unknown
  updated_at: string
}

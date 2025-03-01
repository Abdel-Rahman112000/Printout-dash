import type { User } from '@prisma/client'

import type { Media } from './Media'

export interface Product {
  id: number
  type_id: number
  category_id: number
  brand_id: any
  user_type: string
  created_at: string
  updated_at: string
  status: number
  pictures: any[]
  name: string
  category?: Category
  customizations?: Customization[]
  product_price?: ProductPrice
  media?: Media[]
  vendors?: User[]
  scaling: number
  size: number
  color: number
  description: string
}

export interface Category {
  id: number
  created_at: string
  updated_at: string
  pictures: any[]
  name: string
  media: any[]
}

export interface Customization {
  id: number
  product_id: number
  created_at: string
  updated_at: string
  customizations_type: string
  name: string
  choices?: Choice[]
}

export interface Choice {
  id: number
  name: string
  type: any
  price: number
  customization_id: number
  created_at: string
  updated_at: string
}

export interface ProductPrice {
  id: number
  price: number
  product_id: number
  created_at: any
  updated_at: any
  product_price_condition?: ProductPriceCondition[]
}

export interface ProductPriceCondition {
  id: number
  price: number
  condition: string
  condition_answer: number
  product_price_id: number
  created_at: string
  updated_at: string
}

export enum $CustomizationType {
  ONE = 'one',
  DOUBLE = 'double',
  MORE = 'more'
}

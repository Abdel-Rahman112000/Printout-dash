import type { Media } from './Media'

export type OrderCartType = {
  client_id: number
  created_at: string
  delivery_within: number

  id: number

  media: Media[]
  note: null
  paymob_order_id: number
  pictures: []
  product_id: null
  product_name: null
  status: null
  total_price: string
  type_id: number

  updated_at: string
}

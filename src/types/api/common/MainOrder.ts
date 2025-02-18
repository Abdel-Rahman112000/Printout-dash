import type { Order, Status } from './Order'
import type { Client } from './User'

export type MainOrderType = {
  id: number
  total_price: string
  method: string
  payment: number
  address: string
  latitude: string
  longitude: string
  delivery_type: string
  delivery_id: null
  client_id: number
  last_status: string
  created_at: string
  updated_at: string
  status: number
  status_show: {
    name: string
    key: string
    by: string
  }
  client_rated: false
  delivery_rated: false
  order_rate_by_client: null
  orders: Order[]
  client: Client
  order_status?: Status[]
}

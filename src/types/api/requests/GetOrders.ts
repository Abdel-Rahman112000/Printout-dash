import type { Order } from '../common/Order'

export interface GetOrdersRoot {
  status: boolean
  message: string
  data: Order[]
}

export interface GetOrderRoot {
  status: boolean
  message: string
  data: Order
}

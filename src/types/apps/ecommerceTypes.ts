export type Customer = {
  id: number
  user_name: string
  email: string
  phone: string
  company_name?: string
  commerce_registration?: string
  otp?: string
  otp_expires_at?: string
  email_verified_at: any
  created_at: string
  updated_at: string
  cfm_token?: string
  global_id: string
  type: string
  tax?: string
  is_active: number
  favorites_count: number
  carts_count: number
  orders_count: number
  orders_sum_total_price: any
  pictures: any[]
  orders: OrderType[]
  media: Medum[]
}

export interface OrderType {
  id: number
  total_price: string
  method: string
  payment: number
  address: string
  latitude: string
  longitude: string
  delivery_type: any
  delivery_id: any
  client_id: number
  last_status: any
  created_at: string
  updated_at: string
  status: number
  paymob_price: string
  cach_price: string
  order_arrive_at: any
  delivery_within: number
  phone: any
  email: any
  same_date: number
  client_rated: boolean
  delivery_rated: boolean
  days_to_arrive: any
}

export interface Medum {
  id: number
  model_type: string
  model_id: number
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: any[]
  generated_conversions: any[]
  responsive_images: any[]
  order_column: number
  created_at: string
  updated_at: string
  original_url: string
  preview_url: string
}

export type ReferralsType = {
  id: number
  user: string
  email: string
  avatar: string
  referredId: number
  status: string
  value: string
  earning: string
}

export type ReviewType = {
  id: number
  product: string
  companyName: string
  productImage: string
  reviewer: string
  email: string
  avatar: string
  date: string
  status: string
  review: number
  head: string
  para: string
}

export type ProductType = {
  id: number
  productName: string
  category: string
  stock: boolean
  sku: number
  price: string
  qty: number
  status: string
  image: string
  productBrand: string
}

// export type OrderType = {
//   id: number
//   order: string
//   customer: string
//   email: string
//   avatar: string
//   payment: number
//   status: string
//   spent: number
//   method: string
//   date: string
//   time: string
//   methodNumber: number
// }

export type ECommerceType = {
  products: ProductType[]
  orderData: OrderType[]
  customerData: Customer[]
  reviews: ReviewType[]
  referrals: ReferralsType[]
}

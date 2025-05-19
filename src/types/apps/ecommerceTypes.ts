export type Customer = {
  id: number
  user_name: string
  email: string
  phone: string
  company_name: string
  commerce_registration: string | null
  otp: string
  otp_expires_at: string // أو يمكن استخدام Date لو بتحول النص لتاريخ
  email_verified_at: string | null
  created_at: string // أو Date
  updated_at: string // أو Date
  cfm_token: string
  global_id: string
  type: string
  tax: string | null
  orders_count: number
  pictures: any[] // ممكن تحدد نوع العناصر إذا عندك تفاصيل أكثر
  media: any[]
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

export type OrderType = {
  id: number
  order: string
  customer: string
  email: string
  avatar: string
  payment: number
  status: string
  spent: number
  method: string
  date: string
  time: string
  methodNumber: number
}

export type ECommerceType = {
  products: ProductType[]
  orderData: OrderType[]
  customerData: Customer[]
  reviews: ReviewType[]
  referrals: ReferralsType[]
}

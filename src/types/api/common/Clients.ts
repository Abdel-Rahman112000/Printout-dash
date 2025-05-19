export interface GetClientsRoot {
  status: boolean
  message: string
  data: Clients[]
}

export interface Clients {
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
  tax: any
  orders_count: number
  pictures: any[]
  media: Medum[]
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

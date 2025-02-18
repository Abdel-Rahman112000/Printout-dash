import type { Media } from './Media'
import type { Permission } from './Permission'
import type { Role } from './Role'

export interface User {
  id: number
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  name: string
  roles?: Role[]
  permissions?: Permission[]
  user_name: string
  phone: any
  otp: any
  type: any
  otp_expires_at: any
  company_name: any
  tax: any
  commerce_registration: any
  global_id?: string
  user_type: string
}

export interface Client {
  id: number
  user_name: string
  email: string
  phone: any
  otp: any
  type: any
  otp_expires_at: any
  email_verified_at: any
  company_name: any
  tax: any
  commerce_registration: any
  media: Media
  created_at: string
  updated_at: string
}

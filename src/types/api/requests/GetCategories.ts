import type { Category } from '../common/Product'

export interface GetCategoriesRoot {
  status: boolean
  message: string
  data: Category[]
}

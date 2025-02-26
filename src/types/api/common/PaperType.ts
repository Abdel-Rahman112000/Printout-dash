export interface PaperType {
  size: SizeType[]
}

type SizeType = {
  color: null
  created_at: null
  id: number
  is_active: number
  material: null
  name: string
  price: string
  side: string
  size: SizeInfoType
}
type SizeInfoType = {
  bleed: number
  created_at: null
  height: number
  id: number
  paper_id: number
  updated_at: null
  width: number
}

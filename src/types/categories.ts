export interface Category {
  id: number
  id_parent?: number
  name: string
  sort?: number
  status: number
  created_at: string | null
  updated_at: string | null
}

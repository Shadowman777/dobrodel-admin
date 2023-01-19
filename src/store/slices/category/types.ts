import { Category } from 'types/categories'

export interface CategoryState {
  createModel: {
    open: boolean
    error: string
  }
  items: {
    data: Category[]
    loading: boolean
  }
  internal: {
    data: Category[]
    loading: boolean
  }
}

import { Product, Tax } from 'types/products'

export interface ProductState {
  model: {
    open: boolean
    error: string
  }
  stockModel: {
    open: boolean
    error: string
  }
  detail: {
    loading: boolean
    data?: Product
  }
  items: ProductsList
  taxes: {
    data: Array<Tax>
    loading: boolean
  }
}

export interface ProductsList {
  sort: string
  limit: number
  offset: number
  count?: number
  loading: boolean
  filters: ProductsFilters
  products: Product[]
}

export interface ProductsListPayload {
  offset: number
  limit: number
  sort: string
}

export interface ProductsCardPayload {
  id: number
}

export interface ProductsFilters {
  id?: number
  name?: string
}

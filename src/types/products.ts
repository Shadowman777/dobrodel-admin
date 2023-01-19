export interface Product {
  id: number
  name: string
  quantity: number
  quantity_2: number
  id_category: number
  id_internal_category: number
  category_name: string
  internal_category_name: number
  id_unit_measure: number
  id_unit_measure_2: number
  id_type: number
  id_supplier: number
  description: string
  sort: number
  status: number
  tax: string
  id_tax: number
  price: number
  average_market_value: number
  unit_measure_name: string
  unit_measure_2_name: string
  product_cod: string
  img: string
  detail: Array<{
    name: string
    value: string
  }>
  stock_count?: number
}

export interface Tax {
  id: number
  value: string
  description: string
  status: number
  created_at: string
  updated_at: string
}

export type ProductDetail = {
  name: string
  value: string
}

export enum ProductType {
  Frozen = 'заморозка',
  Regular = 'обычный',
  Chilled = 'охлажденка'
}

export interface IProductModelSchema {
  id?: number
  name: string
  id_unit_measure: number | string
  quantity: number
  id_unit_measure_2?: number | string
  quantity_2?: number
  id_category: number | string
  description: string
  sort: number
  id_tax: number | string
  average_market_value: number | string
  price: number | string
  id_internal_category: number | string
  type: ProductType
  cod_product: string
  detail: Array<ProductDetail>
  image?: File | string
}

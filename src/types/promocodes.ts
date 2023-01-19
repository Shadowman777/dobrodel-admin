export interface Promocode {
  id: number
  promo_code: string
  amount: number | string
  minimum_order_amount: number | string
  number_codes_per_user: number | string
  max_activation_count: number | string
  max_discount_amount: number | string
  status: number | string
  type: number
  date_validity: string
  percentage_order: number | string
  created_at: string
  updated_at: string
  description: string
  only_first_order: 1 | 0
  delivery_points?: []
}

export interface IPromocodeModelSchema {
  id?: number
  id_user?: number
  promo_code: string
  amount: number | string
  minimum_order_amount: number | string
  number_codes_per_user: number | string
  max_activation_count: number | string
  type: number
  date_validity: string
  max_discount_amount: number | string
  percentage_order: number | string
  description: string
  only_first_order: 1 | 0
  delivery_points: number[]
}
export interface IFormProps {
  handleSubmit: (values: any) => void
  handleClose: () => void
  initialValues: IPromocodeModelSchema
}

export interface PromocodeType {
  id: number
  name: string
}

export interface PromocodeRequest {
  name?: string
  type?: number
  date_create_start?: string
  date_create_end?: string
  offset: number
  limit: number
}

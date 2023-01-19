export interface OrderRequest {
  id_delivery_points?: number
  id_delivery_date?: number
  status?: number
  order_number?: number
  date_create_start?: string
  date_create_end?: string
  offset: number
  limit: number
}

export interface Order {
  id: number
  id_customer: number
  id_delivery_date: number
  price_amount: string
  total_amount: string
  id_delivery_point: number
  comment: string
  order_code: string
  status: number
  created_at: string
  updated_at: string
}

export interface OrderStatus {
  status: number
  name: string
}
export interface SetOrderStatusPayload {
  id_order: number
  new_status: number
}

export interface OrderProductInfo {
  id: number
  name: string
  id_category: number
  description: string
  sort: number
  status: number
  tax: string
  id_type: number
  product_cod: string
  id_internal_category: number
  price: string
  internal_category_name: string
  average_market_value: string
  id_unit_measure: number
  quantity_per_unit: number
  quantity: string
  unit_measure_name: string
  quantity_2: string
  unit_measure_2_name: string | null
  category_name: string
  img: string
  detail: [
    {
      name: string
      value: string
    }
  ]
}

export interface OrderProductAdjustment {
  id: number
  id_order: number
  id_item_order: number
  type: string
  text: string
  amount: string
  status: number
  id_customer: number
  created_at: string | null
  updated_at: string | null
}

export interface OrderProduct {
  id: number
  id_order: number
  id_product: number
  price: string
  discount_percent: number
  quantity: string
  price_amount: string
  total_amount: string
  product_info: OrderProductInfo
  adjustment: OrderProductAdjustment[]
}

export interface OrderDeliveryDate {
  id: number
  date_start: string
  date_end: string
  id_delivery_points: number
  status: number
  created_at: string
  updated_at: string
}

export interface OrderCustomerPickup {
  id: number
  id_order: number
  time: string
  status: number
}

export interface OrderDeliveryPoints {
  id: number
  name: string
  id_city: number
  address: string
  gps_coordinates: string
  status: number
}

export interface OrderDeliveryPrice {
  id: number
  id_order: number
  amount: number
  status: number
  created_at: string
  updated_at: string
}

export interface OrderEvaluation {
  id: number
  id_order: number
  evaluation: number
  comment: string
  status: number
  created_at: string
  updated_at: string
  id_evaluation_questions: number
}

export interface OrderCustomerInfo {
  id: number
  active: number
  created_at: string
  email: string
  first_name: string
  last_name: string
  notifications_news: boolean
  notifications_order: boolean
  password: string
  phone: string
  status: number
  updated_at: string
}

export interface OrderDetail {
  id: number
  id_customer: number
  id_delivery_date: number
  price_amount: string
  total_amount: string
  id_delivery_point: number
  comment: string
  order_code: string
  status: number
  created_at: string
  updated_at: string
  items: OrderProduct[]
  delivery_date_info: OrderDeliveryDate
  customer_pickup_info: OrderCustomerPickup
  delivery_points_info: OrderDeliveryPoints
  delivery_price_info: OrderDeliveryPrice
  evaluation_info: OrderEvaluation
  customer_info: any
}

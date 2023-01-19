export interface Purchase {
  id: number
  type: string
  id_user: number
  date_start: string
  date_end: string
  status: number
  created_at: string
  updated_at: string
  type_name: string
  status_name: string
  count_order: number
  count_product: string
}
export interface PurchaseDetail {
  id_purchase: number
  unit_measure: PurchaseUnitMeasure[]
  supplier: PurchaseSupplier[]
  orders: number[]
  products: PurchaseProduct[]
}
export interface PurchaseOrderDetail {
  id_purchase: number
  id_order: number
  unit_measure: PurchaseUnitMeasure[]
  supplier: PurchaseSupplier[]
  products: PurchaseProduct[]
}

export interface PurchaseAccumulation {
  completeness: number[]
  not_enough_goods: { id_order: number; staffing_percentage: number }[]
  overall_staffing_percentage: number
}

export interface PurchaseSupplier {
  id_supplier: number
  supplier_name: string
}

export interface PurchaseUnitMeasure {
  unit_measure_id: number
  unit_measure_name: string
}

export interface PurchaseProduct {
  id_product: number
  unit_measure_id: number
  unit_measure_name: string
  id_supplier: number
  supplier_name: string
  product_name: string
  product_name_supplier: string
  id_items?: number
  purchase_quantity?: number
  purchased_quantity?: number
  quantity_original?: number
  quantity?: number
  status?: number
  status_name?: string
  staffing_percentage?: number
}

export interface PurchaseProductSavePayload {
  id_purchase: number
  id_product: number
  quantity: number
}

export interface PurchaseUpdateStatusPayload {
  id_purchase: number
  id_order: number
  id_item: number
  status: number
  name_product?: string
  quantity?: string
}

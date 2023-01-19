export interface IAdjustmentSchema {
  id_order?: number
  id_item_order?: number
  id_adjustment?: number
  type: string
  comment: string
  amount?: number
}

export interface IAdjustmentCancelFormProps {
  handleCancel: () => void
}

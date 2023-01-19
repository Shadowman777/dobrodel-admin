export interface ICreateReportSchema {
  id_delivery_point?: number
  id_delivery_date?: number
}
export interface ICreateListProductsPurchaseSchema {
  date?: string
}

export interface ICreateFormProps {
  handleClose: () => void
  url?: string
}

export interface IReportFormProps {
  name: string
  url: string
}

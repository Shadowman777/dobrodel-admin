export interface ICreateFormProps {
  handleClose: () => void
}

export interface ICreateSchema {
  name: string
  address: string
  gps_coordinates: string
}

export interface IDateCreateSchema {
  start_date: string
  end_date: string
  id_delivery_point: number
}

import * as Yup from 'yup'
import { ICreateSchema, IDateCreateSchema } from './types'

export const createInitialValues: ICreateSchema = {
  name: '',
  address: '',
  gps_coordinates: ''
}

export const createDateInitialValues: IDateCreateSchema = {
  start_date: '',
  end_date: '',
  id_delivery_point: 1
}

export const createValidationSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  gps_coordinates: Yup.string().required()
})

export const createDateValidationSchema = Yup.object({
  start_date: Yup.string().required(),
  end_date: Yup.string().required()
})

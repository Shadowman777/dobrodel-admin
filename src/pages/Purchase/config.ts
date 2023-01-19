import dayjs from 'dayjs'
import * as Yup from 'yup'
import { ICreateSchema } from './types'

export const purchaseTypes = [
  {
    type: 'order-date',
    name: 'По дате совершения заказа'
  },
  {
    type: 'delivery-date',
    name: 'По дате доставки'
  }
]
export const createInitialValues: ICreateSchema = {
  type: 'order-date',
  date_start: dayjs().format('YYYY-MM-DD'),
  date_end: dayjs().format('YYYY-MM-DD')
}
export const createValidationSchema = Yup.object({
  type: Yup.string().required(),
  date_start: Yup.string().required(),
  date_end: Yup.string().required()
})

export const productValidationSchema = Yup.object({
  quantity: Yup.number().required()
})

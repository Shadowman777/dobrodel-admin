import * as Yup from 'yup'
import { ICreateSchema } from './types'

export const createInitialValues: ICreateSchema = {
  id_product: '',
  count: 0
}

export const createValidationSchema = Yup.object({
  id_product: Yup.string().required(),
  count: Yup.string().required()
})

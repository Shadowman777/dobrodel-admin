import * as Yup from 'yup'
import { ICreateSchema } from './types'

export const createInitialValues: ICreateSchema = { name: '' }
export const createValidationSchema = Yup.object({
  name: Yup.string().required()
})

import * as Yup from 'yup'
import { ICreateSchema } from './types'

export const createInitialValues: ICreateSchema = {
  name: '',
  id_parent_category: 0,
  image: undefined
}
export const createValidationSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.mixed().required()
})

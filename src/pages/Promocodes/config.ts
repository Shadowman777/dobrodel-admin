import { IPromocodeModelSchema } from 'types/promocodes'
import * as Yup from 'yup'

export const createInitialValues: IPromocodeModelSchema = {
  promo_code: '',
  amount: 0,
  minimum_order_amount: 0,
  number_codes_per_user: 1,
  type: 1,
  max_activation_count: 1,
  date_validity: '',
  max_discount_amount: 100,
  percentage_order: 100,
  description: '',
  only_first_order: 0,
  delivery_points: []
}

export const modelValidationSchema = Yup.object({
  id_user: Yup.number(),
  promo_code: Yup.string().required(),
  amount: Yup.number().required(),
  minimum_order_amount: Yup.number().required(),
  number_codes_per_user: Yup.number().required(),
  type: Yup.string().required(),
  date_validity: Yup.string().required(),
  max_discount_amount: Yup.number(),
  max_activation_count: Yup.number(),
  percentage_order: Yup.number(),
  description: Yup.string().required(),
  only_first_order: Yup.number().required(),
  delivery_points: Yup.array().of(Yup.number()).required()
})

export const filterInitialValues = {
  name: undefined,
  type: undefined,
  date_create_start: undefined,
  date_create_end: undefined,
  offset: 0,
  limit: 50
}

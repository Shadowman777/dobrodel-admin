import { ProductType, IProductModelSchema } from 'types/products'
import * as Yup from 'yup'

export const createInitialValues: IProductModelSchema = {
  name: '',
  id_unit_measure: '',
  quantity: 1,
  id_unit_measure_2: undefined,
  quantity_2: undefined,
  id_category: '',
  description: '',
  sort: 0,
  id_tax: '',
  average_market_value: '',
  price: '',
  id_internal_category: '',
  type: ProductType.Regular,
  cod_product: '',
  detail: [
    {
      name: '',
      value: ''
    }
  ],
  image: undefined
}

export const validationSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.mixed().required(),
  id_unit_measure: Yup.number().required(),
  // id_unit_measure_2: Yup.number(),
  quantity: Yup.number().required(),
  // quantity_2: Yup.number(),
  id_category: Yup.number().required(),
  description: Yup.string().required(),
  sort: Yup.number().required(),
  id_tax: Yup.number().required(),
  average_market_value: Yup.number().required(),
  price: Yup.number().required(),
  id_internal_category: Yup.number().required(),
  type: Yup.string().required(),
  id_supplier: Yup.number().required(),
  cod_product: Yup.string().required()
})

export const imgConfig = {
  maxWidth: 1024,
  maxHeight: 1024
}

export const productTypes = [
  ProductType.Frozen,
  ProductType.Regular,
  ProductType.Chilled
]

export const productStatus: Record<number, string> = {
  0: 'Активен',
  1: 'Удален'
}

export const filterInitialValues = {
  id: undefined,
  name: undefined
}

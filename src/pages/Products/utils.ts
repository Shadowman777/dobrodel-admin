import { IProductModelSchema, Product, ProductType } from 'types/products'

export function normalizeDetailToModel(data: Product): IProductModelSchema {
  return {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    quantity_2: data.quantity_2,
    id_unit_measure: data.id_unit_measure,
    id_unit_measure_2: data.id_unit_measure_2,
    id_category: data.id_category,
    description: data.description,
    sort: data.sort,
    id_tax: data.id_tax,
    average_market_value: data.average_market_value,
    price: data.price,
    id_internal_category: data.id_internal_category,
    // type: ProductType,
    type: ProductType.Regular,
    cod_product: data.product_cod,
    detail: data.detail,
    image: data.img
  }
}

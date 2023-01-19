import { IPromocodeModelSchema, Promocode } from 'types/promocodes'

export function normalizeDetailToModel(data: Promocode): IPromocodeModelSchema {
  return {
    amount: data.amount,
    date_validity: data.date_validity,
    id: data.id,
    max_activation_count: data.max_activation_count ?? '',
    max_discount_amount: data.max_discount_amount ?? '',
    minimum_order_amount: data.minimum_order_amount ?? '',
    number_codes_per_user: data.number_codes_per_user ?? '',
    percentage_order: data.percentage_order ?? '',
    promo_code: data.promo_code,
    description: data.description,
    type: data.type,
    only_first_order: data.only_first_order ?? 0,
    delivery_points: data.delivery_points ?? []
  }
}

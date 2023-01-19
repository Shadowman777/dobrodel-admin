export const filterInitialValues = {
  id_delivery_points: undefined,
  id_delivery_date: undefined,
  status: undefined,
  order_number: undefined,
  date_create_start: undefined,
  date_create_end: undefined,
  offset: 0,
  limit: 50
}

export const adjustmentTypes = [
  {
    type: 'out_of_stock',
    comment: 'Товар закончился'
  },
  {
    type: 'adjustment',
    comment: 'Вес скорректирован'
  }
]

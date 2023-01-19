import { combineReducers } from 'redux'

import { mainReducer } from './main/slice'
import { unitReducer } from './unit/slice'
import { categoryReducer } from './category/slice'
import { userReducer } from './user/slice'
import { productReducer } from './product/slice'
import { pointReducer } from './point/slice'
import { orderReducer } from './order/slice'
import { promocodeReducer } from './promocode/slice'
import { newsReducer } from './news/slice'
import { driverReducer } from './driver/slice'
import { supplierReducer } from './supplier/slice'
import { purchaseReducer } from './purchase/slice'

export const rootReducer = combineReducers({
  main: mainReducer,
  unit: unitReducer,
  category: categoryReducer,
  user: userReducer,
  product: productReducer,
  point: pointReducer,
  order: orderReducer,
  promocode: promocodeReducer,
  news: newsReducer,
  driver: driverReducer,
  supplier: supplierReducer,
  purchase: purchaseReducer
})

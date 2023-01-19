import { Promocode, PromocodeRequest, PromocodeType } from 'types/promocodes'

export interface PromocodeState {
  model: {
    open: boolean | number
    error: string
  }
  detail: {
    loading: boolean
    data?: Promocode
  }
  items: {
    count: number
    data: Promocode[]
    loading: boolean
  }
  filters: PromocodeRequest
  types: PromocodeType[] 
}

import { Point, PointDate } from '../../../types/points'

export interface PointState {
  createModel: {
    open: boolean
    error: string
  }
  sort: {
    sort?: string
    type?: string
  }
  items: Point[]
  dates: PointDate[]
  deliveryDatePointId?: number
}

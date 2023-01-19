import { Unit } from 'types/units'

export interface UnitState {
  createModel: {
    open: boolean
    error: string
  }
  items: {
    data: Unit[]
    loading: boolean
  }
}

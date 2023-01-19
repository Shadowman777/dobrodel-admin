import { Supplier } from 'types/suppliers'

export interface SupplierState {
  items: {
    data: Supplier[]
    loading: boolean
  }
}

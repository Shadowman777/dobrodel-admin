import { User } from 'types/users'

export interface UserState {
  items: {
    data: User[]
    loading: boolean
  }
}

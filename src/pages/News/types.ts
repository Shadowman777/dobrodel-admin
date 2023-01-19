import { INewsModelSchema } from '../../types/news'

export interface IModelFormProps {
  handleClose: () => void
  initialValues: INewsModelSchema
}

export interface CardProps {
  id: number
  onClose: () => void
}

export interface EditModelProps {
  id: number
}

export interface UpdateStatusProps {
  id: number
  status: 0 | 1 | 2
  type?: 'news' | 'product'
}

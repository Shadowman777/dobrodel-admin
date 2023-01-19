import { IProductModelSchema } from 'types/products'

export interface ProductModalProps {
  id: number
  onClose: () => void
}

export interface EditModelProps {
  id?: number
}
export interface ModelFormProps {
  handleClose: () => void
  initialValues: IProductModelSchema
}

export interface ParametersProps {}

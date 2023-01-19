export interface ICreateFormProps {
  handleClose: () => void
}

export interface ICreateSchema {
  name: string
  id_parent_category: number
  image?: File
}

import * as Yup from 'yup'
import { INewsModelSchema, NewsType } from '../../types/news'

export const initialValues: INewsModelSchema = {
  title: '',
  description: '',
  image_preview_url: undefined,
  image_url: undefined,
  type: NewsType.PROMOTION,
  product: undefined
}
export const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  image_preview_url: Yup.mixed().required(),
  image_url: Yup.mixed().required(),
  type: Yup.string().required(),
  product: Yup.array()
})

export const statuses = ['Активен', 'Удален', 'Скрыт']

export const newsTypes = [
  {
    type: NewsType.PROMOTION,
    label: 'Акция'
  },
  {
    type: NewsType.NEWS,
    label: 'Новость'
  }
]

export const imgConfig = {
  maxWidth: 1024,
  maxHeight: 1024
}

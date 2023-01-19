import { INewsModelSchema, NewsDetail } from '../../types/news'

export function normalizeDetailToModel(data: NewsDetail): INewsModelSchema {
  return {
    id_news: data.id,
    title: data.title,
    description: data.description,
    image_preview_url: data.image_preview_url,
    image_url: data.image_url,
    type: data.type
  }
}

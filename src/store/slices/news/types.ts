import { NewsDetail, NewsItem } from 'types/news'

export interface NewsState {
  model: {
    open: boolean
    error: string
  }
  detail: {
    loading: boolean
    data?: NewsDetail
  }
  items: NewsList
}

export interface NewsListPayload {
  offset: number
  limit: number
}

export interface NewsDetailPayload {
  id_news: number
}

export interface UpdateStatusPayload {
  id_news: number
  status: number
}

export interface UpdateProductStatusPayload {
  id_promotion_product: number
  status: number
}

export interface AddNewsProductPayload {
  id_news: number
  id_product: number
}

export interface NewsList {
  limit: number
  offset: number
  count?: number
  loading: boolean
  news: NewsItem[]
}

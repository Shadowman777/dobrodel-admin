import { Product } from './products'

export interface NewsItem {
  id: number
  title: string
  description: string
  image_preview_url: string
  image_url: string
  type: NewsType
  status: number
  created_at: string
  updated_at: string
}

export interface NewsDetail {
  id: number
  title: string
  description: string
  image_preview_url: string
  image_url: string
  type: NewsType
  status: number
  created_at: string
  updated_at: string
  promotion_product: PromotionProduct[]
}

export interface PromotionProduct {
  id: number
  id_promotion: number
  id_product: number
  status: number
  created_at: string
  updated_at: string
  product_info: Product
}

export enum NewsType {
  PROMOTION = 'promotion',
  NEWS = 'news'
}

export interface INewsModelSchema {
  id_news?: number
  title: string
  description: string
  image_preview_url?: File | string
  image_url?: File | string
  type: NewsType
  product?: number[]
}

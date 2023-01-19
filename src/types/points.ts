export interface Point {
  id: number
  name: string
  id_city: number
  address: string
  gps_coordinates: string
  status: number
}
export interface PointDate {
  id: number
  date_start: string
  date_end: string
  id_delivery_points: 1
  status: number
  created_at: string
  updated_at: string
}

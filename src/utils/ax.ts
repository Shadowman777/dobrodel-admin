import axios from 'axios'

const ax = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

ax.interceptors.response.use(
  (response) => {
    if (response.data.code === 'error') {
      return Promise.reject(response.data.data || response.data.message || '')
    }
    return response
  },
  (error) => {
    return Promise.reject(
      error.response.data.data || error.response.data.message || ''
    )
  }
)

export default ax

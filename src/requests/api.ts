import axios from 'axios'

export const httpApi = axios.create({
  baseURL: 'http://localhost/laravel8/public/api'
})

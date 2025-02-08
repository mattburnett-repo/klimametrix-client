import axios from 'axios'
import { EmissionData } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const emissionsApi = {
  create: (data: EmissionData) => 
    api.post<EmissionData>('/emissions', data).then(res => res.data),
  
  getAll: (limit = 10) => 
    api.get<EmissionData[]>(`/emissions?limit=${limit}`).then(res => res.data),
  
  getStats: () => 
    api.get<{ total: number; average: number; count: number }>('/emissions/stats')
    .then(res => res.data),
} 
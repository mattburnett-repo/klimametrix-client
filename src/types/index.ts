export interface EmissionData {
  id?: string
  electricity: number
  fuel: number
  waste: number
  totalEmissions?: number
  createdAt?: Date
  metadata?: {
    equipmentId?: string
    location?: string
  }
}

export interface EmissionStats {
  total: number
  average: number
  count: number
} 
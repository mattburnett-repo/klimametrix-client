import { create } from 'zustand'
import { EmissionData } from '../types'

interface EmissionsStore {
  emissions: EmissionData[]
  addEmission: (emission: EmissionData) => void
}

// Initial mock data
const mockData: EmissionData[] = [
  { electricity: 2400, fuel: 1800, waste: 800, totalEmissions: 5000, createdAt: new Date('2024-01-15') },
  { electricity: 2200, fuel: 1600, waste: 700, totalEmissions: 4500, createdAt: new Date('2024-02-15') },
  { electricity: 2000, fuel: 1500, waste: 600, totalEmissions: 4100, createdAt: new Date('2024-03-15') },
]

export const useEmissionsStore = create<EmissionsStore>((set) => ({
  emissions: mockData,
  addEmission: (emission) => set((state) => ({
    emissions: [...state.emissions, emission]
  })),
})) 
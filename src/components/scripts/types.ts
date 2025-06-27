export interface Action {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  time: string
  location: string
  highlights: string[]
  gallery: string[]
}

export interface Day {
  dayNumber: number
  isAvailable: boolean
  dayActions: Action[]
}

export interface Script {
  startDate: string
  endDate: string
  days: Day[]
}

export interface UniqueMoment {
  id: string
  title: string
  description: string
  icon: string
} 
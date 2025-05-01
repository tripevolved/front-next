interface Traveler {
  id: string
  name: string
  email?: string
  phone?: string
}

class LocalStorageService {
  private static TRAVELER_KEY = 'traveler'

  /**
   * Get the traveler data from localStorage
   * @returns The traveler data or null if not found
   */
  static getTraveler(): Traveler | null {
    if (typeof window === 'undefined') return null

    const travelerData = localStorage.getItem(this.TRAVELER_KEY)
    if (!travelerData) return null

    try {
      return JSON.parse(travelerData) as Traveler
    } catch (error) {
      console.error('Error parsing traveler data from localStorage:', error)
      return null
    }
  }

  /**
   * Save traveler data to localStorage
   * @param traveler The traveler data to save
   */
  static setTraveler(traveler: Traveler): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.TRAVELER_KEY, JSON.stringify(traveler))
    } catch (error) {
      console.error('Error saving traveler data to localStorage:', error)
    }
  }

  /**
   * Remove traveler data from localStorage
   */
  static removeTraveler(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(this.TRAVELER_KEY)
    } catch (error) {
      console.error('Error removing traveler data from localStorage:', error)
    }
  }

  /**
   * Check if a traveler exists in localStorage
   * @returns true if traveler exists, false otherwise
   */
  static hasTraveler(): boolean {
    return this.getTraveler() !== null
  }
}

export { LocalStorageService, type Traveler } 
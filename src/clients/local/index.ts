interface Traveler {
  id: string
  name: string
  email?: string
  phone?: string
}

import type { TravelerState } from '@/core/types/travelerState'

class LocalStorageService {
  private static TRAVELER_KEY = 'traveler'
  private static TRAVELER_STATE_KEY = 'trip-store'

  /**
   * Get the traveler data from sessionStorage
   * @returns The traveler data or null if not found
   */
  static getTraveler(): Traveler | null {
    if (typeof window === 'undefined') return null

    const travelerData = sessionStorage.getItem(this.TRAVELER_KEY)
    if (!travelerData) return null

    try {
      return JSON.parse(travelerData) as Traveler
    } catch (error) {
      console.error('Error parsing traveler data from sessionStorage:', error)
      return null
    }
  }

  /**
   * Save traveler data to sessionStorage
   * @param traveler The traveler data to save
   */
  static setTraveler(traveler: Traveler): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.setItem(this.TRAVELER_KEY, JSON.stringify(traveler))
    } catch (error) {
      console.error('Error saving traveler data to sessionStorage:', error)
    }
  }

  /**
   * Remove traveler data from sessionStorage
   */
  static removeTraveler(): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.removeItem(this.TRAVELER_KEY)
    } catch (error) {
      console.error('Error removing traveler data from sessionStorage:', error)
    }
  }

  /**
   * Check if a traveler exists in sessionStorage
   * @returns true if traveler exists, false otherwise
   */
  static hasTraveler(): boolean {
    return this.getTraveler() !== null
  }

  /**
   * Get the traveler state from sessionStorage
   * @returns The traveler state or null if not found
   */
  static getTravelerState(): TravelerState | null {
    if (typeof window === 'undefined') return null

    const travelerStateData = sessionStorage.getItem(this.TRAVELER_STATE_KEY)
    if (!travelerStateData) return null

    try {
      const parsed = JSON.parse(travelerStateData)
      return parsed.state?.travelerState as TravelerState
    } catch (error) {
      console.error('Error parsing traveler state data from sessionStorage:', error)
      return null
    }
  }

  /**
   * Save traveler state to sessionStorage
   * @param travelerState The traveler state to save
   */
  static setTravelerState(travelerState: TravelerState): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.setItem(this.TRAVELER_STATE_KEY, JSON.stringify({ 
        state: { 
          travelerState 
        } 
      }))
    } catch (error) {
      console.error('Error saving traveler state data to sessionStorage:', error)
    }
  }

  /**
   * Remove traveler state from sessionStorage
   */
  static removeTravelerState(): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.removeItem(this.TRAVELER_STATE_KEY)
    } catch (error) {
      console.error('Error removing traveler state data from sessionStorage:', error)
    }
  }

  /**
   * Check if a traveler state exists in sessionStorage
   * @returns true if traveler state exists, false otherwise
   */
  static hasTravelerState(): boolean {
    return this.getTravelerState() !== null
  }
}

export { LocalStorageService, type Traveler } 
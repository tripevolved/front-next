'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'

interface WizardContextType {
  openWizard: () => void
  closeWizard: () => void
}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const openWizard = () => setIsWizardOpen(true)
  const closeWizard = () => setIsWizardOpen(false)

  return (
    <WizardContext.Provider value={{ openWizard, closeWizard }}>
      {children}
      <LeadFlowModal 
        isOpen={isWizardOpen} 
        onClose={closeWizard}
        destinations={[
          'Costa Amafitana, Itália',
          'Aruba',
          'Curaçao',
          'Dolomitas, Itália',
          'Torres del Paine, Chile',
          'Bariloche, Argentina'
        ]}
        source="Top Menu"
      />
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
} 
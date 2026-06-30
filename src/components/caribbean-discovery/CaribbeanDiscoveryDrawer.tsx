'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CaribbeanDiscoveryFlow } from './CaribbeanDiscoveryFlow'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function CaribbeanDiscoveryDrawer({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [flowKey, setFlowKey] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleClose = () => {
    setFlowKey((key) => key + 1)
    onClose()
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-1/2">
        <CaribbeanDiscoveryFlow key={flowKey} onClose={handleClose} />
      </aside>
    </div>,
    document.body,
  )
}

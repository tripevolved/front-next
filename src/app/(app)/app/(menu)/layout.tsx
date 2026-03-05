import '@/main.css'
import { AppLayoutContent } from '@/components/app/AppLayoutContent'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayoutContent>
      {children}
    </AppLayoutContent>
  )
} 
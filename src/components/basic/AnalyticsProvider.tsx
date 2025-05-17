'use client'

import { GoogleAnalytics, GoogleTagManager, sendGTMEvent, sendGAEvent } from "@next/third-parties/google"
import FacebookPixel from '@/components/basic/FacebookPixel'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track pageview for all analytics platforms
    if (pathname) {
      // Google Analytics pageview tracking
      sendGAEvent({
        event: 'page_view',
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      })

      // Google Tag Manager pageview tracking
      sendGTMEvent({
        event: 'pageview',
        page: {
          path: pathname,
          search: searchParams?.toString() || '',
          title: document.title,
        },
      })

      // Facebook Pixel pageview tracking is handled by the FacebookPixel component
    }
  }, [pathname, searchParams])

  return (
    <>
      <GoogleTagManager gtmId="GTM-53C7GFCC" />
      <GoogleAnalytics gaId="G-4W2CG7W3GC" />
      <FacebookPixel />
    </>
  )
}

export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  )
}

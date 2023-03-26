import '@/styles/globals.css'
import '@/styles/devices.css'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'

export default function App({ Component, pageProps }: AppProps) {
  return <PlausibleProvider domain="pidro.online">
  <Component {...pageProps} />
  </PlausibleProvider>
}

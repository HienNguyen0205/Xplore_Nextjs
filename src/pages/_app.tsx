import type { AppProps } from 'next/app'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '@/components'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '@/styles/Global.scss'
import "dayjs/locale/en-gb";

const client = new QueryClient()

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <ParallaxProvider scrollAxis='vertical'>
            <ToastProvider
              duration={4000}
              limit={3}
            >
              <Layout {...pageProps}>
                <Component {...pageProps}/>
              </Layout>
            </ToastProvider>
          </ParallaxProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/Redux/store'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '@/components'
import { SessionProvider } from 'next-auth/react'
import { Toast } from '@/components'
import '@/styles/Global.scss'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ParallaxProvider scrollAxis='vertical'>
          <Layout {...pageProps}>
            <Toast/>
            <Component {...pageProps}/>
          </Layout>
        </ParallaxProvider>
      </Provider>
    </SessionProvider>
  )
}
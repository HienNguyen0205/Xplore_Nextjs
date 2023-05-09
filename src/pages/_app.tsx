import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../Redux/store'
import { ParallaxProvider } from 'react-scroll-parallax'
import '../styles/Global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
    </Provider>
  )
}
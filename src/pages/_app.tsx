import type { AppProps } from 'next/app'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '@/components'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Provider } from 'react-redux'
import store from '@/redux/store'
import '@/styles/Global.scss'
import 'react-toastify/dist/ReactToastify.css';
import "dayjs/locale/en-gb";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <ParallaxProvider scrollAxis='vertical'>
            <ToastContainer
              position='bottom-right'
              autoClose={4000}
              limit={3}
              theme="dark"
            />
            <Layout {...pageProps}>
              <Component {...pageProps}/>
            </Layout>
          </ParallaxProvider>
        </LocalizationProvider>
      </Provider>
    </SessionProvider>
  )
}
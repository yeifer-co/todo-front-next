import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import store from '../app/store'
import Sidebar from '../components/sidebar/Sidebar'
import GlobalStyleProvider from '../providers/GlobalStyleProvider'
import ContextProvider from '../providers/ContextProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Autority Challenge</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <ContextProvider>
        <GlobalStyleProvider>
          <Sidebar></Sidebar>
          <Component {...pageProps} />
          content
        </GlobalStyleProvider>
      </ContextProvider>
    </Provider>
  )
}

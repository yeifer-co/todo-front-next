import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../app/store'
import Sidebar from '../components/sidebar/Sidebar'
import GlobalStyleProvider from '../providers/GlobalStyleProvider'
import ContextProvider from '../providers/ContextProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <GlobalStyleProvider>
          <Sidebar></Sidebar>
          <Component {...pageProps} />
        </GlobalStyleProvider>
      </ContextProvider>
    </Provider>
  )
}

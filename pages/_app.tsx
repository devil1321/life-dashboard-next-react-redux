import '../styles/theme/theme.scss'
import type { AppProps } from 'next/app'
import store from '../controllers/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {

  return <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
}

export default MyApp

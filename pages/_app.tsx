import '../styles/theme/theme.scss'
import type { AppProps } from 'next/app'
import { wrapper } from './../controllers/store'

function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

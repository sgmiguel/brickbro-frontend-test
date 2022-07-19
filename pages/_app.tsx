import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import config from '../config'

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={config.theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp

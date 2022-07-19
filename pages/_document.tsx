import { Html, Head, Main, NextScript } from 'next/document'
import config from '../config'

export default function Document() {
  return (
    <Html lang={config.lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
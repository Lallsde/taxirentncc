import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Servizio di noleggio taxi" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

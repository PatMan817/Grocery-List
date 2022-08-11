import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body style={{
        background: 'url(https://www.bhg.com.au/media/19982/nightshade.jpg)',
        backgroundSize: 'cover',
        backgroundRrepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
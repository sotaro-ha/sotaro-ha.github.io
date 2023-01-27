import '../styles/globals.css'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Yokoi Github Pages</title>
        <meta name="description" content="Yokoi Github Pages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>)
}

export default MyApp

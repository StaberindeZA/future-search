import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import AddSearch from '@/components/AddSearch'
import Searches from '@/components/Searches'

export default function Home() {
  return (
    <>
      <Head>
        <title>Future Search</title>
        <meta name="description" content="Queue up searches for the future" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AddSearch />
        <Searches />
      </main>
    </>
  )
}

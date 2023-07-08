import Head from 'next/head';
import AddSearch from '../components/add-search/add-search';
import Searches from '../components/searches/searches';
import { useState } from 'react';

export function Index() {
  const [userId, setUserId] = useState<string | undefined>();

  return (
    <>
      <Head>
        <title>Future Search</title>
        <meta name="description" content="Queue up searches for the future" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-12 justify-center items-center h-screen">
        <AddSearch userId={userId} setUserId={setUserId} />
        <Searches userId={userId} />
      </main>
    </>
  );
}

export default Index;

import { gql, useQuery } from '@apollo/client';
import { Search, SearchStatus } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const GET_USER_SEARCHES = gql`
  query Searches($findAllSearchInput: FindAllSearchInput!) {
    searches(findAllSearchInput: $findAllSearchInput) {
      id
      search
      searchDate
      status
      createdAt
    }
  }
`;

export function Searches() {
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('NEW');
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { loading, error, data } = useQuery(GET_USER_SEARCHES, {
    variables: { findAllSearchInput: { email } },
    skip: !email,
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  if (!data?.searches) return <>Waiting on data</>;

  const searches = data.searches as Search[];

  return (
    <div>
      <h1>Your searches</h1>
      <select
        name="searchStatus"
        id="search-status"
        value={searchStatus}
        onChange={e => setSearchStatus(e.target.value as SearchStatus)}
      >
        <option value="NEW">New</option>
        <option value="SUCCESS">Completed</option>
        <option value="PROCESSING">Processing</option>
        <option value="ERROR">Error</option>
      </select>
      {searches.filter((search) => search.status === searchStatus).map((search) => (
        <div key={search.id}>
          <>{search.status} | {search.search} | {search.searchDate}</>
        </div>
      ))}
    </div>
  );
}

export default Searches;

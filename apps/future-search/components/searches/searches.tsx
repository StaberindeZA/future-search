import { gql, useQuery } from '@apollo/client';
import { Search, SearchStatus } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { buildGoogleSearch } from '@future-search/shared';

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

  const searches = [...data.searches as Search[]];

  return (
    <div className="md:w-[640px] w-5/6">
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
      <table className="table-auto md:w-[640px] w-5/6">
        <thead>
          <tr>
            <th>Status</th>
            <th>Search Term</th>
            <th>Scheduled Date</th>
          </tr>
        </thead>
        <tbody>
          {searches.sort((a,b) => new Date(a.searchDate).getTime() - new Date(b.searchDate).getTime()).filter((search) => search.status === searchStatus).map((search) => (
            <tr key={search.id}>
              <td>{search.status}</td>
              <td><a href={buildGoogleSearch(search.search)} target="_blank" rel="noopener noreferrer">{search.search}</a></td>
              <td>{`${new Date(search.searchDate).toDateString()} at ${new Date(search.searchDate).toLocaleTimeString()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Searches;

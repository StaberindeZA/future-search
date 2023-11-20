import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

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

/* eslint-disable-next-line */
export interface SearchesProps {
  userId?: string;
}

export function Searches(props: SearchesProps) {
  //const { userId } = props;
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

  if (!data) return <>Waiting on data</>;

  return (
    <div>
      <h1>Welcome to Searches!</h1>
      {data.searches.map((search) => (
        <div key={search.id}>
          {search.id} | {search.search} | {search.searchDate}
        </div>
      ))}
    </div>
  );
}

export default Searches;

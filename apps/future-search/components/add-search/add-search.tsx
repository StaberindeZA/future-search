import { useMutation, gql } from '@apollo/client';
import Image from 'next/image';
import SetUser from '../set-user/set-user';

const LOGO_IMAGE = '/random-logo.png';

function parseFormData(form: HTMLFormElement) {
  const parsedData = {
    search: '',
    searchDate: '',
  };
  const formData = new FormData(form);
  formData.forEach((value, key) => (parsedData[key] = value));
  return parsedData;
}

function incDate(days: number, date: Date = new Date()) {
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function formatDate(date: Date) {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  return `${year}-${month}-${day}`;
}

const CREATE_SEARCH = gql`
  mutation CreateSearch(
    $userId: String!
    $search: String!
    $searchDate: DateTime!
  ) {
    createSearch(
      createSearchInput: {
        userId: $userId
        search: $search
        searchDate: $searchDate
      }
    ) {
      id
      search
      searchDate
      status
      createdAt
    }
  }
`;

/* eslint-disable-next-line */
export interface AddSearchProps {
  userId?: string;
  setUserId: (email: string) => void;
}

export function AddSearch(props: AddSearchProps) {
  const { userId, setUserId } = props;
  const [createSearch, { loading, error }] = useMutation(CREATE_SEARCH, {
    refetchQueries: ['Searches'],
  });

  const formItemsDisabled = !userId || loading;
  const initialDate = incDate(1);

  return (
    <>
      <Image width={200} height={200} src={LOGO_IMAGE} alt="logo" />
      <SetUser userId={userId} setUserId={setUserId} />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-[640px] w-5/6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = parseFormData(form);
          createSearch({
            variables: {
              userId,
              ...data,
            },
          });
          form.reset();
        }}
      >
        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="search"
          >
            What future search can I schedule for you?
          </label>
          <input
            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-75"
            id="search"
            name="search"
            type="text"
            placeholder="Search here..."
            disabled={formItemsDisabled}
            required
          />
        </div>
        <div className="flex justify-between mb-4 text-right text-xs">
          <label htmlFor="start">
            Search date:
            <input
              type="date"
              id="start"
              name="searchDate"
              defaultValue={initialDate}
              min={incDate(1)}
              disabled={formItemsDisabled}
            />
          </label>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formItemsDisabled}
          >
            Schedule Search
          </button>
        </div>
      </form>
      {error && <p>Oh no an error ocurred. Could you please try again?</p>}
    </>
  );
}

export default AddSearch;

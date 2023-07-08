import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRef } from 'react';

const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(createUserInput: { email: $email }) {
      id
      email
      name
    }
  }
`;

const GET_USER = gql`
  query User($user: ID!) {
    user(id: $user) {
      id
      email
      name
    }
  }
`;

/* eslint-disable-next-line */
export interface SetUserProps {
  userId?: string;
  setUserId: (email: string) => void;
}

export function SetUser(props: SetUserProps) {
  const { userId, setUserId } = props;
  const emailRef = useRef<HTMLInputElement>();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const {
    loading: getUserLoading,
    error: getUserError,
    data: getUserData,
  } = useQuery(GET_USER, {
    variables: { user: userId },
    skip: !userId,
  });

  const submitEmail = async () => {
    const email = emailRef.current.value;
    try {
      const result = await createUser({ variables: { email } });
      setUserId(result.data.createUser.id);
    } catch (error) {
      console.log('Oh no thats bad!', error);
    }
  };

  if (error) {
    return <>Oh no an error</>;
  }

  const userEmail = getUserData?.user?.email;

  const triggerText = userEmail
    ? `Search results will be sent to: ${userEmail}`
    : `We will need your email before you start!`;
  return (
    <Popover.Root>
      <Popover.Trigger className="underline">{triggerText}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="border bg-white p-4"
          side="bottom"
          sideOffset={5}
        >
          <form
            className="p-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitEmail();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="search"
              >
                Where do you need your future reminder sent?
              </label>
              <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="search"
                type="email"
                placeholder="Email"
                defaultValue={''}
                ref={emailRef}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submitEmail}
                disabled={loading}
              >
                {loading ? <>Setting email...</> : <>Set email</>}
              </button>
            </div>
          </form>
          <Popover.Close className="h-6 w-6 inline-flex justify-center items-center absolute top-2 right-2">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default SetUser;

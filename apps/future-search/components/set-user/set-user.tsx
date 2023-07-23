import * as Accordion from '@radix-ui/react-accordion';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';

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

export interface SetUserAccordianProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  triggerText: string;
  children: ReactNode;
}

const SetUserAccordian = ({
  value,
  setValue,
  triggerText,
  children,
}: SetUserAccordianProps) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
    >
      <Accordion.Item value="item-1">
        <Accordion.Header className="text-center">
          <Accordion.Trigger className="underline">
            {triggerText}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=open]:animate-[slideDown_300ms_ease-out] data-[state=closed]:animate-[slideUp_150ms_ease-out]">
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export interface SetUserPopoverProps {
  triggerText: string;
  children: ReactNode;
}

/* eslint-disable-next-line */
export interface SetUserProps {
  userId?: string;
  setUserId: (email: string) => void;
}

export function SetUser(props: SetUserProps) {
  const { userId, setUserId } = props;
  const emailRef = useRef<HTMLInputElement>();
  const [value, setValue] = useState('item-1');
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
      setValue('');
    } catch (error) {
      console.log('Oh no thats bad!', error);
    }
  };

  if (error) {
    return <>Oh no an error</>;
  }

  const userEmail = getUserData?.user?.email;

  const triggerText = userEmail
    ? `1. Search results will be sent to: ${userEmail}`
    : `1. Start with your email`;
  return (
    <SetUserAccordian
      value={value}
      setValue={setValue}
      triggerText={triggerText}
    >
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 sm:w-[420px]"
        onSubmit={(e) => {
          e.preventDefault();
          submitEmail();
        }}
      >
        <div className="mb-4">
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
    </SetUserAccordian>
  );
}

export default SetUser;

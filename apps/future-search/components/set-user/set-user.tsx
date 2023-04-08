import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useRef } from 'react';

/* eslint-disable-next-line */
export interface SetUserProps {
  email?: string;
  setEmail: (email: string) => void;
}

export function SetUser(props: SetUserProps) {
  const { email, setEmail } = props;
  const emailRef = useRef<HTMLInputElement>();

  const submitEmail = () => {
    setEmail(emailRef.current.value);
  };

  const triggerText = email
    ? `Search results sent to: ${email}`
    : `We will need your email before you go!`;
  return (
    <div className="text-xs">
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
                  defaultValue={email}
                  ref={emailRef}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={submitEmail}
                >
                  Set email
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
    </div>
  );
}

export default SetUser;

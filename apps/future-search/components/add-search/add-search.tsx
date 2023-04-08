import { useState } from 'react';
import Image from 'next/image';
import SetUser from '../set-user/set-user';

const LOGO_IMAGE = '/random-logo.png';

type FormValues = {
  term: string;
  interval: string;
  intervalCount?: number;
};

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  formValues: FormValues
) {
  event.preventDefault();
  console.log(`Add search for term: ${formValues.term}`);
}

/* eslint-disable-next-line */
export interface AddSearchProps {}

export function AddSearch(props: AddSearchProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    term: '',
    interval: '',
    intervalCount: undefined,
  });
  const [email, setEmail] = useState<string>('');

  return (
    <>
      <Image width={200} height={200} src={LOGO_IMAGE} alt="logo" />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[640px]"
        onSubmit={(e) => handleSubmit(e, formValues)}
      >
        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="search"
          >
            What future search can I schedule for you?
          </label>
          <input
            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search here..."
          />
        </div>
        <div className="mb-4 text-right">
          <SetUser email={email} setEmail={setEmail} />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Schedule Search
          </button>
        </div>
      </form>
    </>
  );
}

export default AddSearch;

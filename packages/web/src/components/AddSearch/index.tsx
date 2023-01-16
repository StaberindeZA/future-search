import { useState } from "react";
import Counter from "../Counter";
import Select, { SelectOption } from "../Select";
import SchedulePicker from "./SchedulePicker";
import Image from 'next/image';
import styles from '@/styles/AddSearch.module.css';

const LOGO_IMAGE = '/random-logo.png';

type FormValues = {
  term: string;
  interval: string;
  intervalCount?: number
}

// TODO - Add support for hour and month
// TODO - Create type for value and use function to create
const intervalOptions: SelectOption[] = [
  { label: 'Days', value: 'day' },
];

function handleSubmit(event: React.FormEvent<HTMLFormElement>, formValues: FormValues) {
  event.preventDefault();
  console.log(`Add search for term: ${formValues.term}`);
}

export default function AddSearch() {
  const [formValues, setFormValues] = useState<FormValues>({
    term: '',
    interval: '',
    intervalCount: undefined,
  })

  return <>
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, formValues)}>        
      <Image width={200} height={200} src={LOGO_IMAGE} alt="logo image" />
      <label>
        Whats your future you searching for?
        <input type="text" className={styles.input} value={formValues.term} onChange={(event) => setFormValues({...formValues, term: event.target.value})} />        
      </label>
      <div className={styles.counter}>
        <Select 
          label=''
          options={intervalOptions}
          value={formValues.interval}
          onChange={(event) => setFormValues({...formValues, interval: event.target.value})}
        />
        <Counter 
          count={formValues.intervalCount}
          updateCount={(count: number | undefined) => setFormValues({...formValues, intervalCount: count})}
          minCount={0}
          maxCount={24}
        />
      </div>
      <input type="submit" value="Submit" className={styles.submit}/>
    </form>
  </>
}
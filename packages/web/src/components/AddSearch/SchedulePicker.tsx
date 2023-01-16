import { useState } from "react";
import Select, { SelectOption } from "../Select";

// TODO - Add support for hour and month
// TODO - Create type for value and use function to create
const intervalOptions: SelectOption[] = [
  { label: 'Days', value: 'day' },
];

export default function SchedulePicker() {
  const [value, setValue] = useState('day');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return <>
    When would you like to perform this search?
    <Select 
      label=''
      options={intervalOptions}
      value={value}
      onChange={handleChange}
    />
  </>
}
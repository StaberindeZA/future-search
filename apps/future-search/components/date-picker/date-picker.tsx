import { useState } from "react"


export function DatePicker() {
  //Select hour, day or month, custom
  //Number input with min/max depending on select.
  //Needs to return SelectedDate
  function onDateTypeChange(event) {
    const dateType = event.target.value;
    let inputMinMax = { min: 0, max: 31 };
    switch (dateType) {
      case 'HOUR':
        inputMinMax = {
          min: 0,
          max: 24,
        };
        break;
      case 'DAY':
        inputMinMax = {
          min: 0,
          max: 31
        };
        break;
      case 'MONTH':
      default:
        inputMinMax = {
          min: 0,
          max: 12
        };
        break;
    }
    setDateType(event.target.value);
    setInputMinMax(inputMinMax);
  }
  const [dateType, setDateType] = useState('DAY');
  const [inputMinMax, setInputMinMax] = useState({ min: 0, max: 31 });
  return (
    <>
      <select
        name="dateType"
        id="date-type"
        value={dateType}
        onChange={e => onDateTypeChange(e)}
      >
        <option value="HOUR">Hour</option>
        <option value="DAY">Day</option>
        <option value="MONTH">Month</option>
        <option value="CUSTOM">Custom</option>
      </select>
      <input type="number" min={inputMinMax.min} max={inputMinMax.max} />
    </>
  )
}

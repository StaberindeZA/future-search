type CounterProps = {
  count?: number;
  updateCount: (count: number | undefined) => void,
  minCount: number;
  maxCount: number;
}

// TODO - Change count to string: Need to do this to account for someone deleting 
//  the value completely. Setting to 0 doesn't work since its super annoying
export default function Counter({count, updateCount, minCount, maxCount}: CounterProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    if(event.target.value) {
      updateCount(parseInt(event.target.value))
    } else {
      updateCount(minCount);
    }
  }

  const onIncDec = (count: number | undefined, option: string, minCount: number, maxCount: number) => {
    if(count) {
      if(option === 'inc') {
        count >= maxCount ? updateCount(count) : updateCount(count+1);
      } else {
        updateCount(count-1);
      }
    } else {
      if(option === 'inc') {
        updateCount(minCount + 1);
      } else {
        updateCount(minCount);
      }
    }
  }

  return <div>
    <button type="button" onClick={(event) => onIncDec(count, 'dec', minCount, maxCount)}>Dec</button>
    <input type="number" value={count} min={minCount} max={maxCount} onChange={onChange} />
    <button type="button" onClick={() => onIncDec(count, 'inc', minCount, maxCount)}>Inc</button>
  </div>
}
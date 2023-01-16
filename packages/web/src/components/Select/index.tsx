export type SelectOption = {
  label: string;
  value: string;
}

type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[],
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function Select({ label, value, options, onChange }: SelectProps) {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };
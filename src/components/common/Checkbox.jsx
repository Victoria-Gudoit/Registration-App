export function Checkbox({ value, label, checked, onChange }) {
  return (
    <label>
      <input
        type="radio"
        name="identify"
        checked={checked}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export const CheckboxGroup = ({ value: groupValue, options, onChange }) => {
  return (
    <>
      {options.map(({ value, label }) => (
        <Checkbox key={value} value={value} label={label} checked={value === groupValue} onChange={onChange} />
      ))}
    </>
  );
};

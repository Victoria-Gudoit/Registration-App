import css from "./checkbox.module.css";
import {v4 as uuidv4} from "uuid"

export function Checkbox({ value, label, checked, onChange }) {
  return (
    <label className={css.checkbox}>
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
        <Checkbox key={uuidv4()} value={value} label={label} checked={value === groupValue} onChange={onChange} />
      ))}
    </>
  );
};

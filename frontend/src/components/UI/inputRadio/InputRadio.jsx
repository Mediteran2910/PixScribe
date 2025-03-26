import "./inputRadio.css";

export default function InputRadio({ value, ...restProps }) {
  return (
    <button type="button">
      <input
        {...restProps}
        type="radio"
        id={value}
        name="format"
        value={value}
        className="input-radio"
      />
      <label htmlFor={value} className="radio-label">
        {value}
      </label>
    </button>
  );
}

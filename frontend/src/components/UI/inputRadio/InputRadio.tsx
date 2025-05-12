import "./inputRadio.css";
type ChangeEvt = React.ChangeEvent<HTMLInputElement>;
type Props = {
  value: string;
  onChange: (e: ChangeEvt) => void;
};

export default function InputRadio({
  value,
  onChange,

  ...restProps
}: Props) {
  return (
    <button type="button">
      <input
        {...restProps}
        type="radio"
        id={value}
        name="format"
        value={value}
        className="input-radio"
        onChange={onChange}
      />

      <label htmlFor={value} className="radio-label">
        {value}
      </label>
    </button>
  );
}

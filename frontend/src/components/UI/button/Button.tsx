import "./button.css";

type Colors = "white" | "black" | "light-grey";

type Props = {
  color?: Colors;
  outline?: Colors;
  size: "small" | "medium" | "large";
} & React.JSX.IntrinsicElements["button"];

export default function Button({
  children,
  color,
  outline,
  size,
  ...restProps
}: Props) {
  const classes = [];

  if (color) classes.push(`color-${color}`);
  if (outline) classes.push(`outline-${outline}`);
  if (size) classes.push(`size-${size}`);

  const classNames = classes.map((c) => `btn-${c}`).join(" ");

  return (
    <button {...restProps} className={`btn ${classNames}`}>
      {children}
    </button>
  );
}

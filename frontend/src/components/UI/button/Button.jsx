import "./button.css";

export default function Button({
  children,
  color,
  outline,
  size,
  ...restProps
}) {
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

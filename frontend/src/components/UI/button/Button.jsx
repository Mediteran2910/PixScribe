import "./button.css";

export default function Button({ children, color, outline, ...restProps }) {
  const classes = [];

  if (color) classes.push(`color-${color}`);
  if (outline) classes.push(`outline-${outline}`);

  const classNames = classes.map((c) => `btn-${c}`);

  return (
    <button {...restProps} className={`btn ${classNames}`}>
      {children}
    </button>
  );
}

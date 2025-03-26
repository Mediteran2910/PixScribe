import "./typography.css";

export default function Typography({ children, body, caption, label }) {
  const classes = [];

  if (body) classes.push(`txt-${body}`);
  if (caption) classes.push(`txt-${caption}`);
  if (label) classes.push(`txt-${label}`);

  const classNames = classes.map((c) => c);

  return <span className={`txt ${classNames}`}>{children}</span>;
}

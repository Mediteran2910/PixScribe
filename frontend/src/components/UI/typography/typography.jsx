import "./typography.css";

export default function Typography({
  children,
  body,
  caption,
  label,
  h2,
  tag,
  ...restProps
}) {
  const classes = [];

  if (body) classes.push(`txt-${body}`);
  if (caption) classes.push(`txt-${caption}`);
  if (label) classes.push(`txt-${label}`);
  if (h2) classes.push(`txt-h2-${h2}`);
  if (tag) classes.push(`txt-tag-${tag}`);

  const classNames = classes.map((c) => c);

  return (
    <span {...restProps} className={`txt ${classNames}`}>
      {children}
    </span>
  );
}

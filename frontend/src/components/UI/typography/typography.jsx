import "./typography.css";

export default function Typography({
  children,
  body,
  caption,
  label,
  h2,
  tag,
  color,
  background,
  ...restProps
}) {
  const classes = [];

  if (body) classes.push("txt-body");
  if (caption) classes.push("txt-caption");
  if (label) classes.push("txt-label");
  if (h2) classes.push("txt-h2");
  if (tag) classes.push("txt-tag");
  if (color) classes.push(`txt-color-${color}`);
  if (background) classes.push(`txt-background-${background}`);

  const classNames = classes.map((c) => c).join(" ");

  return (
    <span {...restProps} className={`txt ${classNames}`}>
      {children}
    </span>
  );
}

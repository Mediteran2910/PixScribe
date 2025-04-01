import "./typography.css";

type Variant = boolean;
type Colors = "black" | "white" | "light-grey" | "medium-grey" | "red";
type Props = {
  children?: React.ReactNode;
  body?: Variant;
  caption?: Variant;
  label?: Variant;
  h2?: Variant;
  tag?: Variant;
  color?: Colors;
  background?: "light-grey";
} & React.JSX.IntrinsicElements["span"];

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
}: Props) {
  const classes: string[] = []; //moguc error, ipak nije

  if (body) classes.push("body");
  if (caption) classes.push("caption");
  if (label) classes.push("label");
  if (h2) classes.push("h2");
  if (tag) classes.push("tag");
  if (color) classes.push(`color-${color}`);
  if (background) classes.push(`background-${background}`);

  const classNames = classes.map((c) => `txt-${c}`).join(" ");

  return (
    <span {...restProps} className={`txt ${classNames}`}>
      {children}
    </span>
  );
}

import "./typography.css";

type Colors = "black" | "white" | "light-grey" | "medium-grey" | "red";
type Props = {
  children?: React.ReactNode;
  body?: boolean;
  caption?: boolean;
  label?: boolean;
  tag?: boolean;
  h2?: boolean;
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
  const classes: string[] = [];

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

import "./ButtonsAction.css";

type Props = {
  spaceBetween?: boolean;
  spaceEvenly?: boolean;
  center?: boolean;
  end?: boolean;
  start?: boolean;
  direction?: "row" | "column";
  children: React.ReactNode;
} & React.JSX.IntrinsicElements["div"];

export default function ButtonsAction({
  spaceBetween,
  spaceEvenly,
  center,
  end,
  start,
  direction,
  children,
  ...restProps
}: Props) {
  const classes = [];

  if (spaceBetween) classes.push("space-between");
  if (spaceEvenly) classes.push("space-evenly");
  if (center) classes.push("center");
  if (end) classes.push("end");
  if (start) classes.push("start");
  if (direction) classes.push(`direction-${direction}`);

  const classNames = classes.map((c) => `btns-wrap-${c}`).join(" ");

  return (
    <div className={`btns-wrap ${classNames}`} {...restProps}>
      {children}
    </div>
  );
}

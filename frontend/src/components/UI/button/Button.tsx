import "./button.css";

type Colors = "white" | "black" | "light-grey" | "red";

type Props = {
  color?: Colors;
  outline?: Colors;
  size: "small" | "medium" | "large";
  icon?: "edit";
  iconWidth?: string;
} & React.JSX.IntrinsicElements["button"];

const icons = {
  edit: {
    src: "/icons/edit.svg",
    alt: "edit icon",
  },
};

export default function Button({
  children,
  color,
  outline,
  size,
  icon,
  iconWidth,
  ...restProps
}: Props) {
  const classes = [];

  if (color) classes.push(`color-${color}`);
  if (outline) classes.push(`outline-${outline}`);
  if (size) classes.push(`size-${size}`);
  if (icon) classes.push("icon");

  const classNames = classes.map((c) => `btn-${c}`).join(" ");

  return (
    <button {...restProps} className={`btn ${classNames}`}>
      {children}
      {icon && (
        <img
          src={icons[icon].src}
          alt={icons[icon].alt}
          style={{ width: iconWidth }}
        ></img>
      )}
    </button>
  );
}

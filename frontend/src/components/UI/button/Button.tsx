import "./button.css";

type Colors = "white" | "black" | "light-grey" | "red";

type Props = {
  color?: Colors;
  outline?: Colors;
  size: "small" | "medium" | "large";
  icon?: "edit" | "plus" | "remove";
  iconWidth?: string;
} & React.JSX.IntrinsicElements["button"];

const icons = {
  edit: {
    src: "/icons/edit.svg",
    alt: "edit icon",
  },
  plus: {
    src: "/icons/plus.svg",
    alt: "plus icon",
  },
  remove: {
    src: "icons/deleteImg.svg",
    alt: "x icon for deleting",
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

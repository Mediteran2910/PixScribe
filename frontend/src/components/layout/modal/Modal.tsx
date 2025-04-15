import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./modal.css";
import { useRef, useEffect, useState } from "react";

import ReactDOM from "react-dom";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";

type Props = {
  children?: React.ReactNode;
  size?: "medium" | "small" | "large";
  placement?: "start" | "end" | "center";
  flexDirection?: "row" | "column";
  isModalOpen?: boolean;
};

export default function Modal({
  size,
  placement,
  flexDirection,
  children,
  isModalOpen,
}: Props) {
  const classes = [];

  if (size) classes.push(`size-${size}`);
  if (placement) classes.push(`placement-${placement}`);
  if (flexDirection) classes.push(`flexDirection-${flexDirection}`);

  const classNames = classes.map((c) => `modalCnt-${c}`).join(" ");

  const modal = useRef(null);

  useEffect(() => {
    if (modal.current) {
      if (isModalOpen) {
        modal.current.showModal();
      } else {
        modal.current.close();
      }
    }
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    <dialog ref={modal} className="modal-dialog">
      <div className={`modalCnt ${classNames}`}>{children}</div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}

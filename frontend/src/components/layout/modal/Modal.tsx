import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./modal.css";
import { useRef, useEffect, useState } from "react";
import Button from "../../UI/button/Button";
import useModalCtx from "../../../Context/ModalContext";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  size?: "medium" | "small" | "large";
  placement?: "start" | "end" | "center";
  flexDirection?: "row" | "column";
};

export default function Modal({
  children,
  size,
  placement,
  flexDirection,
}: Props) {
  const classes = [];

  if (size) classes.push(`size-${size}`);
  if (placement) classes.push(`placement-${placement}`);
  if (flexDirection) classes.push(`flexDirection-${flexDirection}`);

  const classNames = classes.map((c) => `modalCnt-${c}`).join(" ");

  const modal = useRef(null);
  const { showModal } = useModalCtx();

  useEffect(() => {
    if (modal.current) {
      if (showModal) {
        modal.current.showModal();
      } else {
        modal.current.close();
      }
    }
  }, [showModal]);

  return ReactDOM.createPortal(
    <dialog ref={modal} className="modal-dialog">
      <div className={`modalCnt ${classNames}`}>{children}</div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}

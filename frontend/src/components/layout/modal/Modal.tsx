import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./modal.css";
import { useRef, useEffect } from "react";
import Button from "../../UI/button/Button";
import useModalCtx from "../../../Context/ModalContext";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  size?: "medium" | "small" | "large";
  placement?: "start" | "end" | "center";
  flexDirection?: "row" | "column";
  modalName: string; // Add modalName prop to identify which modal to show
};

export default function Modal({
  children,
  size,
  placement,
  flexDirection,
  modalName,
}: Props) {
  const classes = [];

  if (size) classes.push(`size-${size}`);
  if (placement) classes.push(`placement-${placement}`);
  if (flexDirection) classes.push(`flexDirection-${flexDirection}`);

  const classNames = classes.map((c) => `modalCnt-${c}`).join(" ");

  const modal = useRef<HTMLDialogElement>(null);
  const { modals, toggleModalVisibility } = useModalCtx();

  const isModalOpen = modals[modalName] || false;

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

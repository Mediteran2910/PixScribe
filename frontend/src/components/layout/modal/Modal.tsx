import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./modal.css";
import { useRef, useEffect, useState } from "react";
import Button from "../../UI/button/Button";
import useModalCtx from "../../../Context/ModalContext";
import ReactDOM from "react-dom";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";

type Props = {
  children?: React.ReactNode;
  size?: "medium" | "small" | "large";
  placement?: "start" | "end" | "center";
  flexDirection?: "row" | "column";
  update: boolean;
  valueTitle: string;
  valueDescription: string;
  valueFormat: "html" | "json" | "yaml";
  onChange: () => void;
  handleSaveEdits: () => void;
};

export default function Modal({
  size,
  placement,
  flexDirection,
  update,
  valueTitle,
  valueDescription,
  valueFormat,
  onChange,
  handleSaveEdits,
}: Props) {
  const classes = [];
  const { toogleModalVisibility } = useModalCtx();

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

  if (update) {
    return ReactDOM.createPortal(
      <dialog ref={modal} className="modal-dialog">
        <div className={`modalCnt ${classNames}`}>
          {" "}
          <GalleryInputs
            showFields={{ title: true, description: true, format: false }}
            editing
            valueTitle={valueTitle}
            valueDescription={valueDescription}
            valueFormat={valueFormat}
            onChange={onChange}
            inputsWrapWidth="90%"
            txtInputSize="full"
            textAreaSize="full"
          />
          <ButtonsAction spaceEvenly>
            <Button
              size="medium"
              outline="black"
              onClick={toogleModalVisibility}
            >
              EXIT
            </Button>
            <Button size="medium" color="black" onClick={handleSaveEdits}>
              SAVE
            </Button>
          </ButtonsAction>
        </div>
      </dialog>,
      document.getElementById("modal-root")!
    );
  }

  // return ReactDOM.createPortal(
  //   <dialog ref={modal} className="modal-dialog">
  //     <div className={`modalCnt ${classNames}`}>{children}</div>
  //   </dialog>,
  //   document.getElementById("modal-root")!
  // );
}

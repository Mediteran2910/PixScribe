import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import { useState } from "react";
export default function Modal({ showModal }) {
  return (
    <dialog open={showModal}>
      <p>
        Are you sure you want to exit? Once you do that your work won't be saved
      </p>
      <ButtonsAction exitModal={true} />
    </dialog>
  );
}

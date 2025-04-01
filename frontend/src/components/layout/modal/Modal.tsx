import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import { useState } from "react";
import Button from "../../UI/button/Button";
export default function Modal({ showModal }) {
  return (
    <dialog open={showModal}>
      <p>
        Are you sure you want to exit? Once you do that your work won't be saved
      </p>
      <div className="modal-btns">
        <Button color="black" size="medium">
          STAY
        </Button>
        <Button outline="black" size="medium">
          EXIT
        </Button>
      </div>
    </dialog>
  );
}

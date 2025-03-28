import "./ButtonsAction.css";
import Button from "../../UI/button/Button";
import Filter from "../../UI/filter/Filter";
import { toogle } from "../../../helpers/toogle";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function ButtonsAction({
  gallerySetup,
  btnType,
  editorBtns,
  backToForm,
  exitModal,
  homepage,
  handleFinishClick,
}) {
  const [isFilter, setIsFilter] = useState(false);

  if (exitModal) {
    return (
      <div className="modal-btns">
        <Button color="black">STAY</Button>
        <Button outline="black">EXIT</Button>
      </div>
    );
  }

  if (editorBtns) {
    return (
      <div className="editor-btns-wrap">
        <Button outline="black" onClick={backToForm}>
          EXIT
        </Button>
        <Button color="black" onClick={handleFinishClick}>
          FINISH
        </Button>
      </div>
    );
  }

  if (gallerySetup) {
    return (
      <Button type={btnType} color="black">
        CONTINUE
      </Button>
    );
  }

  if (homepage)
    return (
      <div className="home-buttons-wrapper">
        <div className="filter-wrapper">
          <Filter
            onClick={() => toogle(setIsFilter)}
            homepageFilter={isFilter ? true : false}
          />
        </div>
        <Link to="/create">
          {" "}
          <Button color="black">CREATE</Button>
        </Link>
      </div>
    );
}

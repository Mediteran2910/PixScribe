import { useState } from "react";
import Header from "../../layout/header/Header";
import "./create.css";
import GallerySetup from "../../layout/gallerySetup/GallerySetup";
import GalleryStructure from "../../layout/galleryStructure/GalleryStructure";
import { toogle } from "../../../helpers/toogle";
import Modal from "../../layout/modal/Modal";

export default function Create() {
  const [toogleBuilding, setToogleBuilding] = useState(false);
  const [galleryId, setGalleryId] = useState(null);

  const saveId = (id) => {
    setGalleryId(id);
  };

  return (
    <>
      <Header />
      <main className="main-create">
        {toogleBuilding ? (
          <GalleryStructure
            backToForm={() => toogle(setToogleBuilding)}
            galleryId={galleryId}
          />
        ) : (
          <GallerySetup
            continueBuilding={() => toogle(setToogleBuilding)}
            saveId={saveId}
          />
        )}
      </main>
    </>
  );
}

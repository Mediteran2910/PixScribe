import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import useGalleries from "../../../Context/GalleriesContext";
import useModalCtx from "../../../Context/ModalContext";
import GalleryInputs from "../galleryInputs/GalleryInputs";
import { Link } from "react-router-dom";
import "./galleryCard.css";
import Modal from "../../layout/modal/Modal";
import { useContext, useState } from "react";
import { GalleryFormInputs } from "../galleryInputs/GalleryInputs";
import ButtonsAction from "../ButtonsAction/ButtonsAction";
import axios from "axios";

type Form = {
  galleryTitle?: string;
  galleryFormat?: string;
  galleryCreatedTime?: string;
  galleryNumFiles?: number;
  galleryDescription?: string;
  isExtended?: boolean;
  galleryId?: string;
  valueFormat: "html" | "json" | "yaml";
};

export type EditDataInputs = Omit<GalleryFormInputs, "format">;

export type EditFormData = {
  title: string;
  description: string;
};
export default function GalleryCard({
  galleryTitle,
  galleryFormat,
  galleryCreatedTime,
  galleryNumFiles,
  galleryDescription,
  galleryId,
  valueFormat,
  isExtended,
}: Form & React.JSX.IntrinsicElements["div"]) {
  const { toogleModalVisibility } = useModalCtx();
  const { updateMetaDataCtx } = useGalleries();
  const classes = [];

  if (isExtended) classes.push("extended");

  const [editData, setEditData] = useState<EditFormData>({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log("im edit form data", editData);

  const handleGalleryInputChangeEdit = (inputsData: EditDataInputs) => {
    setEditData((prev: EditFormData) => ({ ...prev, ...inputsData }));
  };

  const onSaveEdits = async (title: string, description: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/gallery/${galleryId}`,
        {
          title,
          description,
        }
      );

      console.log("Update successful:", response.data);
      return response.data.updatedGallery;
    } catch (error) {
      console.error("Error updating gallery:", error);
      throw error;
    }
  };

  const handleSaveEdits = async () => {
    setIsLoading(true);
    try {
      const response = await onSaveEdits(editData.title, editData.description);
      if (response) {
        updateMetaDataCtx(galleryId, response.title, response.description);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      toogleModalVisibility();
    }
  };

  if (isLoading) {
    return <p>ajmoooo cekamoo da updejtamo</p>;
  }

  if (isError) {
    <p>pucee sve</p>;
  }

  return (
    <>
      <div className="gallery-card">
        <div className="text-wrapper"></div>
        <Typography h2={true} color="black">
          {galleryTitle}
        </Typography>
        {isExtended && (
          <Typography body={true} color="black">
            {galleryDescription}
          </Typography>
        )}
        <div className="tags-wrapper">
          <Typography tag color="black" background="light-grey">
            {galleryFormat.toUpperCase()}
          </Typography>
          <Typography tag={true} color="black" background="light-grey">
            {new Date(galleryCreatedTime).toLocaleDateString()}
          </Typography>
          <Typography tag={true} color="black" background="light-grey">
            {galleryNumFiles} images
          </Typography>
        </div>
        {isExtended ? (
          <Button
            color="black"
            size="small"
            icon="edit"
            iconWidth="25px"
            onClick={toogleModalVisibility}
          ></Button>
        ) : (
          <Link to={`gallery/${galleryId}`}>
            <Button color="black" size="medium">
              VIEW
            </Button>
          </Link>
        )}
      </div>
      <Modal size="medium" flexDirection="column" placement="center">
        <GalleryInputs
          showFields={{ title: true, description: true, format: false }}
          editing
          valueTitle={galleryTitle}
          valueDescription={galleryDescription}
          valueFormat={valueFormat}
          onChange={handleGalleryInputChangeEdit}
          inputsWrapWidth="90%"
          txtInputSize="full"
          textAreaSize="full"
        />
        <ButtonsAction spaceEvenly>
          <Button size="medium" outline="black" onClick={toogleModalVisibility}>
            EXIT
          </Button>
          <Button size="medium" color="black" onClick={handleSaveEdits}>
            SAVE
          </Button>
        </ButtonsAction>
      </Modal>
    </>
  );
}

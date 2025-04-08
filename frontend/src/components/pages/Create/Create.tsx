import { useState } from "react";
import Header from "../../layout/header/Header";
import "./create.css";
import GallerySetup from "../../layout/gallerySetup/GallerySetup";
import GalleryStructure from "../../layout/galleryStructure/GalleryStructure";
import { toogle } from "../../../utils/toogle";
import useGalleries from "../../../Context/GalleriesContext";
import axios from "axios";
import { convertToFormData } from "../../../utils/convertToFormData";
import { FilesData } from "../../widgets/FileAdder/FileAdder";
import { GalleryFormInputs } from "../../widgets/galleryInputs/GalleryInputs";

export type GalleyForm = {
  title: string;
  description: string;
  format: "html" | "json" | "yaml";
  createdTime: string;
  files: File[];
};

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Create() {
  console.log("im create page and im running");
  const [toogleFormSteps, setToogleFormSteps] = useState(false);
  const [galleryId, setGalleryId] = useState<string | null>(null);
  const { appendGalleryCtx } = useGalleries();

  const [galleryFormData, setGalleryFormData] = useState<GalleyForm>({
    title: "",
    description: "",
    format: "html",
    createdTime: "",
    files: [],
  });

  console.log(galleryFormData);

  const handleGalleryInputChange = (inputsData: GalleryFormInputs) => {
    setGalleryFormData((prev: GalleyForm) => ({ ...prev, ...inputsData }));
  };

  const handleFilesChange = (filesData: FilesData) => {
    setGalleryFormData((prev: GalleyForm) => ({
      ...prev,
      ...filesData,
    }));
  };

  const submitForm = async () => {
    toogle(setToogleFormSteps);
    const formDataToSend = convertToFormData(galleryFormData);
    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.gallery?.id) {
        setGalleryId(response.data.gallery.id);
        appendGalleryCtx(response.data.gallery);
      }
      console.log("Gallery added successfully:", response.data);
    } catch (error) {
      console.error("Error adding gallery:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main-create">
        {toogleFormSteps ? (
          <GalleryStructure
            backToForm={() => toogle(setToogleFormSteps)}
            galleryId={galleryId}
            editorLanguage={galleryFormData?.format}
          />
        ) : (
          <GallerySetup
            submitForm={submitForm}
            uploadedFiles={galleryFormData.files.length}
            handleGalleryInputChange={handleGalleryInputChange}
            handleFilesChange={handleFilesChange}
          />
        )}
      </main>
    </>
  );
}

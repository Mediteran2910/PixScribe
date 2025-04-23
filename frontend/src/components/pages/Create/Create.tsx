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
  const [toogleFormSteps, setToogleFormSteps] = useState(false);
  const [galleryId, setGalleryId] = useState<string | null>(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const { appendGalleryCtx, updateGalleryCtx } = useGalleries();

  const [galleryFormData, setGalleryFormData] = useState<GalleyForm>({
    title: "",
    description: "",
    format: "html",
    createdTime: "",
    files: [],
  });

  const [additionalFiles, setAdditionalFiles] = useState({ files: [] });

  const handleGalleryInputChange = (inputsData: GalleryFormInputs) => {
    setGalleryFormData((prev: GalleyForm) => ({ ...prev, ...inputsData }));
  };

  const handleExtraFilesChange = (filesData: FilesData) => {
    setAdditionalFiles((prev) => ({
      ...prev,
      ...filesData,
    }));
  };

  const handleFilesChange = (filesData: FilesData) => {
    setGalleryFormData((prev: GalleyForm) => ({
      ...prev,
      ...filesData,
    }));
  };

  const submitForm = async () => {
    const formDataToSend = convertToFormData(galleryFormData);
    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.gallery?.id && response.data.time) {
        setGalleryId(response.data.gallery.id);
        appendGalleryCtx(response.data.gallery);
        setCountdownTime(response.data.time);
      }
      console.log("Gallery added successfully:", response.data);
    } catch (error) {
      console.error("Error adding gallery:", error);
    }
  };

  const extraFilesSubmit = async () => {
    const formDataToSend = convertToFormData(additionalFiles);
    try {
      const response = await axios.post(
        `http://localhost:8000/append-images/${galleryId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.gallery?.id && response.data.time) {
        setGalleryId(response.data.gallery.id);
        updateGalleryCtx(response.data.gallery.id, response.data.gallery.files);
        setCountdownTime(response.data.time);
      }
      console.log("Extra files added successfully:", response.data);
    } catch (error) {
      console.error("Error adding extra files:", error);
    }
  };

  const nextFormStep = (b: boolean) => {
    setToogleFormSteps(b);
  };

  return (
    <>
      <Header />
      <main className="main-create">
        {toogleFormSteps ? (
          <GalleryStructure
            backToForm={() => setToogleFormSteps(false)}
            galleryId={galleryId}
            editorLanguage={galleryFormData?.format}
          />
        ) : (
          <GallerySetup
            submitForm={submitForm}
            uploadedFiles={galleryFormData.files.length}
            handleGalleryInputChange={handleGalleryInputChange}
            handleFilesChange={handleFilesChange}
            valueTitle={galleryFormData.title}
            valueDescription={galleryFormData.description}
            valueFiles={galleryFormData.files}
            countdownTimeRes={countdownTime}
            nextFormStep={nextFormStep}
            handleExtraFilesChange={handleExtraFilesChange}
            extraFilesSubmit={extraFilesSubmit}
          />
        )}
      </main>
    </>
  );
}

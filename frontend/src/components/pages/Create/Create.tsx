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
  const [proccesImgCounter, setProccesImgCounter] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);

  const { appendGalleryCtx, updateGalleryCtx } = useGalleries();

  console.log(proccesImgCounter);

  const [galleryFormData, setGalleryFormData] = useState<GalleyForm>({
    title: "",
    description: "",
    format: "html",
    createdTime: "",
    files: [],
  });

  console.log("hi main data", galleryFormData.files);

  const [additionalFiles, setAdditionalFiles] = useState({ files: [] });

  console.log("im additional files", additionalFiles);

  const handleGalleryInputChange = (inputsData: GalleryFormInputs) => {
    setGalleryFormData((prev: GalleyForm) => ({ ...prev, ...inputsData }));
  };

  const handleFilesChange = (filesData: FilesData, isAditional: boolean) => {
    if (isAditional) {
      setAdditionalFiles((prev) => ({
        ...prev,
        ...filesData,
      }));
    } else {
      setGalleryFormData((prev: GalleyForm) => ({
        ...prev,
        ...filesData,
      }));
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const submitForm = async () => {
    const { files, ...formMetaData } = galleryFormData;
    console.log("Sending metadata to backend:", formMetaData);

    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        formMetaData
      );

      if (response.data?.gallery?.id && response.data.time) {
        const newGalleryId = response.data.gallery.id;
        setGalleryId(newGalleryId);
        appendGalleryCtx(response.data.gallery);

        const batchSize = 15;
        for (let i = 0; i < files.length; i += batchSize) {
          const batch = files.slice(i, i + batchSize);

          await Promise.all(
            batch.map(async (file) => {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("id", newGalleryId);

              try {
                const fileResponse = await axios.post(
                  "http://localhost:8000/add-gallery",
                  formData,
                  { headers: { "Content-Type": "multipart/form-data" } }
                );

                console.log("File uploaded:", fileResponse.data);
                setProccesImgCounter((prev) => prev + 1);
              } catch (err) {
                console.error("Error uploading file:", file.name, err);
              }
            })
          );

          if (i + batchSize < files.length) {
            console.log("Batch done. Cooldown starting...");
            setCooldownActive(true);
            await delay(70000);
            setCooldownActive(false);
          }
        }
      }
    } catch (error) {
      console.error("Error adding gallery or uploading files:", error);
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
            proccesImgCounter={proccesImgCounter}
            filesLength={galleryFormData.files.length}
            cooldown={cooldownActive}
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
          />
        )}
      </main>
    </>
  );
}

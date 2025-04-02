import FileAdder from "../../widgets/FileAdder/FileAdder";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./gallerySetup.css";
import axios from "axios";
import { useState } from "react";
import { errObj } from "../../../types/types";

import { validateInputs } from "../../../utils/inputErrors";

type Props = {
  continueBuilding: () => void;
  saveId: (id: string) => void;
};

export default function GallerySetup({ continueBuilding, saveId }: Props) {
  const [error, setError] = useState<errObj>({});

  const handleSubmitInputs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titleEntry = formData.get("title");
    const title = typeof titleEntry === "string" ? titleEntry.trim() : "";

    const descriptionEntry = formData.get("description");
    const description =
      typeof descriptionEntry === "string" ? descriptionEntry.trim() : "";
    const formatEntry = formData.get("format");
    const format = typeof formatEntry === "string" ? formatEntry : "";
    const filesEntries = formData.getAll("files");
    const files = filesEntries.filter(
      (entry): entry is File => entry instanceof File
    );

    console.log(formData);
    if (validateInputs(title, description, format, files, setError)) {
      console.log("Validation failed, stopping API request.");
      return;
    }

    const createdTime = new Intl.DateTimeFormat("en-CA").format(new Date());
    formData.append("createdTime", createdTime);

    continueBuilding();

    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data && response.data.gallery) {
        saveId(response.data.gallery.id);
      }
      console.log("Gallery added successfully:", response.data);
    } catch (error) {
      console.error("Error adding gallery:", error);
    }
  };

  return (
    <form className="create-wrapper" onSubmit={handleSubmitInputs}>
      <GalleryInputs
        inputName="title"
        textAreaName="description"
        radioHTML_value="html"
        radioJSON_value="json"
        radioYAML_value="yaml"
        validateTitle={error.title}
        validateDescription={error.description}
        validateFormat={error.format}
      />
      <div className="right-side-wrapp">
        <FileAdder filesName="files" validateFile={error.files} />
        <ButtonsAction end={true} direction="row">
          <Button type="submit" color="black" size="medium">
            CONTINUE
          </Button>
        </ButtonsAction>
      </div>
    </form>
  );
}

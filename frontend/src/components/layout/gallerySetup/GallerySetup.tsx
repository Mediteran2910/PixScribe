import FileAdder from "../../widgets/FileAdder/FileAdder";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./gallerySetup.css";
import axios from "axios";
import { useState } from "react";

import { validateInputs } from "../../../utils/inputErrors";

export default function GallerySetup({ continueBuilding, saveId }) {
  const [error, setError] = useState({});

  const handleSubmitInputs = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const format = formData.get("format");
    const files = formData.getAll("files");

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

  const propsObj = [
    {
      btnText: "continue",
      color: "black",
    },
  ];

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
        <Button type="submit" color="black" size="medium">
          CONTINUE
        </Button>
      </div>
    </form>
  );
}

import FileAdder from "../../widgets/FileAdder/FileAdder";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";
import { useState } from "react";
import "./galleryBuilder.css";
import axios from "axios";
export default function GalleryBuilder() {
  const [validateErrors, setValidateErrors] = useState({});
  console.log(validateErrors);

  const validate = (validateObj) => {
    return validateObj && validateObj.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidateErrors({});
    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const format = formData.get("format");
    const files = formData.getAll("files");

    if (!title) {
      setValidateErrors((prevErrors) => ({
        ...prevErrors,
        title: {
          message: "Title is required",
        },
      }));
    } else if (title.length < 3 || title.length > 12) {
      setValidateErrors((prevErrors) => ({
        ...prevErrors,
        title: {
          message: "Must be between 3-12 characters",
        },
      }));
    }

    if (description.length < 10 || description.length > 60) {
      setValidateErrors((prevErrors) => ({
        ...prevErrors,
        description: {
          message: "Description must be between 10-60 characters",
        },
      }));
    }

    if (!format) {
      setValidateErrors((prevErrors) => ({
        ...prevErrors,
        format: {
          message: "You need to choose format",
        },
      }));
    }

    if (!files) {
      setValidateErrors((prevErrors) => ({
        ...prevErrors,
        files: {
          message: "You need to add files",
        },
      }));
    }

    const newGallery = {
      title,
      description,
      format,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        newGallery
      );
      console.log("radiiiii:", response.data);
    } catch (error) {
      console.error("dajjjjj taj error:", error);
    }

    console.log(newGallery, files);
  };

  return (
    <form className="create-wrapper" onSubmit={handleSubmit}>
      <GalleryInputs
        inputName="title"
        textAreaName="description"
        radioHTML_value="html"
        radioJSON_value="json"
        radioYAML_value="yaml"
        validateTitle={validate(validateErrors.title)}
        validateDescription={validate(validateErrors.description)}
        validateFormat={validate(validateErrors.format)}
      ></GalleryInputs>
      <FileAdder type="submit" filesName="files"></FileAdder>
    </form>
  );
}

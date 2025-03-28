import FileAdder from "../../widgets/FileAdder/FileAdder";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./gallerySetup.css";
import axios from "axios";
import { errorReducer } from "../../../hooks/errorReducer";
import { useReducer, useState } from "react";

// const errorsObj = {
//   title: {
//     messages: {
//       empty: "Title is required",
//       invalid: "Must be between 3-12 characters",
//     },
//   },
//   description: {
//     messages: {
//       empty: "Description is required",
//       invalid: "Must be between 10-60 characters",
//     },
//   },
//   format: {
//     messages: {
//       empty: "You need to choose a format",
//     },
//   },
//   files: {
//     messages: {
//       empty: "You need to upload file",
//     },
//   },
// };

// const checker = (field, value) => {
//   if (field === "title") {
//     return value.length < 3 || value.length > 12;
//   }
//   if (field === "description") {
//     return value.length < 10 || value.length > 60;
//   }
//   if (field === "files") {
//     return (
//       value.length === 0 || value.some((file) => !file.name || file.size === 0)
//     );
//   }
// };

export default function GallerySetup({ continueBuilding, saveId }) {
  const [state, dispatch] = useReducer(errorReducer, {});

  const validateInputs = (title, description, format, files) => {
    dispatch({ type: "CLEAR_ERRORS" });
    let isErr = false;

    if (!title) {
      dispatch({ type: "EMPTY_TITLE" });
      isErr = true;
    } else if (title.length < 3 || title.length > 12) {
      dispatch({ type: "INVALID_TITLE" });
      isErr = true;
    }

    if (!description || description.length < 10 || description.length > 60) {
      dispatch({ type: "INVALID_DESCRIPTION" });
      isErr = true;
    }

    if (!format) {
      dispatch({ type: "UNCHOOSEN_FORMAT" });
      isErr = true;
    }

    if (
      files.length === 0 ||
      files.some((file) => !file.name || file.size === 0)
    ) {
      dispatch({ type: "UNCHOOSEN_FILES" });
      isErr = true;
    }

    return isErr;
  };

  const handleSubmitInputs = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const format = formData.get("format");
    const files = formData.getAll("files");

    if (validateInputs(title, description, format, files)) {
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
        validateTitle={state.title?.message}
        validateDescription={state.description?.message}
        validateFormat={state.format?.message}
      />
      <div className="right-side-wrapp">
        <FileAdder filesName="files" validateFile={state.files?.message} />
        <ButtonsAction btnType="submit" gallerySetup={true} />
      </div>
    </form>
  );
}

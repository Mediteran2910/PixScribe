import FileAdder from "../../widgets/FileAdder/FileAdder";
import GalleryInputs from "../../widgets/galleryInputs/GalleryInputs";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./gallerySetup.css";
import { ChangeEvent, useState } from "react";
import { errObj } from "../../../types/types";
import { validateInputs } from "../../../utils/inputErrors";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  onContinue: () => void;
  handleChange: (e: ChangeEvt) => void;
  submitForm: () => void;
  onDragFiles: (dropedFiles: File[]) => void;
  uploadedFiles?: number;
};

export default function GallerySetup({
  onContinue,
  handleChange,
  submitForm,
  onDragFiles,
  uploadedFiles,
}: Props) {
  const [error, setError] = useState<errObj>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
    onContinue();
  };

  return (
    <form className="create-wrapper" onSubmit={handleFormSubmit}>
      <GalleryInputs
        inputName="title"
        textAreaName="description"
        radioHTML_value="html"
        radioJSON_value="json"
        radioYAML_value="yaml"
        validateTitle={error.title}
        validateDescription={error.description}
        validateFormat={error.format}
        handleChange={handleChange}
      />
      <div className="right-side-wrapp">
        <FileAdder
          filesName="files"
          validateFile={error.files}
          handleChange={handleChange}
          onDragFiles={onDragFiles}
          uploadedFiles={uploadedFiles}
        />
        <ButtonsAction end={true} direction="row">
          <Button type="submit" color="black" size="medium">
            CONTINUE
          </Button>
        </ButtonsAction>
      </div>
    </form>
  );
}

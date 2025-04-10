import FileAdder, { FilesData } from "../../widgets/FileAdder/FileAdder";
import GalleryInputs, {
  GalleryFormInputs,
} from "../../widgets/galleryInputs/GalleryInputs";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./gallerySetup.css";
import { useState } from "react";
import { errObj } from "../../../types/types";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  handleGalleryInputChange: (data: GalleryFormInputs) => void;
  handleFilesChange: (filesData: FilesData) => void;
  uploadedFiles?: number;
  submitForm: () => void;
};
export default function GallerySetup({
  uploadedFiles,
  handleFilesChange,
  handleGalleryInputChange,
  submitForm,
}: Props) {
  const [error, setError] = useState<errObj>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      submitForm();
    } catch (error) {
      console.log("error occured", error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <form className="create-wrapper" onSubmit={handleFormSubmit}>
      <GalleryInputs
        inputName="title"
        textAreaName="description"
        radioHTML_value="html"
        radioJSON_value="json"
        radioYAML_value="yaml"
        // validateTitle={error.title}
        // validateDescription={error.description}
        // validateFormat={error.format}
        onChange={handleGalleryInputChange}
      />
      <div className="right-side-wrapp">
        <FileAdder
          filesName="files"
          // validateFile={error.files}
          onChange={handleFilesChange}
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

import FileInput from "../../UI/FileInput/FileInput";
import Typography from "../../UI/typography/typography";
import DragDrop from "../DragDrop/DragDrop";
import { useState, useEffect } from "react";
import "./FileAdder.css";
type ChangeEvt = React.ChangeEvent<HTMLInputElement>;

type Props = {
  filesName?: "files";
  validateFile?: string;
  uploadedFiles?: number;
  onChange?: (e: FilesData) => void;
};

export type FilesData = {
  files?: File[];
};
export default function FileAdder({
  filesName,
  validateFile,
  uploadedFiles,
  onChange,
}: Props) {
  const [filesData, setFilesData] = useState<FilesData>({ files: [] });

  const MAX_IMAGES = 15;

  useEffect(() => {
    onChange(filesData);
  }, [filesData]);

  const updateFiles = (newFiles: File[]) => {
    setFilesData({ files: [...(filesData.files || []), ...newFiles] });
  };

  const onDragFiles = (droppedFiles: File[]) => {
    updateFiles(droppedFiles);
  };

  const onHandleFileInputChange = (e: ChangeEvt) => {
    const selectedFiles = Array.from(e.target.files || []);
    updateFiles(selectedFiles);
  };

  return (
    <DragDrop
      count={MAX_IMAGES - uploadedFiles}
      formats={["jpeg", "jpg", "png"]}
      onUpload={onDragFiles}
    >
      <FileInput
        name={filesName}
        validate={validateFile}
        uploadedFiles={uploadedFiles}
        onChange={onHandleFileInputChange}
      />
      <Typography caption color="medium-grey">
        {uploadedFiles ? (
          `you can upload ${MAX_IMAGES - uploadedFiles} more images`
        ) : (
          <>
            max 15 images max <br />
            size per image 10MB
          </>
        )}
      </Typography>
    </DragDrop>
  );
}

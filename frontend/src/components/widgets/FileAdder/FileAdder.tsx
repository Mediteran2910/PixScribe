import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FileInput from "../../UI/FileInput/FileInput";
import Typography from "../../UI/typography/typography";
import DragDrop from "../DragDrop/DragDrop";
import AddedImg from "../../UI/addedImg/addedImg";
import Button from "../../UI/button/Button";
import "./FileAdder.css";

type ChangeEvt = React.ChangeEvent<HTMLInputElement>;

type FileWithId = {
  id: string;
  file: File;
};

export type FilesData = {
  files?: File[];
};

type Props = {
  filesName?: "files";
  validateFile?: string;
  uploadedFiles?: number;
  valueFiles: File[];
  isAddingActive?: boolean;
  onChange?: (e: FilesData) => void;
};

export default function FileAdder({
  filesName,
  validateFile,
  uploadedFiles = 0,
  valueFiles,
  onChange,
}: Props) {
  const MAX_IMAGES = 15555;
  const [filesData, setFilesData] = useState<FileWithId[]>([]);

  useEffect(() => {
    if (valueFiles.length !== filesData.length) {
      setFilesData(valueFiles.map((file) => ({ id: uuidv4(), file })));
    }
  }, [valueFiles]);

  useEffect(() => {
    onChange?.({ files: filesData.map((f) => f.file) });
  }, [filesData]);

  const updateFiles = (newFiles: File[]) => {
    const filesWithIds = newFiles.map((file) => ({
      id: uuidv4(),
      file,
    }));
    setFilesData((prev) => [...prev, ...filesWithIds]);
  };

  const onDragFiles = (droppedFiles: File[]) => {
    updateFiles(droppedFiles);
  };

  const onHandleFileInputChange = (e: ChangeEvt) => {
    const selectedFiles = Array.from(e.target.files || []);
    updateFiles(selectedFiles);
  };

  const onDeleteImages = (id: string) => {
    setFilesData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="file-adder-wrap">
      <DragDrop
        count={MAX_IMAGES - uploadedFiles}
        formats={["jpeg", "jpg", "png", "webp", "svg"]}
        onUpload={onDragFiles}
      >
        {filesData.length > 0 && (
          <div className="added-images-container">
            {filesData.map(({ id, file }) => (
              <AddedImg
                key={id}
                file={file}
                onDeleteImages={() => onDeleteImages(id)}
              />
            ))}
          </div>
        )}

        <FileInput
          name={filesName}
          validate={validateFile}
          uploadedFiles={uploadedFiles}
          onChange={onHandleFileInputChange}
        />
        <Typography caption color="light-grey" style={{ marginTop: "10px" }}>
          {filesData.length > 0 ? (
            `${filesData.length} images uploaded`
          ) : (
            <>
              max size per file - 4MB <br /> formats - jpeg, jpg, png
            </>
          )}
        </Typography>
      </DragDrop>
    </div>
  );
}

import FileInput from "../../UI/FileInput/FileInput";
import Typography from "../../UI/typography/typography";
import DragDrop from "../DragDrop/DragDrop";
import "./FileAdder.css";
type ChangeEvt = React.ChangeEvent<HTMLInputElement>;
type Props = {
  filesName: "files";
  validateFile: string;
  uploadedFiles?: number;
  handleChange: (e: ChangeEvt) => void;
  onDragFiles: (droppedFiles: File[]) => void;
};
export default function FileAdder({
  filesName,
  validateFile,
  uploadedFiles,
  handleChange,
  onDragFiles,
}: Props) {
  return (
    <DragDrop
      count={15}
      formats={["jpeg", "jpg", "png"]}
      onUpload={onDragFiles}
    >
      <FileInput
        name={filesName}
        validate={validateFile}
        uploadedFiles={uploadedFiles}
        onChange={handleChange}
      />
      <Typography caption={true} color="medium-grey">
        {uploadedFiles ? (
          `you can upload ${15 - uploadedFiles} more images`
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

import Button from "../button/Button";
import Typography from "../typography/typography";
import "./AddedImg.css";
type Props = {
  file?: File;
  onDeleteImages?: () => void;
} & React.JSX.IntrinsicElements["div"];

export default function AddedImg({ file, onDeleteImages }: Props) {
  return (
    <div className="added-img-wrap">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="added-img"
      />
      <Typography
        caption
        color="light-grey"
        style={{
          marginInline: "10px",
          maxWidth: "80%",
          maxHeight: "80%",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        {file.name}
      </Typography>
      <Button
        icon="remove"
        size="small"
        iconWidth="20px"
        onClick={onDeleteImages}
      ></Button>
    </div>
  );
}

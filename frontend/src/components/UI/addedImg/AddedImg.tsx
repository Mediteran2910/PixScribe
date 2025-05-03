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
      <Typography caption color="black" style={{ marginInline: "10px" }}>
        {`${file.name.slice(0, 15)}...`}
      </Typography>
      <Button size="small" outline="black" onClick={onDeleteImages}>
        x
      </Button>
    </div>
  );
}

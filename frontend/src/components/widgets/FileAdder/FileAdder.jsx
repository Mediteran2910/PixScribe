import FileInput from "../../widgets/FileAdder/FileAdder";
import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import "./FileAdder.css";
export default function FileAdder({ type, filesName }) {
  return (
    <div className="file-adder-wrap">
      <div className="file-adder-el">
        <FileInput filesName={filesName}></FileInput>
        <Typography caption="caption-grey">max 15 images</Typography>
        <Typography caption="caption-grey">max size 2gb</Typography>
      </div>
      <Button color="black" type={type}>
        CONTINUE
      </Button>
    </div>
  );
}

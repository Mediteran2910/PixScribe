import Input from "../../UI/input/Input";
import Textarea from "../../UI/textarea/Textarea";
import InputRadio from "../../UI/inputRadio/inputRadio";
import Typography from "../../UI/typography/typography";
import "./galleryInputs.css";

type Props = {
  textAreaName: string;
  inputName: string;
  radioHTML_value: string;
  radioJSON_value: string;
  radioYAML_value: string;
  validateTitle: string;
  validateFormat: string;
  validateDescription: string;
};
export default function GalleryInputs({
  textAreaName,
  inputName,
  radioHTML_value,
  radioJSON_value,
  radioYAML_value,
  validateTitle,
  validateFormat,
  validateDescription,
}: Props) {
  return (
    <div className="gallery-inputs">
      <Input
        name={inputName}
        placeholder="Your title goes here.."
        validate={validateTitle}
      ></Input>
      <Textarea name={textAreaName} validate={validateDescription}></Textarea>
      <div className="input-wrapper">
        <Typography body={true} color="black">
          Choose format:
        </Typography>{" "}
        {validateFormat && (
          <Typography caption={true} color="red">
            {validateFormat}
          </Typography>
        )}
        <div className="choose-wrapper">
          <InputRadio value={radioHTML_value}></InputRadio>
          <InputRadio value={radioJSON_value}></InputRadio>
          <InputRadio value={radioYAML_value}></InputRadio>
        </div>
      </div>
    </div>
  );
}

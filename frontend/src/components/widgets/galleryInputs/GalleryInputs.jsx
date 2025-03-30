import Input from "../../UI/input/Input";
import Textarea from "../../UI/textarea/Textarea";
import InputRadio from "../../UI/inputRadio/inputRadio";
import Typography from "../../UI/typography/typography";
import "./galleryInputs.css";
export default function GalleryInputs({
  textAreaName,
  inputName,
  radioHTML_value,
  radioJSON_value,
  radioYAML_value,
  validateTitle,
  validateFormat,
  validateDescription,
}) {
  return (
    <div className="gallery-inputs">
      <Input
        name={inputName}
        placeholder="Your title goes here.."
        validateTitle={validateTitle}
      ></Input>
      <Textarea
        name={textAreaName}
        validateDescription={validateDescription}
      ></Textarea>
      <div className="input-wrapper">
        <Typography body="label" color="black">
          Choose format:
        </Typography>{" "}
        {validateFormat && (
          <Typography caption="caption" color="red">
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

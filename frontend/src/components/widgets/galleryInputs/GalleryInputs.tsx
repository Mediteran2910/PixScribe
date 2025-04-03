import Input from "../../UI/input/Input";
import Textarea from "../../UI/textarea/Textarea";
import InputRadio from "../../UI/inputRadio/InputRadio";
import Typography from "../../UI/typography/typography";
import { v4 as uuidv4 } from "uuid";
import "./galleryInputs.css";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  textAreaName: string;
  inputName: string;
  radioHTML_value: string;
  radioJSON_value: string;
  radioYAML_value: string;
  validateTitle: string;
  validateFormat: string;
  validateDescription: string;
  handleChange: (e: ChangeEvt) => void;
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
  handleChange,
}: Props) {
  const radioValues = [radioHTML_value, radioJSON_value, radioYAML_value];

  return (
    <div className="gallery-inputs">
      <Input
        name={inputName}
        placeholder="Your title goes here.."
        validate={validateTitle}
        onChange={handleChange}
      ></Input>
      <Textarea
        name={textAreaName}
        validate={validateDescription}
        onChange={handleChange}
      ></Textarea>
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
          {radioValues.map((v) => (
            <InputRadio
              value={v}
              onChange={handleChange}
              key={uuidv4()}
            ></InputRadio>
          ))}
        </div>
      </div>
    </div>
  );
}

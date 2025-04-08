import Input from "../../UI/input/Input";
import Textarea from "../../UI/textarea/Textarea";
import InputRadio from "../../UI/inputRadio/InputRadio";
import Typography from "../../UI/typography/typography";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "./galleryInputs.css";
import { useSearchParams } from "react-router-dom";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  textAreaName?: string;
  inputName: string;
  radioHTML_value?: string;
  radioJSON_value?: string;
  radioYAML_value?: string;
  validateTitle?: string;
  validateFormat?: string;
  validateDescription?: string;
  onChange?: (e: GalleryFormInputs) => void;
};

export type GalleryFormInputs = {
  title: string;
  description: string;
  format: "html" | "json" | "yaml";
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
  onChange,
}: Props) {
  const radioValues = [radioHTML_value, radioJSON_value, radioYAML_value];
  const [gallInputData, setGallInputData] = useState<GalleryFormInputs>({
    title: "",
    description: "",
    format: "html",
  });

  const onHandleChange = (key: keyof GalleryFormInputs) => {
    return (e: ChangeEvt) =>
      setGallInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  useEffect(() => {
    onChange(gallInputData);
  }, [gallInputData]);

  return (
    <div className="gallery-inputs">
      <Input
        name={inputName}
        placeholder="Your title goes here.."
        validate={validateTitle}
        onChange={onHandleChange("title")}
      ></Input>
      <Textarea
        name={textAreaName}
        validate={validateDescription}
        onChange={onHandleChange("description")}
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
              onChange={onHandleChange("format")}
              key={uuidv4()}
            ></InputRadio>
          ))}
        </div>
      </div>
    </div>
  );
}

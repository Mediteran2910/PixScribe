import Input from "../../UI/input/Input";
import Textarea from "../../UI/textarea/Textarea";
import InputRadio from "../../UI/inputRadio/InputRadio";
import Typography from "../../UI/typography/typography";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "./galleryInputs.css";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  textAreaName?: string;
  inputName?: string;
  radioHTML_value?: string;
  radioJSON_value?: string;
  radioYAML_value?: string;
  validateTitle?: string;
  validateFormat?: string;
  validateDescription?: string;
  valueDescription?: string;
  valueTitle?: string;
  textAreaSize?: "full" | "half" | "quater";
  txtInputSize?: "full" | "half" | "quater";
  onChange?: (e: GalleryFormInputs) => void;
  showFields?: {
    title?: boolean;
    description?: boolean;
    format?: boolean;
  };
  editing?: boolean;
  inputsWrapWidth?: string | number;
  valueFormat?: "html" | "json" | "yaml";
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
  valueDescription,
  valueTitle,
  valueFormat,
  textAreaSize,
  txtInputSize,
  inputsWrapWidth,
  editing,
  onChange,
  showFields = { title: true, description: true, format: true },
}: Props) {
  const radioValues = [radioHTML_value, radioJSON_value, radioYAML_value];
  const [gallInputData, setGallInputData] = useState<GalleryFormInputs>({
    title: valueTitle || "",
    description: valueDescription || "",
    format: valueFormat || "html",
  });

  console.log("im inputs data", gallInputData);

  const onHandleChange = (key: keyof GalleryFormInputs) => {
    return (e: ChangeEvt) =>
      setGallInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  useEffect(() => {
    if (onChange) {
      onChange(gallInputData);
    }
  }, [gallInputData]);

  return (
    <div className="gallery-inputs" style={{ width: inputsWrapWidth }}>
      {showFields?.title !== false && (
        <Input
          name={inputName}
          placeholder="Your title goes here.."
          validate={validateTitle}
          onChange={onHandleChange("title")}
          value={gallInputData.title}
          editing={true}
          inputSize={txtInputSize}
        />
      )}

      {showFields?.description !== false && (
        <Textarea
          name={textAreaName}
          validate={validateDescription}
          onChange={onHandleChange("description")}
          value={gallInputData.description}
          editing={true}
          size={textAreaSize}
        />
      )}

      {showFields?.format !== false && (
        <div className="input-wrapper">
          <Typography body={true} color="black">
            Choose format:
          </Typography>
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

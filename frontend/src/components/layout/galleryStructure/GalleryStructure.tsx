import "./galleryStructure.css";
import { useState } from "react";
import Button from "../../UI/button/Button";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import UsageGuidelines from "../../widgets/UsageGuidelines/UsageGuidelines";
import { Link, useNavigate } from "react-router-dom";
import useGalleries from "../../../Context/GalleriesContext";
import axios from "axios";
import { defaultValues } from "../../../utils/defaultEditorValues";
import Progress from "../../UI/Progress/Progress";

type Props = {
  backToForm: () => void;
  galleryId: string;
  editorLanguage: "html" | "json" | "yaml";
  proccesImgCounter: number;
  filesLength: number;
  cooldown: boolean;
};

export default function GalleryStructure({
  backToForm,
  editorLanguage,
  galleryId,
  proccesImgCounter,
  filesLength,
  cooldown,
}: Props) {
  const [editorValue, setEditorValue] = useState(defaultValues[editorLanguage]);

  const navigate = useNavigate();

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleSubmitTemplate = async () => {
    try {
      const cleanedEditorValue = editorValue
        .replace(/<!--don't touch anything in { }-->/, "")
        .replace(/\/\/don't touch anything in { }/, "")
        .replace(/#don't touch anything in { }/, "");

      const response = await axios.post(
        "http://localhost:8000/save-template",
        { content: cleanedEditorValue, galleryId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save data");
      }

      const responseData = await response.data;

      if (responseData) {
        console.log("response is here");
        navigate(`/gallery/${galleryId}`);
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
    console.log("leaving the function");
  };

  return (
    <div className="gallery-structure-wrap">
      <UsageGuidelines />
      <Progress
        proccesingCounter={proccesImgCounter}
        filesLength={filesLength}
        cooldown={cooldown}
      ></Progress>
      <div className="code-editor">
        <CodeEditor
          editorLanguage={editorLanguage}
          defaultValue={defaultValues[editorLanguage]}
          readOnly={false}
          onChange={handleEditorChange}
        ></CodeEditor>
      </div>
      <ButtonsAction end={true} direction="row">
        <Button outline="black" size="medium" onClick={backToForm}>
          EXIT
        </Button>

        <Button
          color="black"
          size="medium"
          style={{ marginLeft: "10px" }}
          onClick={handleSubmitTemplate}
        >
          FINISH
        </Button>
      </ButtonsAction>
    </div>
  );
}

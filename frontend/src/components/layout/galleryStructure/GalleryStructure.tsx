import { useState } from "react";
import axios from "axios";
import Button from "../../UI/button/Button";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";

import "./galleryStructure.css";

type Props = {
  backToForm: () => void;
  galleryId: string;
};

let initialComment: string = "<!-- don't touch anything in { } -->";

let defaultValueHTML = `<img src="images/{fileName}" {alt="altText"}/>${initialComment}`;
let defaultValueJSON = `{
  "path": "images/{fileName}",
  "alt": "{altText}",
}${initialComment}`;
let defaultValueYAML = `path: "images/{fileName}"
alt: "{altText}"${initialComment}`;

export default function GalleryStructure({ backToForm, galleryId }: Props) {
  const handleEditorChange = (
    newValue: string,
    setEditorValue: (newValue: string) => {}
  ) => {
    setEditorValue(newValue);
  };
  // const [editorInstance, setEditorInstance] = useState(null);

  // const handleEditorMount = (editor) => setEditorInstance(editor);
  // let initialComment = "<!-- don't touch anything in { } -->";
  // const handleFinishClick = async () => {
  //   if (!editorInstance) return;
  //   let editorValue = editorInstance
  //     .getValue()
  //     .replace(initialComment, "")
  //     .trim();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/update-gallery-code",
  //       {
  //         galleryId,
  //         content: editorValue,
  //       }
  //     );
  //     console.log("Gallery updated successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error updating gallery:", error);
  //   }
  // };

  return (
    <div className="gallery-structure-wrap">
      <div className="code-editor">
        <CodeEditor
          language="html"
          defaultValue={defaultValueHTML}
          onChange={() => handleEditorChange}
        ></CodeEditor>
      </div>
      <ButtonsAction end={true} direction="row">
        <Button outline="black" size="medium" onClick={backToForm}>
          EXIT
        </Button>
        <Button color="black" size="medium" style={{ marginLeft: "10px" }}>
          FINISH
        </Button>
      </ButtonsAction>
    </div>
  );
}

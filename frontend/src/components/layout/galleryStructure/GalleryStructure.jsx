import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Button from "../../UI/button/Button";

import "./galleryStructure.css";

export default function GalleryStructure({ backToForm, galleryId }) {
  const [editorInstance, setEditorInstance] = useState(null);

  const handleEditorMount = (editor) => setEditorInstance(editor);
  let initialComment = "<!-- don't touch anything in { } -->";
  const handleFinishClick = async () => {
    if (!editorInstance) return;
    let editorValue = editorInstance
      .getValue()
      .replace(initialComment, "")
      .trim();

    try {
      const response = await axios.post(
        "http://localhost:8000/update-gallery-code",
        {
          galleryId,
          content: editorValue,
        }
      );
      console.log("Gallery updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  const propsObj = [
    {
      btnText: "exit",
      action: backToForm,
      outline: "black",
    },
    {
      btnText: "finish",
      action: handleFinishClick,
      color: "black",
    },
  ];

  return (
    <div className="gallery-structure-wrap">
      <div className="code-editor">
        <Editor
          height="50vh"
          width="100%"
          defaultLanguage="html"
          defaultValue={`<img src="images/{fileName}" {alt="altText"}/>${initialComment}`}
          theme="vs-dark"
          onMount={handleEditorMount}
          options={{
            automaticLayout: true,
            wordWrap: "on",
            minimap: { enabled: false },
            fontSize: 14,
            readOnly: false,
            mouseWheelZoom: true,
          }}
        />
      </div>
      <div className="editor-btns-wrap">
        <Button outline="black" size="medium" onClick={backToForm}>
          EXIT
        </Button>
        <Button color="black" size="medium" onClick={handleFinishClick}>
          FINISH
        </Button>
      </div>
    </div>
  );
}

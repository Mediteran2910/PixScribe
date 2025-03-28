import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./galleryStructure.css";

export default function GalleryStructure({ backToForm, galleryId }) {
  const [editorInstance, setEditorInstance] = useState(null);

  const handleEditorMount = (editor) => setEditorInstance(editor);
  let initialComment = "//don't touch anything in { }";
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

  return (
    <div className="gallery-structure-wrap">
      <div className="code-editor">
        <Editor
          height="50vh"
          width="100%"
          defaultLanguage="html"
          defaultValue={`<img src="images/{fileName}" alt="{altText}" />${initialComment}`}
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
      <ButtonsAction
        handleFinishClick={handleFinishClick}
        backToForm={backToForm}
        editorBtns={true}
      />
    </div>
  );
}

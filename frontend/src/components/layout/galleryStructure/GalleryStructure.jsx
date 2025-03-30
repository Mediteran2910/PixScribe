import { useState } from "react";
import axios from "axios";
import Button from "../../UI/button/Button";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";

import "./galleryStructure.css";

export default function GalleryStructure({ backToForm, galleryId }) {
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
        <CodeEditor></CodeEditor>
      </div>
      <div className="editor-btns-wrap">
        <Button outline="black" size="medium">
          EXIT
        </Button>
        <Button color="black" size="medium">
          FINISH
        </Button>
      </div>
    </div>
  );
}

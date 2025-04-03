import "./galleryStructure.css";
import Button from "../../UI/button/Button";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import {
  defaultValues,
  commentText,
  initialComment,
} from "../../../utils/defaultEditorValues";

type Props = {
  backToForm: () => void;
  editorLanguage: "html" | "json" | "yaml";
};

export default function GalleryStructure({
  backToForm,
  editorLanguage,
}: Props) {
  const handleEditorChange = (
    newValue: string,
    setEditorValue: (newValue: string) => {}
  ) => {
    setEditorValue(newValue);
  };

  return (
    <div className="gallery-structure-wrap">
      <div className="code-editor">
        <CodeEditor
          editorLanguage={editorLanguage}
          defaultValue={defaultValues[editorLanguage]}
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

// const editorLanguage = () => {
//   const language = localStorage.getItem("format");
//   console.log("Retrieved format from localStorage:", language); // Debug log
//   if (language === "html") {
//     return "html";
//   } else if (language === "json") {
//     return "json";
//   } else if (language === "yaml") {
//     return "yaml";
//   } else throw new Error("sve otislo u racku");
// };

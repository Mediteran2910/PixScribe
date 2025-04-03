import { useState } from "react";
import Header from "../../layout/header/Header";
import "./create.css";
import GallerySetup from "../../layout/gallerySetup/GallerySetup";
import GalleryStructure from "../../layout/galleryStructure/GalleryStructure";
import { toogle } from "../../../utils/toogle";
import axios from "axios";

type Form = {
  title: string;
  description: string;
  format: "html" | "json" | "yaml";
  createdTime: string;
  files: File[];
};

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Create() {
  const [toogleBuilding, setToogleBuilding] = useState(false);
  const [galleryId, setGalleryId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Form>({
    title: "",
    description: "",
    format: "html",
    createdTime: "",
    files: [],
  });
  console.log(formData);
  console.log(formData.files.length);

  const onDragFiles = (dropedFiles: File[]) => {
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...dropedFiles],
    }));
  };

  const handleChange = (e: ChangeEvt) => {
    const { name, type, files, value } = e.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file"
          ? [...prevData.files, ...(files ? Array.from(files) : [])]
          : value,
    }));
  };

  const dataToSend = () => {
    const formDataSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        value.forEach((file) => formDataSend.append("files", file));
      } else {
        formDataSend.append(key, value);
      }
    }
    return formDataSend;
  };

  const submitForm = async () => {
    setFormData((prevData) => ({
      ...prevData,
      createdTime: new Intl.DateTimeFormat("en-CA").format(new Date()),
    }));

    const formDataToSend = dataToSend();

    try {
      const response = await axios.post(
        "http://localhost:8000/add-gallery",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.gallery?.id) {
        setGalleryId(response.data.gallery.id);
      }
      console.log("Gallery added successfully:", response.data);
    } catch (error) {
      console.error("Error adding gallery:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main-create">
        {toogleBuilding ? (
          <GalleryStructure
            backToForm={() => toogle(setToogleBuilding)}
            galleryId={galleryId}
            editorLanguage={formData?.format}
          />
        ) : (
          <GallerySetup
            onContinue={() => toogle(setToogleBuilding)}
            handleChange={handleChange}
            submitForm={submitForm}
            onDragFiles={onDragFiles}
            uploadedFiles={formData.files.length > 0 && formData.files.length}
          />
        )}
      </main>
    </>
  );
}

// export default function Create() {
//   const [toogleBuilding, setToogleBuilding] = useState(false);
//   const [galleryId, setGalleryId] = useState<string | null>(null);

//   const handleSubmitInputs = async (
//     e: React.FormEvent<HTMLFormElement>,
//     fn: (inputValues: [string, string, string, File[], string]) => void
//   ) => {
//     const formData = new FormData(e.currentTarget);
//     console.log("Submitting form data:", formData);
//     const title = formData.get("title")?.toString().trim() || "";
//     const description = formData.get("description")?.toString().trim() || "";
//     const format = formData.get("format")?.toString() || "";
//     const files = formData
//       .getAll("files")
//       .filter((file): file is File => file instanceof File);

//     const createdTime = new Intl.DateTimeFormat("en-CA").format(new Date());
//     formData.append("createdTime", createdTime);

//     const inputValues: [string, string, string, File[], string] = [
//       title,
//       description,
//       format,
//       files,
//       createdTime,
//     ];

//     localStorage.setItem(
//       "localData",
//       JSON.stringify({
//         title: formData.get("title"),
//         description: formData.get("description"),
//         format: formData.get("format"),
//         createdTime,
//         files: formData.getAll("files").map((file) => ({
//           name: (file as File).name,
//           size: (file as File).size,
//           type: (file as File).type,
//         })),
//       })
//     );

//     fn(inputValues);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/add-gallery",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data?.gallery?.id) {
//         setGalleryId(response.data.gallery.id);
//       }
//       console.log("Gallery added successfully:", response.data);
//     } catch (error) {
//       console.error("Error adding gallery:", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main className="main-create">
//         {toogleBuilding ? (
//           <GalleryStructure
//             backToForm={() => toogle(setToogleBuilding)}
//             galleryId={galleryId}
//           />
//         ) : (
//           <GallerySetup
//             handleSubmitInputs={handleSubmitInputs}
//             onContinue={() => toogle(setToogleBuilding)}
//           />
//         )}
//       </main>
//     </>
//   );
// }

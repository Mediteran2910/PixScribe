import { useParams } from "react-router-dom";
import useGalleries, { ResponseData } from "../../../Context/GalleriesContext";
import useApi from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import Header from "../../layout/header/Header";
import "./gallery.css";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import Modal from "../../layout/modal/Modal";
import axios from "axios";
import Typography from "../../UI/typography/typography";
import { useNavigate } from "react-router-dom";
import { defaultValues } from "../../../utils/defaultEditorValues";
import { useMemo } from "react";

export default function Gallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);
  const [isLoadingSaveTempl, setIsLoadinSaveTempl] = useState(false);
  const [isErrorSaveTempl, setIsErrorSaveTempl] = useState(false);

  const {
    data: singleGalleryData,
    isLoading: isLoadinSingleGallery,
    isError: isErrorSingleGallery,
  } = useApi<ResponseData>(`http://localhost:8000/gallery/${id}/template`);

  const { galleries, saveTemplateCtx, deleteGalleryCtx, updateGalleryCtx } =
    useGalleries();

  const gallery = useMemo(
    () => galleries.find((g) => g.id === id),
    [galleries, id]
  );

  const [editorValueGallery, setEditorValueGallery] = useState(
    defaultValues[gallery?.format]
  );

  const handleEditorChange = (newValue: string) => {
    setEditorValueGallery(newValue);
  };

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && singleGalleryData && gallery) {
      if (
        gallery.template !== singleGalleryData.template ||
        gallery.parsedTemplates !== singleGalleryData.parsedTemplates
      ) {
        saveTemplateCtx(id, singleGalleryData);
        setHasInitialized(true);
      }
    }
  }, [singleGalleryData, id, hasInitialized]);

  console.log("im from the context", gallery?.parsedTemplates);

  const onDeleteGallery = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/gallery/${gallery.id}`
      );
      if (response) console.log("deletion succesfull");
    } catch {
      console.log("something is wrong while deleting");
    }
  };

  const handleDeleteGallery = async () => {
    setIsLoadingDelete(true);
    try {
      await onDeleteGallery();
    } catch {
      setIsErrorDelete(true);
    } finally {
      deleteGalleryCtx(gallery.id);
      setIsLoadingDelete(false);
      navigate("/");
    }
  };

  const onSaveParsedTempl = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/gallery/${gallery.id}`,
        {
          parsedTemplates: editorValueGallery,
        }
      );

      console.log("Update successful:", response.data);
      return response.data.updatedGallery;
    } catch (error) {
      console.error("Error updating gallery:", error);
      throw error;
    }
  };

  const handleSaveParsedTempl = async () => {
    setIsLoadinSaveTempl(true);
    try {
      const response = await onSaveParsedTempl();

      if (response) {
        console.log("im response", response);
        updateGalleryCtx(response.id, response);
      }
    } catch {
      setIsErrorSaveTempl(true);
    } finally {
      setIsLoadinSaveTempl(false);
    }
  };

  if (isLoadinSingleGallery) return <div>Loading...</div>;
  if (isErrorSingleGallery) return <div>Error loading gallery data</div>;
  if (!gallery) return <div>Gallery not found</div>;
  if (isLoadingDelete) return <div>cekaj da obrisen na backendu</div>;
  if (isErrorDelete) return <div>e jebiga neko sranje se desilo</div>;
  if (isLoadingSaveTempl) return <div>loadan sejvanje cekaj</div>;
  if (isErrorSaveTempl) return <div>error sejvanje, aj ca sa stranice</div>;

  return (
    <>
      <Header />
      <main className="gallery-main">
        <GalleryCard
          isExtended={true}
          galleryTitle={gallery.title}
          galleryFormat={gallery.format}
          galleryDescription={gallery.description}
          galleryNumFiles={gallery.numberOfFiles || gallery.files.length}
          galleryCreatedTime={gallery.createdTime}
          galleryId={gallery.id}
          valueFormat={gallery.format}
        />
        <CodeEditor
          editorLanguage={gallery.format}
          defaultValue={
            gallery.parsedTemplates || singleGalleryData?.parsedTemplates
          }
          onChange={handleEditorChange}
        />

        <ButtonsAction end>
          <Button
            size="medium"
            color="red"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            DELETE
          </Button>
          <Button
            size="medium"
            color="black"
            style={{ marginLeft: "10px" }}
            disabled={editorValueGallery === gallery.parsedTemplates}
            onClick={handleSaveParsedTempl}
          >
            SAVE
          </Button>
          <Button
            size="medium"
            color="black"
            onClick={() => {
              navigator.clipboard.writeText(editorValueGallery);
            }}
          >
            copy
          </Button>
        </ButtonsAction>
      </main>
      <Modal
        isModalOpen={isDeleteModalOpen}
        size="small"
        flexDirection="column"
      >
        <Typography body color="black" style={{ marginBottom: "20px" }}>
          Are you sure you want to delete this gallery? This action is permanent
          and cannot be undone.
        </Typography>
        <ButtonsAction spaceEvenly>
          <Button size="small" color="red" onClick={handleDeleteGallery}>
            DELETE
          </Button>
          <Button
            size="small"
            color="black"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            CANCEL
          </Button>
        </ButtonsAction>
      </Modal>
    </>
  );
}

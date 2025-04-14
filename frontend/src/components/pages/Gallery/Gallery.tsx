import { useParams } from "react-router-dom";
import useGalleries, { ResponseData } from "../../../Context/GalleriesContext";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import Header from "../../layout/header/Header";
import "./gallery.css";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import Modal from "../../layout/modal/Modal";
import useModalCtx from "../../../Context/ModalContext";

export default function Gallery() {
  const { toogleModalVisibility } = useModalCtx();
  const { id } = useParams<{ id: string }>();

  const {
    data: singleGalleryData,
    isLoading: isLoadinSingleGallery,
    isError: isErrorSingleGallery,
  } = useApi<ResponseData>(`http://localhost:8000/gallery/${id}/template`);

  const { galleries, saveTemplateCtx } = useGalleries();

  const gallery = galleries.find((gallery) => gallery.id === id);

  useEffect(() => {
    if (singleGalleryData && gallery) {
      if (
        gallery.template !== singleGalleryData.template ||
        gallery.parsedTemplates !== singleGalleryData.parsedTemplates
      ) {
        saveTemplateCtx(id, singleGalleryData);
      }
    }
  }, [
    singleGalleryData,
    id,
    gallery?.template,
    gallery?.parsedTemplates,
    saveTemplateCtx,
  ]);

  if (isLoadinSingleGallery) return <div>Loading...</div>;
  if (isErrorSingleGallery) return <div>Error loading gallery data</div>;
  if (!gallery) return <div>Gallery not found</div>;

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
          defaultValue={gallery.parsedTemplates?.join("\n")}
        />
        <ButtonsAction end={true}>
          <Button size="medium" color="red" onClick={toogleModalVisibility}>
            DELETE
          </Button>
          <Button size="medium" color="black" style={{ marginLeft: "10px" }}>
            SAVE
          </Button>
        </ButtonsAction>
      </main>
      <Modal>
        <p>
          are you sure you want to delete, if you do this there is no going back
        </p>
        <Button size="small" color="red">
          DELETE
        </Button>
        <Button size="small" color="black">
          CANCEL
        </Button>
      </Modal>
    </>
  );
}

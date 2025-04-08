import CodeEditor from "../../widgets/codeEditor/CodeEditor";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import Header from "../../layout/header/Header";
import { useParams } from "react-router-dom";
import useGalleries from "../../../Context/GalleriesContext";

export default function Gallery() {
  const { id } = useParams();
  const { galleries } = useGalleries();

  return (
    <>
      <Header />
      <main>
        {galleries?.map(
          (gallery) =>
            gallery.id === id && (
              <>
                <GalleryCard
                  isExtended={true}
                  galleryTitle={gallery.title}
                  galleryFormat={gallery.format}
                  galleryNumFiles={gallery.files.length}
                  galleryDescription={gallery.description}
                />
                <CodeEditor
                  editorLanguage={gallery.format}
                  defaultValue={gallery.code}
                />
              </>
            )
        )}
      </main>
    </>
  );
}

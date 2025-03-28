import axios from "axios";
import useApi from "../../../hooks/useApi";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./galleryList.css";

export default function GalleryList() {
  const { galleries, isError, isLoading } = useApi();

  if (isLoading) {
    <p>loading data.....WAAAAIT!!</p>;
  }
  return (
    <main className="homepage-main">
      <ButtonsAction homepage={true} />
      {galleries.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          galleryCreatedTime={gallery.createdTime}
          galleryFormat={gallery.format}
          galleyTitle={gallery.title}
          galleryNumFiles={gallery.files.length}
        />
      ))}
    </main>
  );
}

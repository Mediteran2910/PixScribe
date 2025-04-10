import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import Filter from "../../UI/filter/Filter";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import useGalleries, { Gallery } from "../../../Context/GalleriesContext";
import "./galleryList.css";

export default function GalleryList({ galleries }: { galleries: Gallery[] }) {
  return (
    <main className="homepage-main">
      <ButtonsAction spaceBetween={true}>
        <Filter />
        <Link to="/create">
          <Button color="black" size="medium">
            CREATE
          </Button>
        </Link>
      </ButtonsAction>
      {galleries.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          galleryCreatedTime={gallery.createdTime}
          galleryFormat={gallery.format}
          galleryTitle={gallery.title}
          galleryNumFiles={gallery.numberOfFiles}
          galleryDescription={gallery.description}
          galleryId={gallery.id}
        />
      ))}
    </main>
  );
}

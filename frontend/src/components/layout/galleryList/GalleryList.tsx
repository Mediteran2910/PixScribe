import useApi from "../../../hooks/useApi";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import Filter from "../../UI/filter/Filter";
import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import { toogle } from "../../../utils/toogle";
import "./galleryList.css";

export default function GalleryList() {
  const { galleries, isError, isLoading } = useApi();

  if (isLoading) {
    <p>loading data.....WAAAAIT!!</p>;
  }
  return (
    <main className="homepage-main">
      <ButtonsAction spaceBetween={true}>
        <Filter />
        <Link to="/create">
          {" "}
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
          galleryNumFiles={gallery.files.length}
        />
      ))}
    </main>
  );
}

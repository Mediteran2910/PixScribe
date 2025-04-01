import useApi from "../../../hooks/useApi";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import Filter from "../../UI/filter/Filter";
import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import "./galleryList.css";

export default function GalleryList() {
  const { galleries, isError, isLoading } = useApi();

  if (isLoading) {
    <p>loading data.....WAAAAIT!!</p>;
  }
  return (
    <main className="homepage-main">
      <div className="home-buttons-wrapper">
        <div className="filter-wrapper">
          <Filter onClick={() => toogle(setIsFilter)} />
        </div>
        <Link to="/create">
          {" "}
          <Button color="black" size="medium">
            CREATE
          </Button>
        </Link>
      </div>
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

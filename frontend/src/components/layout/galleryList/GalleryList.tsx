import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import Filter from "../../UI/filter/Filter";
import GalleryCard from "../../widgets/galleryCard/GalleryCard";
import useGalleries, { Gallery } from "../../../Context/GalleriesContext";
import SearchBar from "../../UI/searchBar/searchBar";
import { useState, useEffect } from "react";
import "./galleryList.css";

export default function GalleryList({ galleries }: { galleries: Gallery[] }) {
  const [matchingGalleries, setMatchingGalleries] = useState<Gallery[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const filtered = galleries.filter((gallery) =>
      gallery.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    setMatchingGalleries(filtered);
  }, [searchValue, galleries]);

  console.log(matchingGalleries);

  return (
    <main className="homepage-main">
      <ButtonsAction spaceBetween={true} style={{ marginBottom: "10px" }}>
        <SearchBar
          placeholder="Search..."
          width="70%"
          onChange={(e) => setSearchValue(e.target.value)}
          showList={searchValue && true}
          matchingGalleries={matchingGalleries}
        />
        <Link to="/create">
          <Button
            icon="plus"
            size="small"
            iconWidth="20px"
            style={{ background: "var(--color-black)" }}
          ></Button>
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
          valueFormat={gallery.format}
        />
      ))}
    </main>
  );
}

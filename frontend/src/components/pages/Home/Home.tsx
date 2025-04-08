import Header from "../../layout/header/Header";
import GalleryList from "../../layout/galleryList/GalleryList";
import useGalleries from "../../../Context/GalleriesContext";
export default function Home() {
  const { galleries, isError, isLoading } = useGalleries();

  if (isError) {
    return <p>ERRORCINAAA</p>;
  }

  if (isLoading) {
    return <p>please wait dok ne ucitamoooooo</p>;
  }

  return (
    <>
      <Header />
      <GalleryList galleries={galleries} />
    </>
  );
}

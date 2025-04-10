import Header from "../../layout/header/Header";
import GalleryList from "../../layout/galleryList/GalleryList";
import useGalleries from "../../../Context/GalleriesContext";
import useApi from "../../../hooks/useApi";
import { useEffect, useState } from "react";

export type GalleryMetadata = {
  id?: string;
  title?: string;
  description?: string;
  format?: "html" | "json" | "yaml";
  createdTime?: string;
  numberOfFiles?: number;
  files: File[];
};

export default function Home() {
  const { galleries, isInitialLoad, isInitialError } = useGalleries();

  if (isInitialError) {
    return <p>ERROR loading galleries</p>;
  }

  if (isInitialLoad) {
    return <p>Loading galleries...</p>;
  }

  return (
    <>
      <Header />
      <GalleryList galleries={galleries} />
    </>
  );
}

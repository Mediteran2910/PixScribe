import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import useGalleries from "../../../Context/GalleriesContext";
import { Link } from "react-router-dom";
import "./galleryCard.css";

type Form = {
  galleryTitle?: string;
  galleryFormat?: string;
  galleryCreatedTime?: string;
  galleryNumFiles?: number;
  galleryDescription?: string;
  isExtended?: boolean;
  galleryId?: string;
};
export default function GalleryCard({
  galleryTitle,
  galleryFormat,
  galleryCreatedTime,
  galleryNumFiles,
  galleryDescription,
  galleryId,
  isExtended,
}: Form & React.JSX.IntrinsicElements["div"]) {
  const classes = [];

  const { setGalleries } = useGalleries();
  const navigate = useNavigate();
  if (isExtended) classes.push("extended");

  // const handleOnViewFe = (galleryId: string) => {
  //   setGalleries((prev) =>
  //     prev.map((gallery) => {
  //       if (gallery.id === galleryId) {
  //         const parsedFiles = gallery.files.map((file) => {
  //           let parsed = gallery.template;

  //           parsed = parsed.replace(/{fileName}/g, file.name);
  //           parsed = parsed.replace(/{altText}/g, file.altText);
  //           console.log(parsed);
  //           return parsed;
  //         });

  //         return {
  //           ...gallery,
  //           code: parsedFiles.join("\n"),
  //         };
  //       }
  //       return gallery;
  //     })
  //   );
  //   navigate(`/gallery/${galleryId}`);
  // };

  return (
    <div className="gallery-card">
      <div className="text-wrapper"></div>
      <Typography h2={true} color="black">
        {galleryTitle}
      </Typography>
      {isExtended && (
        <Typography body={true} color="black">
          {galleryDescription}
        </Typography>
      )}
      <div className="tags-wrapper">
        <Typography tag color="black" background="light-grey">
          {galleryFormat.toUpperCase()}
        </Typography>
        <Typography tag={true} color="black" background="light-grey">
          {new Date(galleryCreatedTime).toLocaleDateString()}
        </Typography>
        <Typography tag={true} color="black" background="light-grey">
          {galleryNumFiles} images
        </Typography>
      </div>
      {isExtended ? (
        <Button color="black" size="small">
          EDIT
        </Button>
      ) : (
        <Link to={`/gallery/${galleryId}`}>
          <Button color="black" size="medium">
            VIEW
          </Button>
        </Link>
      )}
    </div>
  );
}

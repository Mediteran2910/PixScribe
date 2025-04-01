import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import { Link } from "react-router-dom";
import "./galleryCard.css";

type Form = {
  galleryTitle: string;
  galleryFormat: string;
  galleryCreatedTime: string;
  galleryNumFiles: number;
};
export default function GalleryCard({
  galleryTitle,
  galleryFormat,
  galleryCreatedTime,
  galleryNumFiles,
}: Form) {
  return (
    <div className="gallery-card">
      <Typography h2={true} color="black">
        {galleryTitle}
      </Typography>
      <div className="tags-wrapper">
        <Typography tag={true} color="black" background="light-grey">
          {galleryFormat.toUpperCase()}
        </Typography>
        <Typography tag={true} color="black" background="light-grey">
          {galleryCreatedTime}
        </Typography>
        <Typography tag={true} color="black" background="light-grey">
          {galleryNumFiles} images
        </Typography>
      </div>
      <Link to="/gallery">
        <Button color="black" size="medium">
          VIEW
        </Button>
      </Link>
    </div>
  );
}

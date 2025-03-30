import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import { Link } from "react-router-dom";
import "./galleryCard.css";
export default function GalleryCard({
  galleyTitle,
  galleryFormat,
  galleryCreatedTime,
  galleryNumFiles,
}) {
  return (
    <div className="gallery-card">
      <Typography h2="black" color="black">
        {galleyTitle}
      </Typography>
      <div className="tags-wrapper">
        <Typography tag="tag" color="black" background="light-grey">
          {galleryFormat.toUpperCase()}
        </Typography>
        <Typography tag="tag" color="black" background="light-grey">
          {galleryCreatedTime}
        </Typography>
        <Typography tag="tag" color="black" background="light-grey">
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

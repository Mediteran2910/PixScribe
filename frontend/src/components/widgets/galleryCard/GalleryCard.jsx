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
      <Typography h2="black">{galleyTitle}</Typography>
      <div className="tags-wrapper">
        <Typography tag="grey">{galleryFormat.toUpperCase()}</Typography>
        <Typography tag="grey">{galleryCreatedTime}</Typography>
        <Typography tag="grey">{galleryNumFiles} images</Typography>
      </div>
      <Link to="/gallery">
        <Button color="black">VIEW</Button>
      </Link>
    </div>
  );
}

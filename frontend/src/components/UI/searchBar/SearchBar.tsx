import { lineNumberMarkers, placeholder } from "@codemirror/view";
import "./searchBar.css";
import Typography from "../typography/typography";
import { Gallery } from "../../../Context/GalleriesContext";

type Props = {
  placeholder?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showList?: boolean;
  matchingGalleries: Gallery[];
};

export default function SearchBar({
  placeholder,
  width,
  onChange,
  showList,
  matchingGalleries,
}: Props) {
  return (
    <div className="search-bar-wrapp" style={{ width: width }}>
      <div className="search-bar">
        <input type="text" placeholder={placeholder} onChange={onChange} />
        <img src="icons/search.svg" alt="search icon" />
      </div>

      {showList && (
        <ul className="expanded-search-bar">
          {matchingGalleries && matchingGalleries.length > 0 ? (
            matchingGalleries.map((gallery) => (
              <li key={gallery.id}>
                <a href={`/gallery/${gallery.id}`} className="gallery-links">
                  <Typography
                    body
                    color="white"
                    style={{ marginRight: "20px" }}
                  >
                    {gallery.title}
                  </Typography>
                  <Typography
                    caption
                    color="medium-grey"
                    style={{ marginRight: "10px" }}
                  >
                    {new Date(gallery.createdTime).toLocaleDateString()}
                  </Typography>
                  <Typography
                    caption
                    color="medium-grey"
                    style={{ marginRight: "10px" }}
                  >
                    {gallery.format.toUpperCase()}
                  </Typography>
                  <Typography
                    caption
                    color="medium-grey"
                    style={{ marginRight: "10px" }}
                  >
                    {gallery.numberOfFiles} images
                  </Typography>
                </a>
              </li>
            ))
          ) : (
            <li>
              <Typography caption color="medium-grey">
                0 galleries found
              </Typography>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

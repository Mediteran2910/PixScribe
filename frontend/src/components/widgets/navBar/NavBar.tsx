import Button from "../../UI/button/Button";
import Typography from "../../UI/typography/typography";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./nav-bar.css";
export default function NavBar() {
  const links = ["Home", "Guide", "About", "Create"];

  return (
    <nav>
      {links.map((l) => (
        <Link to={l === "Home" ? "/" : `/${l}`} key={uuidv4()}>
          <Typography body={true} color="white">
            {l}
          </Typography>
        </Link>
      ))}
    </nav>
  );
}

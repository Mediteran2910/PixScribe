import Button from "../../UI/button/Button";
import Typography from "../../UI/typography/typography";
import { Link } from "react-router-dom";
import "./nav-bar.css";
export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <Typography body="body" color="white">
          Home
        </Typography>
      </Link>
      <Link to="/guide">
        <Typography body="body" color="white">
          Guide
        </Typography>
      </Link>
      <Link to="/about">
        <Typography body="body" color="white">
          About us
        </Typography>
      </Link>
      <Link to="/create">
        <Button outline="white" size="medium">
          CREATE
        </Button>
      </Link>
    </nav>
  );
}

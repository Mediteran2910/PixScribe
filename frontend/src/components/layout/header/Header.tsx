import NavBar from "../../widgets/navBar/NavBar";
import Logo from "../../UI/logo/Logo";
import Button from "../../UI/button/Button";
import "./header.css";
export default function Header() {
  return (
    <header>
      <Logo />
      <NavBar />
    </header>
  );
}

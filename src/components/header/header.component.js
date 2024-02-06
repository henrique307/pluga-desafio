import logo from "../../assets/logo_pluga.png";
import { useAppContext } from "../../context/search.context";
import "./header.css";

export const HeaderComponent = () => {
  const { setSearch, setCurrentPage } = useAppContext();
  return (
    <header className="header">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://pluga.co/"
        className="logo-link"
      >
        <img alt="logo" className="logo" src={logo} />
      </a>
      <input
        className="header-input"
        onChange={(event) => {setSearch(event.target.value); setCurrentPage(1)}}
      />
    </header>
  );
};

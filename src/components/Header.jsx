import { Link } from "react-router-dom";
import logo from "../assets/logo-vinted.png";
import axios from "axios";

const Header = ({ userToken, handleToken }) => {
  return (
    <header className="container">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>

        <input type="text" placeholder="Recherche des articles" />
      </div>

      <div>
        {userToken ? (
          <button
            onClick={() => {
              handleToken();
            }}
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link to={"/signup"}>
              <button className="button-signup">S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button className="button-login">Se connecter</button>
            </Link>
          </>
        )}
      </div>
      {userToken ? (
        <Link to={"/publish"}>
          <button className="button-sell">Vends tes articles</button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <button className="button-sell">Vends tes articles</button>
        </Link>
      )}
    </header>
  );
};
export default Header;

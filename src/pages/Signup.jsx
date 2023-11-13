import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const fetchData = async () => {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username,
            email,
            password,
            newsletter,
          }
        );

        console.log(response);
        handleToken(response.data.token);
        navigate("/");
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container signup-form">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            console.log(event.target.value);
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <input
            className="checkbox"
            type="checkbox"
            name="newsletter"
            checked={newsletter}
            onChange={(event) => {
              console.log(event);
              setNewsletter(!newsletter);
            }}
          />
          <label htmlFor="newsletter"> S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté <br /> les Termes &
          Conditions et Politique de <br /> Confidentialité de Vinted. Je
          confirme avoir au <br /> moins 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;

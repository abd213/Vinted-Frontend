import { useEffect, useState } from "react";
import axios from "axios";
import imgHero from "../assets/hero.jpg";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data.owner);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div>
        <img
          className="img-hero"
          src={imgHero}
          alt="Image de la page d'accueil"
        />
      </div>
      <main className="container">
        {data.offers.map((offer) => {
          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article className="article">
                <div className="avatar">
                  {offer.owner.account.avatar ? (
                    <img
                      className="avatar-img"
                      src={offer.owner.account.avatar.secure_url}
                      alt="photo de profil"
                    />
                  ) : (
                    <img className="avatar-img" src={avatar} alt="" />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img
                  className="img-offers"
                  src={offer.product_image.secure_url}
                  alt="image de l'offres"
                />
                <div>
                  <p>{offer.product_price} €</p>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </main>
    </>
  );
};

export default Home;

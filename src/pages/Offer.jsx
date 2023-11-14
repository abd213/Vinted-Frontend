import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/avatar.png";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  // console.log(params);
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
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
    <div className="offer-body">
      <div className="container main-offer">
        <div>
          <img
            className="img-product-offer"
            src={data.product_image.secure_url}
            alt=""
          />
        </div>
        <div className="offer-part-right">
          <div className="offer-part-top">
            <p className="offer-price">{data.product_price} €</p>
            {data.product_details.map((detail) => {
              // console.log(Object.keys(detail));
              const clefs = Object.keys(detail);
              // console.log(data.product_details);
              const clef = clefs[0];
              // console.log(detail[clef]);

              return (
                <div className="veve2" key={data.id}>
                  <span>{clefs} </span>
                  <span>{detail[clef]}</span>
                </div>
              );
            })}
          </div>

          <div className="offer-part-bottom">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <div className="offer-info-avatar">
              {data.owner.account.avatar ? (
                <img
                  className="avatar-img-offer"
                  src={data.owner.account.avatar.secure_url}
                  alt=""
                />
              ) : (
                <img className="avatar-img-offer" src={avatar} alt="" />
              )}

              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <Link to="/payment">
            <button className="button-offer">Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Offer;

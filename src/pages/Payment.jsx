import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Payment = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const token = Cookies.get("userToken");
  console.log(token);
  //   const { name } = location.state;
  //   console.log("gdueb", location.state.product_name);
  //   console.log(location.state._id);
  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      //   console.log(stripeResponse);

      const stripeToken = stripeResponse.token.id;
      //   console.log(stripeToken);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: location.state.product_name,
          amount: location.state.price,
        }
      );
      console.log(response.data.status);
      if (response.data.status === "succeeded") {
        setIsAccepted(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fraisDePort = 5;
  const assurance = 1;
  return token ? (
    <div className="div-main">
      <form className="payment-form" onSubmit={handlePayment}>
        <span className="summary">Résumé de la commande</span>
        <div className="top-payment">
          <div className="div-payment">
            <span>Commande </span>
            <span>{location.state.price} €</span>
          </div>
          <div className="div-payment">
            <span>Frais de protection acheteurs </span>
            <span>1,00 €</span>
          </div>
          <div className="div-payment">
            <span>Frais de port </span>
            <span>5,00 €</span>
          </div>
        </div>
        <div className="bottom-payment">
          <div className="div-payment">
            <span className="total">Total </span>
            <span className="total">
              {location.state.price + fraisDePort + assurance} €
            </span>
          </div>

          <p className="description-payment">
            Il ne vous reste plus qu'une étape pour vous offir{" "}
            {location.state.product_name}. Vous allez payer{" "}
            {location.state.price + fraisDePort + assurance} € (frais de
            protection et frais de port inclus).
          </p>
        </div>
        <CardElement
          options={{ style: { base: { fontSize: `16px`, color: `grey` } } }}
        />
        {isAccepted ? (
          <div>
            <p className="succeeded-payment">Paiement validé</p>
          </div>
        ) : (
          <button className="button-payment" type="submit">
            Payer
          </button>
        )}
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;

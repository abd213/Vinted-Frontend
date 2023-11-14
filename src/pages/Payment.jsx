import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const stripe = useStripe();
const elements = useElements();

const handlePayment = async (event) => {
  event.preventDefault();
  try {
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: productName,
    });

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post("");
  } catch (error) {
    console.log(error);
  }
};

const Payment = () => {
  return (
    <div>
      <form onSubmit={handlePayment}>
        <h3>Résumé de la commande</h3>
        <div>
          <span>Commande </span>
          <span>0,00 €</span>
        </div>
        <div>
          <span>Frais de protection acheteurs </span>
          <span>0,00 €</span>
        </div>
        <div>
          <span>Frais de port </span>
          <span>0,00 €</span>
        </div>
        <CardElement />
        <button type="submit">Payer</button>
      </form>
    </div>
  );
};

export default Payment;

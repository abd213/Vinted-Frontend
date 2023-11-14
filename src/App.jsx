import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  const handleId = (id) => {
    Cookies.set("userId", id);
    setUserId(id);
  };
  return (
    <Router>
      <Header handleToken={handleToken} userToken={userToken} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offers/:id" element={<Offer />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} handleId={handleId} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
        <Route
          path="/publish"
          element={<Publish userToken={userToken} />}
        ></Route>
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment userId={userId} />
            </Elements>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;

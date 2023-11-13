import axios from "axios";
import { useState } from "react";

const Publish = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [exchanges, setExchanges] = useState(false);
  const [file, setFile] = useState();
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("picture", file);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Vends ton article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setFile(event.target.files[0]);
            }}
          />
          {/* {file && (
            <div>
              <img className="veve" src={file} alt="" />
            </div>
          )} */}
        </div>
        <div>
          <label htmlFor="title">
            Titre
            <input
              type="text"
              placeholder="ex: Jean noir"
              name="title"
              value={title}
              onChange={(event) => {
                // console.log(event.target.value);
                setTitle(event.target.value);
                // console.log(title);
              }}
            />
          </label>
          <label htmlFor="description">
            Description de l'article
            <input
              type="text"
              placeholder="ex: porté seulement quelque fois..."
              name="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                // console.log(description);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="brand">
            Marque
            <input
              type="text"
              placeholder="ex: Nike"
              name="brand"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                // console.log(brand);
              }}
            />
          </label>
          <label htmlFor="size">
            Taile
            <input
              type="text"
              placeholder="ex: S/ M/ 41/ 12"
              name="size"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
                // console.log(size);
              }}
            />
          </label>
          <label htmlFor="color">
            Couleur
            <input
              type="text"
              placeholder="ex: Noir"
              name="color"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
                // console.log(color);
              }}
            />
          </label>
          <label htmlFor="condition">
            Etat
            <input
              type="text"
              placeholder="ex: Neuf / Usée"
              name="condition"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
                // console.log(condition);
              }}
            />
          </label>
          <label htmlFor="location">
            Lieu
            <input
              type="text"
              placeholder="ex: Paris"
              name="location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="price">
            Prix
            <input
              type="text"
              placeholder="0,00 €"
              name="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <input
              type="checkbox"
              name="exchange"
              checked={exchanges}
              onChange={(event) => {
                console.log(event);
                setExchanges(!exchanges);
              }}
            />
            <label htmlFor="exchange">
              Je suis intéressé(e) par les échanges
            </label>
          </label>
        </div>
        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};
export default Publish;

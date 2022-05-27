import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import { GiHeartburn } from "react-icons/gi";
import { BsArrowLeftCircle } from "react-icons/bs";
import "./Favourite.style.css";
import { AppContext } from "../../App";
import { Link, useParams } from "react-router-dom";

const Favourite = () => {
  const { userObj } = useContext(AppContext);
  const currentUser = JSON.parse(userObj);

  const params = useParams()

  const [myFavs, setMyFavs] = useState([]);

  useEffect(() => {
    const getMyFavourites = async () => {
      try {
        const allFavourites = await axios.post(
          "/api/favourites",
          currentUser
        );
        setMyFavs(allFavourites.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyFavourites();
  }, []);

  return (
    <div className="suki-wrapper">
      <Link to={`/${params.id}`} className="back-home">
        <BsArrowLeftCircle />
      </Link>
      <div className="header-title">
        <h1>Your SUKI SUSHI</h1>
        <GiHeartburn />
      </div>
      {myFavs.length > 0 ? myFavs.map((myFav) => (
        <Item item={myFav} key={myFav._id} />
      )) : (
        <p>No restaurants in your SUKI.</p>
      )}
    </div>
  );
};

export default Favourite;

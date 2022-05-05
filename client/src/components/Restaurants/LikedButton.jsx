import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikedButton = ({
  favouritesList,
  addToFavourite,
  removeFromFavourite,
  data,
  currentUser,
}) => {
  const myFavourite = favouritesList.filter(
    (list) => list.email === currentUser.email
  );
  const isFavourite = myFavourite
    .map((item) => {
      return item.id;
    })
    .includes(data.id);

  return (
    <>
      {isFavourite ? (
        <div className="unfavourite" onClick={removeFromFavourite}>
          <AiFillHeart />
        </div>
      ) : (
        <div className="favourite" onClick={addToFavourite}>
          <AiOutlineHeart />
        </div>
      )}
    </>
  );
};

export default LikedButton;

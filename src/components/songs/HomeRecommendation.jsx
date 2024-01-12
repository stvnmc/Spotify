import React from "react";
import { AiFillHeart } from "react-icons/ai";
const HomeRecommendation = ({ item }) => {
  console.log(item?.images?.[0]?.url);

  return (
    <div className="contents">
      <div
        className={`${
          item === "heart" ? "saveList" : "adaptable-background"
        } imgHome`}
        style={
          item !== "heart"
            ? { backgroundImage: `url(${item?.images?.[2]?.url})` }
            : {}
        }
      >
        {item === "heart" ? <AiFillHeart /> : null}
      </div>
      <div>
        <h1>{item === "heart" ? "Canciones que te gustan" : item.name}</h1>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default HomeRecommendation;

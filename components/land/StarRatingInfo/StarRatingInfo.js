import React from "react";
import StarRating from "react-star-rating";

const StarRatingInfo = (params) => {
  return (
    <StarRating
      name="small-rating"
      caption={params.rate}
      size={30}
      totalStars={5}
      rating={3}
    />
  );
};

export default StarRatingInfo;

import React from "react";
import sobiratel from "../../../../../server/static/6ece78d0-8df8-4898-9539-b6901082195a.jpg";

export const FilmCard = () => {
  return (
    <div className="card" style={{ width: "200px" }}>
      <img src={sobiratel} alt="film" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">Sobiratel</h5>
      </div>
    </div>
  );
};

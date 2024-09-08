import React from "react";
import avangers from '../../assets/FilmCards/avangers.jpg'
import drive from '../../assets/FilmCards/drive.jpg'
import fightclub from '../../assets/FilmCards/fightclub.jpg'

export const FilmCard = () => {
  return (
    <div className="card" style={{ width: "200px" }}>
      <img src={avangers} alt="film" className="card-img-top" style={{ height: "25%"}}/>
      <div className="card-body">
        <h5 className="card-title">Avangers</h5>
      </div>
    </div>
  );
};

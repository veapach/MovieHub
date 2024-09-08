import React from "react";
import "./homePage.css";
import { FilmCard } from "../../components/FilmCard/FilmCard";

import avangers from '../../assets/FilmCards/avangers.jpg'
import drive from '../../assets/FilmCards/drive.jpg'
import fightclub from '../../assets/FilmCards/fightclub.jpg'

const HomePage = () => {
  return (
    <div className="homepage-wrapper container-fluid">
      <div className="greeting-sign">
        <h1>Добро пожаловать на MovieHub</h1>
      </div>
      <div className="film-collection-home">
        <div className="collection-slider newest-films">
          <h3 className="collection-name">
            <a href="#">Новинки</a>
          </h3>
        </div>
        <div className="collection-slider best-films">
          <h3 className="collection-name">
            <a href="#">Лучшие проекты</a>
          </h3>
        </div>
        <div className="collection-slider moviehub-films">
          <h3 className="collection-name">
            <a href="#">Выбор MovieHub</a>
          </h3>
        </div>
        <div className="row" >
          <div className="col-md-3">
            <FilmCard />
          </div>
          <div className="col-md-3">
            <FilmCard />
          </div>
          <div className="col-md-3">
            <FilmCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

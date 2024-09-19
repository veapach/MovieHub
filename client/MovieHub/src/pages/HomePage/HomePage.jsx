import React, { useEffect, useState } from "react";
import FilmCard from "../../components/FilmCard/FilmCard";
import "./homePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [films, setFilms] = useState([]); // Начальное состояние - пустой массив

  // Функция для получения фильмов из API
  const fetchFilms = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/film"); // Путь к вашему API
      const data = await response.json();
      if (Array.isArray(data.rows)) {
        setFilms(data.rows); // Убедимся, что данные — это массив
      } else {
        console.error("Ошибка: данные не являются массивом", data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
    }
  };

  useEffect(() => {
    fetchFilms(); // Подгружаем фильмы при загрузке страницы
  }, []);

  // Функция для перелистывания слайдера
  const scrollRight = (sliderId) => {
    const slider = document.getElementById(sliderId);
    slider.scrollBy({ left: 300, behavior: "smooth" }); // Прокрутка на 300px вправо
  };

  const scrollLeft = (sliderId) => {
    const slider = document.getElementById(sliderId);
    slider.scrollBy({ left: -300, behavior: "smooth" }); // Прокрутка на 300px влево
  };

  return (
    <div className="homepage-wrapper container-fluid">
      <div className="greeting-sign">
        <h1>Добро пожаловать на MovieHub</h1>
      </div>

      <div className="film-collection-home">
        {/* Раздел "Новинки" */}
        <div className="collection-slider newest-films">
          <div className="section-header">
            <h3 className="collection-name">
              <a href="#">Новинки</a>
            </h3>
            <div className="slider-controls">
              <button className="slider-arrow left-arrow" onClick={() => scrollLeft("newest-slider")}>◀</button>
              <button className="slider-arrow right-arrow" onClick={() => scrollRight("newest-slider")}>▶</button>
            </div>
          </div>
          <div id="newest-slider" className="slider-film-row">
            {films.length > 0 && films.map((film, index) => (
              <div className="col-md-3" key={index}>
                <FilmCard film={film} />
              </div>
            ))}
          </div>
        </div>

        {/* Раздел "Лучшие проекты" */}
        <div className="collection-slider best-films">
          <div className="section-header">
            <h3 className="collection-name">
              <a href="#">Лучшие проекты</a>
            </h3>
            <div className="slider-controls">
              <button className="slider-arrow left-arrow" onClick={() => scrollLeft("best-slider")}>◀</button>
              <button className="slider-arrow right-arrow" onClick={() => scrollRight("best-slider")}>▶</button>
            </div>
          </div>
          <div id="best-slider" className="slider-film-row">
            {films.length > 0 && films.map((film, index) => (
              <div className="col-md-3" key={index}>
                <FilmCard film={film} />
              </div>
            ))}
          </div>
        </div>

        {/* Раздел "Выбор MovieHub" */}
        <div className="collection-slider moviehub-films">
          <div className="section-header">
            <h3 className="collection-name">
              <a href="#">Выбор MovieHub</a>
            </h3>
            <div className="slider-controls">
              <button className="slider-arrow left-arrow" onClick={() => scrollLeft("moviehub-slider")}>◀</button>
              <button className="slider-arrow right-arrow" onClick={() => scrollRight("moviehub-slider")}>▶</button>
            </div>
          </div>
          <div id="moviehub-slider" className="slider-film-row">
            {films.length > 0 && films.map((film, index) => (
              <div className="col-md-3" key={index}>
                <FilmCard film={film} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

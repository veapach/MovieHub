import React, { useState, useEffect } from "react";
import "./homePage.css";
import FilmCard from "../../components/FilmCard/FilmCard";
import axios from 'axios';

const HomePage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Запрос к API для получения фильмов
    const fetchFilms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/film');
        setFilms(response.data.rows); // Сохраняем фильмы в состояние
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchFilms(); // Вызов функции при монтировании компонента
  }, []);

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
        <div className="row">
          {/* Рендерим каждую карточку фильма динамически */}
          {films.map((film) => (
            <div key={film.id} className="col-md-3">
              <FilmCard film={film} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

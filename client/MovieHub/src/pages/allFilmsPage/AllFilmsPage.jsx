import React, { useEffect, useState } from "react";
import FilmCard from "../../components/FilmCard/FilmCard";
import "./AllFilmsPage.css";
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

  return (
    <div className="homepage-wrapper container-fluid">
      <div className="greeting-sign">
        <h1>Фильмы</h1>
      </div>

      <div className="container-xxl">
        <div className="row row-cols-5 row-gap-5">
            {films.length > 0 && films.map((film, index) => (
              <div className="col-xl" key={index}>
                <FilmCard film={film} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

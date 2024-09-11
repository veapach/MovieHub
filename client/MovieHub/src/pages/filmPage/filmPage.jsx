import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Чтобы получить id из URL
import "./FilmPage.css";

const FilmPage = () => {
  const { id } = useParams(); // Получаем id фильма из URL
  const [film, setFilm] = useState(null); // Начальное состояние - null, пока данные не загружены
  const [loading, setLoading] = useState(true); // Для отображения загрузки

  // Функция для получения данных о фильме по ID
  const fetchFilm = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/film/${id}`); // Запрос к API с id фильма
      const data = await response.json();
      setFilm(data); // Устанавливаем полученные данные в состояние
      setLoading(false); // Отключаем режим загрузки
    } catch (error) {
      console.error("Ошибка при загрузке данных фильма:", error);
      setLoading(false); // Отключаем режим загрузки даже при ошибке
    }
  };

  useEffect(() => {
    fetchFilm(); // Загружаем данные при монтировании компонента
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>; // Пока данные загружаются, отображаем сообщение
  }

  if (!film) {
    return <p>Фильм не найден</p>; // Если данные не были получены
  }

  return (
    <div className="film-page container">
      <div className="film-header">
        <h1>{film.name}</h1>
        <p className="film-rating">Рейтинг: {film.rating}</p>
      </div>
      <div className="film-details">
        <div className="film-poster">
          <img
            src={`http://localhost:8080/static/posters/${film.poster}`}
            alt={film.name}
            className="poster-image"
          />
        </div>
        <div className="film-info">
          <p><strong>Жанр:</strong> {film.genre}</p>
          <p><strong>Год выпуска:</strong> {film.year_of_release}</p>
          <p><strong>Продолжительность:</strong> {film.duration}</p>
          <p><strong>Описание:</strong> {film.description}</p>
          <p><strong>Актёры:</strong> {film.cast_members.join(", ")}</p>
          <a
            href={film.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="trailer-link"
          >
            Смотрите трейлер
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;

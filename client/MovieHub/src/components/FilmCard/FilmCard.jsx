import React from 'react';

const FilmCard = ({ film }) => {
  return (
    <div className="film-card">
      <img src={`http://localhost:8080/static/posters/${film.poster}`} alt={film.name} className="film-poster" />
      <h2>{film.name}</h2>
      <p><strong>Жанр:</strong> {film.genre}</p>
      <p><strong>Год выпуска:</strong> {film.year_of_release}</p>
      <p><strong>Актеры:</strong> {film.cast_members.join(', ')}</p>
      <p><strong>Описание:</strong> {film.description}</p>
      <p><strong>Длительность:</strong> {film.duration}</p>
      <p><strong>Рейтинг:</strong> {film.rating}</p>
      <a href={film.trailer} target="_blank" rel="noopener noreferrer">Смотреть трейлер</a>
    </div>
  );
};

export default FilmCard;
